import os
import time
import pathlib
import socket
import logging
import boto3
import requests
import yaml
import json
from subprocess import call, STDOUT
from kubernetes import client, config
from kubernetes.client import Configuration, V1DeleteOptions
from kubernetes.client.apis import core_v1_api
from kubernetes.client.rest import ApiException
from kubernetes.stream import stream
from cerberus.client import CerberusClient

logger = logging.getLogger(__name__)

def init_aws_client(mode, endpoint):
    """Create a new aws client connected to ENDPOINT_URL
    :return: an aws client
    """
    client = boto3.client(mode, endpoint_url=endpoint, aws_access_key_id='foo', aws_secret_access_key='bar')
    resource = boto3.resource(mode, endpoint_url=endpoint, aws_access_key_id='foo', aws_secret_access_key='bar')
    return client, resource

def wait_for_port(port, host='localhost', timeout=20.0):
    """Wait until a port starts accepting TCP connections.
    Args:
        port (int): Port number.
        host (str): Host address on which the port should exist.
        timeout (float): In seconds. How long to wait before raising errors.
    Raises:
        TimeoutError: The port isn't accepting connection after time specified in `timeout`.
    """
    start_time = time.perf_counter()
    while True:
        try:
            with socket.create_connection((host, port), timeout=timeout):
                logger.info('Waiting for port {port} to respond on host {host}'.format(port=port, host=host))
                break
        except OSError as ex:
            time.sleep(0.01)
            if time.perf_counter() - start_time >= timeout:
                raise TimeoutError('Waited too long for the port {} on host {} to start accepting '
                                   'connections.'.format(port, host)) from ex

def init_k8s_client():
    # Configs can be set in Configuration class directly or using helper utility.
    config.load_kube_config()
    c = Configuration()
    c.assert_hostname = False
    Configuration.set_default(c)
    return core_v1_api.CoreV1Api()

def kube_exec(k8s_api=None, label=None, namespace='default', command=None):
    ret = k8s_api.list_namespaced_pod('default', label_selector=label)
    pod_name = ret.items[0].metadata.name
    # TODO: check status of container before exec.
    exec_command = [
        '/bin/bash',
        '-c',
        command]
    resp = stream(
        k8s_api.connect_get_namespaced_pod_exec,
        pod_name,
        namespace,
        command=exec_command,
        stderr=True, stdin=False,
        stdout=True, tty=False,
        _preload_content=False
    )
    while resp.is_open():
        resp.update(timeout=1)
        if resp.peek_stdout():
            print(resp.read_stdout())
        if resp.peek_stderr():
            print(resp.read_stderr(), end='')
    resp.close()

def kube_command(dirname='', filename='', command='apply', log_level='warn'):
    workfilename = pathlib.Path(__file__).name
    package_dir = str(pathlib.Path(__file__).absolute()).replace(workfilename, '')
    workpath = str(package_dir.replace('/'+__package__, ''))
    stdout = {
        'warning': open(os.devnull, 'w'),
        'info': None,
    }
    call(
        [
            "kubectl",
            command,
            "-f",
            "{kubepath}".format(kubepath=os.path.join(workpath, 'k8s', dirname, filename))
        ],
        stdout=stdout[log_level],
        stderr=STDOUT
    )

def create_pvs(k8s_api=None, source_code_path='', dags_dir='dags', scripts_dir='scripts'):
    pv_airflow_dags_body = {
        "kind": "PersistentVolume",
        "apiVersion": "v1",
        "metadata": {
            "name": "datalayer"
        },
        "spec": {
        "storageClassName": "manual",
        "capacity": {
            "storage": "2Gi"
        },
        "accessModes": [
            "ReadWriteMany"
        ],
        "hostPath": {
            "path": os.path.join(source_code_path, dags_dir)
        }
        }
    }
    # The kubernetes create action errors when the volume already exists, 
    # hence we try to create and replace only if necessary.
    try:
        k8s_api.create_persistent_volume(body=pv_airflow_dags_body, pretty=True)
    except:
        k8s_api.replace_persistent_volume(name='airflow-dags', body=pv_airflow_dags_body, pretty=True)
    pv_airflow_scripts_body = {
        "kind": "PersistentVolume",
        "apiVersion": "v1",
        "metadata": {
            "name": "datalayer"
        },
        "spec": {
            "storageClassName": "manual",
            "capacity": {
                "storage": "1Gi"
            },
            "accessModes": [
                "ReadWriteMany"
            ],
            "hostPath": {
                "path": os.path.join(source_code_path, scripts_dir)
            }
        }
    }
    # The kubernetes create action errors when the volume already exists, hence we try to create and replace only if necessary.
    try:
        logger.info("creating airflow-scripts pv")
        k8s_api.create_persistent_volume(body=pv_airflow_scripts_body, pretty=True)
    except:
        logger.info("replacing airflow-scripts pv")
        k8s_api.replace_persistent_volume(name='airflow-scripts', body=pv_airflow_scripts_body, pretty=True)

def delete_pv(k8s_api=None):
    body = V1DeleteOptions()
    try:
        k8s_api.delete_persistent_volume(name='datalayer', body=body)
    except ApiException as err:
        logger.error("Exception when calling CoreV1Api->delete_persistent_volume: %s\n" % err)

def keycloak():
    # Retrieve the Keycloak url and port.
    KEYCLOAK_NAMESPACE = 'keycloak'
    KEYCLOAK_HTTP_SERVICE_NAME = 'keycloak-http'
    config.load_kube_config()
    kube_client = client.CoreV1Api()
    kube_services = kube_client.list_namespaced_service(KEYCLOAK_NAMESPACE)
    keycloak_http_service = next((x for x in kube_services.items if x.metadata.name == KEYCLOAK_HTTP_SERVICE_NAME))
    BASE_URL = 'http://{}/auth'.format(keycloak_http_service.status.load_balancer.ingress[0].hostname)
    print(BASE_URL)
    with open('jupyterhub.yaml', 'r') as f:
        jupyterhub_config = yaml.safe_load(f)
    # Setup the initial credentials for Keycloak.
    with open('keycloak.yaml', 'r') as f:
        config = yaml.safe_load(f)
    admin_pass = config['keycloak']['password']
    request_dsp = {
        'client_id': 'admin-cli',
        'username': 'keycloak',
        'password': admin_pass,
        'grant_type': 'password'
    }
    r = requests.post(f'{BASE_URL}/realms/master/protocol/openid-connect/token', data=request_dsp)
    access_token = r.json()['access_token']
    headers = {
        'Authorization': f'bearer {access_token}'
    }
    with open('./../config/identity_provider.json', 'r') as f:
        idp_config = json.load(f)
    idp_config['config']['clientId'] = 'datalayer'
    idp_config['config']['clientSecret'] = os.getenv['DLA_KEYCLOAK_REALM_CLIENT_SECRET']
    # Setup the Identity Provider in Keycloak
    r = requests.post(f'{BASE_URL}/admin/realms/master/identity-provider/instances', headers=headers, json=idp_config)
    if r.status_code == 409: # Already exists, only update instead
        r = requests.put(f'{BASE_URL}/admin/realms/master/identity-provider/instances/{idp_config["alias"]}', headers=headers, json=idp_config)
        assert r.status_code == 204
    else:
        assert r.status_code == 201
    # Set the client_secret from the configured keycloak in a jupyterhub config.
    r = requests.get(f'{BASE_URL}/admin/realms/master/clients', headers=headers)
    master_realm_json = list(filter(lambda x: x['clientId'] == jupyterhub_config['auth']['custom']['config']['client_id'], r.json()))[0]
    r = requests.get(f'{BASE_URL}/admin/realms/master/clients/{master_realm_json["id"]}/client-secret', headers=headers)
    client_token = r.json()['value']
    jupyterhub_auth_secret_config = {
        'auth': {
            'custom': {
                'config': {
                    'client_secret': client_token
                }
            }
        }
    }
    with open('jupyterhub_config.yaml', 'w') as f:
        yaml.safe_dump(jupyterhub_auth_secret_config, f)

import logging
import os
import pathlib
import docker

from botocore.exceptions import ClientError

from ..cloud.aws import (
    init_aws_client, wait_for_port, kube_exec,
    kube_command, init_k8s_client, create_pvs, delete_pv
)


logger = logging.getLogger("__name__")

ENDPOINT_URL_S3 = 'http://127.0.0.1:29562'
s3_client, s3_resource = init_aws_client('s3', ENDPOINT_URL_S3)
bucket_name = 'datalayer'

k8s_api = init_k8s_client()


def build(build_container_names=''):
    build_containers = build_container_names.split(',')
    logger.info('Building datalayer containers: %s' % build_containers)

    client = docker.from_env()
    hadoop_version = '2.9.1'
    spark_version = '2.4.3'
    airflow_version = '1.12.1'

    workfilename = pathlib.Path(__file__).name
    package_dir = str(pathlib.Path(__file__).absolute()).replace(workfilename, '')
    workpath = str(package_dir.replace('/'+__package__, ''))

    if 'spark' in build_containers:
        logger.info('Building spark image')
        client.images.build(
            path=workpath + 'build/spark/',
            buildargs={
                'hadoop_version': hadoop_version,
                'spark_version': spark_version,
                },
            tag='spark:latest'
        )
        logger.info('Finished building spark image')

def setup(test_dsp_path='', dst_dir=''):
    logger.info('Setting up test data in datalayer S3')
    wait_for_port(port=29562)
    logger.info('Creating %s bucket' % bucket_name)
    s3_client.create_bucket(
        Bucket=bucket_name,
        ACL='public-read-write'
    )
    logger.info('Syncing local folder {test_dsp_path} with {bucket} bucket'.format(test_dsp_path=test_dsp_path, bucket=bucket_name))
    if not test_dsp_path:
        logger.warning('test_dsp_path not defined, will use current directory')
        test_dsp_path = os.getcwd()
    if not os.path.isdir(test_dsp_path):
        logger.error('test_dsp_path %r not found.' % test_dsp_path)
        raise ValueError('test_dsp_path %r not found.' % test_dsp_path)
    all_files = []
    for root, _, files in os.walk(test_dsp_path):
        all_files += [os.path.join(root, f) for f in files]
    for filename in all_files:
        key = os.path.join(dst_dir, os.path.relpath(filename, test_dsp_path))
        logger.info('Uploading file {file} into {bucket} with key {key}'.format(file=filename, bucket=bucket_name, key=key))
        s3_client.upload_file(filename, bucket_name, key)

def run_spark_job(filepath='', packages=''):
    """
    function to run spark job
    """
    if not filepath:
        logger.error('Filepath not provided')
        raise ValueError('Filepath not provided')

    packages_command = ''
    if packages:
        for package in packages.split(','):
            packages_command = ''.join([packages_command, ' --packages {package}'.format(package=package)])

    print("packages: ", packages_command)
    spark_command = """
    source /opt/spark/.bashrc && \
    /opt/spark/bin/spark-submit{packages} /opt/spark/input/{filepath}
    """.format(packages=packages_command, filepath=filepath)

    print(spark_command)
    kube_exec(k8s_api=k8s_api, label='app=spark,role=edge', command=spark_command)

def run_command(log_level='warning', source_code_path='', dags_dir='', scripts_dir=''):
    """
    """
    logger.info('Applying datalayer manifests')

    if not source_code_path:
        logger.warning('source_code_path not defined, will use current directory')
        source_code_path = os.getcwd()

    create_pvs(
        k8s_api=k8s_api,
        source_code_path=source_code_path,
        dags_dir=dags_dir,
        scripts_dir=scripts_dir
    )
    kube_command(filename='k8s-dashboard.yml', log_level=log_level)
    kube_command(dirname='db', log_level=log_level)
    kube_command(filename='datalayer.yml', log_level=log_level)

    wait_for_port(port=29562)
    logger.info('Creating %s bucket' % bucket_name)
    s3_client.create_bucket(
        Bucket=bucket_name,
        ACL='public-read-write'
    )
    wait_for_port(port=29562)

    kube_command(dirname='airflow', log_level=log_level)
    kube_command(dirname='spark', log_level=log_level)

def delete_command(log_level='warning'):
    logger.info('Deleting datalayer manifests')
    delete_pv(k8s_api=k8s_api)
    kube_command(filename='k8s-dashboard.yml', command='delete', log_level=log_level)
    kube_command(dirname='db', command='delete', log_level=log_level)
    kube_command(filename='datalayer.yml', command='delete', log_level=log_level)
    kube_command(dirname='airflow', command='delete', log_level=log_level)
    kube_command(dirname='spark', command='delete', log_level=log_level)

def cleanup():
    logger.info('Cleaning up bucket %s on datalayer S3' % bucket_name)
    try:
        bucket = s3_resource.Bucket(bucket_name)
    except:
        raise ValueError('Cannot retrieve bucket ' + bucket_name)
    bucket.objects.all().delete()

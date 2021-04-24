[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Datalayer DSP JupyterHub Helm Chart

## Minikube

```bash
kubectl config use-context minikube
kubectl config get-contexts && \
  kubectl config current-context
```

```
helm upgrade \
  --cleanup-on-fail \
  --install dsp-jupyterhub jupyterhub/jupyterhub \
  --namespace dsp-jupyterhub \
  --create-namespace \
  --timeout 5m \
  --version 0.11.1 \
  --values jupyterhub.yaml
```

```bash
helm ls -n dsp-jupyterhub
kubectl get pods -n dsp-jupyterhub
```

```bash
# Access.
open $(minikube service proxy-public --namespace dsp-jupyterhub)/api/jupyterhub
# open http://minikube.local/api/jupyterhub/hub/user-redirect
# open http://minikube.local
open http://minikube.local/api/jupyterhub
```

```bash
# Teardown.
helm delete dsp-jupyterhub -n dsp-jupyterhub
kubectl delete namespace dsp-jupyterhub
```

## Dummy Auth

```bash
echo """
proxy:
  secretToken: $(openssl rand -hex 32)
hub:
  baseUrl: '/api/jupyterhub'
  allowNamedServers: true
  config:
    Authenticator:
      allowed_users:
        - 'user1'
    DummyAuthenticator:
      password: '123'
#    HMACAuthenticator:
#      secretKey: '8207381c49ef0381ed8eeccdc8d980d4ed4e53f39637688dcbf66bc31238a86a'
    JupyterHub:
#      authenticator_class: hmac
#      authenticator_class: tmp
      authenticator_class: dummy
singleuser:
  image:
    name: jupyter/scipy-notebook
    tag: 3395de4db93a
  defaultUrl: '/lab'
  extraEnv:
    JUPYTERHUB_SINGLEUSER_APP: 'jupyter_server.serverapp.ServerApp'
ingress:
  enabled: true
#  pathSuffix: (/|$)(.*)
  hosts:
    - minikube.local
""" > ./jupyterhub.yaml
```

```python
# pip install jupyterhub-hmacauthenticator
import hashlib, hmac
username='eric'
secret_key_hex='8207381c49ef0381ed8eeccdc8d980d4ed4e53f39637688dcbf66bc31238a86a'
secret_key = bytearray.fromhex(secret_key_hex)
password = hmac.new(secret_key, username.encode('utf-8'), hashlib.sha512).hexdigest()
password
# 3c6a9c701468db1af65fb14eee09b13ecb2a54f8d32bd93c3e82e9e723271d03a2b9c7600c822a49f59d7d9e19406e1a0f26f2a606efa4a4f93fe38118c09898
```

## RTC

```bash
export GITHUB_OAUTH_CALLBACK_URL_DEV=http://minikube.local/api/jupyterhub/hub/oauth_callback
cat <<EOF > jupyterhub.yaml
proxy:
  secretToken: $(openssl rand -hex 32)
hub:
  baseUrl: /api/jupyterhub
  cookieSecret: $(openssl rand -hex 32)
  image:
    name: datalayer/dsp-jupyerhub-hub
    tag: 0.0.3
    pullPolicy: IfNotPresent
  config:
    JupyterHub:
      authenticator_class: github
    Authenticator:
      admin_users:
        - echarles
    GitHubOAuthenticator:
      client_id: ${GITHUB_CLIENT_ID_DEV}
      client_secret: ${GITHUB_CLIENT_SECRET_DEV}
      oauth_callback_url: ${GITHUB_OAUTH_CALLBACK_URL_DEV}
  allowNamedServers: true
  extraConfig:
    jupyterlab.py: |
      c.Spawner.default_url = '/lab'
      c.KubeSpawner.args = [
        '--LabApp.dev_mode=True',
        '--ServerProxy.servers={\'jupyter_rtc_proxy\':{\'port\':4321,\'command\':[\'node\',\'/jupyter/rtc/automerge/packages/server/src/AutomergeServer.js\'],\'absolute_url\':False}}',
      ]
      c.ServerApp.jpserver_extensions = {
        'jupyterlab': True,
        'jupyter_rtc': True,
        'jupyter_auth': True,
      }
      c.ServerApp.allow_origin = "*"
      c.ServerApp.token = ""
      c.ServerProxy.servers = {
        'jupyter_rtc_proxy': {
          'port': 4321,
          'command': ['node', '/jupyter/rtc/automerge/packages/server/src/AutomergeServer.js'],
          'absolute_url': False
        }
      }
singleuser:
  image:
    name: datalayer/sharebook-rtc
    tag: 0.0.3
  extraEnv:
    JUPYTERHUB_SINGLEUSER_APP: 'jupyter_server.serverapp.ServerApp'
ingress:
  enabled: true
  hosts:
    - minikube.local
cull:
  enabled: true
EOF
```

## PAM Auth

```bash
echo """
auth:
  type: custom
  custom:
    className: jupyterhub.auth.PAMAuthenticator
#    config:
#      create_system_users: true
""" > ./jupyterhub.yaml
```

## Single User

```bash
# export DOCKER_REPO=localhost:5000
export DOCKER_REPO=datalayer
echo """
hub:
  image:
    name: $DOCKER_REPO/jupyterhub
    tag: ${DLAVERSION}
  imagePullPolicy: Always
  extraEnv:
    JUPYTER_ENABLE_LAB: 1
  extraConfig: |
    c.KubeSpawner.cmd = [\"jupyter-labhub\"]
auth:
  admin:
    users:
      - adminuser1
      - adminuser2
proxy:
  secretToken: \"$(openssl rand -hex 32)\"
  chp:
    image:
      name: ${DOCKER_REPO}/jupyterhub-http-proxy
      tag: ${DLAVERSION}
    imagePullPolicy: Always
prePuller:
  hook:
    image:
      name: ${DOCKER_REPO}/jupyterhub-image-awaiter
      tag: ${DLAVERSION}
    imagePullPolicy: Always
singleuser:
  networkTools:
    image:
      name: ${DOCKER_REPO}/jupyterhub-network-tools
      tag: ${DLAVERSION}
    imagePullPolicy: Always
  defaultUrl: \"/lab\"
  image:
    name: ${DOCKER_REPO}/jupyterlab
    tag: ${DLAVERSION}
  imagePullPolicy: Always
  cpu:
    limit: .5
    guarantee: .5
  memory:
    limit: 200M
    guarantee: 200M
  lifecycleHooks:
    postStart:
      exec:
        command: [\"gitpuller\", \"https://github.com/data-8/materials-fa17\", \"master\", \"materials-fa\"]
  storage:
    capacity: 10Mi
cull:
  podCuller:
    image:
      name: ${DOCKER_REPO}/jupyterhub-pod-culler
      tag: ${DLAVERSION}
    imagePullPolicy: Always
""" > ./jupyterhub.yaml
```

## Config

```bash
echo """
proxy:
  secretToken: \"$(openssl rand -hex 32)\"
singleuser:
  defaultUrl: \"/lab\"
  image:
    name: jupyter/scipy-notebook
    tag: 1085ca054a5f
    pullPolicy: Always
  cpu:
    limit: .5
    guarantee: .5
  memory:
    limit: 1G
    guarantee: 1G
  storage:
    capacity: 1Gi
#     type: none
#     dynamic:
#       storageClass: <storageclass-name>
hub:
  extraEnv:
    JUPYTER_ENABLE_LAB: 1
#  extraConfig: |
#    c.KubeSpawner.cmd = [\"jupyter-labhub\"]
  imagePullPolicy: Always
cull:
  enabled: \"true\"
  users: \"true\"
auth:
  admin:
    users:
      - adminuser1
      - adminuser2
# rbac:
#    enabled: false
# lifecycleHooks:
#   postStart:
#     exec:
#       command: [\"gitpuller\", \"https://github.com/datalayer-contrib/data8-course-2017\", \"master\", \"materials-fa\"]
# ingress:
#   enabled: true
#   hosts:
#     - <hostname>
#   annotations:
#     kubernetes.io/tls-acme: "true"
#   tls:
#    - hosts:
#       - <hostname>
#      secretName: kubelego-tls-jupyterhub
""" > ./jupyterhub.yaml
```

## Config

```bash
echo """
proxy:
  secretToken: $(openssl rand -hex 32)
  service:
    type: NodePort
    nodePorts:
      http: 31212
  chp:
    resources:
      requests:
        memory: 0
        cpu: 0
hub:
  cookieSecret: $(openssl rand -hex 32)
  db:
    type: sqlite-memory
  resources:
    requests:
      memory: 0
      cpu: 0
  services:
    test:
      admin: true
      apiToken: $(openssl rand -hex 32)
singleuser:
  storage:
    type: none
  memory:
    guarantee: null
prePuller:
  hook:
    enabled: false
scheduling:
  userScheduler:
    enabled: true
debug:
  enabled: true
""" > ./jupyterhub.yaml
```

## Root

```bash
echo """
singleuser:
  cmd: start-jupyterlab-rtc.sh
  image:
    name: datalayer/jupyterlab-rtc
    tag: 0.1.0
  uid: 0
  extraEnv:
    GRANT_SUDO: "yes"
    NOTEBOOK_ARGS: "--allow-root"
    JUPYTERHUB_SINGLEUSER_APP: "jupyter_server.serverapp.ServerApp"
""" > ./jupyterhub.yaml
```

## AWS

```bash
echo """
proxy:
  secretToken: $(openssl rand -hex 32)
  https:
    enabled: true
    type: offload
    hosts:
      - HOSTNAME
  service:
    labels:
      dns: 'route53'
    targetPorts:
      http: tcp
#      https: ssl
    annotations:
      nginx.ingress.kubernetes.io/ssl-redirect: 'true'
      nginx.ingress.kubernetes.io/force-ssl-redirect: 'true'
      nginx.ingress.kubernetes.io/proxy-read-timeout: '3600'
      nginx.ingress.kubernetes.io/proxy-send-timeout: '3600'
#      service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:ap-northeast-2:AWS_ACCOUNT_ID:certificate/CERTIFICATE_ID
      service.beta.kubernetes.io/aws-load-balancer-backend-protocol: 'tcp'
#      service.beta.kubernetes.io/aws-load-balancer-ssl-ports: '443'
      service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout: '3600'
      domainName: 'HOSTNAME'
hub:
  extraConfig:
    jupyterlab: |
      c.Spawner.cmd = ['jupyter-labhub']
singleuser:
  image:
    name: jupyter/scipy-notebook
    tag: 82d1d0bf0867
  serviceAccountName: default
  cloudMetadata:
    enabled: true
  extraAnnotations:
    iam.amazonaws.com/role: kubeadm_role
  profileList:
    - display_name: 'Big Data environment.'
      description: 'If you want the additional bells and whistles'.
      image: datalayer/sparklab:0.0.1
      kubespawner_override:
#        service_account: 'default'
        cpu_limit: 3
        cpu_guarantee: 1
        mem_limit: '2G'
        mem_guarantee: '512M'
        extra_resource_limits: {}
    - display_name: 'Minimal environment.'
      description: 'To avoid too much bells and whistles: Python.'
      default: true
      kubespawner_override:
        image: jupyter/scipy-notebook:82d1d0bf0867
        lifecycle_hooks:
          postStart:
            exec:
              command:
                - "sh"
                - "-c"
                - >
                  gitpuller https://github.com/data-8/materials-fa17
auth:
  type: dummy
  dummy:
    password: 'p123'
  whitelist:
    users:
      - u123
ingress:
  enabled: 'true'
  annotations:
    kubernetes.io/ingress.class: nginx
  hosts:
  - HOSTNAME
""" > ./jupyterhub.yaml
```

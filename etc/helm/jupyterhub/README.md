[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# JupyterHub Helm Chart

```bash
echo """
proxy:
  secretToken: $(openssl rand -hex 32)
hub:
  extraConfig:
    jupyterlab: |
      c.Spawner.cmd = ['jupyter-labhub']
auth:
  type: dummy
  dummy:
    password: 'password'
  whitelist:
    users:
      - user1
""" > ./jupyterhub.yaml
```

```bash
echo """
proxy:
  secretToken: $(openssl rand -hex 32)
hub:
  extraConfig: |
    c.JupyterHub.allow_named_servers = True
    jupyterlab: |
      c.Spawner.cmd = ['jupyter-labhub']
auth:
  type: tmp
""" > ./jupyterhub.yaml
```

```bash
echo """
proxy:
  secretToken: $(openssl rand -hex 32)
hub:
  image:
    name: datalayer/jupyterhub-k8s
    tag: 0.0.3
  extraConfig:
    jupyterlab: |
      c.Spawner.cmd = ['jupyter-labhub']
auth:
  type: hmac
  hmac:
    secretKey: $(openssl rand -hex 32)
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

```bash
echo """
proxy:
  secretToken: $(openssl rand -hex 32)
hub:
  extraConfig:
    jupyterlab: |
      c.Spawner.cmd = ['jupyter-labhub']
auth:
  type: custom
  custom:
    className: jupyterhub.auth.PAMAuthenticator
#    config:
#      create_system_users: true
""" > ./jupyterhub.yaml
```

```bash
# export DOCKER_REPO=datalayer
export DOCKER_REPO=localhost:5000
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

```bash
echo """
proxy:
  secretToken: \"$(openssl rand -hex 32)\"
singleuser:
  defaultUrl: \"/lab\"
  image:
    name: jupyter/scipy-notebook
    tag: 1085ca054a5f
#    name: datalayer/jupyterlab-datalayer
#    tag: 0.0.3
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

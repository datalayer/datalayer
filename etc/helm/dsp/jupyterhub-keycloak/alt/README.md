# Helm Chart

## Setup Minikube

You need to use the Minikube Docker env.

> Do not forget to run all the following commands in one terminal.

```bash
eval $(minikube docker-env)
```

## Build the Docker Images

Build the needed AAP Docker Image, at least:

+ [hub-k8s](https://github.nk.com/AAP/docker/tree/master/hub-k8s).
+ [jupyterlab-dla](https://github.nk.com/AAP/docker/tree/master/jupyterlab-dla).

## Get the Helm Repo

```bash
helm repo add jupyterhub https://jupyterhub.github.io/helm-chart && \
  helm repo update
```

## Prepare the Helm Deployment

```bash
export RELEASE=hub
export NAMESPACE=hub
```

Create a `hub.yaml` (see next section for Deployment Examples) and deploy with Helm.

> Don't forget to change the `secretKey`.

```bash
echo """
proxy:
  secretToken: $(openssl rand -hex 32)
hub:
  image:
    name: datalayer/hub-k8s
    tag: 0.0.1
  extraConfig:
    jupyterlab: |
      c.Spawner.cmd = ['jupyter-labhub']
singleuser:
  image:
#    name: nk/jupyterlab-dla
#    tag: 0.0.1
    name: jupyterhub/k8s-singleuser-sample
    tag: 0.8.2
  lifecycleHooks:
    postStart:
      exec:
        command: [\"sh\", \"-C\", \"/datalayer/init.sh\"]
auth:
  type: hmac
  hmac:
    secretKey: 
""" > ./hub.yaml
```

## Deploy the Helm Chart

```bash
helm upgrade \
  --install $RELEASE \
  jupyterhub/jupyterhub \
  --namespace $NAMESPACE \
  --timeout 99999 \
  --version 0.8.2 \
  --values hub.yaml
```

## List your Deployment

```bash
# Check Helm Deployment.
helm ls
# Check K8S Deployment.
kubectl get pods -n $NAMESPACE
# hub-5474b656cf-22xp6     1/1     Running   0          2m39s
# proxy-6c766577b6-vqkxk   1/1     Running   0          2m39s
kubectl get svc -n $NAMESPACE
# hub            ClusterIP      10.111.230.197   <none>        8081/TCP                     2m43s
# proxy-api      ClusterIP      10.102.103.51    <none>        8001/TCP                     2m43s
# proxy-public   LoadBalancer   10.107.139.195   <pending>     80:30893/TCP,443:30125/TCP   2m43s
```

## Get your Password

Create password for users (use the `secretKey` you have used when creating the above deployment).

```bash
# Install HMAC Authenticator
pip install jupyterhub-hmacauthenticator
# Run Password script
python generate_password.py "<MY_USER_ID>"
```

## Whitelist your User

Whitelist your user ID: Go to docker > hub > userlist using your favourite text editor (e.g.)
`vim docker/hub/userlist` add `MY_USER_ID` in the list of users. Optionally, you can make your user admin by adding
admin: `MY_USER_ID admin`.

## Connect via Browser 

```bash
# open $(minikube -n $NAMESPACE service proxy-public --url)
minikube -n $NAMESPACE service proxy-public --url
```

Authenticate and use the notebook.

## [OPTIONAL] phpMyAdmin

Once connect on the notebook, you have a Brower URL which contains your username.

```
http://192.168.64.17:30374/user/eric/lab
```

To access phpMyAdmin, append `proxy/absolute/8097/phpmyadmin` after the username as your Browser URL, e.g.

```bash
http://192.168.64.17:30374/hub/user-redirect/proxy/absolute/8097/phpmyadmin/index.php
# or...
http://192.168.64.17:30374/user/eric/proxy/absolute/8097/phpmyadmin/index.php
```

## [OPTIONAL] Use the JupyterHub admin panel to add Users

> You must be an admin for this in docker > hub > userlist

Go the the control panel

Then navigate to "Admin"

Here you can add and remove users and even access their servers:

## Delete the Deployment

When you are done, delete your deployments.

```bash
# Delete Deployment.
helm delete $RELEASE --purge && \
  kubectl delete namespace $NAMESPACE
```

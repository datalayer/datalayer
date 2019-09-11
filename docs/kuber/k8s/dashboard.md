---
title: K8S Dashboard
---

# K8S Dashboard

To ease the management, install the standard `Kubernetes Dashboard`.

+ [Dashboard on Github](https://github.com/kubernetes/dashboard).
+ [Wiki](https://github.com/kubernetes/dashboard/wiki).
+ [Access Control](https://github.com/kubernetes/dashboard/wiki/Access-control).
+ [Access Control 1.7+](https://github.com/kubernetes/dashboard/wiki/Accessing-Dashboard---1.7.X-and-above).
+ [Web UI Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard).

## Install

**Option 1 - Enable Minikube Addon**

```bash
minikube addons enable dashboard
minikube addons list
kubectl get deploy --all-namespaces
kubectl get svc --all-namespaces
echo $(minikube service kubernetes-dashboard  -n kube-system --url)
dla minikube-dashboard
```

**Option 2 - Deploy a Spec with Auth Header Authentication**

```bash
# kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml
kubectl create -f $DLAHOME/etc/examples/k8s/k8s-dashboard/1.10.1/recommended/kubernetes-dashboard.yaml
kubectl proxy --port=8001
open http://localhost:8001/api/v1/namespakces/kube-system/services/http:kubernetes-dashboard:/proxy/#!/login
```

**Option 3 - Deploy a Spec with HTTPS**

```bash
kubectl create -f $DLAHOME/etc/examples/k8s/k8s-dashboard/1.8.3/_dla/k8s-dashboard-ssl.yaml
kubectl proxy
open http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/login
```

**Option 4 - Deploy a Spec with HTTP and Authorization Header**

```bash
kubectl create -f $DLAHOME/etc/examples/k8s/k8s-dashboard-auth-header.yaml
```

**Option 5 - Deploy a Helm Cahrt**

```bash
helm install k8s-dashboard \
  --namespace kube-system \
  --set=httpPort=3000,resources.limits.cpu=200m,rbac.create=true \
  -n stable/kubernetes-dashboard
```

## Access Control

**Option 1 - Get a Token to Authenticate**

```bash
kubectl get secret -n kube-system
kubectl describe secret default-token-lxh6p -n kube-system
```

```bash
openssl genrsa -out ca.key 2048
openssl req -x509 -new -nodes -key ca.key -subj "/CN=${COMMON_NAME}" -days 3650 -out ca.crt
kubectl create secret tls issuer-key --cert=ca.crt --key=ca.key --namespace default
kubectl create secret generic kubernetes-dashboard-certs --from-file=$HOME/certs -n kube-system
```

**Option 2 - Admin Privileges**

IMPORTANT: Make sure that you know what you are doing before proceeding.

Granting admin privileges to Dashboard's Service Account might be a security risk.

You can grant full admin privileges to Dashboard's Service Account by creating below ClusterRoleBinding.

Copy the YAML file based on chosen installation method and save as, i.e. dashboard-admin.yaml.

Use kubectl create -f dashboard-admin.yaml to deploy it. Afterwards you can use Skip option on login page to access Dashboard.

```bash
cat << EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: kubernetes-dashboard
  labels:
    k8s-app: kubernetes-dashboard
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: kubernetes-dashboard
  namespace: kube-system
EOF
```

```bash
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kube-system
EOF
```

```bash
cat << EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kube-system
EOF
```

<!--
```bash
kubectl create clusterrolebinding add-on-cluster-admin \
  --clusterrole=cluster-admin \
  --serviceaccount=kube-system:default
```
-->

```bash
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')
echo http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/.
kubectl proxy
# Copy the token and paste it into Enter token field on log in screen. 
```

**Option 3 - Anonymous Access** 

If you disabled insecure port and enabled `kube_api_anonymous_auth: true` and enabled webhooks. You can access dashboard with `masterip:6443/ui`.

```bash
kube_api_anonymous_auth: true
kubelet_authentication_token_webhook: true
kubelet_authorization_mode_webhook: true
```

## Access Dashboard

**Option 1 - Access via `minikube service`**

```bash
# IP=$(kubectl get svc -n kube-system kubernetes-dashboard -o jsonpath="{.spec.clusterIP}") # How to get the correct IP address?
# PORT=$(kubectl get svc -n kube-system kubernetes-dashboard -o jsonpath="{.spec.ports[0]['nodePort']}")
# open http://$IP:$PORT
open $(minikube service -n kube-system kubernetes-dashboard --url)
```

**Option 2 - Access via kubectl proxy**

```bash
kubectl proxy --port=8001
open http://localhost:8001/api/v1/namespaces/kube-system/services/http:kubernetes-dashboard:/proxy/#!/login
open http://localhost:8001/api/v1/namespaces/kube-system/services/http:kubernetes-dashboard:/proxy/#!/overview?namespace=default
```

**Option 3 - Access via kubectl port-forward**

```bash
export POD_NAME=$(kubectl get pods -n kube-system -l "app=kubernetes-dashboard,release=k8s-dashboard" -o jsonpath="{.items[0].metadata.name}")
echo http://127.0.0.1:9090
kubectl -n kube-system port-forward $POD_NAME 9090:9090
```

## Develop

```bash
cd $DLAHOME/repos/k8s-dashboard
echo http://localhost:9090
gulp serve
```

Compile:

+ Stylesheets are implemented with SASS and compiled to CSS with libsass.
+ JavaScript is implemented in ES6. It is compiled with Babel for development and the Google-Closure-Compiler for production.
+ Go is used for the implementation of the backend. The source code gets compiled into the single binary `dashboard`.

Run:

+ Frontend is served by BrowserSync. It enables features like live reloading when HTML/CSS/JS change and even synchronize scrolls, clicks and form inputs across multiple devices.
+ Backend is served by the `dashboard` binary.
+ File watchers listen for source code changes (CSS, JS, GO) and automatically recompile. All changes are instantly reflected, e.g. by automatic process restarts or browser refreshes. The build artifacts are created in a hidden folder (.tmp).
+ After successful execution of gulp local-up-cluster and gulp serve, the following processes should be running (respective ports are given in parentheses):

BrowserSync (9090) ---> Dashboard backend (9091) ---> Kubernetes API server (8080)

```bash
# Run Parameters
[ 
  '--heapster-host=',
  '--tls-cert-file=',
  '--tls-key-file=',
  '--auto-generate-certificates=false',
  '--insecure-port=9091',
  '--apiserver-host=http://localhost:8080'
]
```

Another way to connect to real cluster while developing dashboard is to override default values used by our build pipeline. In order to do that we have introduced two environment variables `KUBE_DASHBOARD_APISERVER_HOST` and `KUBE_DASHBOARD_KUBECONFIG` that will be used over default ones when defined.

```bash
export KUBE_DASHBOARD_APISERVER_HOST="http://<APISERVER_IP>:<APISERVER_PORT>"
# or
export KUBE_DASHBOARD_KUBECONFIG="<KUBECONFIG_FILE_PATH>"
```

NOTE: Environment variable KUBE_DASHBOARD_KUBECONFIG has higher priority than KUBE_DASHBOARD_APISERVER_HOST.

## Delete

```bash
kubectl -n kube-system delete $(kubectl -n kube-system get pod -o name | grep dashboard)
```
<!--
## Deprecated

```bash
kubectl create serviceaccount --namespace default default
kubectl create clusterrolebinding default-cluster-rule --clusterrole=cluster-admin --serviceaccount=default:default
kubectl patch deploy --namespace default kubernetes-dashboard-kubernetes-dashboard -p '{"spec":{"template":{"spec":{"serviceAccount":"default"}}}}'
kubectl apply -f k8s/dashboard-ctl.yaml
kubectl apply -f k8s/dashboard-svc.yaml
kubectl apply -f k8s/dashboard-auth.yaml
kubectl describe rc kubernetes-dashboard --namespace=kube-system
```

```bash
# appname: "dla-nginx-dash", Container image: "nginx:stable-alpine" , Number of pods: 1, Service: none
# running pod in the name like "dla-nginx-dash-786442954-w20fj" -> Click on it and et its IP address (Node: IP: 10.192.3.3) and its node (Node: kube-node-2)
# point your browser to http://localhost
# you should also visit the "View logs" and check that you see some traffic.
# if you do not reach the nginx frontpage, login on the kube-master, and then run "curl http://10.192.3.3"
```

```bash
# Edit kubernetes-dashboard service.
kubectl -n kube-system edit service kubernetes-dashboard
# You should see yaml representation of the service. Change type: ClusterIP to type: NodePort and save file. If it's already changed go to next step.
# Please edit the object below. Lines beginning with a '#' will be ignored, and an empty file will abort the edit.
# If an error occurs while saving this file will be reopened with the relevant failures.
apiVersion: v1
...
  name: kubernetes-dashboard
  namespace: kube-system
  resourceVersion: "343478"
  selfLink: /api/v1/namespaces/kube-system/services/kubernetes-dashboard-head
  uid: 8e48f478-993d-11e7-87e0-901b0e532516
spec:
  clusterIP: 10.100.124.90
  externalTrafficPolicy: Cluster
  ports:
  - port: 443
    protocol: TCP
    targetPort: 8443
  selector:
    k8s-app: kubernetes-dashboard
  sessionAffinity: None
  type: ClusterIP
status:
  loadBalancer: {}
# Next we need to check port on which Dashboard was exposed.
kubectl -n kube-system get service kubernetes-dashboard
# NAME                   CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
# kubernetes-dashboard   10.100.124.90   <nodes>       443:31707/TCP   21h
# Dashboard has been exposed on port 31707 (HTTPS). Now you can access it from your browser at: https://<master-ip>:31707.
# master-ip can be found by executing kubectl cluster-info.
# Usually it is either 127.0.0.1 or IP of your machine, assuming that your cluster is running directly on the machine, on which these commands are executed.
# In case you are trying to expose Dashboard using NodePort on a multi-node cluster, then you have to find out IP of the node on which Dashboard is running to access it.
# Instead of accessing https://<master-ip>:<nodePort> you should access https://<node-ip>:<nodePort>.
```
-->

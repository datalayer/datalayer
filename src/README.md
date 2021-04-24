[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Datalayer Source Code

🔴 🔥 ✅ This folder contains the source code for the `Datalayer Science Platform` (DSP).

Datalayer provides services hosted on [Kubernetes](https://kubernetes.io) container orchestration that makes up the `Datalayer Science Platform`.

## Development Environment

Create your development environement with the needecondd external dependencies.

```bash
# Create the datalayer development conda environment.
cd $DLAHOME/src && \
  conda deactivate && \
  make env-rm && \
  make env && \
  conda activate datalayer && \
  make env-dev
```

Build both endpoints and UI.

```bash
# Clean, install and build the endpoints and the UI.
cd $DLAHOME/src && \
  make clean && \
  make install && \
  make build
```

You can build the endpoints and the UI separately.

```bash
# Clean and build endpoints.
cd $DLAHOME/src && \
  make dsp-endpoints-clean && \
  make dsp-endpoints-build
# Clean, install the dependencies and build UI.
cd $DLAHOME/src && \
  make ui-clean && \
  make ui-deps && \
  make ui-build
```

## Setup Minikube

```bash
# Install minikube, kubectl and helm.
dla minikube-rm && \
  dla minikube-install && \
  dla kubectl-install && \
  dla helm-install
```

```bash
# Start minikube.
dla minikube-start && \
  kubectl config get-contexts && \
  kubectl config current-context && \
  kubectl config use-context minikube && \
  kubectl config current-context
```

```bash
# Configure /etc/hosts file.
# This is needed if you want to invoke the minikube services from your local environment.
echo "127.0.0.1 dsp-solr-zookeeper-0.dsp-solr-zookeeper-headless.dsp-solr dsp-solr-0.dsp-solr-headless.dsp-solr dsp-solr-1.dsp-solr-headless.dsp-solr dsp-solr-zookeeper-headless local.dsp-minio-hl.dsp-minio.svc.cluster.local minio.dsp-minio.svc.cluster.local" | sudo tee -a /etc/hosts
echo "$(minikube ip) minikube.local ldapadmin.minikube.local dsp-keycloak-http.dsp-keycloak.svc.cluster.local" | sudo tee -a /etc/hosts
cat /etc/hosts
```

```bash
# Build Docker images.
dla dsp-docker-build
eval $(minikube docker-env) && \
  dla dsp-docker-build
```

```bash
# Deploy helm and build the helm charts.
dla helm-deploy && \
  dla dsp-helm-build && \
  dla helm-status
```

## DSP Minikube Services

The development services are deployed can be deployed on [Minikube](https://github.com/kubernetes/minikube) with [Helm charts](https://github.com/datalayer/datalayer/tree/main/etc/helm).

```bash
# Deploy k8s dashboard service.
dla dsp-up minikube k8s-dashboard
# Give some more role to k8s-dashboard-kubernetes-dashboard.
cat <<EOF | kubectl create -f -
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: k8s-dashboard
  labels:
    k8s-app: k8s-dashboard
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: k8s-dashboard-kubernetes-dashboard
  namespace: kube-system
EOF
# Browse k8s dashboard.
# open https://localhost:8443
dla k8s-dashboard
```

```bash
# Deploy k8s cert-manager service.
```

```bash
# Deploy k8s ingress service.
```

```bash
# Deploy dsp vault service.
dla dsp-up minikube dsp-vault
```

```bash
# Deploy dsp config service.
dla dsp-up minikube dsp-config
```

```bash
# Deploy observe service.
# dla dsp-up minikube dsp-k8s-metrics
# dla dsp-up minikube dsp-prometheus
```

```bash
# Deploy dsp operator service.
kubectl apply -f $DLAHOME/etc/k8s/operator
kubectl exec dsp-operator -c shell -i -t -n dsp-operator -- bash
curl -s localhost:9876/info
{"host": "localhost:9876", "version": "0.5.0", "from": "127.0.0.1"}
kubectl delete -f $DLAHOME/etc/k8s/operator
#
kubectl run nginx --image=nginx --port=8080
kubectl run -it echoserver2 --image-pull-policy=IfNotPresent --image=gcr.io/google_containers/echoserver:1.10 --restart=Never -- bash
#
kubectl run -it busybox --image=busybox --restart=Never -- sh
#
kubectl run --restart=Never --image=gcr.io/kuar-demo/kuard-amd64:1 kuard
echo http://localhost:8080
kubectl port-forward kuard 8080:8080
fcurl localhost:8080
#
kubectl get pods
kubectl get pods -o wide
kubectl get pods -o yaml
kubectl get pods --all-namespaces
kubectl get deployments
```

```bash
# Deploy dsp operator service.
# dla dsp-up minikube dsp-operator
```

```bash
# Deploy dsp velero service.
# dla dsp-up minikube dsp-velero
```

```bash
# Deploy dsp simple service.
dla dsp-up minikube dsp-simple
dla helm-ls
# View k8s resources.
kubectl get pods -n dsp-simple
kubectl get secrets -n dsp-simple
kubectl describe secrets -n dsp-simple simple-secret
kubectl get secret -n dsp-simple simple-secret -o jsonpath="{.data.password}" | base64 --decode
# Open simple service - Go to /info or /env or /health or /endpoint0
open $(minikube service -n dsp-simple simple-svc --url)/info
open $(minikube service -n dsp-simple simple-svc --url)/env
open $(minikube service -n dsp-simple simple-svc --url)/health
open $(minikube service -n dsp-simple simple-svc --url)/endpoint0
minikube service simple-svc-echo -n dsp-simple
minikube service simple-svc-echo-2 -n dsp-simple
# Shell into a Pod.
export POD_NAME=$(kubectl get pods --namespace dsp-simple -l "app=simple" -o jsonpath="{ .items[0].metadata.name }") && \
  kubectl exec -n dsp-simple -it $POD_NAME -- /bin/bash
curl simple-svc-echo-2.dsp-simple.svc.cluster.local:8080
curl simple-svc-echo.dsp-simple.svc.cluster.local:5678
curl simple-svc.dsp-simple.svc.cluster.local:9876
# View mounted secret.
POD_NAME=$(kubectl get pods -n dsp-simple -l "app=simple-echo-2" -o jsonpath="{.items[0].metadata.name}") && \
  echo $POD_NAME && \
  kubectl exec $POD_NAME -n dsp-simple -i -t -- echo $DSP_LDAP_BIND_PWD
# Access via Port-Forward.
export POD_NAME=$(kubectl get pods -n dsp-simple -l "app=simple" -o jsonpath="{ .items[0].metadata.name }") && \
  echo "Visit http://localhost:8080/info to access the simple service" && \
  kubectl port-forward -n dsp-simple $POD_NAME 8080:9876
# Access via ClusterIP.
CLUSTER_IP=$(kubectl get svc/simple-svc -n dsp-simple -o custom-columns=IP:spec.clusterIP --no-headers=true)
echo "Visit http://$CLUSTER_IP:???/info"
# Access via NodePort.
export NODE_PORT=$(kubectl get -n dsp-simple -o jsonpath="{.spec.ports[0].nodePort}" services simple-svc) && \
  export NODE_IP=$(kubectl get nodes -n dsp-simple -o jsonpath="{.items[0].status.addresses[0].address}") && \
  URL=http://$NODE_IP:$NODE_PORT/info && \
  echo $URL && \
  open $URL
# Access via Ingress.
open http://minikube.local/info
open http://minikube.local/env
open http://minikube.local/health
open http://minikube.local/endpoint0
# Tear down.
dla dsp-down dsp-simple
```

```bash
# Deploy dsp kuber service.
# dla dsp-up minikube dsp-kuber
# Check kuber service.
# open $(minikube service dsp-kuber-kuber-svc -n dsp-kuber --url)/api/kuber/version
# minikube service dsp-kuber-kuber-svc -n dsp-kuber
# open http://minikube.local/api/kuber/version
```

```bash
# Deploy dsp solr service.
dla dsp-up minikube dsp-solr
# Initialize solr service.
## Shell 1 - Proxy solr and zookeeper.
cd $DLAHOME/src && \
  make port-forward
## Shell 2 - Initialise solr.
dla dsp-solr-init
## Check the datalayer collection.
open http://localhost:8983/solr/#/datalayer/collection-overview
## Test with python.
python <<EOF
import pysolr
collection = 'datalayer'
zookeeper = pysolr.ZooKeeper("dsp-solr-zookeeper-0.dsp-solr-zookeeper-headless.dsp-solr:2181")
solr = pysolr.SolrCloud(zookeeper, collection, always_commit=True)
solr.ping()
solr.add([{
  "id": "1",
  "title": "For Hire",
  "tags": ["professional", "jobs"],
  "posts": [{
    "id": "2",
    "title": "Search Engineer",
    "comments": [
      {
        "id": "3",
        "content_t": "I am interested"
      },
      {
        "id": "4",
        "content_t": "How large is the team?"
      }
    ]},
    {
      "id": "5",
      "title": "Medium level Engineer"
    }
  ]
}], commit = True )
for result in solr.search('title:*'): print(result)

solr.delete(id='1')
EOF
```

```bash
# Deploy dsp minio service.
dla dsp-up minikube dsp-minio
kubectl minio tenant \
  create dsp-minio \
  --servers 1 \
  --volumes 4 \
  --capacity 4Mi \
  --namespace dsp-minio \
  --storage-class standard
# Update DSP_MINIO_SECRET_KEY in ~/.datalayer/dlarc
kubectl get tenants -n dsp-minio -w
# dla dsp-ls
# MinIO Browser.
kubectl port-forward svc/minio 9000:443 -n dsp-minio
open https://minio.dsp-minio.svc.cluster.local:9000/minio
# MinIO Operator Console.
kubectl port-forward svc/dsp-minio-console 9090:9443 -n dsp-minio
open https://minio.dsp-minio.svc.cluster.local:9090/minio
# MinIO Operator Console (with kubectl proxy).
kubectl minio proxy
open http://localhost:9090
open http://minio.dsp-minio.svc.cluster.local:9090/login
# Get the JWT for logging in to the console.
kubectl get secret $(kubectl get serviceaccount console-sa --namespace minio-operator -o jsonpath="{.secrets[0].name}") \
  --namespace minio-operator \
  -o jsonpath="{.data.token}" | base64 --decode && echo
# Operator Console URL.
kubectl --namespace minio-operator port-forward svc/console 9090:9090
open http://localhost:9090
```

```bash
# Deploy dsp ldap service.
dla dsp-up minikube dsp-ldap
# Initialize ldap service.
# Shell 1.
$DLAHOME/src/dev/port-forward-dsp-ldap.sh
# Shell 2.
dla dsp-ldap-add $DLAHOME/etc/seed/ldap/ldap-seed-example.ldif
ldapsearch -x -H ldap://$DSP_LDAP_HOST:$DSP_LDAP_PORT -b dc=datalayer,dc=io -D $DSP_LDAP_BIND -w $DSP_LDAP_BIND_PWD -z 3000
```

```bash
# Deploy dsp ldapadmin service.
dla dsp-up minikube dsp-ldapadmin
open http://ldapadmin.minikube.local
```

```bash
# Deploy dsp keycloak service.
dla dsp-up minikube dsp-keycloak
export POD_NAME=$(kubectl get pods --namespace dsp-keycloak -l "app.kubernetes.io/name=keycloak,app.kubernetes.io/instance=dsp-keycloak" -o name) && \
  echo "Visit http://localhost:8080 to use your application" && \
  kubectl --namespace dsp-keycloak port-forward "$POD_NAME" 8080
open http://localhost:8080
# minikube service dsp-keycloak-http -n dsp-keycloak
open http://dsp-keycloak-http.dsp-keycloak.svc.cluster.local/auth/ # admin/...
# Follow the printed steps to initialize Keycloak.
dla dsp-keycloak-init
# Check Authentication.
open http://dsp-keycloak-http.dsp-keycloak.svc.cluster.local/auth/realms/datalayer/account # charlie/123
```

```bash
# Deploy dsp jupyterhub service.
dla dsp-up minikube dsp-jupyterhub
dla dsp-ls
open $(minikube service proxy-public --namespace dsp-jupyterhub --url)/api/jupyterhub
open http://minikube.local/api/jupyterhub
```

```bash
# Deploy dsp jupyterpool service.
dla dsp-up minikube dsp-jupyterpool
dla dsp-ls
open $(minikube service dsp-jupyterpool-jupyterpool-svc --namespace dsp-jupyterpool --url)/api/jupyterpool
open http://minikube.local/api/jupyterpool
```

```bash
# Deploy dsp library service.
dla dsp-up minikube dsp-library
dla dsp-ls
open $(minikube service dsp-library-library-svc -n dsp-library --url)/api/library/version
open http://minikube.local/api/library/version
```

```bash
# Deploy dsp auth service.
dla dsp-up minikube dsp-auth
dla dsp-ls
open $(minikube service dsp-auth-auth-svc -n dsp-auth --url)/api/auth/version
open http://minikube.local/api/auth/version
```

```bash
# Deploy dsp studio service.
dla dsp-up minikube dsp-studio
dla dsp-ls
open $(minikube service dsp-studio-studio-svc -n dsp-studio --url)/api/studio/version
open http://minikube.local/api/studio/version
```

## DLA Minikube Services

```bash
# Deploy dla landing service.
dla dsp-up minikube dla-landing
dla dsp-ls
open $(minikube service dla-landing-landing-svc -n dla-landing --url)
open $(minikube service dla-landing-landing-svc -n dla-landing --url)/api/landing/version
open http://minikube.local
open http://minikube.local/api/landing/version
```

## Teardown Minikube Services

```bash
# Ensure that development services that you will run locally are not running on minikube.
dla dsp-down dla-landing,dsp-auth,dsp-jupyterhub,dsp-kuber,dsp-library,dsp-studio
# Teardown all the services.
dla dsp-down dla-landing,dsp-auth,dsp-jupyterhub,k8s-dashboard,dsp-keycloak,dsp-kuber,dsp-ldap,dsp-ldapadmin,dsp-library,dsp-minio,dsp-solr,dsp-studio
```

## Port Forward Minikube Services

```bash
# The [dev](./dev) folder contains useful scripts for your development environment.
# Forward Ports.
# open https://localhost:8443            # K8S Dashboard
# open http://localhost:8983/solr        # Solr
cd $DLAHOME/src && \
  make port-forward
```

## Endpoints

The Datalayer platform provides REST service endpoints.

| | Endpoint                      | Description |
|-|-------------------------------|-------------|
|🔴| /api/auth/...                 | ... |
|🔴| /api/jupyterpool/...         | ... |
|🔴| /api/kuber/...               | ... |
|🔴| /api/landing/...             | ... |
|🔴| /api/library/...             | ... |
|🔴| /api/studio/...              | ... |

## Storybook

```bash
# dsp storybook.
# open http://localhost:9009
cd $DLAHOME/src && \
  yarn storybook
```

The Datalayer platform provides UI (User Interfaces) built as `React.js` components.

| | UI Component |
|-|--------------|
|🔴| Card |
|🔴| Contact |
|🔴| Features |
|🔴| Footer |
|🔴| Form |
|🔴| Header |
|🔴| Landing |
|🔴| Layout |
|🔴| Overview |
|🔴| PreFooter |
|🔴| Pricing |
|🔴| Product |
|🔴| Profile |
|🔴| SignIn |
|🔴| SignUp |
|🔴| Table |
|🔴| Team |

## Examples

```bash
# [examples](./src/examples) to get used to the DSP architecture. 
# open http://localhost:3101             # Simple Example
# open http://localhost:3101/hello       # Extension Example 1
# open http://localhost:3101/test        # Extension Example 1
# open http://localhost:3002/api/widgets # Widgets
# open http://localhost:3009             # Utils
cd $DLAHOME/src && \
  yarn example:dsp:simple
```

```bash
# open http://localhost:3001             # Extension Example 1
# open http://localhost:3002             # Extension Example 2
# open http://localhost:3000             # JSON Server
# open http://localhost:4000             # GraphQL
cd $DLAHOME/src && \
  yarn example:dsp:extension
```

## DSP UI

```bash
# dsp utils.
# open http://localhost:3009             # Utils
cd $DLAHOME/src/dsp/utils && \
  yarn start
```

```bash
# dsp widgets.
# open http://localhost:3002/api/widgets # Widgets
cd $DLAHOME/src/dsp/widgets && \
  yarn start
```

```bash
# dsp auth.
# open http://localhost:3001                     # AUTH
# open http://localhost:3001/home                # AUTH
# open http://localhost:3001/me                  # AUTH
# open http://localhost:3001/login               # AUTH
# open http://localhost:9700/api/auth            # AUTH Server
# open http://localhost:9700/api/auth/version     # AUTH Server
# open http://localhost:3002/api/widgets         # Widgets
# open http://localhost:3009                     # Utils
cd $DLAHOME/src && \
  yarn start:dsp-auth
```

```bash
# dsp studio.
# open http://localhost:3003/api/studio          # Studio
# open http://localhost:3003/api/studio/app      # Studio App
# open http://localhost:3003/api/studio/example  # Studio Example
# open http://localhost:3003/api/studio/sections # Studio Sections
# open http://localhost:9600/api/studio          # Studio Server
# open http://localhost:9600/api/studio/version  # Studio Server
# open http://localhost:3001/api/auth            # AUTH
# open http://localhost:3001/api/auth/home        # AUTH
# open http://localhost:3001/api/auth/me          # AUTH
# open http://localhost:3001/api/auth/auth        # AUTH
# open http://localhost:3002/api/widgets         # Widgets
# open http://localhost:3009                     # Utils
cd $DLAHOME/src && \
  yarn start:dsp-studio
```

```bash
# dsp.
# Start local endpoints, these will run on your `local` environment, aka `dev` mode, outside of minikube.
# open http://localhost:3003/api/studio          # Studio
# open http://localhost:3003/api/studio/app      # Studio App
# open http://localhost:3003/api/studio/example  # Studio Example
# open http://localhost:3003/api/studio/sections # Studio Sections
# open http://localhost:9600/api/studio          # Studio Server
# open http://localhost:9600/api/studio/version  # Studio Server
# open http://localhost:3001/api/auth            # AUTH
# open http://localhost:3001/api/auth/home        # AUTH
# open http://localhost:3001/api/auth/me          # AUTH
# open http://localhost:3001/api/auth/auth        # AUTH
# open http://localhost:3002/api/widgets         # Widgets
# open http://localhost:3009                     # Utils
cd $DLAHOME/src && \
  yarn start:dsp
```

## Landing UI

```bash
# dla landing.
# open http://localhost:3004                      # Landing
# open http://localhost:3004/api/landing          # Landing
# open http://localhost:3004/api/landing/app      # Landing App
# open http://localhost:3004/api/landing/example  # Landing Example
# open http://localhost:3004/api/landing/sections # Landing Sections
# open http://localhost:9500/api/landing          # Landing Server
# open http://localhost:9500/api/landing/version  # Landing Server
# open http://localhost:3001/api/auth             # AUTH
# open http://localhost:3001/api/auth/home         # AUTH
# open http://localhost:3001/api/auth/me           # AUTH
# open http://localhost:3001/api/auth/auth         # AUTH
# open http://localhost:3002/api/widgets          # Widgets
# open http://localhost:3009                      # Utils
cd $DLAHOME/src && \
  yarn start:dla-landing
```

## UI Routes

The exposed routes are listed here.

| | UI Route                       | Description | Example  |
|-|--------------------------------|-------------|----------|
|🔴| /                             | Landing page with top stories accessible in tabs (per tag), features and price | https://datalayer.io |
|🔴| /tag/[id]                     | Story and dataset cards having the given tag id | https://datalayer.io/tag/regression |
|🔴| /signup                       | Registration form with a token| https://datalayer.io/signup |
|🔴| /signin                       | Login form | https://datalayer.io/signin |
|🔴| /profile                      | User private profile page | https://datalayer.io/profile |
|🔴| /profile/edit                 | User private profile page in edit mode | https://datalayer.io/profile/edit |
|🔴| /search?q=[query]             | Story cards search result | https://datalayer.io/search?q=regression |
|🔴| /[user]                       | User page with stories and datasets cards | https://datalayer.io/eric |
|🔴| /[user]/dataset/[id]          | Dataset page in view mode | https://datalayer.io/eric/dataset/brussels-jam-2020 |
|🔴| /[user]/dataset/[id]/edit     | Dataset page in edit mode | https://datalayer.io/eric/dataset/brussels-jam-2020/edit |
|🔴| /[user]/dataset/[id]/preview  | Dataset page in preview mode | https://datalayer.io/eric/dataset/brussels-jam-2020/preview |
|🔴| /[user]/project/[id]          | Project page in view mode | https://datalayer.io/eric/dataset/brussels-jam-2020 |
|🔴| /[user]/project/[id]/edit     | Project page in edit mode | https://datalayer.io/eric/dataset/brussels-jam-2020/edit |
|🔴| /[user]/project/[id]/preview  | Project page in preview mode | https://datalayer.io/eric/dataset/brussels-jam-2020/preview |
|🔴| /[user]/paper/[id]            | Paper page in view mode | https://datalayer.io/eric/paper/is-brussels-traffic-really-jamed |
|🔴| /[user]/paper/[id]/edit       | Paper page in edit mode | https://datalayer.io/eric/paper/is-brussels-traffic-really-jamed/edit |
|🔴| /[user]/paper/[id]/preview    | Paper page in preview mode | https://datalayer.io/eric/paper/is-brussels-traffic-really-jamed/edit |

## Deploy Distribution

```bash
$DLAHOME/src/dev/dist-make.sh
$DLAHOME/src/dev/dist-serve.sh
```

```bash
DLA_DOCKER_REPO=datalayer dla dsp-docker-build
DLA_DOCKER_REPO=datalayer dla dsp-docker-push
```

```bash
DLA_DOCKER_REPO=gcr.io/datalayer-dev-1 dla dsp-docker-build
DLA_DOCKER_REPO=gcr.io/datalayer-dev-1 dla dsp-docker-push
```

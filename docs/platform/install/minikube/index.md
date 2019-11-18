---
title: Install on Kubernetes
---

# Install on Minikube

Datalayer is available with services that makes up the `Datalayer Science Platform`.

The services are deployed in the Kubernetes Cluster via [Helm charts](https://github.com/datalayer/datalayer/tree/master/etc/helm).

## Start Minikube

```bash
dla minikube-start
```

## Configure Host File

```bash
sudo echo "127.0.0.1 dla-solr-zookeeper dla-solr-0.dla-solr-headless"  | sudo tee -a /etc/hosts
sudo echo "$(minikube ip) minikube.datalayer.io.local ldapadmin.minikube.datalayer.io.local dla-keycloak-http.dla-iam.svc.cluster.local"  | sudo tee -a /etc/hosts
cat /etc/hosts
```

## Build the Docker Images

```bash
eval $(minikube docker-env) && \
  dla dsp-docker-build
```

## Prepare Helm

```bash
# Deploy the Helm Tiller Pod.
dla helm-deploy && \
  sleep 30s && \
  dla helm-status
# Build the Helm Charts.
dla dsp-helm-build
```

## Deploy Instrument Services

```bash
# Deploy K8S Dashboard service.
dla dsp-up k8s-dashboard
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
# Browse K8S Dashboard.
dla k8s-dashboard
```

```bash
# Deploy Kuber service.
dla dsp-up kuber
# Check Kuber service.
open http://minikube.datalayer.io.local/kuber/about/kuber.html
```

```bash
# Deploy Velero service.
# dla dsp-up velero
```

## Deploy Observe Services

```bash
# Deploy the Observation services.
# dla dsp-up k8s-metrics,prometheus
```

## Deploy Library Services

```bash
# Deploy Solr service.
dla dsp-up solr
```

Initialize Solr service.

```bash
# Shell 1.
$DLAHOME/src/dev/port-forward-solr.sh
# Shell 2.
$DLAHOME/src/dev/port-forward-zookeeper.sh
# Shell 3.
dla dsp-solr-init
open http://127.0.0.1:8983/solr/#/datalayer/collection-overview
```

```bash
# Deploy Library service.
dla dsp-up library
open http://minikube.datalayer.io.local/library
```

## Deploy IAM Services

```bash
# Deploy LDAP Services.
dla dsp-up ldap,ldapadmin
```

Initialize LDAP service.

```bash
# Shell 1.
$DLAHOME/src/dev/port-forward-ldap.sh
# Shell 2.
dla dsp-ldap-init
```

```bash
# Deploy Keycloak service.
dla dsp-up keycloak
```

```bash
# Follow the steps to initialize Keycloak.
dla dsp-keycloak-init
# Check Authentication.
open http://dla-keycloak-http.dla-iam.svc.cluster.local/auth/realms/datalayer/account # eric/123
```

```bash
# Deploy IAM service.
dla dsp-up iam
open http://minikube.datalayer.io.local/iam
```

```bash
# Deploy Vault service.
# dla dsp-up vault
```

## Deploy JupyterHub Services

```bash
# Deploy the JupyterHub service.
dla dsp-up jupyterhub
open http://minikube.datalayer.io.local/jupyterhub
```

## Deploy UI Services

```bash
# Deploy the Studio service.
dla dsp-up explorer
open http://minikube.datalayer.io.local
```

## Tear Down the Services

```bash
dla dsp-down explorer,jupyterhub,library,solr,iam,keycloak,ldapadmin,ldap,kuber,k8s-dashboard
```
<!--
```bash
# Deploy HDFS service.
dla dsp-up hdfs
```

```bash
# Deploy HBase service.
dla dsp-up hbase
```

```bash
# Deploy IPFS service.
dla dsp-up ipfs
```

```bash
# Deploy Etcd Services.
dla dsp-up etcd
```

```bash
# Deploy the Kafka Services.
dla dsp-up kafka
```

```bash
# Deploy Spark Services.
dla dsp-up spark
```

```bash
# Deploy the Kernels Services.
dla dsp-up kernels
```

```bash
# Deploy the Binder service.
dla dsp-up binder
```
-->

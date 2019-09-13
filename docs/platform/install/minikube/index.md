---
title: Install on Kubernetes 
---

# Install on Minikube

Datalayer is available with services that makes up the `Datalayer Science Platform`.

The services are deployed in the Kubernetes Cluster via [Helm charts](https://github.com/datalayer/datalayer/tree/master/etc/helm).

## Configure /etc/hosts

```bash
echo "127.0.0.1 dla-solr-zookeeper dla-solr-0.dla-solr-headless"  | sudo tee -a /etc/hosts
echo "$(minikube ip) minikube.datalayer.io.local ldapadmin.minikube.datalayer.io.local dla-keycloak-http.dla-iam.svc.cluster.local "  | sudo tee -a /etc/hosts
```

## Build the Docker Images

```bash
eval $(minikube docker-env)
dla dsp-docker-build
```

## Deploy the Helm Tiller Server

```bash
dla helm-deploy
```

## Build the Helm Charts

```bash
dla dsp-helm-build
```

## Deploy the Services

### Instrument Services

```bash
# Deploy K8S Dashboard service.
dla dsp-k8s-up k8s-dashboard
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
dla dsp-k8s-up kuber
# Check Kuber.
open http://minikube.datalayer.io.local/kuber/about/kuber.html
```

```bash
# Deploy Velero service.
# dla dsp-k8s-up velero
```

### IAM Services

```bash
# Deploy LDAP services.
dla dsp-k8s-up ldap,ldapadmin
```

```bash
# Initialize LDAP.
export POD_NAME=$(kubectl get pods --namespace dla-iam -l "app=openldap" -o jsonpath="{ .items[0].metadata.name }")
sudo kubectl port-forward -n dla-iam $POD_NAME 389:389
dla dsp-ldap-init
```

```bash
# Deploy Keycloak service.
dla dsp-k8s-up keycloak
```

```bash
# Initialize Keycloak.
dla dsp-keycloak-init
# Check Authentication.
open http://dla-keycloak-http.dla-iam.svc.cluster.local/auth/realms/datalayer/account # eric/123
```

```bash
# Deploy IAM Service.
dla dsp-k8s-up iam
open http://minikube.datalayer.io.local/iam
# dla dsp-k8s-up vault
```

### Observe Services

```bash
# Deploy the Observation services.
# dla dsp-k8s-up k8s-metrics,prometheus
```

### Library Services

```bash
# Deploy Solr Service.
dla dsp-k8s-up solr
```

```bash
# Initialize Solr.
export SOLR_POD_NAME=$(kubectl get pods -n dla-library -l "app.kubernetes.io/name=solr,app.kubernetes.io/component=server" -o jsonpath="{ .items[0].metadata.name }")
echo http://127.0.0.1:8983
kubectl port-forward -n dla-library $SOLR_POD_NAME 8983:8983
export ZK_POD_NAME=$(kubectl get pods -n dla-library -l "app=zookeeper,component=server" -o jsonpath="{ .items[0].metadata.name }")
kubectl port-forward -n dla-library $ZK_POD_NAME 2181:2181
dla dsp-solr-init
```

```bash
# Deploy Library Service.
dla dsp-k8s-up library
open http://minikube.datalayer.io.local/library
```

### JupyterHub Services

```bash
# Deploy the JupyterHub service.
dla dsp-k8s-up jupyterhub
open http://minikube.datalayer.io.local/jupyterhub
```

### UI Services

```bash
# Deploy the Studio services.
dla dsp-k8s-up studio
open http://minikube.datalayer.io.local
```

## Remove the Services

```bash
dla dsp-k8s-down studio,jupyterhub,library,solr,iam,keycloak,ldapadmin,ldap,kuber,k8s-dashboard
```
<!--
```bash
# Deploy HDFS service.
dla dsp-k8s-up hdfs
```

```bash
# Deploy HBase service.
dla dsp-k8s-up hbase
```

```bash
# Deploy IPFS service.
dla dsp-k8s-up ipfs
```

```bash
# Deploy Etcd services.
dla dsp-k8s-up etcd
```

```bash
# Deploy the Kafka services.
dla dsp-k8s-up kafka
```

```bash
# Deploy Spark services.
dla dsp-k8s-up spark
```

```bash
# Deploy the Kernels services.
dla dsp-k8s-up kernels
```

```bash
# Deploy the Binder service.
dla dsp-k8s-up binder
```
-->

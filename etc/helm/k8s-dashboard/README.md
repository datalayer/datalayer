# Kubernetes Dashboard

[Kubernetes Dashboard](https://github.com/kubernetes/dashboard) is a general purpose, web-based UI for Kubernetes clusters. It allows users to manage applications running in the cluster and troubleshoot them, as well as manage the cluster itself.

+ https://github.com/helm/charts/tree/master/stable/kubernetes-dashboard

```bash
export RELEASE=k8s-dashboard
export NAMESPACE=kube-system
helm upgrade \
  --install $RELEASE \
  stable/kubernetes-dashboard \
  --namespace $NAMESPACE \
  --timeout 99999 \
  --set rbac.clusterAdminRole=true # DO NOT USE THIS IN PROD!
```

```bash
export POD_NAME=$(kubectl get pods -n kube-system -l "app=kubernetes-dashboard,release=k8s-dashboard" -o jsonpath="{.items[0].metadata.name}")
echo https://127.0.0.1:8443
kubectl -n kube-system port-forward $POD_NAME 8443:8443
```

Authenticate (https://stackoverflow.com/questions/46664104/how-to-sign-in-kubernetes-dashboard)

```bash
# Option 1 - All secrets with type 'kubernetes.io/service-account-token' will allow to log in and give you some access based on their roles.
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep k8s-dashboard-kubernetes-dashboard-token | cut -d " " -f1) | grep "token:" | awk -F ":      " '{print $2}'
```

```bash
# Option 2.
kubectl config set-credentials cluster-admin --token=bearer_token
```

```bash
# Option 3 - DO NOT USE THIS IN PROD!
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
```

```bash
# Option 4 - DO NOT USE THIS IN PROD!
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/master/aio/deploy/alternative.yaml
```

```bash
helm delete $RELEASE --purge && \
  kubectl delete namespace $NAMESPACE
```

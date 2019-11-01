# K8S Dashboard

```bash
helm upgrade \
  --install k8-dashboard \
  stable/kubernetes-dashboard \
  --namespace kube-system \
  --set rbac.clusterAdminRole=true \
  --timeout 99999
```

```bash
TOKEN=$(kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep k8-dashboard-kubernetes-dashboard-token | cut -d " " -f1) | grep "token:" | awk -F ":      " '{print $2}')
echo $TOKEN
echo https://localhost:8443
kubectl -n kube-system port-forward $(kubectl get pods -n kube-system -l "app=kubernetes-dashboard" -o jsonpath="{.items[0].metadata.name}") 8443:8443
```

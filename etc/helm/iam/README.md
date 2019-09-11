# Datalayer IAM Helm

```bash
export RELEASE=iam
export NAMESPACE=iam
helm upgrade \
  --install $RELEASE \
  $DLAHOME/etc/iam/helm \
  --namespace $NAMESPACE \
  --timeout 99999
```

```bash
export POD_NAME=$(kubectl get pods -n iam-l "app=iam" -o jsonpath="{.items[0].metadata.name}")
echo https://127.0.0.1:9700
kubectl -n iam port-forward $POD_NAME 9700:9700
```

```bash
helm delete $RELEASE --purge && \
  kubectl delete namespace $NAMESPACE
```

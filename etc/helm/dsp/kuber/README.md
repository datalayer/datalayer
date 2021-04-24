# Datalayer Kuber Helm Chart

```bash
export RELEASE=kuber
export NAMESPACE=kuber
helm upgrade \
  --install $RELEASE \
  $DLAHOME/etc/helm/kuber \
  --namespace $NAMESPACE \
  --timeout 99999
```

```bash
export POD_NAME=$(kubectl get pods -n kuber -l "app=kuber" -o jsonpath="{.items[0].metadata.name}")
echo https://127.0.0.1:9091
kubectl -n kuber port-forward $POD_NAME 9091:9091
```

```bash
helm delete $RELEASE --purge && \
  kubectl delete namespace $NAMESPACE
```

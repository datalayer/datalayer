[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Datalayer JupyterPool Helm Chart

```bash
export RELEASE=dsp-jupyterpool
export NAMESPACE=dsp-jupyterpool
helm upgrade \
  --install $RELEASE \
  $DLAHOME/etc/jupyterpool/helm \
  --namespace $NAMESPACE \
  --timeout 99999
```

```bash
export POD_NAME=$(kubectl get pods -n jupyterpool-l "app=jupyterpool" -o jsonpath="{.items[0].metadata.name}")
echo https://127.0.0.1:9700
kubectl -n jupyterpool port-forward $POD_NAME 9700:9700
```

```bash
helm delete $RELEASE --purge && \
  kubectl delete namespace $NAMESPACE
```

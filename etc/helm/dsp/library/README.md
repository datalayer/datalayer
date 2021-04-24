[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Datalayer Library Helm Chart

```bash
export RELEASE=dsp-library
export NAMESPACE=dsp-library
helm upgrade \
  --install $RELEASE \
  $DLAHOME/etc/library/helm \
  --namespace $NAMESPACE \
  --timeout 99999
```

```bash
export POD_NAME=$(kubectl get pods -n library-l "app=library" -o jsonpath="{.items[0].metadata.name}")
echo https://127.0.0.1:9700
kubectl -n library port-forward $POD_NAME 9700:9700
```

```bash
helm delete $RELEASE --purge && \
  kubectl delete namespace $NAMESPACE
```

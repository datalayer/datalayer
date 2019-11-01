[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Simple Helm

```bash
export RELEASE=simple
export NAMESPACE=simple
helm upgrade \
  --install $RELEASE \
  $DLAHOME/lab/etc/simple/helm \
  --namespace $NAMESPACE \
  --timeout 99999
```

```bash
# Access to the Pod.
export POD_NAME=$(kubectl get pods --namespace simple -l "app.kubernetes.io/name=solr,app.kubernetes.io/component=server" -o jsonpath="{ .items[0].metadata.name }")
echo "Visit http://127.0.0.1:8080 to access Simple"
kubectl port-forward --namespace solr $POD_NAME 8983:8983
```

```bash
# Access via ClusterIP Service.
CLUSTER_IP=$(kubectl get svc/simple-svc --namespace simple -o custom-columns=IP:spec.clusterIP --no-headers=true)
echo "Visit http://$CLUSTER_IP:5705"
```

```bash
# Access via NodePort Service.
export NODE_PORT=$(kubectl get --namespace simple -o jsonpath="{.spec.ports[0].nodePort}" services simple-svc)
export NODE_IP=$(kubectl get nodes --namespace simple -o jsonpath="{.items[0].status.addresses[0].address}")
echo http://$NODE_IP:$NODE_PORT
```

```bash
kubectl get secret --namespace simple simple-secret -o jsonpath="{.data.password}" | base64 --decode; echo
```

```bash
helm delete $RELEASE --purge && \
  kubectl delete namespace $NAMESPACE
```

[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Solr Helm Chart

+ https://github.com/helm/charts/tree/master/incubator/solr

```bash
export RELEASE=solr
export NAMESPACE=solr
helm upgrade \
  --install $RELEASE \
  incubator/solr \
  --namespace $NAMESPACE \
  --timeout 99999 \
  --set image.tag=7.7.2,javaMem="-Xms1g -Xmx1g",logLevel=INFO,replicaCount=2 \
  --set livenessProbe.initialDelaySeconds=420,exporter.readinessProbe.periodSeconds=30,service.type=NodePort
```

```
Release "solr" does not exist. Installing it now.
NAME:   solr
LAST DEPLOYED: Sat Aug 10 16:25:20 2019
NAMESPACE: solr
STATUS: DEPLOYED

RESOURCES:
==> v1/ConfigMap
NAME             DATA  AGE
solr-config-map  1     0s

==> v1/Pod(related)
NAME              READY  STATUS   RESTARTS  AGE
solr-0            0/1    Pending  0         0s
dla-solr-zookeeper-0  0/1    Pending  0         0s

==> v1/Service
NAME                     TYPE       CLUSTER-IP      EXTERNAL-IP  PORT(S)                     AGE
solr-headless            ClusterIP  None            <none>       8983/TCP                    0s
solr-svc                 NodePort   10.109.251.190  <none>       8983:31875/TCP              0s
dla-solr-zookeeper           ClusterIP  10.98.71.178    <none>       2181/TCP                    0s
dla-solr-zookeeper-headless  ClusterIP  None            <none>       2181/TCP,3888/TCP,2888/TCP  0s

==> v1/StatefulSet
NAME  READY  AGE
solr  0/2    0s

==> v1beta1/PodDisruptionBudget
NAME            MIN AVAILABLE  MAX UNAVAILABLE  ALLOWED DISRUPTIONS  AGE
solr            N/A            1                0                    0s
dla-solr-zookeeper  N/A            1                0                    0s

==> v1beta1/StatefulSet
NAME            READY  AGE
dla-solr-zookeeper  0/3    0s

NOTES:

Your Solr cluster has now been installed, and can be accessed in the following ways:

  * Internally, within the kubernetes cluster on:

solr-svc.solr:8983

  * External to the kubernetes cluster:

export POD_NAME=$(kubectl get pods --namespace solr -l "app.kubernetes.io/name=solr,app.kubernetes.io/component=server" -o jsonpath="{ .items[0].metadata.name }")
echo "Visit http://127.0.0.1:8983 to access Solr"
kubectl port-forward --namespace solr $POD_NAME 8983:8983
```

```bash
export POD_NAME=$(kubectl get pods --namespace solr -l "app.kubernetes.io/name=solr,app.kubernetes.io/component=server" -o jsonpath="{ .items[0].metadata.name }")
echo "Visit http://127.0.0.1:8983 to access Solr"
kubectl port-forward --namespace solr $POD_NAME 8983:8983
```

```bash
# For NodePort Service.
export NODE_IP=$(kubectl get nodes --namespace solr -o jsonpath="{.items[0].status.addresses[0].address}")
export NODE_PORT=$(kubectl get --namespace solr -o jsonpath="{.spec.ports[0].nodePort}" services solr-svc)
echo http://$NODE_IP:$NODE_PORT
```

```bash
helm delete $RELEASE --purge && \
  kubectl delete namespace $NAMESPACE
kubectl delete pvc -l release=$RELEASE
```

# See Also

+ https://github.com/sematext/lucene-revolution-samples
+ https://github.com/freedev/solrcloud-zookeeper-kubernetes

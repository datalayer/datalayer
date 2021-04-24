[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Datalayer Keycloak Helm Chart

- https://github.com/codecentric/helm-charts/tree/master/charts/keycloak

```bash
export RELEASE=dsp-keycloak
export NAMESPACE=dsp-keycloak
helm upgrade \
  --install $RELEASE \
  codecentric/keycloak \
  --namespace $NAMESPACE \
  --timeout 99999 \
  --set keycloak.service.type=NodePort
```

```
Release "keycloak" does not exist. Installing it now.
NAME:   keycloak
E0811 08:08:54.632895    7392 portforward.go:385] error copying from local connection to remote stream: read tcp4 127.0.0.1:52805->127.0.0.1:52810: read: connection reset by peer
LAST DEPLOYED: Sat Aug 10 18:52:41 2019
NAMESPACE: keycloak
STATUS: DEPLOYED

RESOURCES:
==> v1/ConfigMap
NAME              DATA  AGE
keycloak-sh       1     0s
keycloak-startup  1     0s
keycloak-test     1     0s

==> v1/Pod(related)
NAME        READY  STATUS             RESTARTS  AGE
keycloak-0  0/1    ContainerCreating  0         0s

==> v1/Secret
NAME           TYPE    DATA  AGE
keycloak-db    Opaque  1     0s
keycloak-http  Opaque  1     0s

==> v1/Service
NAME               TYPE       CLUSTER-IP     EXTERNAL-IP  PORT(S)       AGE
keycloak-headless  ClusterIP  None           <none>       80/TCP        0s
keycloak-http      NodePort   10.101.219.43  <none>       80:30165/TCP  0s

==> v1/StatefulSet
NAME      READY  AGE
keycloak  0/1    0s


NOTES:

Keycloak can be accessed:

* Within your cluster, at the following DNS name at port 80:

  keycloak-http.keycloak.svc.cluster.local

* From outside the cluster, run these commands in the same shell:

  export NODE_PORT=$(kubectl get --namespace auth -o jsonpath="{.spec.ports[0].nodePort}" services keycloak)
  export NODE_IP=$(kubectl get nodes --namespace auth -o jsonpath="{.items[0].status.addresses[0].address}")
  echo http://$NODE_IP:$NODE_PORT

Login with the following credentials:
Username: keycloak

To retrieve the initial user password run:
kubectl get secret --namespace auth keycloak-http -o jsonpath="{.data.password}" | base64 --decode; echo
```

```bash
export NODE_IP=$(kubectl get nodes --namespace auth -o jsonpath="{.items[0].status.addresses[0].address}")
export NODE_PORT=$(kubectl get --namespace auth -o jsonpath="{.spec.ports[0].nodePort}" services keycloak-keycloak-http)
echo http://$NODE_IP:$NODE_PORT
```

```bash
# username: keycloak
kubectl get secret --namespace $NAMESPACE keycloak-http -o jsonpath="{.data.password}" | base64 --decode; echo
```

```bash
helm delete $RELEASE --purge && \
  kubectl delete namespace $NAMESPACE
```

## Create Realm and Client

+ https://github.com/keycloak/keycloak-documentation/blob/master/server_admin/topics/admin-cli.adoc#importing-a-realm-from-exported-json-file

```bash
export PATH=/opt/jboss/keycloak/bin:$PATH
kcadm.sh config credentials --server http://localhost:8080/auth --realm master --user keycloak --client admin-cli
kcadm.sh create realms -s realm=datalayer -s enabled=true
kcadm.sh get realms
kcadm.sh create partialImport -r datalayer -s ifResourceExists=OVERWRITE -o -f datalayer.json
```

-Dkeycloak.import https://access.redhat.com/documentation/en-us/red_hat_single_sign-on/7.0/html/server_administration_guide/export_import

See also https://github.com/codecentric/helm-charts/pull/56/files

# Post Start

+ https://github.com/helm/charts/issues/5917
+ https://github.com/helm/charts/pull/5887
+ https://github.com/helm/charts/pull/5950

## See Also

+ https://github.com/stianst/demo-kubernetes

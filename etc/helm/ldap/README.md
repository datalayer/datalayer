[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# LDAP Helm

[OpenLDAP Helm Chart](https://github.com/helm/charts/tree/master/stable/openldap).

```bash
export RELEASE=ldap
export NAMESPACE=ldap
helm upgrade \
  --install $RELEASE \
  stable/openldap \
  --namespace $NAMESPACE \
  --timeout 99999 \
  --set service.type=NodePort \
  --values ldap.yaml
```

```
Release "ldap" does not exist. Installing it now.
NAME:   ldap
LAST DEPLOYED: Fri Aug  9 16:44:37 2019
NAMESPACE: ldap
STATUS: DEPLOYED

RESOURCES:
==> v1/ConfigMap
NAME               DATA  AGE
dla-ldap-openldap-env  6     0s

==> v1/Pod(related)
NAME                            READY  STATUS             RESTARTS  AGE
dla-ldap-openldap-7dc7579d5d-m5292  0/1    ContainerCreating  0         0s

==> v1/Secret
NAME           TYPE    DATA  AGE
dla-ldap-openldap  Opaque  2     0s

==> v1/Service
NAME           TYPE       CLUSTER-IP      EXTERNAL-IP  PORT(S)          AGE
dla-ldap-openldap  ClusterIP  10.100.189.233  <none>       389/TCP,636/TCP  0s

==> v1beta2/Deployment
NAME           READY  UP-TO-DATE  AVAILABLE  AGE
dla-ldap-openldap  0/1    1           0          0s

NOTES:

OpenLDAP has been installed. You can access the server from within the k8s cluster using:
  dla-ldap-openldap.ldap.svc.cluster.local:389

You can access the LDAP adminPassword and configPassword using:
  kubectl get secret --namespace ldap dla-ldap-openldap -o jsonpath="{.data.LDAP_ADMIN_PASSWORD}" | base64 --decode; echo
  kubectl get secret --namespace ldap dla-ldap-openldap -o jsonpath="{.data.LDAP_CONFIG_PASSWORD}" | base64 --decode; echo

You can access the LDAP service, from within the cluster (or with kubectl port-forward) with a command like (replace password and domain):
  ldapsearch -x -H ldap://dla-ldap-openldap-service.ldap.svc.cluster.local:389 -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w $LDAP_ADMIN_PASSWORD

Test server health using Helm test:
  helm test ldap

You can also consider installing the helm chart for phpldapadmin to manage this instance of OpenLDAP, or install Apache Directory Studio, and connect using kubectl port-forward.
```

```bash
# OutCluster.
minikube -n $NAMESPACE service dla-ldap-openldap --url
# http://192.168.64.13:30059
# http://192.168.64.13:30495
curl http://192.168.64.13:30059
# curl: (52) Empty reply from server
LDAP_ADMIN_PASSWORD=$(kubectl get secret --namespace ldap dla-ldap-openldap -o jsonpath="{.data.LDAP_ADMIN_PASSWORD}" | base64 --decode; echo)
ldapsearch -x -H ldap://192.168.64.13:30059 -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w $LDAP_ADMIN_PASSWORD
```

```bash
# InCluster.
ldapsearch -x -H ldap://localhost:389 -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w $LDAP_ADMIN_PASSWORD
```

```bash
helm delete $RELEASE --purge && \
  kubectl delete namespace $NAMESPACE
kubectl delete pvc -l release=$RELEASE
```

```bash
helm install --name $RELEASE stable/openldap --set test.enabled=true
helm test $RELEASE
# RUNNING: foolish-mouse-openldap-service-test-akmms
# PASSED: foolish-mouse-openldap-service-test-akmms
```

## Kubernetes Examples

+ [Helm Chart Stable](https://github.com/helm/charts/tree/master/stable/openldap).
+ [Helm Chart K2](https://github.com/samsung-cnct/k2-charts/tree/master/openldap).
+ [Helm Chart IBM](https://github.com/ibm-cloud-architecture/icp-openldap).

[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# LDAP Admin Helm

## Cetic

+ https://github.com/cetic/helm-phpldapadmin
+ https://github.com/gengen1988/helm-phpldapadmin

```bash
helm repo add cetic https://cetic.github.io/helm-charts
helm repo update
```

```bash
export RELEASE=ldapadmin
export NAMESPACE=ldapadmin
helm upgrade \
  --install $RELEASE \
  cetic/phpldapadmin \
  --namespace $NAMESPACE \
  --set service.type=NodePort \
  --set env.PHPLDAPADMIN_LDAP_HOSTS=dla-ldap-openldap.ldap \
  --timeout 99999
```

```bash
minikube -n $NAMESPACE service ldapadmin-phpldapadmin --url
```

```bash
helm delete $RELEASE --purge && \
  kubectl delete namespace $NAMESPACE
```

## IBM ICP

[icp-openldap](https://github.com/ibm-cloud-architecture/icp-openldap).

## Rubykube

+ https://github.com/rubykube/charts/tree/master/stable/phpldapadmin

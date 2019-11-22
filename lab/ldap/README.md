[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Lab LDAP

```bash
# Start OpenLDAP Server with SSL.
cd $DLAHOME/lab/ldap && \
  docker run \
    -p 636:636 \
    --name ldap \
    --hostname openldap \
    --env LDAP_TLS_VERIFY_CLIENT=try \
    --detach \
    osixia/openldap:1.2.3
```

```bash
LDAPTLS_REQCERT=never ldapadd -H ldaps://localhost -c -D "cn=admin,dc=example,dc=org" -w admin -f $DLAHOME/lab/ldap/ldif/example-1.ldif
LDAPTLS_REQCERT=never ldapadd -H ldaps://localhost -c -D "cn=admin,dc=example,dc=org" -w admin -f $DLAHOME/lab/ldap/ldif/example-2.ldif
LDAPTLS_REQCERT=never ldapsearch -x -H ldaps://localhost -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w admin
docker exec ldap ldapsearch -x -H ldaps://localhost -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w admin
```

```bash
docker rm -f ldap
```

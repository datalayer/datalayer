[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Docker LDAP 

```bash
make build
```

```bash
docker run \
  -p 389:389 \
  -p 636:636 \
  --name openldap \
  --hostname openldap \
  --env LDAP_TLS_VERIFY_CLIENT=try \
  --detach \
  datalayer/openldap:0.0.3
docker exec \
  openldap ldapsearch -x -H ldap://localhost -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w Adm1n!
ldapsearch -x -H ldap:// -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w Adm1n!
docker rm -f openldap
```

## Docker Examples

+ [osixia](./examples/osixia) example.
+ [tiredofit](./examples/tiredofit) example.

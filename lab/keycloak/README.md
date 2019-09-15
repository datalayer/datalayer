[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Keycloak Examples

> Federation with Keycloak, a `OAuth 2.0` and `OpenID Connect` provider.

## Integrations

Integrate Keycloak with:

+ [Python clients](./py-client)
+ [Flask](./py-flask).
+ [Tornado](./py-tornado).
+ [Django](./py-django).
+ [Java with LDAP and Swagger](./java).
+ [JupyterHub](./jupyterhub).
+ [React.js](./react.js).
+ [Go](./go).
+ [Node.js](./node).

See also [question on mailing list](http://lists.jboss.org/pipermail/keycloak-user/2014-September/000928.html).

## Setup Keycloak

```bash
cd $DLAHOME/etc/examples/keycloak && \
  docker-compose -f keycloak.yml up -d && \
  docker-compose -f keycloak.yml ps && \
  sleep 3s && \
  ldapadd -x -D "cn=admin,dc=datalayer,dc=io" -w admin -H ldap:// -f ldap/entries-1.ldif && \
  ldapsearch -x -D "cn=admin,dc=datalayer,dc=io" \
    -w admin -H ldap://localhost:389 \
    -b "ou=users,dc=datalayer,dc=io" \
    -s sub "(uid=*)"
# password is `123`
ldapadd -x -D "cn=admin,dc=datalayer,dc=io" -w admin -H ldap:// -f ldap/entries-2.ldif
```

```bash
# Browse and login to keycloak.
open http://localhost:8080 # admin / admin
```

+ Create a new Realm `datalayer`.
+ Create the client `datalayer` with Root URL `http://localhost:8080`.
  + Valid Redirect URIs to `http://localhost:8080/*`.
  + Access Type to `confidential`.
  + Go to Credentials tab an copy the value on Secret field.
+ Create the client `jupyterhub` the same way.
+ Go to Roles tab and add a `user` role.
+  Click on the User Federation, select ldap.
  + Set Vendor field to `Other`.
  + Connection URL type `ldap://ldap`.
  + Users DN type `ou=users,dc=datalayer,dc=io`.
  + Bind DN type `cn=admin,dc=datalayer,dc=io`.
  + Bind Credential set `admin`.
+ Click on `Synchronize all users` and check they are available via the Users management menu (view all users).

```bash
open http://localhost:8080/auth/admin/master/console
open http://localhost:8080/auth/realms/datalayer/account
```

```bash
export CLIENT_SECRET=$DLA_KEYCLOAK_REALM_CLIENT_SECRET
ACCESS_TOKEN=$(curl -s -X POST \
  "http://localhost:8080/auth/realms/datalayer/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=echarles" \
  -d "password=123" \
  -d "grant_type=password" \
  -d "client_secret=$CLIENT_SECRET" \
  -d "client_id=datalayer" | jq -r .access_token)
echo $ACCESS_TOKEN
```

```bash
docker-compose -f keycloak.yml down
```

## Info on URLs

+ http://localhost:8080/auth/realms/datalayer
+ http://localhost:8080/auth/realms/datalayer/.well-known/openid-configuration
+ http://keycloakhost:keycloakport/auth/realms/{realm}/.well-known/openid-configuration

## About Login

+ https://www.keycloak.org/docs/3.2/server_admin/topics/login-settings.html
+ https://www.keycloak.org/docs/3.2/server_admin/topics/authentication.html
+ http://localhost:8080/auth/realms/datalayer/account

## About Theming

+ https://www.keycloak.org/docs/3.2/server_development/topics/themes.html
+ https://github.com/keycloak/keycloak/tree/master/examples/themes
+ https://medium.com/@auscunningham/create-a-custom-theme-for-keycloak-8781207be604
+ https://github.com/austincunningham/raincatcher-keycloak-theme
+ https://github.com/Alfresco/alfresco-keycloak-theme
+ https://github.com/eclipse/che/issues/6116

<!--

```bash
docker exec keycloak /opt/jboss/keycloak/bin/kcadm.sh get clients/$CID/installation/providers/keycloak-oidc-keycloak-json
```

```bash
kcadm.sh config truststore --trustpass $PASSWORD ~/.keycloak/truststore.jks
kcadm.sh create realms -f - << EOF
{ "realm": "datalayer", "enabled": true }
EOF
```

```bash
./kcreg.sh config initial-token initial_token --server http://localhost:8080/auth --realm datalayer
./kcreg.sh create -s clientId=myclient
```

```bash
# https://issues.jboss.org/browse/KEYCLOAK-2399
export TKN=$(curl -X POST http://localhost:8080/auth/realms/datalayer/protocol/openid-connect/token \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "username="${CLIENT_ID} \
    -d 'password='${SECRET} \
    -d 'grant_type=password' | jq -r '.access_token')
echo $TKN
curl -X POST http://localhost:8080/auth/admin/realms/datalayer/users \
    -v \
    -H "Accept: application/json" \
    -H "Content-Type:application/json" \
    -H "Authorization: Bearer $TKN" \
    -d '{"username" : "test", "enabled": true }' | jq .
curl -X POST http://localhost:8080/auth/admin/realms/datalayer/users \
    -v \
    -H "Accept: application/json" \
    -H "Content-Type:application/json" \
    -H "Authorization: Bearer $TKN" \
    -d '{"username" : "bburke@redhat.com", "enabled": true, "email" : "bburke@redhat.com", "firstName": "Bill", "lastName": "Burke", "credentials" : [{ "type" : "password", "value" : "password" } ], "realmRoles": [ "user", "offline_access"  ], "clientRoles": {"account": [ "manage-account" ] } }' | jq .
curl -X PUT http://localhost:8080/auth/realms/datalayer/users/${USER_ID}/reset-password \
    -H "Accept: application/json" \
    -H "Content-Type:application/json" \
    -H "Authorization: Bearer $TKN" \
    -d '{ "type" : "password", "value" : "123", "temporary": false }' | jq .
```

```bash
curl \
  -o \
  -d "client_id=admin-cli" \
  -d "username=admin" \
  -d "password=admin" \
  -d "grant_type=password" \
  "http://localhost:8080/auth/realms/datalayer/clients/1b9f152d-57f6-4eed-a5f9-2cbe48d8a441/client-secret"
```

```bash
curl \
  -o \
  -d "client_id=admin-cli" \
  -d "username=admin" \
  -d "password=admin" \
  -d "grant_type=password" \
  "http://localhost:8080/auth/realms/master/protocol/openid-connect/token"
```  

```bash
curl \
  -o \
  -H "Authorization: bearer eyJhbGciOiJSUz..." \
  "http://localhost:8080/auth/admin/realms/master"
```

```bash
docker exec keycloak keycloak/bin/add-user-keycloak.sh -u admin -p admin
docker restart keycloak
docker run -e KEYCLOAK_USER=<username> -e KEYCLOAK_PASSWORD=<password> \
    -e KEYCLOAK_IMPORT=/tmp/example-realm.json -v ./example-realm.json:/tmp/example-realm.json jboss/keycloak
```

-->

[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Lab Keycloak

> Federation with Keycloak, a `OAuth 2.0` and `OpenID Connect` provider.

+ [React.js](./react.js).
+ [Node.js](./node.js).
+ [Python](./python).
+ [Go](./go).
+ [Java](./java).

## Setup

```bash
cd $DLAHOME/lab/keycloak && \
  docker-compose -f $DLAHOME/lab/keycloak/docker/keycloak.yml up -d && \
  docker-compose -f $DLAHOME/lab/keycloak/docker/keycloak.yml ps && \
  sleep 3s && \
  ldapadd -x -D "cn=admin,dc=datalayer,dc=io" -w admin -H ldap:// -f $DLAHOME/lab/keycloak/ldap/entries.ldif && \
  ldapsearch -x -D "cn=admin,dc=datalayer,dc=io" \
    -w admin -H ldap://localhost:389 \
    -b "ou=users,dc=datalayer,dc=io" \
    -s sub "(uid=*)"
# username = eric, password = `123`
open http://localhost:8080/auth/admin/master/console
open http://localhost:8080/auth/realms/datalayer/account # eric / 123
```

```bash
# Browse and login to keycloak.
until curl -X GET http://localhost:8080/auth; do echo "Waiting for entrypoint..."; sleep 10; done && \
  open http://localhost:8080 # admin / admin
```

# Configure

Run the snipppets from `./init/init-keycloak.sh` or follow the following manual steps.

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

## Teardown

```bash
docker-compose -f $DLAHOME/lab/keycloak/docker/keycloak.yml down
```

## URLs

open http://localhost:8080/auth/realms/datalayer
open http://localhost:8080/auth/realms/datalayer/.well-known/openid-configuration
open http://localhost:8080/auth/realms/datalayer/account

## Login Docs

+ https://www.keycloak.org/docs/3.2/server_admin/topics/login-settings.html
+ https://www.keycloak.org/docs/3.2/server_admin/topics/authentication.html

## Theme Docs

+ https://www.keycloak.org/docs/3.2/server_development/topics/themes.html
+ https://github.com/keycloak/keycloak/tree/master/examples/themes
+ https://medium.com/@auscunningham/create-a-custom-theme-for-keycloak-8781207be604
+ https://github.com/austincunningham/raincatcher-keycloak-theme
+ https://github.com/Alfresco/alfresco-keycloak-theme
+ https://github.com/eclipse/che/issues/6116

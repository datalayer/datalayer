[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Keycloak with React.js

From [user-authentication-with-keycloak](https://blog.scalac.io/user-authentication-with-keycloak-part1.html) and its [github repo](https://github.com/kmikulski/blog-keycloak), using [keycloak-js](https://github.com/keycloak/keycloak-js-bower).

```bash
docker run --rm -it -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -e DB_VENDOR=H2 jboss/keycloak:4.8.1.Final
open http://localhost:8080/auth/admin # admin / admin
```

Create `datalayer` realm.
Create `john` user and set password.
Create `react-js` client with root URL `http://localhost:3000`.

```bash
# Check john user.
open http://localhost:8080/auth/realms/datalayer/account 
```

```bash
cd $DLAHOME/lab/apps/keycloak/react.js/repo && \
  yarn install && \
  yarn build && \
  yarn start
open http://localhost:3000
```

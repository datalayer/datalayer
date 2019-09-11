[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Keycloak with Tornado

```bash
# Authenticate
open http://localhost:8080/auth/realms/datalayer/account 
```

```bash
# https://github.com/david-talabard/tornado-keycloak-auth
```

```bash
cd $DLAHOME/lab/apps/keycloak/py/tornado/repo && \
  open http://localhost:8888 && \
  python main.py
```

```bash
ACCESS_TOKEN=$(curl -s -X POST \
  "http://localhost:8080/auth/realms/datalayer/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=john" \
  -d "password=john" \
  -d "grant_type=password" \
  -d "client_secret=5d2ae8ee-693f-4d73-94de-69e5919a2834" \
  -d "client_id=jupyterhub" | jq -r .access_token )
echo $ACCESS_TOKEN
curl -i http://localhost:8888
curl -i -H "Authorization: Bearer $ACCESS_TOKEN" http://localhost:8888
```

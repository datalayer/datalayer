#!/usr/bin/env bash

until curl -X GET http://localhost:8080/auth; do echo "Waiting for entrypoint..."; sleep 10; done

### Init 1

/opt/jboss/keycloak/bin/kcadm.sh config credentials --server http://localhost:8080/auth --realm master --user admin --password admin --client admin-cli
/opt/jboss/keycloak/bin/kcadm.sh create realms -s realm=datalayer -s enabled=true -i

DATALAYER_CLIENT_ID=$(/opt/jboss/keycloak/bin/kcadm.sh create clients \
  -r datalayer \
  -s clientId=datalayer \
  -s directAccessGrantsEnabled=true \
  -s implicitFlowEnabled=true \
  -s 'redirectUris=["http://localhost:8080/*"]' \
  -i \
  )
echo $DATALAYER_CLIENT_ID
DLA_KEYCLOAK_REALM_CLIENT_SECRET=$(/opt/jboss/keycloak/bin/kcadm.sh get \
  clients/${DATALAYER_CLIENT_ID}/installation/providers/keycloak-oidc-keycloak-json \
  -r datalayer \
  | jq -r .credentials.secret \
  )
echo $DLA_KEYCLOAK_REALM_CLIENT_SECRET

USER_ID=$(/opt/jboss/keycloak/bin/kcadm.sh create users -r datalayer -s username=eric -s enabled=true -o | jq -r .id)
/opt/jboss/keycloak/bin/kcadm.sh update users/${USER_ID}/reset-password -r datalayer -s type=password -s value=123 -s temporary=false -n

echo -e "\x1b[32mCheck you can authenticate on the Keycloak server with username=eric and password=123\x1b[0m"
echo
echo open http://localhost:8080/auth/realms/datalayer/account
echo
echo -e "\x1b[32mCopy/Paste the following exports and run them in your shell (needed to run JupyterHub OIDC Auth)\x1b[0m"
echo
echo export OIDC_CLIENT_ID=datalayer
echo export DLA_KEYCLOAK_REALM_CLIENT_SECRET=$DLA_KEYCLOAK_REALM_CLIENT_SECRET
echo export OIDC_SERVER=http://localhost:8080
echo

### Init 2

/opt/jboss/keycloak/bin/kcadm.sh update realms/datalayer -f ./../config/datalayer-realm.json

REALM_ID=$(/opt/jboss/keycloak/bin/kcadm.sh get clients --query clientId=datalayer -F id | grep -oE "\"[a-z0-9\-]{15,50}" | grep -oE "[a-z0-9\-]{15,50}")
/opt/jboss/keycloak/bin/kcadm.sh update clients/${REALM_ID} -f ./config/datalayer-realm-client.json

/opt/jboss/keycloak/bin/kcadm.sh get clients/$CID/installation/providers/keycloak-oidc-keycloak-json

kcadm.sh config truststore --trustpass $PASSWORD ~/.keycloak/truststore.jks
kcadm.sh create realms -f - << EOF
{ "realm": "datalayer", "enabled": true }
EOF

/opt/jboss/keycloak/bin/kcreg.sh config initial-token initial_token --server http://localhost:8080/auth --realm datalayer

/opt/jboss/keycloak/bin/kcreg.sh create -s clientId=myclient

### Test

export TKN=$(curl -X POST http://localhost:8080/auth/realms/datalayer/protocol/openid-connect/token \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "username=eric" \
    -d 'password=123' \
    -d 'grant_type=password' \
    -d 'client_id=datalayer' \
    -d 'client_secret='$DLA_KEYCLOAK_REALM_CLIENT_SECRET \
    | jq -r '.access_token')
echo $TKN

# https://issues.jboss.org/browse/KEYCLOAK-2399
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
    -d '{"username" : "eric2@datalaeyr.io", "enabled": true, "email" : "eric2@datalayer.io", "firstName": "Eric2", "lastName": "charles", "credentials" : [{ "type" : "password", "value" : "password" } ], "realmRoles": [ "user", "offline_access"  ], "clientRoles": {"account": [ "manage-account" ] } }' | jq .
curl -X PUT http://localhost:8080/auth/realms/datalayer/users/${USER_ID}/reset-password \
    -H "Accept: application/json" \
    -H "Content-Type:application/json" \
    -H "Authorization: Bearer $TKN" \
    -d '{ "type" : "password", "value" : "123", "temporary": false }' | jq .

ACCESS_TOKEN=$(curl -s -X POST \
  "http://localhost:8080/auth/realms/datalayer/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=eric" \
  -d "password=123" \
  -d "grant_type=password" \
  -d "client_secret=$DLA_KEYCLOAK_REALM_CLIENT_SECRET" \
  -d "client_id=datalayer" | jq -r .access_token)
echo $ACCESS_TOKEN

curl \
  -o \
  -d "client_id=admin-cli" \
  -d "username=admin" \
  -d "password=admin" \
  -d "grant_type=password" \
  "http://localhost:8080/auth/realms/datalayer/clients/1b9f152d-57f6-4eed-a5f9-2cbe48d8a441/client-secret"

curl \
  -o \
  -d "client_id=admin-cli" \
  -d "username=admin" \
  -d "password=admin" \
  -d "grant_type=password" \
  "http://localhost:8080/auth/realms/master/protocol/openid-connect/token"

curl \
  -o \
  -H "Authorization: bearer eyJhbGciOiJSUz..." \
  "http://localhost:8080/auth/admin/realms/master"

docker exec keycloak keycloak/bin/add-user-keycloak.sh -u admin -p admin
docker restart keycloak
docker run -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin \
    -e KEYCLOAK_IMPORT=/tmp/example-realm.json -v ./example-realm.json:/tmp/example-realm.json jboss/keycloak

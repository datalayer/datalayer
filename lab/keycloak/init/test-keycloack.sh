#!/usr/bin/env bash

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

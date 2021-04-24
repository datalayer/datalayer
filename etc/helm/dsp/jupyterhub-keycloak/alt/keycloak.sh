#!/usr/bin/env bash

until curl -X GET http://localhost:8080/auth; do echo "Waiting for entrypoint..."; sleep 10; done

/opt/jboss/keycloak/bin/kcadm.sh config credentials --server http://localhost:8080/auth --realm master --user keycloak --password xxx

/opt/jboss/keycloak/bin/kcadm.sh update realms/master -f ./keycloak-config/master-realm.json

REALM_ID=$(/opt/jboss/keycloak/bin/kcadm.sh get clients --query clientId=master-realm -F id | grep -oE "\"[a-z0-9\-]{15,50}" | grep -oE "[a-z0-9\-]{15,50}")

/opt/jboss/keycloak/bin/kcadm.sh update clients/${REALM_ID} -f ./keycloak-config/master-realm-client.json

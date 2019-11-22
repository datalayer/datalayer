#!/usr/bin/env bash

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

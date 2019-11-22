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

#!/usr/bin/env bash

/opt/jboss/keycloak/bin/kcadm.sh config credentials --server http://localhost:8080/auth --realm master --user admin --password admin --client admin-cli
/opt/jboss/keycloak/bin/kcadm.sh create realms -s realm=datalayer -s enabled=true -i

KEYCLOAK_CLIENT_ID=$(/opt/jboss/keycloak/bin/kcadm.sh create clients -r datalayer -s clientId=datalayer -s 'redirectUris=["http://localhost:8080/*"]' -i)
OIDC_SECRET=$(/opt/jboss/keycloak/bin/kcadm.sh get clients/${KEYCLOAK_CLIENT_ID}/installation/providers/keycloak-oidc-keycloak-json -r datalayer | jq -r .credentials.secret)

USER_ID=$(/opt/jboss/keycloak/bin/kcadm.sh create users -r datalayer -s username=eric -s enabled=true -o | jq -r .id)
/opt/jboss/keycloak/bin/kcadm.sh update users/${USER_ID}/reset-password -r datalayer -s type=password -s value=123 -s temporary=false -n

echo -e "\x1b[32mCheck you can authenticate on the Keycloak server with username=eric and password=123\x1b[0m"
echo
echo open http://localhost:8094/auth/realms/datalayer/account
echo
echo -e "\x1b[32mCopy/Paste the following exports and run them in your shell (needed to run JupyterHub OIDC Auth)\x1b[0m"
echo
echo export OIDC_CLIENT_ID=datalayer
echo export OIDC_SECRET=$OIDC_SECRET
echo export OIDC_SERVER=http://localhost:8094
echo
echo "make start-jupyterhub # Start JupyterHub"
echo

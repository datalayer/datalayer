[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Keycloak Python Client

## python-keycloak

```bash
# https://python-keycloak.readthedocs.io/en/latest
# https://pypi.org/project/python-keycloak
# https://bitbucket.org/agriness/python-keycloak/src/master
pip install python-keycloak pyjwt
```

```python
# KEYCLOAK OPENID
from keycloak import KeycloakOpenID
# Configure client
keycloak_openid = KeycloakOpenID(
    server_url="http://localhost:8080/auth/",
    realm_name="datalayer",
    client_id="datalayer",
    client_secret_key="3426a2d6-a7f5-44cd-9ca9-23f0380de554",
    verify=True
    )
# Get WellKnow
config_well_know = keycloak_openid.well_know()
# Get Token
token = keycloak_openid.token("bgates", "123")
token = keycloak_openid.token("bgates", "123", totp="012345")
# Get Userinfo
userinfo = keycloak_openid.userinfo(token['access_token'])
# Refresh token
token = keycloak_openid.refresh_token(token['refresh_token'])
# Logout
keycloak_openid.logout(token['refresh_token'])
# Get Certs
certs = keycloak_openid.certs()
# Get Requesting Party Token (RPT) (Entitlement)
token = keycloak_openid.token("bgates", "123")
rpt = keycloak_openid.entitlement(token['access_token'], "resource_id")
# Instropect RPT
token_rpt_info = keycloak_openid.introspect(
    keycloak_openid.introspect(
        token['access_token'], 
        rpt=rpt['rpt'],
        token_type_hint="requesting_party_token"
        )
    )
# Introspect Token
token_info = keycloak_openid.introspect(token['access_token'])
# Decode Token
# import jwt, json
# from jwt.algorithms import RSAAlgorithm
# jwk = json.dumps(certs['keys'])
# KEYCLOAK_PUBLIC_KEY = RSAAlgorithm.from_jwk(jwk)
# decoded = jwt.decode(IDjwt, KEYCLOAK_PUBLIC_KEY, algorithms='RS256')
KEYCLOAK_PUBLIC_KEY = ''
options = {"verify_signature": True, "verify_aud": True, "exp": True}
token_info = keycloak_openid.decode_token(token['access_token'], key=KEYCLOAK_PUBLIC_KEY, options=options)
# Get permissions by token
token = keycloak_openid.token("bgates", "123")
keycloak_openid.load_authorization_config("example-authz-config.json")
policies = keycloak_openid.get_policies(token['access_token'], method_token_info='decode', key=KEYCLOAK_PUBLIC_KEY)
permissions = keycloak_openid.get_permissions(token['access_token'], method_token_info='introspect')
```

```python
from keycloak import KeycloakOpenID
keycloak_openid = KeycloakOpenID(
    server_url="http://localhost:8080/auth/",
    realm_name="datalayer",
    client_id="admin-cli",
    verify=True
    )
token = keycloak_openid.token('echarles', '123')    
```

```python
# KEYCLOAK ADMIN
from keycloak import KeycloakAdmin
keycloak_admin = KeycloakAdmin(
    server_url="http://localhost:8080/auth/",
    realm_name="datalayer",
    client_id='admin-cli',
    username='echarles',
    password='123',
    verify=True,
    )
# Add user
new_user = keycloak_admin.create_user({
    "email": "example@example.com",
    "username": "example@example.com",
    "enabled": True,
    "firstName": "Example",
    "lastName": "Example",
    "realmRoles": ["user_default", ],
    "attributes": {"example": "1,2,3,3,"}
    })
# Add user and set password
new_user = keycloak_admin.create_user({
        "email": "example@example.com",
        "username": "example@example.com",
        "enabled": True,
        "firstName": "Example",
        "lastName": "Example",
        "credentials": [{"value": "secret","type": "123",}],
        "realmRoles": ["user_default", ],
        "attributes": {"example": "1,2,3,3,"}
    })
# User counter
count_users = keycloak_admin.users_count()
# Get users Returns a list of users, filtered according to query parameters
users = keycloak_admin.get_users({})
# Get user ID from name
user-id-keycloak = keycloak_admin.get_user_id("example@example.com")
# Get User
user = keycloak_admin.get_user("user-id-keycloak")
# Update User
response = keycloak_admin.update_user(
    user_id="user-id-keycloak",
    payload={'firstName': 'Example Update'}
    )
# Update User Password
response = set_user_password(user_id="user-id-keycloak", password="secret", temporary=True)
# Delete User
response = keycloak_admin.delete_user(user_id="user-id-keycloak")
# Get consents granted by the user
consents = keycloak_admin.consents_user(user_id="user-id-keycloak")
# Send User Action
response = keycloak_admin.send_update_account(
    user_id="user-id-keycloak",
    payload=json.dumps(['UPDATE_PASSWORD'])
    )
# Send Verify Email
response = keycloak_admin.send_verify_email(user_id="user-id-keycloak")
# Get sessions associated with the user
sessions = keycloak_admin.get_sessions(user_id="user-id-keycloak")
# Get themes, social providers, auth providers, and event listeners available on this server
server_info = keycloak_admin.get_server_info()
# Get clients belonging to the realm Returns a list of clients belonging to the realm
clients = keycloak_admin.get_clients()
# Get client - id (not client-id) from client by name
client_id=keycloak_admin.get_client_id("my-client")
# Get representation of the client - id of client (not client-id)
client = keycloak_admin.get_client(client_id="client_id")
# Get all roles for the realm or client
realm_roles = keycloak_admin.get_realm_roles()
# Get all roles for the client
client_roles = keycloak_admin.get_client_roles(client_id="client_id")
# Get client role
role = keycloak_admin.get_client_role(client_id="client_id", role_name="role_name")
# Warning: Deprecated
# Get client role id from name
role_id = keycloak_admin.get_client_role_id(client_id="client_id", role_name="test")
# Create client role
keycloak_admin.create_client_role(client_id="client_id", {'name': 'roleName', 'clientRole': True})
# Get client role id from name
role_id = keycloak_admin.get_client_role_id(client_id=client_id, role_name="test")
# Get all roles for the realm or client
realm_roles = keycloak_admin.get_roles()
# Assign client role to user. Note that BOTH role_name and role_id appear to be required.
keycloak_admin.assign_client_role(client_id="client_id", user_id="user_id", role_id="role_id", role_name="test")
# Create new group
group = keycloak_admin.create_group(name="Example Group")
# Get all groups
groups = keycloak_admin.get_groups()
# Get group
group = keycloak_admin.get_group(group_id='group_id')
# Get group by path
group = keycloak_admin.get_group_by_path(path='/group/subgroup', search_in_subgroups=True)
# Function to trigger user sync from provider
sync_users(storage_id="storage_di", action="action")
```

## pycloak

+ [pycloak](https://gitlab.com/josh-cain/pycloak).

```python
import pycloak.admin
import pycloak.auth

session = pycloak.auth.AuthSession('admin', 'password')
admin = pycloak.admin.Admin(session)

#admin.realms
master = admin.realm('master')
master.clients
```

## python-keycloak-client

```bash
# https://python-keycloak-client.readthedocs.io/en/latest
# https://github.com/Peter-Slump/python-keycloak-client
pip install python-keycloak-client[aio]
```

```python
from keycloak.aio.realm import KeycloakRealm

async def main(loop=None):
    realm_params = dict(
        server_url='http://localhost:8080',
        realm_name='datalayer',
        loop=loop
    )
    async with KeycloakRealm(**realm_params) as realm:
        print(realm.realm_name)
        authz_client = await realm.authz(client_id='datalayer')
        print(authz_client)
        uma_client = realm.uma()

if __name__ == '__main__':
    import asyncio
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main(loop))
```

```python
from keycloak.aio.realm import KeycloakRealm

async def main(loop=None):
    realm_params = dict(
        server_url='http://localhost:8080',
        realm_name='datalayer',
        loop=loop
    )
    async with KeycloakRealm(**realm_params) as realm:
        oidc_client = await realm.open_id_connect(
            client_id='datalayer',
            client_secret='3426a2d6-a7f5-44cd-9ca9-23f0380de554'
        )
        print(oidc_client)

if __name__ == '__main__':
    import asyncio
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main(loop))
```

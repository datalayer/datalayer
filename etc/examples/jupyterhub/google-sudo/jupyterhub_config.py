import os

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex('c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')
c.JupyterHub.confirm_no_ssl =True
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'

# --- Users ---
c.Authenticator.admin_users = {os.environ['USER'], 'eric.charles2@gmail.com'}
c.Authenticator.whitelist = {os.environ['USER'], 'eric.charles2@gmail.com'}

# --- Authenticator ---
from oauthenticator.google import GoogleOAuthenticator
c.JupyterHub.authenticator_class = GoogleOAuthenticator
c.GoogleOAuthenticator.oauth_callback_url = 'http://localhost:8000/hub/oauth_callback'
c.GoogleOAuthenticator.client_id = '448379464054-3a3oeofpsvin51988i9m90u79kej4a9k.apps.googleusercontent.com'
c.GoogleOAuthenticator.client_secret = 'hb9gex2oV4xgnMGexjYct6dq'

# --- Spawner ---
c.JupyterHub.spawner_class='sudospawner.SudoSpawner'
c.SudoSpawner.default_url = '/lab'


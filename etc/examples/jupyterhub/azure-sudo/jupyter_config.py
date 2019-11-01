import os

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex('c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')
c.JupyterHub.confirm_no_ssl = False
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'
c.Application.log_level = 'DEBUG'

# --- Users ---
c.Authenticator.admin_users = { os.environ['USER'] }
c.Authenticator.whitelist = set()

# --- Authenticator ---
import os

from oauthenticator.azuread import AzureAdOAuthenticator
c.JupyterHub.authenticator_class = AzureAdOAuthenticator

c.AzureAdOAuthenticator.tenant_id = os.environ.get('AAD_TENANT_ID')

c.AzureAdOAuthenticator.oauth_callback_url = 'http://{your-domain}/hub/oauth_callback'
c.AzureAdOAuthenticator.client_id = '{AAD-APP-CLIENT-ID}'
c.AzureAdOAuthenticator.client_secret = '{AAD-APP-CLIENT-SECRET}'

# --- Spawner ---
c.JupyterHub.spawner_class='sudospawner.SudoSpawner'
c.SudoSpawner.default_url = '/lab'

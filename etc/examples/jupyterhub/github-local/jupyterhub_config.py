import os

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex('c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')
c.JupyterHub.confirm_no_ssl = True
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'

# --- Users ---
c.Authenticator.admin_users = { os.environ['USER'], 'echarles' }
c.Authenticator.whitelist = { os.environ['USER'], 'echarles' }

# --- Authenticator ---
c.JupyterHub.authenticator_class = 'oauthenticator.LocalGitHubOAuthenticator'
c.GitHubOAuthenticator.client_id = os.environ['DLA_GITHUB_CLIENT_ID']
c.GitHubOAuthenticator.client_secret = os.environ['DLA_GITHUB_CLIENT_SECRET']
c.GitHubOAuthenticator.oauth_callback_url =  os.environ['DLA_GITHUB_OAUTH_CALLBACK_URL']
c.LocalAuthenticator.create_system_users = True

# https://github.com/jupyterhub/jupyterhub/issues/1405
c.LocalGitHubOAuthenticator.username_map = {
    'echarles': os.environ['USER'],
}

# --- Spawner ---
# See https://github.com/jupyterhub/jupyterhub/issues/853 can not spawn server if logged in via OAuth
# See https://github.com/globocom/jupyterhub_oauth_spawner
"""
from jupyterhub.spawner import LocalProcessSpawner
class SameUserSpawner(LocalProcessSpawner):
    \"""Local spawner that runs single-user servers as the same user as the Hub itself.

    Overrides user-specific env setup with no-ops.
    \"""
    
    def make_preexec_fn(self, name):
        \"""no-op to avoid setuid\"""
        return lambda : None
    
    def user_env(self, env):
        \"""no-op to avoid setting HOME dir, etc.\""" 
        return env

c.JupyterHub.spawner_class = SameUserSpawner
"""

# c.JupyterHub.spawner_class = 'jupyterhub.spawner.LocalProcessSpawner'

from jupyterhub_oauth_spawner.oauth_spawner import OAuthSpawner
c.JupyterHub.spawner_class = OAuthSpawner

c.Spawner.default_url = '/lab'

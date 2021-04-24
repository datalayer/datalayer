import os

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex(os.environ['DLA_JHUB_COOKIE_SECRET'])
c.JupyterHub.confirm_no_ssl = True
c.JupyterHub.log_level = 'DEBUG'

# -- Admin ---
c.JupyterHub.admin_access = True

# --- ConfigurableHTTPProxy ---
c.ConfigurableHTTPProxy.auth_token = os.environ['DLA_JHUB_HTTP_PROXY_AUTH_TOKEN']
c.ConfigurableHTTPProxy.pid_file = '/tmp/jupyterhub-proxy.pid'

# --- Database ---
c.JupyterHub.db_url = ':memory:'

# --- Users ---
c.Authenticator.admin_users = { os.environ['USER'], 'datalayer' }
# c.Authenticator.whitelist = { os.environ['USER'], 'datalayer' }

# --- Authenticator ---
c.JupyterHub.authenticator_class = 'oauthenticator.LocalGitHubOAuthenticator'
c.GitHubOAuthenticator.client_id = os.environ['DLA_GITHUB_CLIENT_ID']
c.GitHubOAuthenticator.client_secret = os.environ['DLA_GITHUB_CLIENT_SECRET']
c.GitHubOAuthenticator.oauth_callback_url =  os.environ['DLA_GITHUB_OAUTH_CALLBACK_URL']
c.LocalAuthenticator.create_system_users = False

# https://github.com/jupyterhub/jupyterhub/issues/1405
# c.LocalGitHubOAuthenticator.username_map = {
#     'datalayer': os.environ['USER'],
# }

# --- Spawner ---
c.JupyterHub.spawner_class = 'jupyterhub.spawner.LocalProcessSpawner'
# c.Spawner.notebook_dir = '~/notebooks'
# c.Spawner.args = ['--debug', '--profile=PHYS131']
# c.Spawner.args = ['--NotebookApp.default_url=/notebooks/Welcome.ipynb']
# Enable debug-logging of the single-user server
c.Spawner.debug = False
c.Spawner.default_url = '/lab'
c.Spawner.cmd = ["jupyter-labhub"]
# Enable debug-logging of the single-user server
c.LocalProcessSpawner.debug = False
# See https://github.com/jupyterhub/jupyterhub/issues/853 can not spawn server if logged in via OAuth
# See https://github.com/globocom/jupyterhub_oauth_spawner
from jupyterhub.spawner import LocalProcessSpawner
class SameUserSpawner(LocalProcessSpawner):
    # Local spawner that runs single-user servers as the same user as the Hub itself. Overrides user-specific env setup with no-ops.
    def make_preexec_fn(self, name):
        # no-op to avoid setuid
        return lambda : None
    def user_env(self, env):
        # no-op to avoid setting HOME dir, etc.
        return env

c.JupyterHub.spawner_class = SameUserSpawner
# c.JupyterHub.spawner_class = 'jupyterhub.spawner.LocalProcessSpawner'
# from jupyterhub_oauth_spawner.oauth_spawner import OAuthSpawner
# c.JupyterHub.spawner_class = OAuthSpawner
# c.Spawner.default_url = '/lab'

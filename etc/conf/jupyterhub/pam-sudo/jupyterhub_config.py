import os

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex('c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'
c.JupyterHub.confirm_no_ssl = False

# --- Users ---
c.Authenticator.whitelist = set()
c.Authenticator.admin_users = { os.environ['USER'] }

# --- Authenticator ---
from jupyterhub.auth import PAMAuthenticator
c.JupyterHub.authenticator_class = PAMAuthenticator

# --- Spawner ---
c.JupyterHub.spawner_class='sudospawner.SudoSpawner'
c.Spawner.notebook_dir = '~/notebooks'
c.SudoSpawner.default_url = '/lab'
c.Spawner.args = ['--debug']
# c.Spawner.args = ['--NotebookApp.default_url=/notebooks/Welcome.ipynb']
# Enable debug-logging of the single-user server
c.Spawner.debug = True
# Enable debug-logging of the single-user server
c.LocalProcessSpawner.debug = True

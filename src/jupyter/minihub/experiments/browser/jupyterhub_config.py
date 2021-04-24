import getpass

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex('c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'
c.ConfigurableHTTPProxy.pid_file = '/tmp/jupyterhub-proxy.pid'

# --- Database ---
c.JupyterHub.db_url = ':memory:'

# --- Users ---
c.Authenticator.whitelist = set()
c.Authenticator.admin_users = { getpass.getuser() }

# --- Authenticator ---
from jupyterhub.auth import PAMAuthenticator
c.JupyterHub.authenticator_class = PAMAuthenticator

# --- Spawner ---
# c.JupyterHub.spawner_class='sudospawner.SudoSpawner'
c.JupyterHub.spawner_class='jupyterhub.spawner.LocalProcessSpawner'
# c.Spawner.notebook_dir = '~/notebooks'
# c.Spawner.args = ['--debug', '--profile=PHYS131']
# c.Spawner.args = ['--NotebookApp.default_url=/notebooks/Welcome.ipynb']
c.Spawner.debug = True
# c.Spawner.default_url = '/tree'           
c.Spawner.default_url = '/lab'
c.Spawner.cmd = ['jupyter-labhub']

# --- Services ---
import sys
c.JupyterHub.services = [
    {
        'name': 'api-browser',
        'url': 'http://localhost:10000',
        'admin': True,
        'command': [sys.executable, './services/jupyterhub_api_browser.py'],
    },
]

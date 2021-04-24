import os

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex(os.environ['DLA_JHUB_COOKIE_SECRET'])
c.JupyterHub.confirm_no_ssl = True
c.JupyterHub.log_level = 'DEBUG'

# --- ConfigurableHTTPProxy ---
c.ConfigurableHTTPProxy.pid_file = '/tmp/jupyterhub-proxy.pid'
c.ConfigurableHTTPProxy.auth_token = os.environ['DLA_JHUB_HTTP_PROXY_AUTH_TOKEN']

# --- Database ---
c.JupyterHub.db_url = ':memory:'

# --- Users ---
c.Authenticator.admin_users = { os.environ['USER'] }
c.Authenticator.whitelist = { os.environ['USER'] }

# --- Authenticator ---
from jupyterhub.auth import PAMAuthenticator
c.JupyterHub.authenticator_class = PAMAuthenticator
# c.PAMAuthenticator.open_sessions = False

# --- Spawner ---
c.JupyterHub.spawner_class = 'jupyterhub.spawner.LocalProcessSpawner'
# c.Spawner.notebook_dir = '~/notebooks'
# c.Spawner.args = ['--debug', '--profile=PHYS131']
# c.Spawner.args = ['--NotebookApp.default_url=/notebooks/Welcome.ipynb']
# Enable debug-logging of the single-user server
# c.Spawner.debug = True
c.Spawner.debug = False
c.Spawner.default_url = '/lab'
c.Spawner.cmd = ["jupyter-labhub"]
# Enable debug-logging of the single-user server
c.LocalProcessSpawner.debug = False

"""
c = get_config()

pjoin = os.path.join

runtime_dir = os.path.join('/srv/jupyterhub')
ssl_dir = pjoin(runtime_dir, 'ssl')
if not os.path.exists(ssl_dir):
    os.makedirs(ssl_dir)

# Allows multiple single-server per user
c.JupyterHub.allow_named_servers = True

# https on :443
c.JupyterHub.port = 443
c.JupyterHub.ssl_key = pjoin(ssl_dir, 'ssl.key')
c.JupyterHub.ssl_cert = pjoin(ssl_dir, 'ssl.cert')

# put the JupyterHub cookie secret and state db
# in /var/run/jupyterhub
c.JupyterHub.cookie_secret_file = pjoin(runtime_dir, 'cookie_secret')
c.JupyterHub.db_url = pjoin(runtime_dir, 'jupyterhub.sqlite')
# or `--db=/path/to/jupyterhub.sqlite` on the command-line
"""

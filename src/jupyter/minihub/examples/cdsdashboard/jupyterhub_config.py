import os

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex(os.environ['DLA_JHUB_COOKIE_SECRET'])
c.JupyterHub.confirm_no_ssl = True
c.JupyterHub.log_level = 'DEBUG'

# --- ConfigurableHTTPProxy ---
c.ConfigurableHTTPProxy.pid_file = '/tmp/jupyterhub-proxy.pid'
c.ConfigurableHTTPProxy.auth_token = os.environ['DLA_JHUB_HTTP_PROXY_AUTH_TOKEN']

# --- Database ---
# c.JupyterHub.db_url = ':memory:'

# --- Users ---
c.Authenticator.admin_users = { os.environ['USER'] }
c.Authenticator.whitelist = { os.environ['USER'] }

# --- Authenticator ---
from jupyterhub.auth import PAMAuthenticator
c.JupyterHub.authenticator_class = PAMAuthenticator
# c.PAMAuthenticator.open_sessions = False

# --- Spawner ---
c.JupyterHub.spawner_class = 'cdsdashboards.hubextension.spawners.VariableLocalProcessSpawner'
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

c.JupyterHub.allow_named_servers = True

c.CDSDashboardsConfig.builder_class = 'cdsdashboards.builder.processbuilder.ProcessBuilder'

from cdsdashboards.app import CDS_TEMPLATE_PATHS
from cdsdashboards.hubextension import cds_extra_handlers

c.JupyterHub.template_paths = CDS_TEMPLATE_PATHS
c.JupyterHub.extra_handlers = cds_extra_handlers
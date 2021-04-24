import os

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex(os.environ['DLA_JHUB_COOKIE_SECRET'])
c.JupyterHub.confirm_no_ssl = True
c.JupyterHub.log_level = 'DEBUG'

# Allows multiple single-server per user
c.JupyterHub.allow_named_servers = True

# --- ConfigurableHTTPProxy ---
c.ConfigurableHTTPProxy.pid_file = '/tmp/jupyterhub-proxy.pid'
c.ConfigurableHTTPProxy.auth_token = os.environ['DLA_JHUB_HTTP_PROXY_AUTH_TOKEN']

# --- Database ---
c.JupyterHub.db_url = ':memory:'

# --- Users ---
c.Authenticator.admin_users = set()
c.Authenticator.whitelist = {os.environ['USER']}

# --- Authenticator ---
from jupyterhub.auth import PAMAuthenticator
c.JupyterHub.authenticator_class = PAMAuthenticator

# --- Spawner ---
c.JupyterHub.spawner_class = 'dockerspawner.DockerSpawner'
# c.DockerSpawner.image = 'datalayer/jupyterlab-hub:${DLAVERSION}'
c.DockerSpawner.image = 'jupyterhub/singleuser:1.3.0'
c.DockerSpawner.default_url = '/lab'
c.DockerSpawner.remove_containers = True
c.Spawner.environment = { 'DATALAYER_GITHUB_TOKEN': os.environ['DLA_GITHUB_TOKEN']}
c.Spawner.cmd = ['jupyter-labhub']
from jupyter_client.localinterfaces import public_ips
c.JupyterHub.hub_ip = public_ips()[0]

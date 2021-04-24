import os

# --- Database ---
c.JupyterHub.db_url = ':memory:'

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex('c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')
c.JupyterHub.confirm_no_ssl = True
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'

# --- Users ---
c.Authenticator.admin_users = { os.environ['USER'] }
c.Authenticator.whitelist = { os.environ['USER'] }

# --- Authenticator ---
from jupyterhub.auth import DummyAuthenticator
c.JupyterHub.authenticator_class = DummyAuthenticator
c.DummyAuthenticator.password = "123"

# --- Spawner ---
c.JupyterHub.spawner_class = 'dockerspawner.DockerSpawner'
# c.DockerSpawner.image = 'datalayer/jupyterlab-hub:${DLAVERSION}'
c.JupyterHub.allow_named_servers = True
c.DockerSpawner.image = 'jupyterhub/singleuser:1.2'
c.DockerSpawner.default_url = '/lab'
c.DockerSpawner.remove_containers = True
c.Spawner.environment = { 'DATALAYER_GITHUB_TOKEN': os.environ.get('DLA_GITHUB_TOKEN', None)}
# c.Spawner.cmd = ['jupyter-labhub']
from jupyter_client.localinterfaces import public_ips
c.JupyterHub.hub_ip = public_ips()[0]

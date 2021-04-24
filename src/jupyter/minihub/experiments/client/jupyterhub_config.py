import os, sys

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex('c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')
c.JupyterHub.confirm_no_ssl = True
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'

# --- Database ---
c.JupyterHub.db_url = ':memory:'

# --- Users ---
c.Authenticator.admin_users = { os.environ['USER'] }
c.Authenticator.allowed_users = { os.environ['USER'] }

# --- Tokens ---
c.JupyterHub.api_tokens = {
    'ce39a9ee14cf71df9408e72a7033ae5d19e22cbed23f8bd1bef4c2221182fa19': os.environ['USER'],
}

# --- Authenticator ---
from jupyterhub.auth import DummyAuthenticator
c.JupyterHub.authenticator_class = DummyAuthenticator
c.DummyAuthenticator.password = "123"

# --- Spawner ---
c.JupyterHub.spawner_class = 'dockerspawner.DockerSpawner'
c.JupyterHub.allow_named_servers = True
c.DockerSpawner.image = 'jupyterhub/singleuser:1.2'
c.DockerSpawner.default_url = '/lab'
c.DockerSpawner.remove_containers = True
from jupyter_client.localinterfaces import public_ips
c.JupyterHub.hub_ip = public_ips()[0]

# --- API ---
c.JupyterHub.service_tokens = {
    '6bb19ca642dd47f5bfe7973b5a9d94b9': os.environ['USER'],
}

# --- Services ---
c.JupyterHub.last_activity_interval = 30
c.JupyterHub.services = [
    {
        'name': 'cull-idle',
        'admin': True,
        'command': [sys.executable, 'cull_idle_servers.py', '--timeout=60', '--max-age=60'],
    }
]

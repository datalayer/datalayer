# Example for a Spawner.pre_spawn_hook
# create a directory for the user before the spawner starts

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex('c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')
c.JupyterHub.confirm_no_ssl = True
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'

# --- Users ---
c.Authenticator.admin_users = { os.environ['USER'] }
c.Authenticator.whitelist = { os.environ['USER'] }

# --- Authenticator ---
from jupyterhub.auth import PAMAuthenticator
c.JupyterHub.authenticator_class = PAMAuthenticator
# c.PAMAuthenticator.open_sessions = False

import os
def create_dir_hook(spawner):
    username = spawner.user.name # get the username
    volume_path = os.path.join('/volumes/jupyterhub', username)
    if not os.path.exists(volume_path):
        os.mkdir(volume_path, 0o755)
        # now do whatever you think your user needs
        # ...

# attach the hook function to the spawner
c.Spawner.pre_spawn_hook = create_dir_hook

# Use the DockerSpawner to serve your users' notebooks
c.JupyterHub.spawner_class = 'dockerspawner.DockerSpawner'
from jupyter_client.localinterfaces import public_ips
c.JupyterHub.hub_ip = public_ips()[0]
c.DockerSpawner.hub_ip_connect = public_ips()[0]
c.DockerSpawner.container_ip = "0.0.0.0"

# You can now mount the volume to the docker container as we've
# made sure the directory exists
c.DockerSpawner.volumes = { '/volumes/jupyterhub/{username}/': '/home/jovyan/work' }


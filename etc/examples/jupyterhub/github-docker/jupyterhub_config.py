import os

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex('c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'
c.JupyterHub.confirm_no_ssl = True

# OAuth with GitHub
c.JupyterHub.authenticator_class = 'oauthenticator.LocalGitHubOAuthenticator'
c.GitHubOAuthenticator.client_id = os.environ['DLA_GITHUB_CLIENT_ID']
c.GitHubOAuthenticator.client_secret = os.environ['DLA_GITHUB_CLIENT_SECRET']
c.GitHubOAuthenticator.oauth_callback_url =  os.environ['DLA_GITHUB_OAUTH_CALLBACK_URL']
c.LocalAuthenticator.create_system_users = True

c.Authenticator.admin_users = admin = { 'echarles' }
c.Authenticator.whitelist = whitelist = { 'echarles' }

# https://github.com/jupyterhub/jupyterhub/issues/1405
c.LocalGitHubOAuthenticator.username_map = {
    'echarles': os.environ['USER'],
}

# --- Spawner ---
from dockerspawner import DockerSpawner
c.JupyterHub.spawner_class = DockerSpawner
c.DockerSpawner.image = 'jupyterhub/singleuser:0.9'
c.DockerSpawner.default_url = '/lab'
# The docker instances need access to the Hub, so the default loopback port doesn't work:
from jupyter_client.localinterfaces import public_ips
c.JupyterHub.hub_ip = public_ips()[0]

join = os.path.join
here = os.path.dirname(__file__)
with open(join(here, 'userlist')) as f:
    for line in f:
        print(line)
        if not line:
            continue
        parts = line.split()
        name = parts[0]
        whitelist.add(name)
        if len(parts) > 1 and parts[1] == 'admin':
            admin.add(name)

# ssl config
ssl = join(here, 'ssl')
keyfile = join(ssl, 'ssl.key')
certfile = join(ssl, 'ssl.cert')
if os.path.exists(keyfile):
    c.JupyterHub.ssl_key = keyfile
if os.path.exists(certfile):
    c.JupyterHub.ssl_cert = certfile

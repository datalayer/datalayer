import os

pjoin = os.path.join
log_dir = os.path.join(os.environ['$EXPHOME' + '/var/log')
runtime_dir = os.path.join(os.environ['$EXPHOME' + '/srv/jupyterhub')

# --- Common ---
c.JupyterHub.confirm_no_ssl = False
c.ConfigurableHTTPProxy.auth_token = pjoin(runtime_dir, 'jupyterhub_auth_token')
c.JupyterHub.cookie_secret_file = pjoin(runtime_dir, 'jupyterhub_cookie_secret')
c.JupyterHub.db_url = pjoin(runtime_dir, 'datalayer.sqlite')
# Deprecated.
c.JupyterHub.extra_log_file = pjoin(log_dir, 'datalayer.log')

# --- Users ---
c.Authenticator.admin_users = {'datalayer', 'admin'}
c.Authenticator.whitelist = set()

# --- Authenticator ---
c.JupyterHub.authenticator_class = 'ldapauthenticator.LDAPAuthenticator'
c.LDAPAuthenticator.server_address = 'localhost'
c.LDAPAuthenticator.bind_dn_template = [
    'cn={username},ou=Users,dc=datalayer,dc=io'
]

# --- Spawner ---
c.JupyterHub.spawner_class = 'dockerspawner.DockerSpawner'
c.DockerSpawner.image = 'datalayer/jupyterlab-hub:${DLAVERSION}'
c.DockerSpawner.default_url = '/lab'
c.DockerSpawner.remove_containers = True
c.Spawner.environment = {
    'DATALAYER_TWITTER_CONSUMER_KEY': os.environ['DATALAYER_TWITTER_CONSUMER_KEY'],
    'DATALAYER_TWITTER_CONSUMER_SECRET': os.environ['DATALAYER_TWITTER_CONSUMER_SECRET'],
    'DATALAYER_TWITTER_OAUTH_CALLBACK_URL': os.environ['DATALAYER_TWITTER_OAUTH_CALLBACK_URL'],
}
# c.Spawner.args = [
#    '--debug',
#    '--profile=PHYS131',
#    '--NotebookApp.default_url=/notebooks/Welcome.ipynb',
#    '--NotebookApp.session_manager_class=nb2kg.managers.SessionManager',
#    '--NotebookApp.kernel_manager_class=nb2kg.managers.RemoteKernelManager',
#    '--NotebookApp.kernel_spec_manager_class=nb2kg.managers.RemoteKernelSpecManager',
# ]
# c.Spawner.notebook_dir = '~/notebooks'
c.Spawner.cmd = ['jupyter-labhub']
c.Spawner.mem_limit = '1G'
c.Spawner.cpu_limit = 0.5
from jupyter_client.localinterfaces import public_ips
c.JupyterHub.hub_ip = public_ips()[0]

# --- Services ---
c.JupyterHub.services = [
    {
        'name': 'cull-idle',
        'admin': True,
        'command': 'python {}/etc/services/jupyterhub/cull-idle/cull_idle_servers.py --timeout=3600'.format(os.environ['EXPHOME']).split(),
    },
]

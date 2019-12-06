import json, os, urllib

from tornado.auth import OAuth2Mixin
from tornado import gen, web
from tornado.httputil import url_concat
from tornado.httpclient import HTTPRequest, AsyncHTTPClient

from jupyterhub.auth import LocalAuthenticator
from jupyterhub.handlers import LogoutHandler
from jupyterhub.utils import url_path_join

from oauthenticator.oauth2 import OAuthLoginHandler, OAuthenticator

class KeycloakMixin(OAuth2Mixin):

    oidc_server_host = os.getenv('DLA_KEYCLOAK_SCHEME_HOST')

    _OAUTH_AUTHORIZE_URL = "{}/auth/realms/datalayer/protocol/openid-connect/auth".format(oidc_server_host)
    _OAUTH_ACCESS_TOKEN_URL = "{}/auth/realms/datalayer/protocol/openid-connect/token".format(oidc_server_host)
    _OAUTH_LOGOUT_URL = "{}/auth/realms/datalayer/protocol/openid-connect/logout".format(oidc_server_host)
    _OAUTH_USERINFO_URL = "{}/auth/realms/datalayer/protocol/openid-connect/userinfo".format(oidc_server_host)

class KeycloakLoginHandler(OAuthLoginHandler, KeycloakMixin):
    pass

class KeycloakLogoutHandler(LogoutHandler, KeycloakMixin):
    def get(self):
#                self.request.protocol, self.request.host,
        params = dict(
            redirect_uri="%s://%s%slogout" % (
                'https', self.request.host,
                self.hub.server.base_url)
        )
        logout_url = KeycloakMixin._OAUTH_LOGOUT_URL
        logout_url = url_concat(logout_url, params)
        self.redirect(logout_url, permanent=False)

class KeycloakOAuthenticator(OAuthenticator, KeycloakMixin):
    login_service = "Datalayer"
    login_handler = KeycloakLoginHandler

    def check_whitelist(self, username, authentication=None):
        self.log.info('Checking whilelist for username: %r', username)
        return True

    def logout_url(self, base_url):
        return url_path_join(base_url, 'oauth_logout')

    def get_handlers(self, app):
        handlers = OAuthenticator.get_handlers(self, app)
        handlers.extend([(r'/oauth_logout', KeycloakLogoutHandler)])
        return handlers

    @gen.coroutine
    def authenticate(self, handler, data=None):
        code = handler.get_argument("code", False)
        if not code:
            raise web.HTTPError(400, "oauth callback made without a token")
        http_client = AsyncHTTPClient()
        params = dict(
            grant_type='authorization_code',
            code=code,
            redirect_uri=self.get_callback_url(handler),
        )
        token_req = HTTPRequest(
            KeycloakMixin._OAUTH_ACCESS_TOKEN_URL,
            method="POST",
            headers={
                "Accept": "application/json",
                 "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            auth_username = self.client_id,
            auth_password = self.client_secret,
            body = urllib.parse.urlencode(params).encode('utf-8'),
            )
        token_res = yield http_client.fetch(token_req)
        token_res_json = json.loads(token_res.body.decode('utf8', 'replace'))
        access_token = token_res_json['access_token']
        if not access_token:
            raise web.HTTPError(400, "failed to get access token")
        self.log.info('oauth token: %r', access_token)
        user_info_req = HTTPRequest(
            KeycloakMixin._OAUTH_USERINFO_URL,
            method="GET",
            headers={
                "Accept": "application/json",
                "Authorization": "Bearer {}".format(access_token)
                },
            )
#        self.log.info('user_info_req: {}: '.format(user_info_req))
        user_info_res = yield http_client.fetch(user_info_req)
#        self.log.info('user_info_res: {}: '.format(user_info_res))
        user_info_res_json = json.loads(user_info_res.body.decode('utf8', 'replace'))
        self.log.info('user_info_res_json: {}: '.format(user_info_res_json))
#        return user_info_res_json['preferred_username']
        return {
            'name': user_info_res_json['preferred_username'],
            'auth_state': {
                'upstream_token': user_info_res_json,
            },
        }

    @gen.coroutine
    def pre_spawn_start(self, user, spawner):
        """Pass upstream_token to spawner via environment variable"""
        auth_state = yield user.get_auth_state()
        self.log.info('pre_spawn_start auth_state: {}: '.format(auth_state))
        if not auth_state:
            # auth_state not enabled
            return
#        spawner.environment['OPENID_USER_INFO'] = json.loads(json.dumps(auth_state['upstream_token']))
        spawner.environment['OPENID_USER_INFO'] = json.dumps(auth_state['upstream_token'])

class LocalKeycloakOAuthenticator(LocalAuthenticator, KeycloakOAuthenticator):
    """A version that mixes in local system user creation"""
    pass

# --- ---
c.JupyterHub.base_url = '/jupyterhub'

# --- ---
c.JupyterHub.hub_ip = 'jupyterhub'
c.JupyterHub.port = 8000

# --- ---
# Persist hub data on volume mounted inside container
data_dir = '/data'
c.JupyterHub.cookie_secret_file = os.path.join(data_dir, 'jupyterhub_cookie_secret')

# --- ---
c.JupyterHub.db_url = 'postgresql://postgres:{password}@{host}/{db}'.format(
    host=os.environ.get('DLA_JUYPYERHUB_POSTGRES_HOST', 'jupyterhub-db'),
    db=os.environ.get('DLA_JUYPYERHUB_POSTGRES_DB', 'jupyterhub'),
    password=os.environ.get('DLA_JUPYTERHUB_DB_PWD', 'password'),
)

# --- Proxy ---
c.ConfigurableHTTPProxy.api_url  = 'http://localhost:8002'

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex('c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')
c.JupyterHub.confirm_no_ssl = True
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'

# --- Authenticator ---
c.JupyterHub.authenticator_class = KeycloakOAuthenticator
c.KeycloakOAuthenticator.client_id = 'datalayer'
c.KeycloakOAuthenticator.client_secret = os.getenv('DLA_KEYCLOAK_REALM_CLIENT_SECRET')
c.OAuthenticator.oauth_callback_url = os.getenv('DLA_JUPYTERHUB_AUTH_CALLBACK')
c.Authenticator.enable_auth_state = True
# c.KeycloakOAuthenticator.enable_auth_state = True
c.Authenticator.auto_login = True
c.LocalAuthenticator.create_system_users = True

c.OAuthenticator.client_id = 'datalayer' # oauth2 client id for your app.
c.OAuthenticator.client_secret = os.getenv('DLA_KEYCLOAK_REALM_CLIENT_SECRET') # oauth2 client secret for your app.

# --- Spawner ---
# from dockerspawner import DockerSpawner
# c.JupyterHub.spawner_class = DockerSpawner

from dockerspawner import SwarmSpawner
from docker.types import Mount

class SwarmSpawnerWithVolume(SwarmSpawner):
    @property
    def mounts(self):
        if len(self.volume_binds):
            driver = self.mount_driver_config
#            for host_loc, vol in self.volume_binds.items():
#                self.log.info('---- {}'.format(host_loc))
#                self.log.info('---- {}'.format(vol))
            return [
                Mount(
                    target=vol["bind"],
                    source=host_loc,
                    type="volume",
                    read_only=vol["mode"] == "ro",
                    driver_config=driver,
                )
                for host_loc, vol in self.volume_binds.items()
            ]

        else:
            return []

c.JupyterHub.spawner_class = SwarmSpawnerWithVolume

c.DockerSpawner.image = os.getenv('DLA_JUPYTERHUB_NOTEBOOK_IMAGE')

c.DockerSpawner.default_url = '/lab'
# spawn_cmd = os.environ.get('DLA_NOTEBOOK_SPAWN_CMD', "start-singleuser.sh --SingleUserNotebookApp.default_url=/lab")
# c.DockerSpawner.extra_create_kwargs.update({ 'command': spawn_cmd })
c.Spawner.cmd = ['jupyter-labhub']

notebook_dir = os.environ.get('DLA_JUPYTERHUB_NOTEBOOK_DIR', '/home/jovyan/work')
c.DockerSpawner.notebook_dir = notebook_dir

# The docker instances need access to the Hub, so the default loopback port doesn't work.
# from jupyter_client.localinterfaces import public_ips
# c.JupyterHub.hub_ip = public_ips()[0]
c.JupyterHub.hub_ip = '0.0.0.0'
c.JupyterHub.hub_connect_ip = 'jupyterhub'

# Connect containers to this Docker network.
# User containers will access hub by container name on the Docker network.
# c.DockerSpawner.use_internal_ip = True
# @see https://github.com/jupyterhub/jupyterhub/issues/2213
network_name = os.environ.get('DLA_DOCKER_NETWORK', 'datalayer')
c.DockerSpawner.network_name = network_name
# Pass the network name as argument to spawned containers.
c.DockerSpawner.extra_host_config = { 'network_mode': network_name }

# Mount the real user's Docker volume on the host to the notebook user's notebook directory in the container.
# c.DockerSpawner.volumes = { 'jupyterhub-user-{username}': notebook_dir }
c.DockerSpawner.volumes = { 'jupyterhub-user-{username}': notebook_dir }

# volume_driver is no longer a keyword argument to create_container()
# c.DockerSpawner.extra_create_kwargs.update({ 'volume_driver': 'local' })

# Spawner environment.
c.Spawner.environment = {
    'DLA_TWITTER_CONSUMER_KEY': os.getenv('DLA_TWITTER_CONSUMER_KEY'),
    'DLA_TWITTER_CONSUMER_SECRET': os.getenv('DLA_TWITTER_CONSUMER_SECRET'),
    'DLA_TWITTER_OAUTH_CALLBACK_URL': os.getenv('DLA_TWITTER_OAUTH_CALLBACK_URL'),
    'DLA_TWITTER_OAUTH_REDIRECT': os.getenv('DLA_TWITTER_OAUTH_REDIRECT'),
    'DLA_SOLR_ZK_HOST': os.getenv('DLA_SOLR_ZK_HOST'),
}

# c.Spawner.args = ['--JupyterApp.config_file={}/etc/jupyterhub/docker/jupyter_notebook_config.py'.format(os.getenv('$DLAHOME'))]
c.Spawner.args = ['--NotebookApp.tornado_settings={"headers":{"Content-Security-Policy": "frame-ancestors *"}}']   
c.JupyterHub.tornado_settings = { 'headers': { 'Content-Security-Policy': "frame-ancestors *"} }
c.NotebookApp.tornado_settings = { 'headers': { 'Content-Security-Policy': "frame-ancestors *"} }

# Remove containers once they are stopped.
c.DockerSpawner.remove_containers = True

# For debugging arguments passed to spawned containers.
c.DockerSpawner.debug = True
c.Spawner.debug = True

# --- Users ---
# Whitelist users and admins.
c.Authenticator.whitelist = whitelist = set()
c.Authenticator.admin_users = admin = set()
c.JupyterHub.admin_access = True
pwd = os.path.dirname(__file__)
with open(os.path.join(pwd, 'userlist')) as f:
    for line in f:
        if not line:
            continue
        parts = line.split()
        # in case of newline at the end of userlist file
        if len(parts) >= 1:
            name = parts[0]
            whitelist.add(name)
            if len(parts) > 1 and parts[1] == 'admin':
                admin.add(name)

# --- Services ---
c.JupyterHub.services = [
    {
        'name': 'cull-idle',
        'admin': True,
        'command': 'python /srv/jupyterhub/cull_idle_servers.py --timeout=10800'.split(),
    },
]

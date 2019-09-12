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

    oidc_server_host = os.getenv('OIDC_SERVER')
    oidc_client_id = os.getenv('OIDC_CLIENT_ID')    

    _OAUTH_AUTHORIZE_URL = "{}/auth/realms/{}/protocol/openid-connect/auth".format(oidc_server_host, oidc_client_id)
    _OAUTH_ACCESS_TOKEN_URL = "{}/auth/realms/{}/protocol/openid-connect/token".format(oidc_server_host, oidc_client_id)
    _OAUTH_LOGOUT_URL = "{}/auth/realms/{}/protocol/openid-connect/logout".format(oidc_server_host, oidc_client_id)
    _OAUTH_USERINFO_URL = "{}/auth/realms/{}/protocol/openid-connect/userinfo".format(oidc_server_host, oidc_client_id)

class KeycloakLoginHandler(OAuthLoginHandler, KeycloakMixin):
    pass

class KeycloakLogoutHandler(LogoutHandler, KeycloakMixin):
    def get(self):
        params = dict(
            redirect_uri="%s://%s%slogout" % (
                self.request.protocol, self.request.host,
                self.hub.server.base_url)
        )
        logout_url = KeycloakMixin._OAUTH_LOGOUT_URL
        logout_url = url_concat(logout_url, params)
        self.redirect(logout_url, permanent=False)

class KeycloakOAuthenticator(OAuthenticator, KeycloakMixin):
    login_service = "OpenID Connect"
    login_handler = KeycloakLoginHandler

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
        token_url = KeycloakMixin._OAUTH_ACCESS_TOKEN_URL
        token_req = HTTPRequest(
            token_url,
            method="POST",
            headers={
                "Accept": "application/json",
                 "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            auth_username = self.client_id,
            auth_password = self.client_secret,
            body = urllib.parse.urlencode(params).encode('utf-8'),
            )
        token_resp = yield http_client.fetch(token_req)
        token_resp_json = json.loads(token_resp.body.decode('utf8', 'replace'))
        access_token = token_resp_json['access_token']
        if not access_token:
            raise web.HTTPError(400, "failed to get access token")
        self.log.info('oauth token: %r', access_token)
        user_info_url = KeycloakMixin._OAUTH_USERINFO_URL
        user_info_req = HTTPRequest(
            user_info_url,
            method="GET",
            headers={
                "Accept": "application/json",
                "Authorization": "Bearer %s" % access_token
                },
            )
        user_info_res = yield http_client.fetch(user_info_req)
        user_info_res_json = json.loads(user_info_res.body.decode('utf8', 'replace'))
        return {
            'name': user_info_res_json['preferred_username'],
            'auth_state': {
                'upstream_token': user_info_res_json,
            },
        }

class LocalKeycloakOAuthenticator(LocalAuthenticator, KeycloakOAuthenticator):
    """A version that mixes in local system user creation"""
    pass

# --- Proxy ---
c.ConfigurableHTTPProxy.api_url = 'http://localhost:8002'

# --- Common ---
c.JupyterHub.base_url = '/jupyterhub'
c.JupyterHub.port = 8080
c.JupyterHub.cookie_secret = bytes.fromhex('c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'
c.JupyterHub.confirm_no_ssl = True
c.Authenticator.enable_auth_state = True

# --- Authenticator ---
c.JupyterHub.authenticator_class = KeycloakOAuthenticator
c.KeycloakOAuthenticator.client_id = os.getenv('OIDC_CLIENT_ID')
c.KeycloakOAuthenticator.client_secret = os.getenv('OIDC_SECRET')
c.Authenticator.auto_login = False
c.LocalAuthenticator.create_system_users = True

# --- Spawner ---
from dockerspawner import DockerSpawner
c.JupyterHub.spawner_class = DockerSpawner
c.DockerSpawner.image = 'jupyterhub/singleuser:0.9'
c.DockerSpawner.default_url = '/lab'
c.Spawner.cmd = ['jupyter-labhub']
# The docker instances need access to the Hub, so the default loopback port doesn't work:
from jupyter_client.localinterfaces import public_ips
c.JupyterHub.hub_ip = public_ips()[0]

# --- Users ---
c.Authenticator.admin_users = { os.environ['USER'] }
c.Authenticator.whitelist = set()
c.JupyterHub.admin_access = True

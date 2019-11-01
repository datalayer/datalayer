import tornado, jwt, json, base64, os.path
import binascii, hashlib, hmac, time, urllib.parse, uuid

from tornado import httpserver, ioloop, web, options, gen, web, httpclient, escape
from tornado.auth import OpenIdMixin, OAuth2Mixin
from tornado.httpclient import HTTPRequest, AsyncHTTPClient
from tornado.httputil import url_concat
from tornado.util import unicode_type
from tornado.web import RequestHandler

from jwt.algorithms import RSAAlgorithm

from typing import Any, Dict, cast

class KeycloakMixin(OAuth2Mixin):

    oidc_server_host = os.getenv('OIDC_SERVER')
    oidc_client_id = os.getenv('OIDC_CLIENT_ID')    

    _OAUTH_AUTHORIZE_URL = "{}/auth/realms/{}/protocol/openid-connect/auth".format(oidc_server_host, oidc_client_id)
    _OAUTH_ACCESS_TOKEN_URL = "{}/auth/realms/{}/protocol/openid-connect/token".format(oidc_server_host, oidc_client_id)
    _OAUTH_LOGOUT_URL = "{}/auth/realms/{}/protocol/openid-connect/logout".format(oidc_server_host, oidc_client_id)
    _OAUTH_USERINFO_URL = "{}/auth/realms/{}/protocol/openid-connect/userinfo".format(oidc_server_host, oidc_client_id)

#    _OAUTH_NO_CALLBACKS = False
#    _OAUTH_SETTINGS_KEY = ""

    async def get_authenticated_user(
        self, redirect_uri: str, code: str
    ) -> Dict[str, Any]:
        oidc_client_id = os.getenv('OIDC_CLIENT_ID')    
#        handler = cast(RequestHandler, self)
        http = self.get_auth_http_client()
        body = urllib.parse.urlencode(
            {
                "redirect_uri": redirect_uri,
                "code": code,
                "client_id": oidc_client_id,
                "client_secret": os.getenv('OIDC_SECRET'),
                "grant_type": "authorization_code",
            }
        )
        response = await http.fetch(
            self._OAUTH_ACCESS_TOKEN_URL,
            method="POST",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            body=body,
        )
        return escape.json_decode(response.body) 

class OidcLoginHandler(tornado.web.RequestHandler, KeycloakMixin):
    async def get(self):
        oidc_client_id = os.getenv('OIDC_CLIENT_ID')
        code = self.get_argument('code', False)
        if code:
            access = await self.get_authenticated_user(
                redirect_uri='http://localhost:{}/login'.format(self.application.settings['port']),
                code=self.get_argument('code')
                )
#            print('access: {}'.format(access))
            access_token = access['access_token']
            if not access_token:
                raise web.HTTPError(400, "failed to get access token")
#            print('oauth token: %r', access_token)
            user_info_req = HTTPRequest(
                KeycloakMixin._OAUTH_USERINFO_URL,
                method="GET",
                headers={
                    "Accept": "application/json",
                    "Authorization": "Bearer {}".format(access_token)
                    },
                )
            http_client = AsyncHTTPClient()
            user_info_res = await http_client.fetch(user_info_req)
            user_info_res_json = json.loads(user_info_res.body.decode('utf8', 'replace'))
            self.set_secure_cookie("user", user_info_res_json['preferred_username'])
            self.set_secure_cookie("token", access_token)
            """
            user = await self.oauth2_request(
                url=KeycloakMixin._OAUTH_USERINFO_URL,
                access_token=access['access_token'],
                post_args={},
                )
            # Save the user and access token with
            # e.g. set_secure_cookie.
            print(user)
            """
            """
            self.write({
                'name': user_info_res_json['preferred_username'],
                'auth_state': {
                    'upstream_token': json.dumps(user_info_res_json),
                },
            })
            """
            self.redirect(self.reverse_url("main"))
        else:
            self.authorize_redirect(
                redirect_uri='http://localhost:{}/login'.format(self.application.settings['port']),
                client_id=oidc_client_id,
                scope=['profile', 'email'],
                response_type='code',
                extra_params={'approval_prompt': 'auto'}
                )

class JwkRequestHandler(web.RequestHandler):

    # Decode the bearer and check if user has role to access Token validity is automatically checked.
    async def get_current_user(self):
        """
        auth_header = self.request.headers.get('Authorization', '')
        if len(auth_header.split(' ')) < 2:
            raise web.HTTPError(401, reason='Unauthorized')
        bearer = auth_header.split(' ')[1]
        if auth_header is None or bearer is None:
            raise web.HTTPError(401, reason='Unauthorized')
        """
        user = self.get_secure_cookie("user")
        print(user)
        bearer = self.get_secure_cookie("token")
        print(bearer)
        # Retrieve JWK from server.
        # JWK contains public key that is used for decode JWT token.
        # Only keycloak server know private key and can generate tokens.
        # Before retrieve JWK, it's possible to use openid configuration url : /auth/realms/{realm}/.well-known/openid-configuration
        # This URL list all endpoints that can be used like the following certs url.
        # For simplicity and to reduce network transfers, we use the certs url directly.
        try:
            request = HTTPRequest(
                self.application.settings['open_id_certs_url'],
                method='GET',
            )
            http_client = AsyncHTTPClient()
            response = await http_client.fetch(request, raise_error=False)
            print(response)
            if response.code == 200:
                jwk = json.loads(response.body.decode('utf-8'))
                public_key = RSAAlgorithm.from_jwk(json.dumps(jwk['keys'][0]))
                payload = jwt.decode(bearer, public_key, algorithms='RS256', options={'verify_aud': False})
            else:
                raise ValueError(response.body.decode('utf-8')) 
#            httpclient.HTTPClient().close()
        except jwt.ExpiredSignatureError:
            raise web.HTTPError(401, reason='Unauthorized')
        print(payload)
        return payload

class JwkHandler(JwkRequestHandler):
  #  @web.authenticated
    async def get(self):
#        self.write('Hi ' + self.current_user['preferred_username'])
        await self.get_current_user()
        self.redirect(self.reverse_url("main"))


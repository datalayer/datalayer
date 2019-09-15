import jwt, json, requests

from tornado import web, httpclient
from tornado.platform.asyncio import to_asyncio_future
from jwt.algorithms import RSAAlgorithm

class AuthenticatedRequestHandler(web.RequestHandler):

    # Decode the bearer and check if user has role to access.
    # Token validity is automatically checked.
#    @web.asynchronous
    def get_current_user(self):

        auth_header = self.request.headers.get('Authorization', '')

        if len(auth_header.split(' ')) < 2:
            raise web.HTTPError(401, reason='Unauthorized')

        bearer = auth_header.split(' ')[1]
        if auth_header is None or bearer is None:
            raise web.HTTPError(401, reason='Unauthorized')

        # Retrieve JWK from server
        # JWK contains public key that is used for decode JWT token
        # Only keycloak server know private key and can generate tokens

        # Before retrieve JWK, it's possible to use openid configuration url : /auth/realms/{realm}/.well-known/openid-configuration
        # This URL list all endpoints that can be used like the following certs url
        # For simplicity and to reduce network transfers, we use the certs url directly
        try:
            """
            request = httpclient.HTTPRequest(
                self.application.settings['open_id_certs_url'],
                method='GET',
            )
            tornado_future = httpclient.AsyncHTTPClient().fetch(request, raise_error=False)
            future = to_asyncio_future(tornado_future)
            response = (await future).result()
            """

            response = requests.get(
                self.application.settings['open_id_certs_url'],
            )

            if response.status_code == 200:
                jwk = response.json()
                public_key = RSAAlgorithm.from_jwk(json.dumps(jwk['keys'][0]))
                payload = jwt.decode(bearer, public_key, algorithms='RS256', options={'verify_aud': False})
            else:
                raise ValueError(response.body.decode('utf-8')) 
        except jwt.ExpiredSignatureError as e:
            print(e)
            raise web.HTTPError(401, reason='Unauthorized')
        except Exception as e:
            print(e)
            raise web.HTTPError(500, reason=str(e))
        finally:
            httpclient.AsyncHTTPClient().close()

        print(payload)
        return payload

#!/usr/bin/env python

import tornado, jwt, json, base64, os.path
import binascii, hashlib, hmac, time, urllib.parse, uuid

from tornado import httpserver, ioloop, web, options, gen, web
from tornado.httpclient import HTTPRequest, AsyncHTTPClient
from tornado.options import define, options

from tornado_oidc.handlers import OidcLoginHandler, JwkHandler

define("port", default=8080, help="run on the given port", type=int)

class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie("user")
        
class MainHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render('index.html')

class LogoutHandler(BaseHandler):
    def get(self):
        self.clear_cookie("user")
        self.redirect(self.get_argument("next", self.reverse_url("main")))

class Application(tornado.web.Application):
    def __init__(self):
        base_dir = os.path.dirname(__file__)
        settings = {
            "login_url": "/login",
            'template_path': os.path.join(base_dir, "pages"),
            'static_path': os.path.join(base_dir, "static"),
            'debug': True,
            "xsrf_cookies": True,
            "open_id_certs_url": 'http://{}/auth/realms/{}/protocol/openid-connect/certs'.format(os.getenv('OIDC_SERVER'), os.getenv('OIDC_CLIENT_ID')),
            "cookie_secret": "bZJc2sWbQLKos6GkHn/VB9oXwQt8S0R0kRvJ5/xJ89E=",
            "port": options.port,
        }
        tornado.web.Application.__init__(self, [
            tornado.web.url(r"/", MainHandler, name="main"),
            tornado.web.url(r'/login', OidcLoginHandler, name="login"),
            tornado.web.url(r'/logout', LogoutHandler, name="logout"),
            tornado.web.url(r"/jwk", JwkHandler, name="jwk"),
        ], **settings)

def main():
    tornado.options.parse_command_line()
    Application().listen(options.port)
    print('http://localhost:{}'.format(options.port))
    tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    main()

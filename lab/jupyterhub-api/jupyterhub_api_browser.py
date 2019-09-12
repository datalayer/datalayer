#!/usr/bin/env python3

from getpass import getuser
import json
import os
from urllib.parse import urlparse
from tornado.gen import coroutine, multi
from jupyterhub.services.auth import HubOAuthenticated, HubOAuthCallbackHandler
from jupyterhub.utils import url_path_join
from tornado.ioloop import IOLoop
from tornado.httpclient import AsyncHTTPClient, HTTPRequest
from tornado.httpserver import HTTPServer
from tornado.log import app_log
from tornado.options import define, options, parse_command_line
from tornado.web import RequestHandler, Application, StaticFileHandler, authenticated, asynchronous

api_token = os.environ['JUPYTERHUB_API_TOKEN']

auth_header = {
    'Authorization': 'token %s' % api_token,
}

class IndexHandler(RequestHandler):
    def get(self):
        self.render("index.html")

class InfoHandler(HubOAuthenticated, RequestHandler):
    @authenticated
    @coroutine
    def get(self):
        action = 'info'
        req = HTTPRequest(
            url = options.url + '/' + action,
            headers = auth_header,
        )
        client = AsyncHTTPClient()
        fetch = client.fetch
        resp = yield fetch(req)
        j = json.loads(resp.body.decode('utf8', 'replace'))
        app_log.info(j)
        self.set_header('content-type', 'application/json')
        self.write(json.dumps(j, indent=1, sort_keys=True))

class UsersHandler(HubOAuthenticated, RequestHandler):
    @authenticated
    @coroutine
    def get(self, slug=None):
        action = 'users'
        req = HTTPRequest(
            url = options.url + '/' + action,
            headers = auth_header,
        )
        client = AsyncHTTPClient()
        fetch = client.fetch
        resp = yield fetch(req)
        j = json.loads(resp.body.decode('utf8', 'replace'))
        app_log.info(j)
        self.set_header('content-type', 'application/json')
        self.write(json.dumps(j, indent=1, sort_keys=True))

class UserHandler(HubOAuthenticated, RequestHandler):
    @authenticated
    @coroutine
    def post(self, username):
        if not self.current_user: self.redirect()
        req = HTTPRequest(
            method = 'POST',
            url = options.url + '/users/' + username,
            body = "",
            headers = auth_header,
        )
        client = AsyncHTTPClient()
        fetch = client.fetch
        resp = yield fetch(req)
        j = json.loads(resp.body.decode('utf8', 'replace'))
        app_log.info(j)
        self.set_header('content-type', 'application/json')
        self.write(json.dumps(j, indent=1, sort_keys=True))

    @authenticated
    @coroutine
    def delete(self, username):
        if not self.current_user: self.redirect()
        req = HTTPRequest(
            method = 'DELETE',
            url = options.url + '/users/' + username,
            headers = auth_header,
        )
        client = AsyncHTTPClient()
        fetch = client.fetch
        resp = yield fetch(req)
        self.set_header('content-type', 'application/json')
        self.write(json.dumps({'deleted': username}, indent=1, sort_keys=True))

class WhoAmIHandler(HubOAuthenticated, RequestHandler):
    # hub_users is a set of users who are allowed to access the service
    # `getuser()` here means only the user who started the service
    # can access the service:
#    hub_users = {getuser()}
    @authenticated
    def get(self):
        user_model = self.get_current_user()
        self.set_header('content-type', 'application/json')
        self.write(json.dumps(user_model, indent=1, sort_keys=True))

def main():
    define(
        'url',
        default=os.environ.get('JUPYTERHUB_API_URL'),
        help="The JupyterHub API URL",
    )
    parse_command_line()
    try:
        AsyncHTTPClient.configure("tornado.curl_httpclient.CurlAsyncHTTPClient")
    except ImportError as e:
        app_log.warning(
            "Could not load pycurl: %s\n"
            "pycurl is recommended if you have a large number of users.",
            e)
    settings = {
        "cookie_secret": os.urandom(32),
        "xsrf_cookies": False,
    }
    app = Application([
        (os.environ['JUPYTERHUB_SERVICE_PREFIX'], IndexHandler),
        (url_path_join(os.environ['JUPYTERHUB_SERVICE_PREFIX'], 'whoami'), WhoAmIHandler),
        (url_path_join(os.environ['JUPYTERHUB_SERVICE_PREFIX'], 'info'), InfoHandler),
        (url_path_join(os.environ['JUPYTERHUB_SERVICE_PREFIX'], 'users'), UsersHandler),
        (url_path_join(os.environ['JUPYTERHUB_SERVICE_PREFIX'], r'/users/([^/]+)'), UserHandler),
        (url_path_join(os.environ['JUPYTERHUB_SERVICE_PREFIX'], 'oauth_callback'), HubOAuthCallbackHandler),
        (r"{0}(.*)".format(os.environ['JUPYTERHUB_SERVICE_PREFIX']), StaticFileHandler, {"path": "."}),
    ], **settings)
    http_server = HTTPServer(app)
    url = urlparse(os.environ['JUPYTERHUB_SERVICE_URL'])
    http_server.listen(url.port, url.hostname)
    IOLoop.current().start()

if __name__ == "__main__":
    main()

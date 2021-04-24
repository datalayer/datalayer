#!/usr/bin/env python3

import os, json
from getpass import getuser
from urllib.parse import urlparse
from tornado.gen import coroutine, multi
from jupyterhub.services.auth import HubAuthenticated
from jupyterhub.services.auth import HubOAuthenticated as DAuth
from jupyterhub.services.auth import HubOAuthCallbackHandler
from jupyterhub.utils import url_path_join
from tornado.ioloop import IOLoop
from tornado.httpclient import AsyncHTTPClient, HTTPRequest
from tornado.httpserver import HTTPServer
from tornado.log import app_log
from tornado.options import define, options, parse_command_line
from tornado.web import RequestHandler, Application, StaticFileHandler, authenticated

api_token = os.environ['JUPYTERHUB_API_TOKEN']

auth_header = {
    'Authorization': 'token %s' % api_token,
}

class IndexHandler(RequestHandler):
    def get(self):
        self.render("index.html")

class InfoHandler(DAuth, RequestHandler):
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

class UsersHandler(DAuth, RequestHandler):
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

class UserHandler(DAuth, RequestHandler):
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

class WhoAmIHandler(DAuth, RequestHandler):
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
    prefix = os.environ['JUPYTERHUB_SERVICE_PREFIX']
    app = Application([
        (prefix, IndexHandler),
        (url_path_join(prefix, 'whoami'), WhoAmIHandler),
        (url_path_join(prefix, 'info'), InfoHandler),
        (url_path_join(prefix, 'users'), UsersHandler),
        (url_path_join(prefix, r'/users/([^/]+)'), UserHandler),
        (url_path_join(prefix, 'oauth_callback'), HubOAuthCallbackHandler),
        (r"{}(.*)".format(prefix), StaticFileHandler, {"path": "."}),
    ], **settings)
    http_server = HTTPServer(app)
    url = urlparse(os.environ['JUPYTERHUB_SERVICE_URL'])
    http_server.listen(url.port, url.hostname)
    IOLoop.current().start()

if __name__ == "__main__":
    main()

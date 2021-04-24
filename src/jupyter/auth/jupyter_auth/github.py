"""Tornado handlers for logging into the Jupyter Server."""

# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.

import re
import os
import uuid

import os.path

import urllib.parse
from urllib.parse import urlparse

from jupyter_server.base.handlers import JupyterHandler

from typing import Any, Dict, cast

import tornado
from tornado import escape
from tornado.curl_httpclient import CurlAsyncHTTPClient
from tornado.escape import url_escape
from tornado.options import define, options
from tornado.web import Application, RequestHandler
from tornado.auth import OAuth2Mixin

from jupyter_server.torndsession.session import SessionMixin

from typing import Any, Dict, Optional


class GithubOAuth2Mixin(SessionMixin, OAuth2Mixin):

    _OAUTH_AUTHORIZE_URL = "https://github.com/login/oauth/authorize"
    _OAUTH_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token"
    _OAUTH_USERINFO_URL = "https://www.googleapis.com/oauth2/v1/userinfo"
    _OAUTH_NO_CALLBACKS = False
    _OAUTH_SETTINGS_KEY = "github_oauth"

    async def get_authenticated_user(
        self, redirect_uri: str, code: str
    ) -> Dict[str, Any]:
        handler = cast(RequestHandler, self)
        http = self.get_auth_http_client()
        body = urllib.parse.urlencode(
            {
                "redirect_uri": redirect_uri,
                "code": code,
                "client_id": os.getenv('GITHUB_CLIENT_ID'),
                "client_secret": os.getenv('GITHUB_CLIENT_SECRET'),
                "grant_type": "authorization_code",
            }
        )
        response = await http.fetch(
            self._OAUTH_ACCESS_TOKEN_URL,
            method="POST",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            body=body,
        )
        query_qs = urllib.parse.parse_qs(escape.url_unescape(response.body))
        return {
            'access_token': query_qs['access_token'][0], 
            'scope':  query_qs['scope'][0], 
            'token_type':  query_qs['token_type'][0],
        }


class GithubOAuth2Handler(GithubOAuth2Mixin, RequestHandler):

    async def oauth2_request(
        self,
        url: str,
        access_token: Optional[str] = None,
        post_args: Optional[Dict[str, Any]] = None,
        **args: Any
    ) -> Any:

        all_args = {}
        headers = {}
        if access_token:
            headers["Authorization"] = f'Bearer {access_token}'

        if all_args:
            url += "?" + urllib.parse.urlencode(all_args)

        http = CurlAsyncHTTPClient()
        
        if post_args is not None:
            response = await http.fetch(
                url,
                method="POST",
                body=urllib.parse.urlencode(post_args),
                headers=headers
            )
        else:
            response = await http.fetch(url, headers=headers)
        return escape.json_decode(response.body)

    async def get(self):
        if self.get_argument('code', False):
            req = self.request
            access = await self.get_authenticated_user(
#                redirect_uri=f'{req.protocol}://{req.host}/login',
                redirect_uri=os.getenv('GITHUB_OAUTH_CALLBACK_URL'),
                code=self.get_argument('code')
            )

            user = await self.oauth2_request(
                "https://api.github.com/user",
                access_token=access["access_token"])


            self.web_session["user"] = user
            # Save the user with e.g. set_secure_cookie
            self.set_secure_cookie("user", "user")
            self.redirect('/')
        else:
            self.authorize_redirect(
                redirect_uri=os.getenv('GITHUB_OAUTH_CALLBACK_URL'),
                client_id=os.getenv('GITHUB_CLIENT_ID'),
                client_secret=os.getenv('GITHUB_CLIENT_SECRET'),
                scope=['read:user'],
                response_type='code',
                extra_params={'approval_prompt': 'auto'})


class LoginHandler(GithubOAuth2Handler):

    def get_user(self):
        return self.get_session().get("user", None)


    @classmethod
    def validate_security(cls, app, ssl_options=None):
        pass


    @classmethod
    def get_login_available(cls, settings):
        return True

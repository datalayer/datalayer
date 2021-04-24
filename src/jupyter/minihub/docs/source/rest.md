---
title: JupyterHub  Rest API
---

# JupyterHub Rest API

REST API [Docs](https://jupyterhub.readthedocs.io/en/latest/api).

REST API [Static](https://jupyterhub.readthedocs.io/en/latest/_static/rest-api/index.html).

REST API [Swagger](http://petstore.swagger.io?url=https://raw.githubusercontent.com/jupyterhub/jupyterhub/master/docs/rest-api.yml#/default).

- By default, this REST API listens on port 8081 of localhost only.
- The Hub service talks to the proxy via a REST API on a secondary port.
- The API URL can be configured separately and override the default settings.

## Use

[Using JupyterHub’s REST API](https://jupyterhub.readthedocs.io/en/latest/reference/rest.html).

## Performance

[Identifying JupyterHub API performance bottleneck](https://discourse.jupyter.org/t/identifying-jupyterhub-api-performance-bottleneck/1289).

##

```python
# https://gist.github.com/costrouc/0e7544bf4d61bba8985b5ef6f5ff4b0e

Sample configuration. You can always login with password “test”. There is a single admin user user-admin. If you login as the admin user from within the jupyterlab kernel you can test that the admin route works. With the following simple script.

import requests
import os
requests.get(f'{os.environ["JUPYTERHUB_API_URL"]}/onlyadmin', headers={'Authorization': f'token {os.environ["JUPYTERHUB_API_TOKEN"]}'}).json()
This is the jupyterhub configuration save as jupyterhub_config.py. Ensure that you have a python environment with jupyterhub and jupyterlab installed.

import json

from jupyterhub.auth import DummyAuthenticator
from jupyterhub.spawner import SimpleLocalProcessSpawner
from jupyterhub.apihandlers.base import APIHandler
from jupyterhub.utils import admin_only

import tornado.web

class NoAuthHandler(APIHandler):
    # modeled after https://github.com/jupyterhub/jupyterhub/blob/master/jupyterhub/apihandlers/hub.py#L55
    async def get(self):
        data = {"message": "Hello no checking auth!"}
        self.finish(json.dumps(data))

class RequiredAuthHandler(APIHandler):
    @admin_only
    async def get(self):
        data = {"message": "Hello I checked you are an admin!"}
        self.finish(json.dumps(data))

# paths will be /hub/<regex>
# there are regular Tornado web handlers
# so you can do anything you could with tornado
c.JupyterHub.extra_handlers = [
   # /hub/asdf/example.txt -> /tmp/example.txt locally on machine
   (r'/asdf/(.*)', tornado.web.StaticFileHandler, {"path": "/tmp"}),
   (r'/api/noauth', NoAuthHandler),
   (r'/api/onlyadmin', RequiredAuthHandler),
]

c.JupyterHub.users = ['user-admin']
c.JupyterHub.admin_users = ['user-admin']

c.JupyterHub.authenticator_class = DummyAuthenticator
c.DummyAuthenticator.password = 'test'
c.JupyterHub.spawner_class = SimpleLocalProcessSpawner
Now just normally run the jupyterhub server via

jupyterhub --config jupyterhub_config.py
```

- tested the refresh_user and it does force a user to login if they access a hub url otherwise it will ignore the refresh_user. Here is snippet I used to test

```python
import time
from jupyterhub.auth import DummyAuthenticator
from jupyterhub.spawner import SimpleLocalProcessSpawner
LAST_LOGIN = None
class MyAuthenticator(DummyAuthenticator):
    async def refresh_user(self, user, handler=None):
        global LAST_LOGIN
        LAST_LOGIN = LAST_LOGIN or time.time()
        if (time.time() - LAST_LOGIN) > 30:
            return False
        return user.name
    async def authenticate(self, handler, data):
        global LAST_LOGIN
        LAST_LOGIN = time.time()
        return await super().authenticate(handler, data)
c.MyAuthenticator.auth_refresh_age = 10
c.JupyterHub.authenticator_class = MyAuthenticator
c.DummyAuthenticator.password = 'test'
c.JupyterHub.spawner_class = SimpleLocalProcessSpawner
````

- Any user will be kicked out on a hub url 30 seconds after the login
- Related issue https://github.com/jupyterhub/jupyterhub/issues/2598
- So in our case the user is on the lab url , so refresh_user method is ignored !!!
- unless you are talking about the base url
- Yes exactly. But as soon as they visit a hub url they are forced to login.

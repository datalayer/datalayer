---
title: JupyterHub Authentication
---

# JupyterHub Authentication

JupyterHub Authentication [Docs](https://jupyterhub.readthedocs.io/en/stable/reference/authenticators.html).

## Whitelist

```bash
# Set a whitelist in jupyterhub_config.py
c.Authenticator.whitelist = { 'foo', 'bar' }
```

## Admin

```bash
c.Authenticator.admin_users = { 'foo' }
# Admins may have permission to log in as other users on their respective machines, for debugging.
# As a courtesy, you should make sure your users know if admin_access is enabled.
c.JupyterHub.admin_access = True
c.PAMAuthenticator.admin_groups = {'wheel'}
```

## Local Authenticator

The `LocalAuthenticator` is a special kind of authenticator that has the ability to manage users on the local system.

When you try to add a new user to the Hub, a LocalAuthenticator will check if the user already exists. If you set the configuration value, `create_system_users` to `True`, the LocalAuthenticator has the privileges to add users to the system.

```python
c.JupyterHub.authenticator_class = 'jupyterhub.auth.LocalAuthenticator'
c.LocalAuthenticator.create_system_users = True
```

## PAM Authenticator

A typical configuration is [PAM](https://en.wikipedia.org/wiki/Pluggable_authentication_module). For this authentication, double-check that your environment is correctly setup.

```bash
# See also https://github.com/jupyterhub/jupyterhub/wiki/Using-sudo-to-run-JupyterHub-without-root-privileges
sudo chmod +r /etc/shadow
sudo usermod -a -G shadow $USER
```

```bash
# Should return None in case of successful authentication.
sudo -u $USER python3 -c "import pamela, getpass; print(pamela.authenticate('$USER', getpass.getpass()))"
```

```python
import os, pamela
username = os.environ['USER']
password = '<your_password>'
service = 'login'
try:
    print("PAM Authentication test. username = {0} and service = {1}".format(username, service))
    pamela.authenticate(username, password, service)
    print("success!")
except pamela.PAMError as e:
    print("PAM Authentication failed: {0}".format(e))
```

```bash
# Create local users if needed by the Authenticator.
export NEW_USER=foo@gmail.com
# --home /home/$NEW_USER
# --force-badname
adduser -q --gecos "" --disabled-password $NEW_USER
```

## OAuth Authenticator

+ https://github.com/jupyterhub/oauthenticator
+ https://pythonforundergradengineers.com/add-google-oauth-and-system-service-to-jupyterhub.html

```bash
pip3 install oauthenticator
open https://console.developers.google.com/apis/credentials
export OAUTH_CALLBACK_URL=http://localhost:8000/hub/oauth_callback
export OAUTH_CLIENT_ID=<id>
export OAUTH_CLIENT_SECRET=<secret>
# jupyterhub_config.py
c.JupyterHub.authenticator_class = 'oauthenticator.google.GoogleOAuthenticator'
c.DockerSpawner.image = 'jupyter/scipy-notebook:8f56e3c47fec'
```

OAuth Providers.

+ https://github.com/jupyterhub/jupyterhub/pull/938
+ https://github.com/jupyterhub/jupyterhub/issues/1659
+ https://github.com/jupyterhub/jupyterhub/pull/1590
+ https://github.com/jupyterhub/jupyterhub/tree/master/examples/service-whoami
+ https://github.com/jupyterhub/jupyterhub/blob/master/examples/service-whoami/whoami-oauth.py

## OpenID Connect Authenticator

[JupyterHub OIDC](https://github.com/datalayer/jupyterhub-oidc),

[OpenID Connect](https://openid.net/connect) is an identity layer on top of the OAuth 2.0 protocol, implemented by [various servers and services](https://openid.net/developers/certified/#OPServices).

While OpenID Connect endpoint discovery is not supported by oauthentiator, you can still configure JupyterHub to authenticate with OpenID Connect providers by specifying all endpoints in GenericOAuthenticator.

By setting `login_service` you can customize the label on the login button.

## SSH Authenticator

+ https://github.com/andreas-h/sshauthenticator

## Multi Authenticator

+ https://github.com/jupyterhub/oauthenticator/issues/136
+ https://gist.github.com/danizen/78111676530738fcbca8d8ad87c56690

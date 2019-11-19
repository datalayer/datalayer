[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Lab JupyterHub OpenID Connect

![status](https://img.shields.io/badge/Project_Stability-ALPHA-red.svg)

This folder contains an [OpenID Connect](https://openid.net/connect) (OIDC) authentication handler for [JupyterHub](https://github.com/jupyterhub/jupyterhub) (read more on [JupyterHub authentication](https://jupyterhub.readthedocs.io/en/stable/getting-started/authenticators-users-basics.html)).

If you face issue with another OIDC provider (Google...), please open an [issue](https://github.com/datalayer/datalayer/issues).

## Environment

To develop on the source code, you will need [Python 3](https://www.python.org) with some additional libraries.

```bash
# Install the python libraries in a conda env.
conda create -y -n jupyterhub_oidc python=3.7 nodejs && \
  conda activate jupyterhub_oidc && \
  make install
# Install the configurable http proxy (you need npm on your env).
make install-http-proxy
# Pull the Jupyter Docker image.
make pull-docker
```

You also need [Docker](https://docs.docker.com/install) to launch [Keycloak](https://www.keycloak.org) (OIDC provider) server.

## Keycloak OIDC Provider

The following allows you to start a Keycloak server in a Docker container and get the needed seetings (OIDC client and secret).

```bash
# Start Keycloak in Docker.
make keycloak-start
```

Check the logs and ensure Keycloak server is correctly started (it can take 1 minute depending on your system).

Upon successful start, the server should print a simmilar message.

```
[org.jboss.as] (Controller Boot Thread) WFLYSRV0025: Keycloak 6.0.1 (WildFly Core 8.0.0.Final) started in ...ms - Started 672 of 937 services (652 services are lazy, passive or on-demand)
```

If everything is fine, type `CTRL-C` to stop the log tail and initialize Keycloak.

```bash
# Create OIDC realm, client and user.
make keycloak-init
```

Keycloak is now configured with a Realm `datalayer`, a Client `datalayer` and a User `eric` (password is `123`). You can change those values in the [init-keycloak.sh](./dev/init-keycloak.sh) file.

Check you can authenticate on the Keycloak server with username=`eric` and password=`123`.

```bash
open http://localhost:8092/auth/realms/datalayer/account
```

Copy the printed `export` variables and paste them in your terminal so that the JupyterHub can read them.

```
export OIDC_CLIENT_ID=datalayer
export OIDC_SECRET=<secret>
export OIDC_SERVER=http://localhost:8092
```

## Start JupyterHub

The following starts a JupyterHub server and allows you to authenticate with OIDC.

```bash
# open http://localhost:8080/jupyterhub
make start
```

Open http://localhost:8080/jupyterhub in your favorite browser and authenticate with username `eric` (password `123`).

## User Management

You can add more users and change the Keycloak settings via the Keycloak administration pages on http://localhost:8094 (username `admin`, password `admin`).

## Stop

`CTRL-C` to stop JupyterHub and run the following.

```bash
make keycloak-rm
```

## TODO

- [ ] Logout: Call OIDC API.
- [ ] Auth State: Display auth state in the notebook.

## References

+ [Discussion about keycloak integration](https://github.com/jupyterhub/zero-to-jupyterhub-k8s/issues/886)
  + https://github.com/jupyterhub/jupyterhub/issues/2045
  + https://github.com/jupyter-on-openshift/poc-hub-openshift-auth
  + https://github.com/jupyterhub/oauthenticator/pull/183
  + https://github.com/jupyterhub/jupyterhub/issues/1805

+ [OIDCAuthenticator - makes sense?](https://github.com/jupyterhub/oauthenticator/issues/254).

+ [Working configuration for generic authenticator with Keycloak](https://github.com/jupyterhub/oauthenticator/issues/107)
  + https://github.com/matipp/oauthenticator/tree/keycloak_auth/oauthenticator
  + https://github.com/matipp/oauthenticator/tree/keycloak/oauthenticator
  + https://github.com/matipp/oauthenticator/commit/326d2617ce09749ca0c4d9a19e9651fe437e1755

+ https://github.com/ausecocloud/keycloakauthenticator

+ https://github.com/jupyterhub/zero-to-jupyterhub-k8s/blob/13087141aaa2a988d847dbffae7d7c73d945bd73/doc/source/authentication.rst#openid-connect

```yaml
hub:
  extraEnv:
    OAUTH2_AUTHORIZE_URL: https://${host}/auth/realms/${realm}/protocol/openid-connect/auth
    OAUTH2_TOKEN_URL: https://${host}/auth/realms/${realm}/protocol/openid-connect/token
auth:
  type: custom
  custom:
    className: oauthenticator.generic.GenericOAuthenticator
    config:
      login_service: "keycloak"
      client_id: "y0urc1logonc1ient1d"
      client_secret: "an0ther1ongs3cretstr1ng"
      token_url: https://${host}/auth/realms/${realm}/protocol/openid-connect/token
      userdata_url: https://${host}/auth/realms/${realm}/protocol/openid-connect/userinfo
      userdata_method: GET
      userdata_params: {'state': 'state'}
      username_key: preferred_username
```

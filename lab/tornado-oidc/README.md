[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Tornado OpenID Connect

![status](https://img.shields.io/badge/Project_Stability-ALPHA-red.svg)

This folder contains an [OpenID Connect](https://openid.net/connect) (OIDC) authentication handler for the Python [Tornado](https://www.tornadoweb.org) Web server (read more on [Tornado authentication](https://www.tornadoweb.org/en/stable/auth.html)).

> Why should I use OpenID Connect, and what do I miss with vanilla `OAuth2`?

+ [OAuth is Not Authentication](https://www.scottbrady91.com/OAuth/OAuth-is-Not-Authentication).
+ Get attributes details (email...) on the authenticated user.
+ Validate the token (signature and expiration) with JWK.

To develop on the source code, you will need [Python 3](https://www.python.org) with some additional libraries.

```bash
# Install the python libraries.
make install
```

You also need [Docker](https://docs.docker.com/install) to launch a [Keycloak](https://www.keycloak.org) (OIDC provider) server.

If you face issue with another OIDC provider (Google...), please open an [issue](https://github.com/datalayer/tornado-oidc/issues).

## Keycloak OIDC Provider

The following allows you to start a Keycloak server in a Docker container and get the needed seetings (OIDC client and secret).

```bash
# Start Keycloak in Docker.
make oidc-start
```

Check the logs and ensure Keycloak server is correctly started (it can take 1 minute depending on your system).

Upon sucessfull start, the server should print a simmilar message: `[org.jboss.as] (Controller Boot Thread) WFLYSRV0025: Keycloak 6.0.1 (WildFly Core 8.0.0.Final) started in ...ms - Started 672 of 937 services (652 services are lazy, passive or on-demand)`.

If everything is fine, type `CTRL-C` to stop the log tail and initialize Keycloak.

```bash
# Create OIDC realm, client and user.
make oidc-init
```

Keycloak is now configured with a realm `datalayer`, a client `datalayer` and a user `eric` (password is `123`). You can change those values in the [init-keycloak.sh](./dev/keycloak/init-keycloak.sh) file.

Copy the printed `export` variables and paste them in your terminal so that the Tornado Web server can read them.

## Tornado

The following starts a Tornado Web server and allows you to authenticate with OIDC.

```bash
# open http://localhost:8080
make start
```

Open http://localhost:8080 in your favorite browser and authenticate with username `eric` (password `123`).

You can add more users and change the Keycloak settings via the Keycloak administration pages on http://localhost:8092 (username `admin`, password `admin`).

## TODO

- [ ] Logout: Call OIDC API.

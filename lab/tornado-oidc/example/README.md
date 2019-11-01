[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Lab Tornado OpenID Connect

![status](https://img.shields.io/badge/Project_Stability-ALPHA-red.svg)

This folder contains an [OpenID Connect](https://openid.net/connect) (OIDC) authentication handler for the Python [Tornado](https://www.tornadoweb.org) Web server (read more on [Tornado authentication](https://www.tornadoweb.org/en/stable/auth.html)).

If you face issue with another OIDC provider (Google...), please open an [issue](https://github.com/datalayer/datalayer/issues).

## Env

To develop on the source code, you will need [Python 3](https://www.python.org) with some additional libraries.

```bash
# Install the python libraries in a conda env.
conda create -y -n tornado_oidc python=3.7 && \
  conda activate tornado_oidc && \
  make install
```

You also need [Docker](https://docs.docker.com/install) to launch a [Keycloak](https://www.keycloak.org) (OIDC provider) server.

## Setup Keycloak OIDC Provider

The following command starts a Keycloak server in a Docker container and get the needed seetings (OIDC client and secret).

```bash
# Start Keycloak in Docker.
make keycloak-start
```

Check the logs and ensure Keycloak server is correctly started (it can take 1 minute depending on your system).

Upon successful start, the server should print a simmilar message.

```
[org.jboss.as] (Controller Boot Thread) WFLYSRV0025: Keycloak 6.0.1 (WildFly Core 8.0.0.Final) started in ...ms - Started 672 of 937 services (652 services are lazy, passive or on-demand)
```

If everything is fine, type `CTRL-C` to stop the log tail (the docker container will still be alive) and initialize Keycloak.

```bash
# Create OIDC realm, client and user.
make keycloak-init
```

Keycloak is now configured with a Realm `datalayer`, a Client `datalayer` and a User `eric` (password is `123`).

You can change those values in the [init-keycloak.sh](./dev/init-keycloak.sh) file.

Check you can authenticate on the Keycloak server with username=`eric` and password=`123`.

```bash
open http://localhost:8092/auth/realms/datalayer/account
```

Copy the printed `export` variables and paste them in your terminal so that the Tornado Web server can read them.

```
export OIDC_CLIENT_ID=datalayer
export OIDC_SECRET=<secret>
export OIDC_SERVER=http://localhost:8092
```

## Tornado

You can now start a Tornado Web server and authenticate with OIDC.

```bash
# open http://localhost:8080
make start
```

Open http://localhost:8080 in your favorite browser and authenticate with username `eric` (password `123`).

You can add more users and change the Keycloak settings via the Keycloak administration pages on http://localhost:8092 (username `admin`, password `admin`).

## Stop

`CTRL-C` to stop Tornado and run the following.

```bash
make keycloak-rm
```

## TODO

- [ ] Logout: Call OIDC API on Logout.

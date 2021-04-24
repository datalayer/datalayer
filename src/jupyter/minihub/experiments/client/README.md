[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/master/resources/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Minihub Experiments JupyterHub Client

## Bash Client

```bash
# Set USER env variable if not set.
export USER=$(whoami)
```

```bash
# Create a token.
TOKEN=$(openssl rand -hex 32)
```

```bash
# Start
jupyterhub
# Authenticate with $USER / 123
open http://localhost:8000
```

```bash
# Get Proxy Routes
curl -X GET -H 'Authorization: token 0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5' \
  -H "Accept: application/json" \
  "http://localhost:8001/api/routes" | jq '.'
```

- [Configuring tokens is quite confusing](https://github.com/jupyterhub/jupyterhub/issues/2668)

```bash
# Get the Hub Token - Do this via the UI to get a token for a admin user.
export JHUB_TOKEN=`jupyterhub token` && \
  echo $JHUB_TOKEN
export JHUB_TOKEN=ce39a9ee14cf71df9408e72a7033ae5d19e22cbed23f8bd1bef4c2221182fa19
```

```bash
# Get Info.
curl -X GET -H 'Authorization: token '"$JHUB_TOKEN"'' \
  -H "Accept: application/json" \
  "http://localhost:8000/hub/api" | jq '.'
```

```bash
# Get Users.
curl -X GET -H 'Authorization: token '"$JHUB_TOKEN"'' \
  -H "Accept: application/json" \
  'http://localhost:8000/hub/api/users' | jq '.'
```

```bash
# Define a User.
JHUB_USER=user1
# JHUB_USER=123e4567-e89b-12d3-a456-426614174000
# JHUB_USER=123e4567-e89b-12d3-a456-426614174999
```

```bash
# Create a User.
curl -X POST -H 'Authorization: token '"$JHUB_TOKEN"'' \
  -H "Accept: application/json" \
  'http://localhost:8000/hub/api/users/'"$JHUB_USER"'' | jq '.'
```

```bash
# Start a user Server.
curl -X POST -H 'Authorization: token '"$JHUB_TOKEN"'' \
  -H "Accept: application/json" \
  'http://localhost:8000/hub/api/users/'"$JHUB_USER"'/servers/server-'"$JHUB_USER"'' | jq '.'
docker ps
```

```bash
# Get users details with running servers.
curl -X GET -H 'Authorization: token '"$JHUB_TOKEN"'' \
  -H "Accept: application/json" \
  'http://localhost:8000/hub/api/users' | jq '.'
```

## Python Client

```bash
# https://github.com/minrk/jupyterhub-client
pip install jupyterhub_client
```

```bash
export JHUB_TOKEN=`jupyterhub token` && \
  echo $JHUB_TOKEN
export JHUB_USER=123e4567-e89b-12d3-a456-426614174000
```

```python
# Sync.
import os
from jupyterhub_client import JupyterHubClient
hub = JupyterHubClient(os.environ['JHUB_TOKEN'])
hub.start_server(os.environ['JHUB_USER'])
hub.start_server('user1')
hub.list_users()
hub.list_users()[0]
hub.list_users()[0].get('servers')
hub.list_groups()
hub.list_services()
```

```python
# Async.
import os
from jupyterhub_client.async import AsyncJupyterHubClient
from tornado import gen

@gen.coroutine
def stuff():
    hub = AsyncJupyterHubClient(os.environ['JHUB_TOKEN'])
    users = yield hub.list_users()
    yield hub.stop_server('user1')
```

## Python Client

```bash
# https://github.com/quansight/jhub-client
pip install jhub-client
export JUPYTERHUB_API_TOKEN=<api-token>
jhubctl --help
jhubctl --verbose run --notebook <notebook> --hub <hub_url>
```

## See Also

- [JupyterHub Ping](https://github.com/mmh352/tutorial-server/blob/default/src/tutorial_server/jupyterhub_ping.py)
- [JupyterHub Traffic](https://github.com/yuvipanda/hubtraf)

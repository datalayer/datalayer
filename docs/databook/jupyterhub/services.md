---
title: JupyterHub Services
---

# JupyterHub Services

JupyterHub Services [Docs](https://jupyterhub.readthedocs.io/en/stable/reference/services.html).

```bash
# Get the auth token.
# jupyterhub token --Authenticator.admin_users="{'datalayer'}"
jupyterhub token
```

```bash
cat <<EOF > jupyterhub_config.py
# --- Services ---
c.JupyterHub.services = [
    {'name': 'cull-idle', 'api_token': 'd587ce42bc34407687901bbc723dcb0f'},
]
EOF
```

```bash
export JUPYTERHUB_API_TOKEN=$(jupyterhub token)
python3 cull_idle_servers.py [--timeout=900] [--url=http://127.0.0.1:8081/hub/api]
```

## Token

Users can manage (request and revoke) their tokens via http://localhost:8907/hub/token

## Authentication

Services [Authentication](https://jupyterhub.readthedocs.io/en/stable/api/services.auth.html).

## Examples

Try the JupyterHub Services Datalayer [Examples](https://github.com/datalayer/datalayer/tree/master/etc/dev/jupyterhub).

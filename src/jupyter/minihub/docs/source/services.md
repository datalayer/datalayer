---
title: JupyterHub Services
---

# JupyterHub Services

JupyterHub Services [Docs](https://jupyterhub.readthedocs.io/en/latest/reference/services.html).

- https://github.com/jupyterhub/jupyterhub/blob/master/jupyterhub/services/auth.py
 - HubAuth
 - HubOAuth
 - HubAuthenticated
 - HubOAuthenticated
 - HubOAuthCallbackHandler

- https://github.com/jupyterhub/jupyterhub/blob/master/jupyterhub/services/service.py

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

Clarify how JUPYTERHUB_API_TOKEN is used in services https://github.com/jupyterhub/jupyterhub/issues/3412

## Authentication

Services [Authentication](https://jupyterhub.readthedocs.io/en/latest/api/services.auth.html).

## Examples

Try the JupyterHub Services Datalayer [Examples](https://github.com/datalayer/datalayer/tree/master/etc/jupyterhub).

## Kubernetes

- hub.service.extraPorts config option https://github.com/jupyterhub/zero-to-jupyterhub-k8s/pull/2148
- Support for Hub-managed services https://github.com/jupyterhub/zero-to-jupyterhub-k8s/pull/2132
- Can't connect to jupyterhub managed services w/ url https://github.com/jupyterhub/zero-to-jupyterhub-k8s/issues/2102

- fastapi_service_example https://github.com/kafonek/fastapi_service_example

- Service as separated K8S Pod/Deployment https://github.com/jupyterhub/zero-to-jupyterhub-k8s/issues/2154

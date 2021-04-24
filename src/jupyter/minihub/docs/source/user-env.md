---
title: JupyterHub User Environment
---

# JupyterHub User Environment

Read more about the [User Environment](https://jupyterhub.readthedocs.io/en/latest/reference/config-user-env.html).

## Named Servers

Users can add [Named Servers](https://jupyterhub.readthedocs.io/en/latest/reference/config-user-env.html#named-servers) via `/hub/home` URL.

Needed configuration.

```python
c.JupyterHub.allow_named_servers = True
c.JupyterHub.named_server_limit_per_user = 3
```

![Named Servers](https://jupyterhub.readthedocs.io/en/latest/_images/named-servers-home1.png)

## User Servers Administration

Administrators can Administrate the Users' Servers via `/hub/admin` URL.

![Users' Servers Administration](https://jupyterhub.readthedocs.io/en/latest/_images/named-servers-admin.png)

## Admin Access to User's Notebooks

You can give admin access to other users’ notebook servers.

```python
# Default is False.
c.JupyterHub.admin_access = True
```

Admins will have permission to log in as other users on their respective machines, for debugging.

> As a courtesy, you should make sure your users know if admin_access is enabled.

## Enable a Jupyter notebook configuration setting for all users

To enable Jupyter notebook’s internal idle-shutdown behavior, set the following in the `/etc/jupyter/jupyter_notebook_config.py` file.

```python
# shutdown the server after no activity for an hour
c.NotebookApp.shutdown_no_activity_timeout = 60 * 60
# shutdown kernels after no activity for 20 minutes
c.MappingKernelManager.cull_idle_timeout = 20 * 60
# check for idle kernels every two minutes
c.MappingKernelManager.cull_interval = 2 * 60
```

---
title: JupyterHub SSL
---

# JupyterHub SSL

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout jupyterhub.key -out jupyterhub.crt
# In jupyterhub_config.py
# c.JupyterHub.ssl_key = 'jupyterhub.key'
# c.JupyterHub.ssl_cert = 'jupyterhub.crt'
# c.JupyterHub.port = 443
sudo su
echo https://localhost/user/datalayer/tree
jupyterhub --ip localhost --port 443 --ssl-key jupyterhub.key --ssl-cert jupyterhub.crt
```

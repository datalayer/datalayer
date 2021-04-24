---
title: JupyterHub URL
---

# JupyterHub URL

## URL Scheme

JupyterHub [URL Scheme](https://jupyterhub.readthedocs.io/en/latest/reference/urls.html).

- `/`
- `/hub/`
- `/hub/home`
- `/hub/login`
- `/hub/logout`
- `/user/:username[/:servername]`
- `/hub/user/:username[/:servername]`
- `/user-redirect/...`
- `/hub/spawn[/:username[/:servername]]`
- `/hub/token`
- `/hub/admin`

The hub supports a next query parameter which could redirect the user back to their notebook e.g. http://localhost:8000/hub/login?next=%2Fhub%2Fhome. So after successful login hub will send them to the following route next

## REST Endpoints

Upon the User URLs, JupyterHub also exposes [Rest API URLs](/hub/rest.md).

## Base URL

You can define a base url.

```python
JupyterHub.base_url = 'my_jupyterhub'
```

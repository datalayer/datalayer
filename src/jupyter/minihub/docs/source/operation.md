---
title: JupyterHub Operation
---

# JupyterHub Operation

[Run JupyterHub without root privileges using sudo](https://jupyterhub.readthedocs.io/en/latest/reference/config-sudo.html).

```bash
jupyterhub \
  --debug \
  -f /etc/jupyterhub/jupyterhub_config.py \
  --Application.log_level=30 &>> /var/log/jupyterhub.log
```

```bash
jupyter kernelspec list
```

```bash
# Set the log level by value or name.
c.JupyterHub.log_level = 'DEBUG'
# Enable debug-logging of the single-user server
c.Spawner.debug = True
# Enable debug-logging of the single-user server
c.LocalProcessSpawner.debug = True
```

## Telemetry

- https://jupyterhub.readthedocs.io/en/latest/events/index.html

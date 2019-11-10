---
title: JupyterHub Configuration
---

# JupyterHub Configuration

```bash
jupyterhub --generate-config
```

```bash
jupyterhub --generate-config && \
  mv ./jupyterhub_config.py /etc/jupyterhub/jupyterhub_config.py && \
  jupyterhub -f /etc/jupyterhub/jupyterhub_config.py --Spawner.notebook_dir='~/notebooks'
```

## Folders

+ `$DLAHOME/etc/conf/jupyterhub`: Configuration files.
+ `$DLAHOME/srv/jupyterhub`: Security and runtime files.
+ `$DLAHOME/var/log`: Log files.

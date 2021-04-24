---
title: JupyterHub Spawners
---

# JupyterHub Spawners

JupyterHub Spawners [Docs](https://jupyterhub.readthedocs.io/en/latest/reference/spawners.html).

Define the Spawner in `jupyterhub_config.py`.

## Spawner Examples

- [Local Spawner](https://github.com/jupyterhub/jupyterhub/blob/master/jupyterhub/spawner.py)
- [Batch Spawner](https://github.com/jupyterhub/batchspawner)
- [Docker Spawner](https://github.com/jupyterhub/dockerspawner)
- [Kube Spawner](https://github.com/jupyterhub/kubespawner)
- [Image Spawner](https://github.com/ryanlovett/imagespawner)
- [Sudo Spawner](https://github.com/jupyterhub/sudospawner)
- [Systemd Spawner](https://github.com/jupyterhub/systemdspawner)
- [Wrap Spawner](https://github.com/jupyterhub/wrapspawner)
- [Yarn Spawner](https://github.com/jupyterhub/yarnspawner)
- [RemoteSpawner](https://github.com/zonca/remotespawner)

## Docker Spawner

```bash
pip install dockerspawner
# Docker Spawner.
c.JupyterHub.spawner_class = 'dockerspawner.DockerSpawner'
c.DockerSpawner.volumes = {'jupyterhub-user-{username}': '/home/jovyan/work', 'jupyterhub-test': {'bind': '/home/jovyan/shared', 'mode': 'rw'}}
```

- `dockerspawner.DockerSpawner` for spawning identical Docker containers for each users.
- `dockerspawner.SystemUserSpawner` for spawning Docker containers with an environment and home directory for each users.
- both `DockerSpawner` and `SystemUserSpawner` also work with Docker Swarm for launching containers on remote machines.

## Kube Spawner

Read details in [Deploy on Kubernetes](/hub/k8s.md).

## Custom Spawner

- https://jupyterhub.readthedocs.io/en/latest/reference/spawners.html#writing-a-custom-spawner
- https://jupyterhub.readthedocs.io/en/latest/reference/authenticators.html#pre-spawn-start-and-post-spawn-stop-hooks

```python
# Custom Spawner.
class CustomDockerSpawner(DockerSpawner):
    def get_env(self):
        env = super().get_env()
        env['VAR'] = self.user.name 
        return env

c.JupyterHub.spawner_class = CustomDockerSpawner
```

## Options

```bash
c.Spawner.options_form = '<input name="c.Spawner.default_url" val="/lab"/><br>Please Choose <select name="letter" multiple="true"><option value="/lab">Jupyter Lab</option><option value="/tree">Classic Notebook</option></select>'
```

## Timeouts

- https://github.com/jupyterhub/jupyterhub/issues/1222

## GPU

- [Using GPUs on GKE](https://github.com/jupyterhub/zero-to-jupyterhub-k8s/issues/994).

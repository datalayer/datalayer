---
title: JupyterHub Spawners
---

# JupyterHub Spawners

JupyterHub Spawners [Docs](https://jupyterhub.readthedocs.io/en/stable/reference/spawners.html).

Define the Spawner in `jupyterhub_config.py`.

## Examples

+ [Batch Spawner](https://github.com/jupyterhub/batchspawner.git).
+ [Docker Spawner](https://github.com/jupyterhub/dockerspawner.git).
+ [Image Spawner](https://github.com/ryanlovett/imagespawner).
+ [Sudo Spawner](https://github.com/jupyterhub/sudospawner.git).
+ [Systemd Spawner](https://github.com/jupyterhub/systemdspawner).
+ [Wrap Spawner](https://github.com/jupyterhub/wrapspawner.git).
+ [Kube Spawner](https://github.com/jupyterhub/kubespawner.git).

## Configuration

```bash
c.Spawner.options_form = '<input name="c.Spawner.default_url" val="/lab"/><br>Please Choose <select name="letter" multiple="true"><option value="/lab">Jupyter Lab</option><option value="/tree">Classic Notebook</option></select>'
```

```bash
pip install dockerspawner
# Docker Spawner.
c.JupyterHub.spawner_class = 'dockerspawner.DockerSpawner'
c.DockerSpawner.volumes = {'jupyterhub-user-{username}': '/home/jovyan/work', 'jupyterhub-test': {'bind': '/home/jovyan/shared', 'mode': 'rw'}}
```

```python
# Kube Spawner.
c.KubeSpawner.environment.update({'HADOOP_USER_NAME': get_username})
c.KubeSpawner.extra_pod_config.update({'hostNetwork': "True"})
```

```python
# Custom Spawner.
class CustomDockerSpawner(DockerSpawner):
    def get_env(self):
        env = super().get_env()
        env['VAR'] = self.user.name 
        return env
c.JupyterHub.spawner_class = CustomDockerSpawner
```

## Image Selection

https://zero-to-jupyterhub.readthedocs.io/en/latest/user-environment.html#using-multiple-profiles-to-let-users-select-their-environment

The actual profile definition needs to go in your jupyterhub configuration.. Only the profile selection would go in the spawn request. This is only going to work if you know the possible list of images beforehand. kubespawner_override.image would be the thing to set. Otherwise, you are going to have to subclass KubeSpawner to expose image as an input during .start().

```python
# For the simplest version (no whitelist checking or anything).
class MyKubeSpawner(KubeSpawner):
  def start(self):
    self.image = self.user_options.get('image', self.image)
    return super().start()
```

The JSON body populates self.user_options. It's entirely up to the Spawner to interpret this, so you can define any option you want, as long as you implement handling it in start(). Some spawners have some parameters supported by default (in KubeSpawner, it's just profile referring to the profile by name)


## Timeouts

+ https://github.com/jupyterhub/jupyterhub/issues/1222

# GPU

+ [Using GPUs on GKE](https://github.com/jupyterhub/zero-to-jupyterhub-k8s/issues/994).

---
title: JupyterLab Workspaces
---

# JupyterLab Workspaces

JupyterLab workspaces [Docs](https://jupyterlab.readthedocs.io/en/stable/user/urls.html).

+ https://github.com/jupyterhub/nbgitpuller/issues/57
+ https://github.com/jupyterlab/jupyterlab/issues/5378
+ https://github.com/jupyterlab/jupyterlab/pull/5950

```bash
ls ~/.jupyter/lab/workspaces
```

```bash
# Exports the default JupyterLab workspace.
jupyter lab workspaces export
{"data": {}, "metadata": {"id": "/lab"}}
# Exports the workspaces named `foo`.
jupyter lab workspaces export foo
{"data": {}, "metadata": {"id": "/lab/workspaces/foo"}}
# Exports the workspace named `foo` into a file called `file_name.json`.
jupyter lab workspaces export foo > file_name.json
# Imports the workspace file `file_name.json`.
jupyter lab workspaces import file_name.json
Saved workspace: <workspaces-directory>/labworkspacesfoo-54d5.jupyterlab-workspace
```

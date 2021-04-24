---
title: JupyterLab Workspaces
---

# JupyterLab Workspaces

JupyterLab workspaces [Docs](https://jupyterlab.readthedocs.io/en/stable/user/urls.html).

- https://github.com/jupyterhub/nbgitpuller/issues/57
- https://github.com/jupyterlab/jupyterlab/issues/5378
- https://github.com/jupyterlab/jupyterlab/pull/5950

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

```bash
open http(s)://<server:port>/<lab-location>/lab/workspaces/foo?reset
```

How do I start JupyterLab with a clean workspace every time? 

Add `c.NotebookApp.default_url = '/lab?reset` to your `jupyter_notebook_config.py`.

## Code

The clone param can be added by an end user, but for auto workspaces (in master, not in @ellisonbg's branch) the clone parameter is added here before redirecting

- https://github.com/jupyterlab/jupyterlab/blob/master/packages/apputils-extension/src/index.ts#L127-L131

If the clone parameter exists when the page is loaded then that workspace name becomes the source we fetch from the workspaces REST end point

- https://github.com/jupyterlab/jupyterlab/blob/master/packages/apputils-extension/src/index.ts#L323-L329

So in your URL, that means the source is actually the default workspace because clone is not populated in the URL but it does exist.

Then when the workspace has been fetched, it is saved into the new workspace name (in your example that is auto-x) here:

- https://github.com/jupyterlab/jupyterlab/blob/master/packages/apputils-extension/src/index.ts#L361

and that save.invoke is running the debounced function defined here:

- https://github.com/jupyterlab/jupyterlab/blob/master/packages/apputils-extension/src/index.ts#L302-L307

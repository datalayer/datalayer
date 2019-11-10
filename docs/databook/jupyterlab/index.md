---
title: JupyterLab
---

# JupyterLab

JupyterLab [GitHub](https://github.com/jupyterlab/jupyterlab) repository.

JupyterLab [Docs](https://jupyterlab.readthedocs.io).

## Tutorial

Try the latest [Tutorial](https://github.com/jupyterlab/scipy2019-jupyterlab-tutorial).

Try the latest [Data8 Foundations of Data Science course](https://github.com/data-8/materials-sp18) material.

## CI CD

Check the [CI/CD](https://dev.azure.com/jupyterlab/jupyterlab) status.

## Community

Weekly Dev [Meetings](https://github.com/jupyterlab/jupyterlab#weekly-dev-meeting).

## Install

```bash
# Current version
conda install -y jupyterlab
```

```bash
# Latest pre-version.
pip install --upgrade --pre jupyterlab
```

```bash
# Conda env.
conda create \
  -n jlab12a1 \
  -c conda-forge/label/prerelease-jupyterlab \
  jupyterlab=1.2.0a1
```

```bash
# Optional.
# --sys-prefix Use sys.prefix as the prefix for installing nbextensions (for environments, packaging).
jupyter serverextension enable jupyterlab --sys-prefix
jupyter serverextension enable jupyterlab
jupyter serverextension list
jupyter serverextension disable jupyterlab
jupyter serverextension disable jupyterlab --sys-prefix
```

## Start

```bash
# Start JupyterLab in current folder.
jupyter lab
```

```bash
# Start options examples.
jupyter lab --debug notebook.ipynb > jlab.log 2>&1
jupyter lab --certfile=mycert.pem       # Use SSL/TLS certificate.
```

## Modes

1. Dev Mode with `--dev-mode`

Uses the unpublished local JavaScript packages in the `dev_mode` folder.  In this case JupyterLab will show a red stripe at the top of the page.

It can only be used if JupyterLab is installed as `pip install -e .`.

```bash
jupyter lab --dev-mode                  # Start JupyterLab in development mode, with no extensions.
```

2. Core Mode with `--core-mode`

In this mode JupyterLab will run using the JavaScript assets contained in the installed `jupyterlab` Python package.

In core mode, no extensions are enabled. This is the default in a stable JupyterLab release if you have no extensions installed.

```bash
jupyter lab --core-mode                 # Start JupyterLab in core mode, with no extensions.
```

3. App Mode with `--app-dir`

JupyterLab allows multiple JupyterLab `applications` to be created by the user with different combinations of extensions.

The `--app-dir` can be used to set a directory for different applications. The default application path can be found using `jupyter lab paths`.

```bash
jupyter lab --app-dir=~/myjupyterlabapp # Start JupyterLab with a particular set of extensions.
jupyter lab paths
# Application directory:   /opt/miniconda3/envs/jlab12a1/share/jupyter/lab
# User Settings directory: ~/.jupyter/lab/user-settings
# Workspaces directory:    ~/.jupyter/lab/workspaces
```

```bash
/opt/datalayer/opt/miniconda3/envs/jlab12a1/share/jupyter/lab
   |-schemas
   |---@jupyterlab
   |-----application-extension
     package.json.orig
     main.json
     sidebar.json
   |-----apputils-extension
   |-----codemirror-extension
   |-----completer-extension
   |-----console-extension
   |-----docmanager-extension
   |-----documentsearch-extension
   |-----extensionmanager-extension
   |-----filebrowser-extension
   |-----fileeditor-extension
   |-----imageviewer-extension
   |-----inspector-extension
   |-----launcher-extension
   |-----logconsole-extension
   |-----mainmenu-extension
   |-----markdownviewer-extension
   |-----notebook-extension
   |-----settingeditor-extension
   |-----shortcuts-extension
   |-----statusbar-extension
   |-----terminal-extension
   |-----tooltip-extension
   |-static
      index.html
      index.out.js
      package.json
      imports.css
      main.eb12a2b4fd4f208da612.js
      2.f96afee477f0935ada4d.js
      3.ee343abecb503540ef23.js
      4.65c91d649622c257e964.js
      5.f9460123e5bd6e8ddb65.js
      6.b294711d24bf8d886d7e.js
      7.29d946a0bb4293eaac7d.js
      vendors~main.e858511acc4cbaa94209.js
      912ec66d7572ff821749319396470bde.svg
      b06871f281fee6b241d60582ae9369b9.ttf
      674f50d287a8c48dc19ba404d20fe713.eot
      fee66e712a8a08eef5805a46892932ad.woff
      f7ae505a9eed503f8b8e6982036873e.woff2
   |-themes
   |---@jupyterlab
   |-----theme-dark-extension
   |-----theme-light-extension
```

## Awesome

[awesome-jupyterlab](https://github.com/mauhai/awesome-jupyterlab).

## Cookie Cutter

[jupyterlab_delux](https://github.com/jonmmease/jupyterlab_delux).

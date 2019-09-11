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
conda install -y jupyterlab && \
  jupyter lab
```

```bash
# Get latest version.
pip install --upgrade --pre jupyterlab
# jupyter serverextension enable --py jupyterlab --sys-prefix
```

```bash
# Start JupyterLab in current folder.
jupyter lab
```

## Modes

### Core Mode

`--core-mode`: In this mode JupyterLab will run using the JavaScript assets contained in the installed `jupyterlab` Python package. In core mode, no extensions are enabled. This is the default in a stable JupyterLab release if you have no extensions installed.

### Dev Mode

`--dev-mode`: Uses the unpublished local JavaScript packages in the `dev_mode` folder.  In this case JupyterLab will show a red stripe at the top of the page.  It can only be used if JupyterLab is installed as `pip install -e .`.

### App Mode

`--app-dir`: JupyterLab allows multiple JupyterLab "applications" to be created by the user with different combinations of extensions. The `--app-dir` can be used to set a directory for different applications. The default application path can be found using `jupyter lab path`.

## Paths

```bash
jupyter lab paths
```

## Awesome

[awesome-jupyterlab](https://github.com/mauhai/awesome-jupyterlab).

## Cookie Cutter

[jupyterlab_delux](https://github.com/jonmmease/jupyterlab_delux).

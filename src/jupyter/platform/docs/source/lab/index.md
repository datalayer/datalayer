---
title: JupyterLab
---

# JupyterLab

[GitHub](https://github.com/jupyterlab/jupyterlab) repository.

[Docs](https://jupyterlab.readthedocs.io)
[Alt Docs](https://jlab.readthedocs.io/en/debug-rtd/extensions_user.html)

[TypeDoc](http://jupyterlab.github.io/jupyterlab)

👀 [Eager share only core packages and their dependencies](https://github.com/jupyterlab/jupyterlab/pull/9332)  
👀 [Mixing federated bundle for widgets with non-federated source distributions do not work well together](https://github.com/jupyterlab/jupyterlab/issues/9289)  
👀 [Refactor build conventions](https://github.com/jupyterlab/jupyterlab/pull/9312)  
👀 [Require 'package' instead of 'package/' so webpack activates sharing](https://github.com/jupyterlab/jupyterlab/pull/9300)  
👀 [Adds package installation info to labextension list and uninstall output](https://github.com/jupyterlab/jupyterlab/pull/9244)  
👀 [Keep track of where an extension came from so you know how to uninstall it](https://github.com/jupyterlab/jupyterlab/issues/9231)  
👀 [Support a metadata file in the lab extension directory](https://github.com/jupyterlab/jupyterlab_server/pull/132)  
👀 [Adds package installation info to labextension list and uninstall output](https://github.com/jupyterlab/jupyterlab/pull/9244)  
👀 [Add package manager metadata](https://github.com/jupyterlab/extension-cookiecutter-ts/pull/109)  
👀 [Restructure federated extensions to allow for package manager metadata](https://github.com/jupyterlab/jupyterlab/pull/9239)  
👀 [Add instructions to release on PyPI and conda forge](https://github.com/jupyterlab/extension-cookiecutter-ts/issues/101)  
👀 [Add extension companion install code](https://github.com/jupyterlab/jupyterlab/pull/6277)  
👀 [Notebook-only mode: provide a 1 to ~1 equivalent of notebook classic](https://github.com/jupyterlab/jupyterlab/issues/8450)  

## Config

- https://github.com/jupyterlab/jupyterlab/issues/9436

```bash
mkdir -p ~/.jupyter/lab/user-settings/\@jupyterlab/apputils-extension && \
  CONF="{ \"theme\": \"JupyterLab Winter\" }" && \
  cat > ~/.jupyter/lab/user-settings/\@jupyterlab/apputils-extension/themes.jupyterlab-settings  <<EOF
${CONF}
EOF
```

## History

- https://github.com/jupyterlab/jupyterlab/tree/deb4075
- https://github.com/jupyterlab/jupyterlab/tree/e9f67ae612639037f6e19ef43d71ce497e0efa6b

## Release

@/all FYI, 2.3.0a0 is released. You can install it with pip install jupyterlab==2.3.0a0. The main feature is performance improvment with the implementation Virtual Notebook and also some updates on CSS display. Thx to all who helped to define/review/test/… and converge to get those PRs merged. Thx also to all who helped during the release.

## Governance

[Team Compass](https://github.com/jupyterlab/team-compass)

## CI/CD

[Check the CI/CD](https://dev.azure.com/jupyterlab/jupyterlab) status.

## Community

Weekly Dev [Meetings](https://github.com/jupyterlab/jupyterlab#weekly-dev-meeting).

## Demo

[JupyterLab Demo](https://github.com/jupyterlab/jupyterlab-demo).

## Tutorials

- https://github.com/jupyterlab/jupytercon-jupyterlab-tutorial
- https://github.com/jupyterlab/jupyterlab-media

- [JupyterLab Extension Tutorial](https://github.com/jtpio/jupyterlab-extension-tutorial)

- [Getting Started with JupyterLab | SciPy 2019 Tutorial](https://www.youtube.com/watch?v=RFabWieskak&amp)
- [Scipy 2019 JupyterLab Tutorial](https://github.com/jupyterlab/scipy2019-jupyterlab-tutorial)
- https://www.youtube.com/watch?v=RFabWieskak&t=8957s

- [Getting Started with JupyterLab (Beginner Level) | SciPy 2018 Tutorial](https://www.youtube.com/watch?v=Gzun8PpyBCo)
- [Getting Started with JupyterLab (Beginner Level) | SciPy 2018 Tutorial](https://www.youtube.com/watch?v=Gzun8PpyBCo&t=2645s)
- [Scipy 2018 JupyterLab Tutorial](https://github.com/jupyterlab/scipy2018-jupyterlab-tutorial)

- [Data8 Foundations of Data Science course](https://github.com/data-8/materials-sp18) material

- https://github.com/mkery/jupyterlab-codeanalysisdemo

## Install

```bash
# Current version.
conda install -y jupyterlab
```

```bash
# Latest pre-version.
pip install --upgrade --pre jupyterlab
```

```bash
# Conda env.
conda create \
  -n jupyterlab \
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

1. Dev Mode with `--dev-mode` (or `--dev`)

- Uses the unpublished local JavaScript packages in the `dev_mode` folder.
- In this case JupyterLab will show a red stripe at the top of the page.
- It can only be used if JupyterLab is installed as `pip install -e .`.
- You need to run `yarn build` in the `dev_mode` repository.
```bash
jupyter lab --dev-mode # Start JupyterLab in development mode, with no extensions.
```

2. Core Mode with `--core-mode` (or `--core`)

- In this mode JupyterLab will run using the JavaScript assets contained in the installed `jupyterlab` Python package.
- In core mode, no extensions are enabled.
- This is the default in a stable JupyterLab release if you have no extensions installed.

```bash
jupyter lab --core-mode # Start JupyterLab in core mode, with no extensions.
```

3. App Mode with `--app-dir`

- JupyterLab allows multiple JupyterLab `applications` to be created by the user with different combinations of extensions.
- The `--app-dir` can be used to set a directory for different applications.
- The default application path can be found using `jupyter lab paths`.

```bash
jupyter lab --app-dir=~/my_jupyter_labapp # Start JupyterLab with a particular set of extensions.
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

## Docs

```bash
open file://$DLAHOME/repos/jupyterlab/docs/build/html/index.html
cd $DLAHOME/repos/jupyterlab/docs && \
  pip install -r requirements.txt && \
  make html
```

```bash
open file://$DLAHOME/repos/jupyterlab/docs/api/index.html
cd $DLAHOME/repos/jupyterlab && \
  yarn docs
```

## Awesome

[Awesome JupyterLab](https://github.com/mauhai/awesome-jupyterlab).

## Full Screen

For example, pasting this into the browser console enables the behavior I'm looking for by double-clicking the jupyter logo.

```javascript
$('#jp-MainLogo').addEventListener('dblclick', () => document.documentElement.requestFullscreen())
```

See Also

- https://github.com/sindresorhus/screenfull.js/blob/master/src/screenfull.js
- https://github.com/deathbeds/wxyz/blob/master/src/ts/wxyz-html/src/widgets/fullscreen.ts

## Customized Distribution

- https://github.com/robots-from-jupyter/robotlab
- https://github.com/gt-coar/gt-coar-lab
- http://www.bionet.ee.columbia.edu/research/ffbo/fbl

## Package as Conda Package

Examples:

- https://github.com/jupyter-widgets/ipyleaflet/blob/1be86aef72d66707d58e6fb855c0708d630bc5d0/setup.py#L68
- https://github.com/jupyter-widgets/widget-ts-cookiecutter/blob/0e4a4cdbcdebe713b2b9a24b80ec601453c56df5/%7B%7Bcookiecutter.github_project_name%7D%7D/setup.py#L49

## Content

- https://github.com/telamonian/tree-finder
- https://bl.ocks.org/telamonian/330781ee64e02c514081851d272cd0a6

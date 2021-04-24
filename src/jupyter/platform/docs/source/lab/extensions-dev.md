---
title: JupyterLab Develop Extensions
---

# JupyterLab Develop Extensions

## Docs

- [Docs](https://jupyterlab.readthedocs.io/en/latest/developer/extension_dev.html)
- [State Database](https://jupyterlab.readthedocs.io/en/latest/developer/extension_dev.html#state-database)
- [Context Menu](https://jupyterlab.readthedocs.io/en/latest/developer/extension_dev.html#context-menus)

- https://jupyterlab.readthedocs.io/en/latest/extension/documents.html
- https://jupyterlab.readthedocs.io/en/latest/api

## Examples

[JupyterLab Extension Examples](https://github.com/jupyterlab/extension-examples).

## JupyterLab 3 vs 2

| JupyterLab 3 | Node.js   | Python    |
| -------------|:---------:|:---------:|
| Developer    |    1️⃣     |    2️⃣      |
| User         |          |    3️⃣      |

1️⃣ Build Frontend  
2️⃣ Develop Server + Package  
3️⃣ Install Dynamic (Frontend and Server) Extensions  

| JupyterLab 2 | Node.js   | Python    |
| -------------|:---------:|:---------:|
| Developer    |    1️⃣     |    2️⃣      |
| User         |    3️⃣     |    4️⃣      |

1️⃣ Build Frontend + Package  
2️⃣ Develop Server  
3️⃣ Install and Build Frontend Extensions  
4️⃣ Install and Build Server Extensions  

|          | local                                              | npm                                           | pypi/conda                       |
| -------- |:--------------------------------------------------:|:---------------------------------------------:|:--------------------------------:|
| static   | `jupyter labextension install <local-path>`        | `jupyter labextension install` <npm-package>  | `pip/conda install <py-package>` |
| dynamic  | `jupyter labextension develop .` + `jlpm watch`    | Not available yet                             |` pip/conda install <py-package>` |

|                      | local     | npm     | pypi/conda |
| -------------------- |:---------:|:-------:|:----------:|
| labextension link    | static    | -       | -          |
| yarn watch           | dynamic   | -       | -          | 
| labextension install | static    | static<br/> (dynamic in 3.1)  | -          | 
| pip install          | dynamic<br/>static   | -       | dynamic<br/>static    | 

(*) `static` implies `jupyter lab build` to be run.

## Migrate from JupyterLab 2 to 3

```bash
# Add a migration guide from 2.x to 3.x for extension authors
# - https://github.com/jupyterlab/jupyterlab/issues/9118
# - https://github.com/jupyterlab/jupyterlab/pull/9162
python -m jupyterlab.upgrade_extension .
```

## Linked Extensions

[Fix handling of linked extensions](https://github.com/jupyterlab/jupyterlab/pull/7728): Use `resolutions` for linked extensions and packages, so they do not need to be published to npm.

## Develop Extension with Core Dev Mode

[Add ability to include third party extension in dev mode](https://github.com/jupyterlab/jupyterlab/pull/8037)

Use `externalExtensions` as described on https://jupyterlab.readthedocs.io/en/latest/developer/extension_dev.html.

- Another option to try out your extension with a local version of JupyterLab is to add it to the
list of locally installed packages and to have JupyterLab register your extension when it starts up.
You can do this by adding your extension to the ``jupyterlab.externalExtensions`` key
in the ``dev_mode/package.json`` file.
- It should be a mapping of extension name to version, just like in `dependencies`.
- Then run `jlpm run integrity && jlpm run build`
and these extensions should be added automatically to the ``dependencies`` and pulled in.
- When you then run `jupyter lab --dev-mode` or `jupyter lab --dev-mode --watch` this extension
will be loaded by default.
- For example, this is how you can add the Jupyter Widgets extensions:

```json
  "externalExtensions": {
    "@jupyter-widgets/jupyterlab-manager": "2.0.0"
  },
```

## Develop Extensions in JupyterLab

[Develop extensions inside JupyterLab itself](https://github.com/jupyterlab/jupyterlab/issues/7469)

## Cookie Cutter

- https://github.com/jupyterlab/extension-cookiecutter-ts
- https://github.com/jupyterlab/extension-cookiecutter-ts/tree/3.0

```bash
cookiecutter https://github.com/jupyterlab/extension-cookiecutter-ts
# In Extension Repo.
yarn install && \
  yarn run build
# See in $(dirname $(which jupyter))/../share/jupyter/lab/settings/build_config.json
jupyter labextension link . && \
  yarn watch
# In JupyterLab Repo.
cd $DLAHOME/repos/jupyterlab && \
  jupyter lab build && \
  jupyter lab --watch
# jupyter lab --dev-mode
# jupyter lab --dev-mode --watch
# jupyter lab --core-mode
```

```
- name: Create pure frontend extension
  run: |
    cookiecutter . --no-input
    cd myextension
    pip install -e .
    jlpm run eslint:check
    jupyter labextension list 1>labextensions 2>&1
    cat labextensions | grep "myextension.*OK"
    python -m jupyterlab.browser_check
    jlpm run install:extension
    jupyter labextension build .

    jupyter labextension uninstall myextension
    pip uninstall -y myextension jupyterlab

- name: Create server extension pip develop
  run: |
    # Trick to use custom parameters
    python -c "from cookiecutter.main import cookiecutter; import json; f = open('cookiecutter_with_server.json'); cookiecutter('.', extra_context=json.load(f), no_input=True); f.close()"
    cd my_extension
    pip install -e .
    jupyter server extension list 1>serverextensions 2>&1
    cat serverextensions | grep "my_extension.*OK"
    jupyter labextension list 1>labextensions 2>&1
    cat labextensions | grep "my_lab_extension.*OK"
    python -m jupyterlab.browser_check

    jupyter labextension develop . --overwrite
    jupyter labextension build .
    jupyter labextension build .

    jupyter labextension uninstall my_lab_extension
    pip uninstall -y my_extension jupyterlab
    cd ..
    rm -rf my_extension

- name: Install server extension from a tarball
  run: |
    # Trick to use custom parameters
    python -c "from cookiecutter.main import cookiecutter; import json; f = open('cookiecutter_with_server.json'); cookiecutter('.', extra_context=json.load(f), no_input=True); f.close()"
    cd my_extension
    pip install --pre jupyter_packaging jupyterlab
    python setup.py sdist
    pip install dist/*.tar.gz
    jupyter labextension list 1>labextensions 2>&1
    cat labextensions | grep "my_lab_extension.*OK"
    jupyter server extension list 1>serverextensions 2>&1
    cat serverextensions | grep "my_extension.*OK"
    python -m jupyterlab.browser_check

    pip uninstall -y my_extension jupyterlab
    cd ..
    rm -rf my_extension
```

[jupyterlab_delux](https://github.com/jonmmease/jupyterlab_delux).

With Server Extensions

- https://github.com/fcollonval/cookiecutter-jupyterlab-extension-with-serverextension
- https://github.com/fcollonval/jupyterlab_api_ext
- https://github.com/ktaletsk/cookiecutter-jupyterlab-extension-with-serverextension

# Examples

```bash
cd $DLAHOME/src/jupyter/lab/twitter && \
  yarn install && \
  yarn build && \
  jupyter labextension install
```

```bash
# Terminal 1.
cd $DLAHOME/src/jupyter/lab/twitter && \
  jupyter labextension link && \
  yarn watch
# Terminal 2.
cd $DLAHOME/repos/jupyterlab && \
  jupyter lab --watch
```

```bash
# Installation and activation of git handler.
# Installation and activation for jupyterlab_git python handler package.
cd $DLAHOME/repos/jupyterlab-git && \
  pip install . && \
  jupyter serverextension enable --py jupyterlab_git && \
  yarn install && \
  yarn run build && \
  jupyter labextension install
# Launch JupyterLab & you will see the new git buttons on the left side of the window.
jupyter lab
```

```bash
# If you must install a extension into a development branch of JupyterLab, you have to graft it into the source tree of JupyterLab itself. In the JupyterLab root directory, where <path-or-url> refers either to an extension npm package on the local filesystem, or a URL to a git repository for an extension npm package.
yarn run add:sibling $DLAHOME/src/jupyter/lab/twitter && \
  jupyter lab --dev-mode --watch
# This operation may be subsequently reversed by running.
yarn run remove:sibling $DLAHOME/src/jupyter/lab/twitter
```

## Upgrade

```bash
# Align dependencies with latest JupyterLab releases.
jupyter labextension update --all
# or...
yarn upgrade --latest --exact --scope @jupyterlab
```

## Discovey Metadata

- [Companion Packages](https://jupyterlab.readthedocs.io/en/latest/developer/extension_dev.html#companion-packages)

- https://github.com/vidartf/jupyterlab_discovery
- https://jupyterlab-discovery.readthedocs.io/en/stable/index.html

# Disable

See in `$(dirname $(which jupyter))/../share/jupyter/lab/settings/build_config.json`

```json
#  "@jupyterlab/notebook-extension:tools",
"uninstalled_core_extensions": [
  "@jupyterlab/filebrowser-extension",
  "@jupyterlab/terminal-extension",
  "@jupyterlab/mainmenu-extension",
  "@jupyterlab/settingeditor-extension",
  "@jupyterlab/tabmanager-extension",
  "@jupyterlab/statusbar-extension",
  "@jupyterlab/running-extension"
]

"disabledExtensions": [
  "@jupyterlab/toc"
],
```

## Publish

```bash
npm login
npm config set scope datalayer
# Publishing extensions.
npm publish --access=public
```

## Example

```bash
# Link all extensions in packages.
yarn run link
# Link geojson-extension only.
jupyter labextension link packages/geojson-extension
# After making changes to the source packages, the jupyter packages must be rebuilt.
# Rebuild the source.
cd $DLAHOME/repos/jupyterlab && \
  jupyter lab build
```

## Watch

```bash
# You may also watch the jupyter-renderers directory for changes and automatically rebuild.
# In one terminal tab, watch the jupyter-renderers directory.
yarn watch
# In another terminal tab, run jupyterlab with the watch flag.
jupyter lab --watch
```

## Utils

- https://github.com/deathbeds/jupyterlab-starters
- https://jupyterstarters.readthedocs.io/en/latest

## Read Also

- https://discourse.jupyter.org/t/plugin-extension-development-adding-a-widget-to-header-area-of-jupyterfrontend-ishell-does-not-make-the-area-visible/3682/4
- https://discourse.jupyter.org/t/custom-panel-extension-in-the-left-jupyterlab-area/1502/4
- https://github.com/vidartf/lab_ext_profile

## Cases

## Iterate Through Cells

Two pieces from my extensions which may help you: https://github.com/krassowski/jupyterlab-lsp/blob/master/packages/jupyterlab-lsp/src/virtual/editors/notebook.ts#L368-L385 and https://github.com/krassowski/jupyterlab-lsp/blob/master/packages/jupyterlab-lsp/src/virtual/editors/notebook.ts#L368-L385

Also https://github.com/krassowski/jupyterlab-lsp/blob/master/packages/jupyterlab-lsp/src/virtual/editors/notebook.ts#L317-L333.

Finally, the cells may be empty because the notebook has not not been populated yet. You may need to await, or just run on a signal from like context.model.contentChanged.connect. An example here: https://github.com/krassowski/jupyterlab-lsp/blob/6bf1b2bc45054773f9d8d42b5200998a4ef8f8f7/packages/jupyterlab-lsp/src/adapters/jupyterlab/jl_adapter.ts#L460

@krassowski Thanks for the reply. That was really helpful. I think the extension was loading before the model was completely populated. I am now using notebook.model.contentChanged & notebook.model.stateChanged signal to listen for changes.

## Examples

```javascript
// Install the custom extension:

var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');

var MyModel = widgets.DOMWidgetModel.extend({
  defaults: _.extend(
    _.result(this, 'widgets.DOMWidgetModel.prototype.defaults'),
    {
      _model_name: 'MyModel',
      _model_module: 'my-extension',
      _model_module_version: 'v0.1.0',
      _view_name: 'MyView',
      _view_module: 'my-extension',
      _view_module_version: 'v0.1.0'
    }
  )
});

var MyView = widgets.DOMWidgetView.extend({
  render: function render() {
    this.container = document.createElement('div');
    this.container.style.height = '240px';

    this.el.appendChild(this.container);

    var mousedown = false;
    var mousedownShift = false;

    this.container.addEventListener('mousedown', function mousedownHandler(event) {
      mousedown = true;
      mousedownShift = event.shiftKey;
      console.log('mousedown', mousedownShift);
    });

    window.addEventListener('mouseup', function mouseupHandler() {
      mousedown = false;
      mousedownShift = false;
      console.log('mouseup');
    });

    this.container.addEventListener('mousemove', function lassoHandler(event) {
      // None of these logs will fire on mousedown+shift
      console.log('mousemove');
      if (mousedownShift) console.log('mousemove while mousedown+shiftKey');
    });
  },
});

module.exports = {
  MyModel: MyModel,
  MyView: MyView
};
/*
Expected behavior

Since this is a custom DOM widget, all events should be accessible.
Context

    Operating System and version: macOS 10.14.6
    Browser and version: Chrome 83
    JupyterLab version: 2.1.4
    jupyter-widgets/base version: 2.0
*/
```

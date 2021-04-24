---
title: JupyterLab Extensions Federation
---

# JupyterLab Extensions Federation

Wwile developing a federated extension, I run jupyter labextension develop —overwrite which allows me then to run jlpm watch to have the changes directly in the browser and further debug with Chrome/FF Developer. The browser shows me js and not ts file. Is there a settings that would allow me to see the ts file. With federation, the files are loaded remotely, so I guess no? I have tried with jupyter labextension link and I also get js in the Chrome/FF Developer.
- Make sure you have source maps enabled in the browser debugger
- Check to see if the source maps are generated (they should be generated if compiling the extension in dev mode, or in watch mode)

## Discussions

package.json

```json
   "jupyterlab": {
-    "extension": true
+    "extension": "build/index.js",
+    "outputDir": "dist/jupyterlab-datawidgets",
+    "sharedPackages": {
+      "@jupyter-widgets/base": {
+        "bundled": false,
+        "singleton": true
+      }
+    }
   }
```

- [Extension Development Wishlist](https://github.com/jupyterlab/jupyterlab/issues/7468)
- [Extension Development Wishlist](https://github.com/jupyterlab/jupyterlab/issues/7468#issuecomment-609561262)
- [Extension Development Wishlist](https://github.com/jupyterlab/jupyterlab/issues/7468#issuecomment-671580524)
- [Extension Development Wishlist](https://github.com/jupyterlab/jupyterlab/issues/7468#issuecomment-581600432)
- [[DEPRECATED] Create and install extensions without Webpack](https://github.com/jupyterlab/jupyterlab/issues/5672)
- [[DEPRECATED] Create and install extensions without Webpack](https://github.com/jupyterlab/jupyterlab/issues/5672#issuecomment-526278264)
  - Be clearer about when we have sourcemaps on, make sure sourcemaps go all the way back to TypeScript.
  - Prebuild extensions and have them served without building.
  - What about vscode model?: they keep every extension in a seperate process and just use message passing to communicate.
  - We don't do that cause we wanna give extensions access to shared JS objects and the DOM.
- [Notes on JupyterLab Build](https://discourse.jupyter.org/t/notes-on-jupyterlab-build/541)
- [Upgrade to Webpack 5.0b16](https://github.com/jupyterlab/jupyterlab/pull/8385)

## Dev Mode

Enable using federated extensions in dev mode when a flag is set https://github.com/jupyterlab/jupyterlab/pull/9286 `--extensions-in-dev-mode`

## Consumer and Producer

- [Mixing federated bundle for widgets with non-federated source distributions do not work well together](https://github.com/jupyterlab/jupyterlab/issues/9289)
- https://github.com/jupyterlab/jupyterlab/pull/9300
- https://github.com/jupyterlab/jupyterlab/issues/9310

- https://github.com/jasongrout/provider
- https://github.com/jasongrout/consumer

## Module Federation

- https://github.com/jupyterlab/juptyerlab-module-federation
- https://github.com/jupyterlab/jupyterlab-module-federation/pull/59/files
- https://github.com/jupyterlab/jupyterlab-module-federation/pull/62

- [Mixing federated bundle for widgets with non-federated source distributions do not work well together](https://github.com/jupyterlab/jupyterlab/issues/9289)

## PRs

- https://github.com/jupyterlab/jupyterlab/pull/8385
- https://github.com/jupyterlab/jupyterlab/pull/8772
- https://github.com/jupyterlab/jupyterlab/pull/8802

## Gist

- https://gist.github.com/jtpio/8d392846c2f3ee6fab38cdfab5a364ec

```bash
# https://discourse.jupyter.org/t/jupyterlab-3-0-release-candidate-available/6248
Yes, the goal of the gist is also to showcase how to ship lab extensions with conda.
There will be a guide available soon, currently tracked in 
- https://github.com/jupyterlab/jupyterlab/issues/9118
In the meantime you might want to have a look at the 3.0 branch of the extension examples repo: 
- https://github.com/jupyterlab/extension-examples/tree/3.0  
Which have been updated to target the latest RCs.
Or even at the source for the python file extension, which is a rather simple extension:
- https://github.com/jtpio/jupyterlab-python-file
Normally upgrading should almost of running the upgrade script (thanks Steve for this!).
```

## Upgrade

- https://github.com/jupyterlab/jupyterlab-module-federation
- https://github.com/jupyterlab/jupyterlab-module-federation/blob/master/README.md

- https://jupyterlab.readthedocs.io/en/latest/getting_started/changelog.html#extensions-can-be-installed-without-building-jupyterlab-with-nodejs
- https://jupyterlab.readthedocs.io/en/latest/user/extensions.html#extensions

- https://jupyterlab.readthedocs.io/en/latest/getting_started/changelog.html#federated-extensions
- https://jupyterlab.readthedocs.io/en/latest/developer/extension_dev.html

- https://github.com/jupyterlab/jupyterlab/issues/9118

## Examples

- https://github.com/jupyterlab/extension-examples/commits/3.0

- https://github.com/jupyterlab/extension-examples/pull/119
- https://github.com/jupyterlab/extension-examples/issues/115

- https://github.com/jtpio/jupyterlab-python-file

## Msc

- [Dynext](https://github.com/wolfv/jupyterlab-dynext) - A JupyterLab extension to load JupyterLab extensions (dynamically)
- https://discourse.jupyter.org/t/dynamic-jupyterlab-extension-loading/3089

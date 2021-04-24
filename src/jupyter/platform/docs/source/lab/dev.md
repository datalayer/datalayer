---
title: JupyterLab Develop
---

# JupyterLab Develop

[Development Docs](https://jupyterlab.readthedocs.io/en/latest/developer/repo.html).
[TypeDoc](https://jupyterlab.github.io/jupyterlab/index.html).
[TypeScript Style Guide](https://github.com/jupyterlab/jupyterlab/wiki/TypeScript-Style-Guide).

## Dev Tools

`SHIFT-Right-Click` to get the native browser menu.

## Dependency Graph

![JupyterLab Plugins](https://jupyterlab.readthedocs.io/en/latest/_images/dependency-graph.svg)

- https://jupyterlab.readthedocs.io/en/stable/developer/extension_dev.html#standard-general-purpose-extensions

Create for the built-in node_modules graph.

```bash
yarn analyze
```

Try also [plugin-graph](https://github.com/jtpio/jupyterlab-plugin-graph)

## Build

- Populate the staging directory using template files.
- Handle any locally installed packages.
- Ensure all installed assets are available.
- Bundle the assets.
- Copy the bundled assets to the static directory.

Note that building will always use the latest JavaScript packages that meet the dependency requirements of JupyterLab itself and any installed extensions.

See also [Add webpack-visualizer-plugin to dev_mode webpack config #5722](https://github.com/jupyterlab/jupyterlab/pull/5722).

```bash
# Set yarn cache dir
yarn cache dir
yarn config set cache-folder ~/.yarn-cache
# yarn cache clean
# rm -fr ~/.node-gyp
```

```bash
# Clone the sources.
cd $DLAHOME/repos && \
  git clone https://github.com/jupyterlab/jupyterlab.git
```

Enable jupyter labextension build/watch to work for custom jupyterlab distribution: `jupyter labextension build --core-path=/my/custom/jlab/package /my/extension/to/build`

```bash
# Start clean.
#  find . -name yarn.lock | xargs rm -fr {} || true && \
cd $DLAHOME/repos/jupyterlab && \
  find . -name __pycache__ | xargs rm -fr {} || true && \
  find . -name lib | xargs rm -fr {} || true && \
  find . -name node_modules | xargs rm -fr {} || true && \
  find . -name build | xargs rm -fr {} || true && \
	find . -name tsconfig.tsbuildinfo | xargs rm -fr {} || true
# Install prerequisites.
cd $DLAHOME/repos/jupyterlab && \
  pip install -e .[test]
# Builds the packages source files into javascript files in lib folder.
cd $DLAHOME/repos/jupyterlab && \
  yarn && \
  yarn build
cd $DLAHOME/repos/jupyterlab && \
  jupyter lab build
cd $DLAHOME/repos/jupyterlab && \
  yarn build:src && \
  yarn build:utils && \
  yarn build:packages && \
  yarn build:testutils
# yarn build:test:scope
# Builds a distribution.
#   --dev-build=False
```

```bash
jupyter lab clean --all
```

I remember my own teething pains the first time I had to set up a settings schema for an extension. You need to specify it in three places exactly:

1. The schema file path in files in `package.json`.
1. The schema dir path in jupyterlab.schemaDir in `package.json`.
1. `<package-name>:<schema-file-name-without-extension>`as the id of your frontend extension.

```bash
# Build more accurate sourcemaps that show the original Typescript code when debugging.
# However, it takes a bit longer to build the sources, so is used only to build for production by default.
cd $DLAHOME/repos/jupyterlab && \
  yarn run build:dev:prod && \
  ls -alph dev_mode/static && \
  du -h dev_mode/static
```

```bash
# Build the core mode assets (optional).
yarn run build:core
```

```bash
# extensions
# schemas
# settings
# staging
# static
# themes
ls $(dirname $(which jupyter))/../share/jupyter/lab
```

## Build from Branch

```bash
conda create -y -n jupyterlab-feature \
    python=3.7 \
    nodejs=12.14.1 \
    yarn=1.22.0 && \
  conda activate jupyterlab-feature && \
  git clone https://github.com/datalayer-contrib/jupyterlab-server --branch jupyterlab-feature --depth 1 && \
  pip install -e ./jupyterlab-server && \
  git clone https://github.com/datalayer-contrib/jupyterlab --branch jupyterlab-feature --depth 1 && \
  pip install -e ./jupyterlab && \
  cd jupyterlab && \
  yarn build && \
  cd packages/extensionmanager-extension/examples/listings && \
  make dev # edit Makefile to define the listings URIs.
```

## Start

```bash
# --browser chromium-browser
jupyter lab --dev-mode --watch
```

```bash
# If you wish to run JupyterLab with the set of pinned requirements that was shipped with the Python package, you can launch as.
jupyter lab --core --watch
```

## Lint

```bash
export NODE_OPTIONS="--max-old-space-size=8192"
yarn lint
```

## Debug

- https://github.com/jupyterlab/jupyterlab/issues/3979

Modify `./vscode/launch.json` to override the source map paths, so that it could match the filesystem to the source maps:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:8888/",
            "webRoot": "${workspaceFolder}",
            "sourceMapPathOverrides": {
                "webpack:///../../../../*": "${webRoot}/packages/*"
            }
        }
    ]
}
```

## Clean

```bash
# At times, it may be necessary to clean your local repo with the command yarn run clean:slate.
# This will clean the repository, and re-install and rebuild.
yarn clean:slate
# Deletes the lib directory.
yarn clean
```

## Backward Compatibility

- [Backwards incompatability checklist](https://github.com/jupyterlab/jupyterlab/issues/7289)

## Content Factory

- [Kill content factory pattern in notebook widgets](https://github.com/jupyterlab/jupyterlab/issues/8236)
- [Remove content factory pattern](https://github.com/jupyterlab/jupyterlab/pull/8266)

`Content Factory Pattern`, currently used by:

- https://github.com/deshaw/jupyterlab-execute-time
- https://github.com/ibqn/jupyterlab-codecellbtn
- https://github.com/jupytercalpoly/jupyterlab-richtext-mode
- [Prosemirror Editor](https://github.com/jupytercalpoly/jupyterlab-richtext-mode/blob/master/src/factory.tsx)

## Update Dependencies

```bash
# Update all dependencies to latest.
yarn run update:dependency '^(?!@jupyterlab).*' latest --regex
```

```bash
# Update all dependencies (except jupyterlab) to latest.
yarn run update:dependency '^(?!@jupyterlab).*' latest --regex
```

```bash
# Update all dependencies (except jupyterlab, codemirror, xterm) to latest
yarn run update:dependency --regex '^(?!@jupyterlab|codemirror|@types/codemirror|xterm|linters).*' latest
```

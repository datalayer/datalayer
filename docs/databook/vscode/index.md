---
title: Visual Studio Code
---

# Visual Studio Code

GitHub [repo](https://github.com/microsoft/vscode) source code.

[Download](https://code.visualstudio.com).

[Download Insiders](https://code.visualstudio.com/insiders).

## Docs

GitHub [Docs](https://github.com/microsoft/vscode-docs) repository.

[Docs](https://code.visualstudio.com/docs).

## Wiki

[Wiki](https://github.com/microsoft/vscode/wiki)

## Command Palette

+ `CTRL+P` - `CMD+P` on Mac
+ `CTRL+SHIFT+P` - `CMD+SHIFT+P` on Mac

## Workspace

[Multi Root Workspace APIs](https://github.com/microsoft/vscode/wiki/Adopting-Multi-Root-Workspace-APIs).

## Source

[Source Code Organization](https://github.com/microsoft/vscode/wiki/Source-Code-Organization).

[Coding Guidelines](https://github.com/microsoft/vscode/wiki/Coding-Guidelines).

## Build

[How to Contribute](https://github.com/microsoft/vscode/wiki/How-to-Contribute).

[Contribute](https://github.com/microsoft/vscode/blob/master/CONTRIBUTING.md).

```bash
ENV=vscode && \
  conda deactivate && \
  conda remove -n $ENV -y --all && \
  conda create -y -n $ENV \
    python=2.7 \
    nodejs=12.3.0 \
    yarn=1.19.2 && \
  conda activate $ENV && \
  export PATH=/opt/miniconda3/envs/$ENV/bin:$PATH
```

```bash
git clone https://github.com/microsoft/vscode --depth 1 && \
  cd vscode
```

```bash
# Terminal 1.
yarn && yarn compile
# ... or
yarn && yarn watch
# Terminal 2.
./scripts/code.sh
```

👉 Tip!
You don't need to stop and restart the development version of VS Code after each change.
You can just execute Reload Window from the command palette. 
We like to assign the keyboard shortcut CMD+R (CTRL+R on Windows, Linux) to this command.

## Run a Build with Extensions

In the root of the source, update `product.json`.

```json
  "extensionsGallery": {
    "serviceUrl": "https://marketplace.visualstudio.com/_apis/public/gallery",
    "cacheUrl": "https://vscode.blob.core.windows.net/gallery/index",
    "itemUrl": "https://marketplace.visualstudio.com/items"
  }
```

Regarding marketplace license, read the following.

+ https://stackoverflow.com/questions/37143536/no-extensions-found-when-running-visual-studio-code-from-source
+ https://github.com/microsoft/vscode/issues/31168
+ https://github.com/microsoft/vscode/issues/1557
+ https://github.com/microsoft/vscode/issues/39205

## Debug

VS Code has a multi-process architecture and your code is executed in different processes.

**The render process runs the UI code inside the Shell window.**

To debug code running in the render you can either use [1] VS Code or the [2] Chrome Developer Tools.

[1] Using VS Code

- Install the [VSCode Debugger for Chrome](https://github.com/microsoft/vscode-chrome-debug) ([Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)) extension.
- This extension will let you attach to and debug client side code running in Chrome.
- Open the vscode repository folder.
- Choose the `Launch VS Code` launch configuration from the launch dropdown in the Debug viewlet and press F5.

```bash
# Launch Chrome with a debugging port.
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
```

[2] Using the Chrome Developer Tools

- Run the `Developer: Toggle Developer Tools` command from the Command Palette in your development instance of VS Code to launch the Chrome tools.
- It's also possible to debug the released versions of VS Code, since the sources link to sourcemaps hosted online.

**The extension host process runs code implemented by a plugin.**

- To debug extensions (including those packaged with VS Code) which run in the extension host process, you can use VS Code itself.
- Switch to the Debug viewlet, choose the `Attach to Extension Host` configuration, and press F5.

**Search uses a separated process**

- The search process can be debugged, but must first be started.
- Before attempting to attach, start a search by pressing CMD+P (CTRL+P on Windows), otherwise attaching will fail and time out.

## Build for Web

```bash
# Terminal 1.
yarn && yarn compile
# ... or
yarn && yarn watch
# Terminal 2.
yarn web
```

Extensions.

+ [Web: Support Extensions when running yarn web](https://github.com/microsoft/vscode/issues/84901).
+ https://code.visualstudio.com/updates/v1_40#_test-vs-code-running-in-a-browser
+ https://github.com/microsoft/vscode/issues/84485
+ https://github.com/microsoft/vscode/pull/82569

## Web Hosted Version

[Web Hosted Version](https://vscode-web-test-playground.azurewebsites.net).

## Visual Studio Online

[Visual Studio Online](https://visualstudio.microsoft.com/services/visual-studio-online).

+ https://code.visualstudio.com/docs/remote/vsonline
+ https://docs.microsoft.com/en-gb/visualstudio/online

## Continuous Integration

[Build Master](https://github.com/microsoft/vscode/wiki/Build-Master).

[CI Pipeline](https://dev.azure.com/vscode/VSCode).

## Package

VS Code can be [packaged](https://github.com/microsoft/vscode/wiki/How-to-Contribute#packaging) for the following platforms:

- win32-ia32
- win32-x64
- darwin
- linux-ia32
- linux-x64
- linux-arm

These gulp tasks are available:

- vscode-[platform]: Builds a packaged version for [platform].
- vscode-[platform]-min: Builds a packaged and minified version for [platform].

```bash
# Wll create the distribution in $DLAHOME/repos
cd $DLAHOME/repos/vscode && \
  yarn gulp vscode-darwin
```

```bash
yarn gulp vscode-web
yarn gulp vscode-web-min
yarn gulp minify-vscode-web
```

See also [Cross Compiling for Debian Based Linux](https://github.com/Microsoft/vscode/wiki/Cross-Compiling-for-Debian-Based-Linux).

[Release Process](https://github.com/microsoft/vscode/wiki/Release-Process).

## Icons

[VSCode Icons](https://github.com/microsoft/vscode-icons).

## Extensions

[Extension Marketplace](https://marketplace.visualstudio.com/vscode).

[Extension Gallery](https://code.visualstudio.com/docs/editor/extension-gallery).

## Extension View Filters

Here are the Extensions view filters:

- @builtin - Show extensions that come with VS Code. Grouped by type (Programming Languages, Themes, etc.).
- @disabled - Show disabled installed extensions.
- @installed - Show installed extensions.
- @outdated - Show outdated installed extensions. A newer version is available on the Marketplace.
- @enabled - Show enabled installed extensions. Extensions can be individually enabled/disabled.
- @recommended - Show recommended extensions. Grouped as Workspace specific or general use.
- @category - Show extensions belonging to specified category. Below are a few of supported categories.

For a complete list, type - @category and follow the options in the suggestion list:

- @category:themes
- @category:formatters
- @category:linters
- @category:snippets

These filters can be combined as well.

Search for `@builtin` or `@sort:installs`.

## Extension CLI

[Command Line Extension Management](https://code.visualstudio.com/docs/editor/extension-gallery#_command-line-extension-management).

```bash
code --extensions-dir <dir> # Set the root path for extensions.
code --list-extensions # List the installed extensions.
code --show-versions # Show versions of installed extensions, when using --list-extension.
code --install-extension (<extension-id> | <extension-vsix-path>) # Installs an extension.
code --uninstall-extension (<extension-id> | <extension-vsix-path>) # Uninstalls an extension.
code --enable-proposed-api (<extension-id>) # Enables proposed API features for extensions. Can receive one or more extension IDs to enable individually.
```

## Extensions Dev

[API](https://code.visualstudio.com/api).

[API Reference](https://code.visualstudio.com/api/references/vscode-api).

[Extension API guidelines](https://github.com/microsoft/vscode/wiki/Extension-API-guidelines).

[Extension Capabilities](https://code.visualstudio.com/api/extension-capabilities/overview).

[Contribution Points](https://code.visualstudio.com/api/references/contribution-points).

## Extension Examples

[Your First Extension](https://code.visualstudio.com/api/get-started/your-first-extension).

[Extension Samples](https://github.com/microsoft/vscode-extension-samples).

[Extension Samples Guide](https://code.visualstudio.com/api/extension-guides/overview).

[Theme Extension Example](https://dev.to/thegeoffstevens/launch-a-product-in-the-vs-code-marketplace-in-30-minutes-or-less-16oa).

## Extension Packaging

[Publishing Extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

[Extension Pack Roundup](https://code.visualstudio.com/blogs/2017/03/07/extension-pack-roundup).

[Create your own VS Code Extension Pack](https://dev.to/thegeoffstevens/how-to-create-your-own-vs-code-extension-pack-nab).

[VS Code how to create your own extension pack](https://medium.com/@sanik.bajracharya/vscode-how-to-create-your-own-extension-pack-483385644c29).

## Python Extension

GitHub [repo](https://github.com/microsoft/vscode-python) source code.

[Contributing](https://github.com/Microsoft/vscode-python/blob/master/CONTRIBUTING.md).

```bash
ENV=vscode && \
  conda activate $ENV && \
  export PATH=/opt/miniconda3/envs/$ENV/bin:$PATH
cd $DLAHOME/repos/vscode-python
npm ci
# python -m venv .venv
npx gulp installPythonLibs
yarn run compile
npx gulp prePublishNonBundle
yarn run compile-webviews-watch # For data science (React Code)
yarn run package
yarn run test:unittests # runs all unit tests
yarn run test:unittests -- --grep='<NAME-OF-SUITE>'
yarn run testSingleWorkspace  # will launch the VSC UI
yarn run testMultiWorkspace  # will launch the VSC UI
```

## Python Extension for Jupyter

[Jupyter Support](https://code.visualstudio.com/docs/python/jupyter-support).

[Jupyter Announce](https://devblogs.microsoft.com/python/announcing-support-for-native-editing-of-jupyter-notebooks-in-vs-code).

[Jupyter Support Python](https://code.visualstudio.com/docs/python/jupyter-support-py).

+ https://github.com/microsoft/vscode-python/tree/master/src/client/datascience
+ https://github.com/microsoft/vscode-python/tree/master/src/client/datascience/jupyter
+ https://github.com/microsoft/vscode-python/blob/master/src/datascience-ui/interactive-common/editor.tsx
+ https://github.com/microsoft/vscode-python/blob/5c1d2bcc83599f1964f18bd557e900e85484336c/src/client/datascience/jupyter/jupyterServer.ts#L28

[Embed a more feature-complete REPL-like experience](https://github.com/microsoft/vscode-python/issues/727)

[DEPRECATED] Jupyter for Visual Studio Code [Extension](https://github.com/DonJayamanne/vscodejupyter).

## Live Share

[Introducing Visual Studio Live Share](https://code.visualstudio.com/blogs/2017/11/15/live-share).

+ https://docs.microsoft.com/en-us/visualstudio/liveshare
+ https://visualstudio.microsoft.com/services/live-share
+ https://docs.microsoft.com/en-us/visualstudio/liveshare/use/vscode
+ https://docs.microsoft.com/en-gb/visualstudio/liveshare/faq

## Electron

[Electron](https://github.com/electron/electron).

## Monaco Editor

[Embedding Monaco Editor into a Web Application](https://database.blog/integrating-monaco-editor).

## Code Server

[Code Server](https://github.com/cdr/code-server).

The patch includes:

- Allow multiple extension directories (both user and built-in).
- Modify the loader, websocket, webview, service worker, and asset requests to use the URL of the page as a base (and TLS if necessary for the websocket).
- Send client-side telemetry through the server.
- Add an upload service along with a file prefix to ignore for temporary files created during upload.
- Make changing the display language work.
- Make it possible for us to load code on the client.
- Make extensions work in the browser.
- Fix getting permanently disconnected when you sleep or hibernate for a while.
- Make it possible to automatically update the binary.

If you have your own custom marketplace, it is possible to point code-server to it by setting the following environment variables:

- `SERVICE_URL`
- `ITEM_URL`

Ohter configurations.

- Use the `--disable-telemetry` flag to completely disable telemetry.
- To disable password use `--auth none`.

```
ENV=codeserver && \
  conda deactivate && \
  conda remove -n $ENV -y --all && \
  conda create -y -n $ENV \
    python=2.7 \
    nodejs=10.16.3 \
    yarn=1.19.2 && \
  conda activate $ENV && \
  export PATH=/opt/miniconda3/envs/$ENV/bin:$PATH
```

**Build Mode 1**

```bash
conda activate codeserver
cd ~/vscode && \
  git clone https://github.com/cdr/code-server && \
  cd code-server && \
  yarn
# https://github.com/cdr/code-server/issues/1094
# See travis.yml for the VS Code version to use - The code-server version can be anything you want.
# OUT env var is optional if only building. Required if also developing.
export vscodeVersion=1.39.2 && \
  export codeServerVersion=development && \
  export OUT=~/vscode/code-server-out
yarn build ${vscodeVersion} ${codeServerVersion}
echo http://localhost:8080
# You can run the built JavaScript with Node.
# PASSWORD=pass && \
node $OUT/build/code-serverdevelopment-vsc1.39.2-darwin-x86_64-built/out/vs/server/main.js --auth none
open http://localhost:8080
yarn binary ${vscodeVersion} ${codeServerVersion} # Or you can package it into a binary.
```

**Build Mode 2**

```bash
conda activate codeserver
# See travis.yml for the version to use.
export vscodeVersion=1.39.2
# export vscodeVersion=master
cd ~/vscode && \
  git clone https://github.com/microsoft/vscode vscode-src && \
  cd vscode-src && \
  git checkout ${vscodeVersion} && \
  yarn && \
  git clone https://github.com/cdr/code-server src/vs/server && \
  cd src/vs/server && \
  yarn && \
  yarn patch:apply && \
  yarn watch
# Wait for the initial compilation to complete.
# 👉 It will say "Finished compilation".
```

```bash
# Run the next command in another shell.
# https://github.com/cdr/code-server/issues/348
# nodemon --watch ../../../out --verbose ../../../out/vs/server/main.js
# node ../../../out/vs/server/main.js --auth none
echo http://localhost:8080
conda activate codeserver && \
  cd ~/vscode/vscode-src/src/vs/server && \
  PASSWORD=pass && \
  yarn start
open http://localhost:8080
```

## Codesandbox

+ https://codesandbox.io
+ https://github.com/codesandbox/codesandbox-client

## Theia

+ https://www.theia-ide.org
+ https://github.com/theia-ide/theia
+ https://www.gitpod.io

## Eclipse Che

[Eclipse Che](https://github.com/eclipse/che).

## Hydrogen

Nteract Hydrogen [VS Code Integration](https://github.com/nteract/hydrogen/issues/449).

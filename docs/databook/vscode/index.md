---
title: Visual Studio Code
---

# Visual Studio Code

GitHub [repo](https://github.com/microsoft/vscode) source code.

[Download](https://code.visualstudio.com).

[Wiki](https://github.com/microsoft/vscode/wiki)

[Samples](https://github.com/microsoft/vscode-extension-samples).

GitHub [Docs](https://github.com/microsoft/vscode-docs).

[Docs](https://code.visualstudio.com/docs).

## Palette

+ CTRL+P CMD+P
+ CTRL+SHIFT+P CMD+SHIFT+P

## Extensions

Search for `@builtin` or `@sort:installs`.

[Extension Marketplace](https://marketplace.visualstudio.com/vscode).

## API

[API](https://code.visualstudio.com/api/references/vscode-api).

[Contribution Points](https://code.visualstudio.com/api/references/contribution-points).

## Build

[Contribute](https://github.com/microsoft/vscode/blob/master/CONTRIBUTING.md).

[Coding Guidelines](https://github.com/Microsoft/vscode/wiki/Coding-Guidelines).

[How to Contribute](https://github.com/microsoft/vscode/wiki/How-to-Contribute).

```bash
git clone https://github.com/microsoft/vscode --depth 1 && \
  cd vscode && \
  conda activate py2
```

```bash
# Terminal 1.
yarn &&
  yarn watch
# Terminal 2.
./scripts/code.sh
```

To enable extension search: in the root of the source, update `product.json`.

```json
  "extensionsGallery": {
    "serviceUrl": "https://marketplace.visualstudio.com/_apis/public/gallery",
    "cacheUrl": "https://vscode.blob.core.windows.net/gallery/index",
    "itemUrl": "https://marketplace.visualstudio.com/items"
  }
```

For license, see also.

+ https://stackoverflow.com/questions/37143536/no-extensions-found-when-running-visual-studio-code-from-source
+ https://github.com/microsoft/vscode/issues/31168
+ https://github.com/Microsoft/vscode/issues/1557
+ https://github.com/microsoft/vscode/issues/39205

## Web

```bash
# Terminal 1.
yarn &&
  yarn watch
# Terminal 2.
yarn web
```

+ [Web: Support Extensions when running yarn web](https://github.com/microsoft/vscode/issues/84901).
+ [Web Hosted Version](https://vscode-web-test-playground.azurewebsites.net).
+ https://code.visualstudio.com/updates/v1_40#_test-vs-code-running-in-a-browser
+ https://github.com/microsoft/vscode/issues/84485
+ https://github.com/microsoft/vscode/pull/82569

## Online

[Visual Studio Online](https://visualstudio.microsoft.com/services/visual-studio-online).

+ https://code.visualstudio.com/docs/remote/vsonline
+ https://docs.microsoft.com/en-gb/visualstudio/online

## Icons

[VSCode Icons](https://github.com/microsoft/vscode-icons).

## Python Extension

GitHub [repo](https://github.com/microsoft/vscode-python)

[Docs](https://code.visualstudio.com/docs/python/jupyter-support).

[Blog](https://devblogs.microsoft.com/python/announcing-support-for-native-editing-of-jupyter-notebooks-in-vs-code).

[Feature Request: Support inline code execution similar to jupyter notebooks / hydrogen](https://github.com/Microsoft/vscode/issues/10680)

Jupyter.

+ https://github.com/microsoft/vscode-python/tree/master/src/client/datascience
+ https://github.com/microsoft/vscode-python/tree/master/src/client/datascience/jupyter
+ https://github.com/microsoft/vscode-python/blob/master/src/datascience-ui/interactive-common/editor.tsx
+ https://github.com/microsoft/vscode-python/blob/5c1d2bcc83599f1964f18bd557e900e85484336c/src/client/datascience/jupyter/jupyterServer.ts#L28

[DEPRECATED] Jupyter for Visual Studio Code [Extension](https://github.com/DonJayamanne/vscodejupyter).

## Codesandbox

+ https://codesandbox.io
+ https://github.com/codesandbox/codesandbox-client

## See Also

Theia

+ https://www.theia-ide.org
+ https://github.com/theia-ide/theia
+ https://www.gitpod.io

Hydrogen

Nteract Hydrogen [VS Code Integration](https://github.com/nteract/hydrogen/issues/449).

---
title: Nteract Jupyter Extension
---

# Nteract Jupyter Extension

Nteract [GitHub](https://github.com/nteract/nteract) repository.

Nteract Jupyter Extension on [Binder](https://mybinder.org/v2/gh/nteract/vdom/master?urlpath=nteract/edit/example-notebooks).

## Install

```bash
pip install nteract_on_jupyter && \
  jupyter serverextension enable nteract_on_jupyter && \
  jupyter serverextension list && \
  jupyter nteract
```

## Build

```bash
echo http://localhost:8080
cd $DLAHOME/repos/nteract/applications/jupyter-extension && \
  pip install -e . && \
  jupyter serverextension enable nteract_on_jupyter && \
  jupyter serverextension list && \
  jupyter nteract --dev # Wait a bit for compilation...
#  jupyter nteract --dev --watch
```

```bash
echo http://localhost:8080
cd $DLAHOME/repos/nteract && \
  yarn && \
  yarn app:jupyter-extension # Wait a bit for compilation...
```

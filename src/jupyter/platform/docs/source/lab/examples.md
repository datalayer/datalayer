---
title: JupyterLab Examples
---

# JupyterLab Examples

## Core Examples

```bash
# Ensure you have build successfully the packages.
# Run all example tests.
cd $DLAHOME/repos/jupyterlab && \
  yarn build:examples && \
  yarn test:examples
# python examples/test_examples.py
```

```bash
# Build and run a specific example.
cd $DLAHOME/repos/jupyterlab && \
  lerna run build --scope @jupyterlab/example-app && \
  python examples/app/main.py
```

## Core Examples Tests

```bash
# Ensure you have build successfully the packages.
# Run all example tests.
cd $DLAHOME/repos/jupyterlab && \
  yarn build:packages && \
  yarn build:examples && \
  yarn test:examples
# python examples/test_examples.py
```

```bash
# Build and run a specific example.
cd $DLAHOME/repos/jupyterlab && \
  lerna run build --scope @jupyterlab/example-app && \
  python examples/app/main.py
```

```bash
# Build and run a specific service example.
cd $DLAHOME/repos/jupyterlab && \
  lerna run build --scope @jupyterlab/example-node && \
  python packages/services/examples/node/main.py
```

---
title: JupyterLab Develop Test
---

# JupyterLab Develop Test

## Python Tests

```bash
# PyTest for JupyterLab Server.
cd $DLAHOME/repos/jupyterlab-server && \
  pip install -e .[test] && \
  pytest
```

```bash
# PyTest for JupyterLab.
cd $DLAHOME/repos/jupyterlab && \
  pip install -e .[test] && \
  pytest
```

## JavaScript Tests

```bash
# Ensure you have build successfully the packages.
# Run all javascript tests.
cd $DLAHOME/repos/jupyterlab && \
#  yarn build:test && \
  yarn build:testutils && \
#  yarn test:all --testTimeout 50000
  yarn test:all
#  jest-connfig.js
#    return {
#        testTimeout: 5000,
```

```bash
cd $DLAHOME/repos/jupyterlab/packages/apputils && \
  yarn build:test && \
  npx jest test/sessioncontext.spec.ts -t 'should select a kernel' --testTimeout 50000 && \
  yarn test -t 'should select a kernel' --testTimeout 50000 && \
  yarn test --testTimeout 50000 test/sessioncontext.spec.ts && \
  yarn test:cov --testTimeout 50000
```

```bash
cd $DLAHOME/repos/jupyterlab/packages/services && \
  yarn build:test && \
  npx jest test/serverconnection.spec.ts -t 'should use baseUrl' --testTimeout 50000 && \
  npx jest test/kernel/ikernel.spec.ts -t 'should be emitted for an iopub message' --testTimeout 50000 && \
  yarn test:cov -t 'should use baseUrl' --testTimeout 50000 && \
  yarn test:cov --testTimeout 50000
```

```bash
# Run specific test family.
cd $DLAHOME/repos/jupyterlab/packages/outputarea && \
  npx lerna run test --scope \"@jupyterlab/outputarea\" --concurrency 1 --stream
#  python run.py
#  python run.py --JestApp.testNamePattern="OutputArea"
#  python run.py --JestApp.testNamePattern="OutputArea"
#  python run.py --JestApp.testNamePattern="create"
#  python run.py --JestApp.testNamePattern="createStdin"
```

```bash
# Run a specific test.
cd $DLAHOME/repos/jupyterlab/packages/services && \
  yarn build && \
  yarn test
#  python run.py --JestApp.testNamePattern="should load the kernelspecs"
#  python run.py --JestApp.testNamePattern="settings"
```

```bash
# Karma test.
cd $DLAHOME/repos/jupyterlab/packages/console && \
  yarn build && \
  yarn test
#  python run-test.py
```

## CI Tests

```bash
python -m jupyterlab.browser_check --no-chrome-test
```

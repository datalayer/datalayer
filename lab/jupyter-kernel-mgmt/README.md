[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Lab Jupyter Kernel Management

## Install

```bash
cd $DLAHOME/lab/jupyter-kernel-mgmt && \
  pip uninstall -y jupyter_protocol && \
  pip uninstall -y jupyter_kernel_mgmt && \
  pip uninstall -y jupyter_server && \
  pip uninstall -y notebook && \
  pip uninstall -y nbclassic && \
  python setup.py develop
```

## Build

```bash
conda deactivate && \
  conda remove -y --name dlab_jkm --all || true && \
  conda create -y -n dlab_jkm python=3.7 nodejs && \
  conda activate dlab_jkm && \
  git clone https://github.com/takluyver/jupyter_protocol --branch master --single-branch --depth 1 && \
  cd jupyter_protocol && python setup.py develop && cd .. && \
  git clone https://github.com/takluyver/jupyter_kernel_mgmt --branch master --single-branch --depth 1 && \
  cd jupyter_kernel_mgmt && python setup.py develop && cd .. && \
  git clone https://github.com/kevin-bates/jupyter_server.git --branch jupyter-kernel-mgmt --single-branch --depth 1 && \
  cd jupyter_server && python setup.py develop && cd .. && \
  git clone https://github.com/zsailer/notebook.git --branch notebook-ext --single-branch --depth 1 && \
  cd notebook && python setup.py develop && cd ..
```

## Start

```bash
jupyter notebook
jupyter server --ServerApp.jpserver_extensions="{'notebook': True}"
open http://localhost:8888/tree
```

## Async

+ Async support for Kernel Management [#23](https://github.com/takluyver/jupyter_kernel_mgmt/pull/23).

## [DEPRECATED] Notebook

+ [DEPRECATED] Use new kernel management APIs in notebook server 6.x [#4837](https://github.com/jupyter/notebook/pull/4837).
+ [DEPRECATED] Use new kernel management APIs in notebook server [#4170](https://github.com/jupyter/notebook/pull/4170) is superseded by #4837.
+ [DEPRECATED] Add support for async kernel management [#4479](https://github.com/jupyter/notebook/pull/4479).

## Provider

+ A kernel spec is a directory with a kernel.json file.
+ A kernel type is anything discovered through the JKM machinery (which includes kernel specs, exposed with the spec/ prefix). This has:
+ A kernel type ID (the qualified string, e.g. spec/python3)
+ kernel type metadata (the dictionary from find_kernels with more details about that kernel type)
+ kernel instances are specific processes created by launching a kernel type

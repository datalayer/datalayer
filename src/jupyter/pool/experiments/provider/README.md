[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Jupyter Kernel Provider

A `Kernel Spec` is a directory with a `kernel.json` file.

A `Kernel Type` is anything discovered through the JKM machinery (which includes the `Kernel Specs`, exposed with the spec/ prefix). This has:

+ A `Kernel Type ID`: the qualified string (e.g. spec/python3).
+ A `Kernel Type Metadata`: the dictionary from find_kernels with more details about that Kernel Type.

The `Kernel Instances` are the specific processes created by launching a Kernel Kype.

```bash
# Install Kernel Management.
cd $EXPHOME/play/jupyter-kernel && \
  pip uninstall -y jupyter_protocol && \
  pip uninstall -y jupyter_kernel_mgmt && \
  pip uninstall -y jupyter_server && \
  pip uninstall -y notebook && \
  pip uninstall -y nbclassic && \
  python setup.py develop
```

```bash
# Build Kernel Management.
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

## Server

```bash
# Start Server.
jupyter notebook
jupyter server --ServerApp.jpserver_extensions="{'notebook': True}"
open http://localhost:8888/tree
```

## Kernel Async

Async support for Kernel Management [#23](https://github.com/takluyver/jupyter_kernel_mgmt/pull/23).

+ [DEPRECATED] Use new kernel management APIs in notebook server 6.x [#4837](https://github.com/jupyter/notebook/pull/4837).
+ [DEPRECATED] Use new kernel management APIs in notebook server [#4170](https://github.com/jupyter/notebook/pull/4170) is superseded by #4837.
+ [DEPRECATED] Add support for async kernel management [#4479](https://github.com/jupyter/notebook/pull/4479).

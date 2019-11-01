[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Lab Jupyter Kernel Manager

## Jupyter Kernel Management in Server

+ [WIP] Kernel providers [#112](https://github.com/jupyter/jupyter_server/pull/112).

+ Transition to Kernel Provider model for kernel management [#90](https://github.com/jupyter/jupyter_server/issues/90).

```bash
conda deactivate && \
  conda remove -y --name jupyter-kernel-mgmt --all || true && \
  conda create -y -n jupyter-kernel-mgmt python=3.7 nodejs && \
  conda activate jupyter-kernel-mgmt && \
  git clone https://github.com/takluyver/jupyter_kernel_mgmt --branch master --single-branch --depth 1 && \
  cd jupyter_kernel_mgmt && python setup.py develop && cd .. && \
  git clone https://github.com/kevin-bates/jupyter_server.git --branch jupyter-kernel-mgmt --single-branch --depth 1 && \
  cd jupyter_server && python setup.py develop && cd .. && \
  git clone https://github.com/zsailer/notebook.git --branch notebook-ext --single-branch --depth 1 && \
  cd notebook && python setup.py develop && cd .. && \
  jupyter notebook  
# open http://localhost:8888/tree
#  git clone https://github.com/zsailer/voila.git --branch  --single-branch --depth 1 && \
#  git clone https://github.com/zsailer/voila.git --branch extensionapp --single-branch --depth 1 && \ 
#  cd voila && python setup.py develop && cd .. && \
#  voila voila/notebooks/basics.ipynb
```

## Jupyter Kernel Management Async

+ Async support for Kernel Management [#23](https://github.com/takluyver/jupyter_kernel_mgmt/pull/23).

## [DEPRECATED] Jupyter Kernel Management in Notebook

+ WIP: Use new kernel management APIs in notebook server 6.x [#4837](https://github.com/jupyter/notebook/pull/4837).
+ WIP: Use new kernel management APIs in notebook server [#4170](https://github.com/jupyter/notebook/pull/4170) is superseded by #4837.

+ Add support for async kernel management [#4479](https://github.com/jupyter/notebook/pull/4479).

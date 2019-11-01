[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Jupyter Controller

Jupyter Controller is an open source tool to create and manager the `Datalayer Science Platform`.

## Build

```bash
# jupyter-server
https://github.com/zsailer/jupyter_server/tree/subcommands
https://github.com/kevin-bates/jupyter_server/tree/jupyter-kernel-mgmt
# jupyter-notebook
https://github.com/zsailer/notebook/tree/notebook-ext
# jupyter-notebook-nbclassic
https://github.com/zsailer/nbclassic/tree/master 
# jupyterlab-server
https://github.com/datalayer-contrib/jupyterlab-server/tree/jupyter_server
# jupyterlab
https://github.com/datalayer-contrib/jupyterlab/tree/jupyter_server
# jupyter-protocol
https://github.com/gateway-experiments/jupyter_protocol/tree/master
https://github.com/gateway-experiments/jupyter_protocol/tree/split-docs
# jupyter-kernel-mgmt
https://github.com/gateway-experiments/jupyter_kernel_mgmt/tree/fixup-async #c95869d087a7e8795821d5fb2f39ca090ed22341
https://github.com/gateway-experiments/jupyter_kernel_mgmt/tree/add-docs
```

## Start

```bash
jupyter server --ServerApp.jpserver_extensions="{ \
    'jupyterlab': True, \
    'notebook_shim': True, \
    'notebook': True, \
    'voila': True \
  }" \
  --notebook-dir ~
```

```bash
open http://localhost:8888/tree
open http://localhost:8888/lab
open http://localhost:8888/voila
```

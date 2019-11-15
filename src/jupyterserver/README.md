[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Jupyter Server

```bash
# jupyter-server
# pip install git+https://github.com/datalayer-contrib/jupyter-server.git@datalayer
https://github.com/datalayer-contrib/jupyter-server/tree/datalayer
> https://github.com/kevin-bates/jupyter_server/tree/jupyter-kernel-mgmt
> https://github.com/zsailer/jupyter_server/tree/subcommands
```

```bash
# jupyter-notebook
https://github.com/datalayer-contrib/notebook/tree/datalayer
> https://github.com/zsailer/notebook/tree/notebook-ext
# jupyter-notebook-nbclassic
https://github.com/datalayer-contrib/nbclassic/tree/datalayer
> https://github.com/zsailer/nbclassic/tree/master
```

```bash
# jupyterlab-server
https://github.com/datalayer-contrib/jupyterlab-server/tree/datalayer
> https://github.com/datalayer-contrib/jupyterlab-server/tree/jupyter_server
# jupyterlab
https://github.com/datalayer-contrib/jupyterlab/tree/datalayer
> https://github.com/datalayer-contrib/jupyterlab/tree/jupyter_server
```

```bash
# jupyter-protocol
https://github.com/datalayer-contrib/jupyterlab-protocol/tree/datalayer
> https://github.com/gateway-experiments/jupyter_protocol/tree/split-docs
# jupyter-kernel-mgmt
https://github.com/datalayer-contrib/jupyterlab-kernel-mgmt/tree/datalayer
> https://github.com/gateway-experiments/jupyter_kernel_mgmt/tree/fixup-async
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

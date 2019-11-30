[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Lab Jupyter Server

```bash
jupyter server --ServerApp.jpserver_extensions="{ \
  'jupyterlab': True, \
  'notebook': True, \
  'voila': True \
  }" \
  --notebook-dir ~
open http://localhost:8888/lab
open http://localhost:8888/tree
open http://localhost:8888/voila
```

## Sync with Notebook

Sync Notebook and Jupyter Server [#53](https://github.com/jupyter/jupyter_server/issues/53).

Clean up after Notebook syncing [server/#96](https://github.com/jupyter/jupyter_server/issues/96).

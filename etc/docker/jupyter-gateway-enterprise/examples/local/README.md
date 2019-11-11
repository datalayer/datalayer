[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Jupyter Enterprise Gateway on Local Kernels

```bash
cd $DLAHOME/repos/jupyter-gateway-enterprise && \
  pip install -e .
```

```bash
# Install Kernels in KERNELS_FOLDER=/usr/local/share/jupyter/kernels
```

```bash
# Configure Resource Managers.
```

```bash
# Start Enterprise Gateway.
export EG_DOCKER_NETWORK=bridge && \
  export EG_DOCKER_MODE=docker && \
  jupyter enterprisegateway --ip=0.0.0.0 --port=8889 --port_retries=0
```

```bash
cd $DLAHOME/repos/jupyter-nb2kg && \
  pip install -e . && \
  jupyter serverextension enable --py nb2kg --sys-prefix
```

```bash
# Start Notebook with Nb2Kg.
export KG_URL=http://localhost:8889
export KG_HTTP_USER=guest
export KG_HTTP_PASS=guest-password
export KG_REQUEST_TIMEOUT=30
export KERNEL_USERNAME=${KG_HTTP_USER}
jupyter lab \
  --NotebookApp.session_manager_class=nb2kg.managers.SessionManager \
  --NotebookApp.kernel_manager_class=nb2kg.managers.RemoteKernelManager \
  --NotebookApp.kernel_spec_manager_class=nb2kg.managers.RemoteKernelSpecManager
```

[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Jupyter Enterprise Gateway on Docker Swarm

```bash
cd $EXPHOME/play/jupyter/gateway/enterprise/0-examples/swarm
```

```bash
export KG_PORT=8889
# docker-compose up
docker stack deploy -c docker-compose.yml enterprise-gateway
```

```bash
docker service ls
docker ps | grep enterprise-gateway
```

```bash
cd $DLAHOME/repos/jupyter-nb2kg && \
  pip install -e .
```

```bash
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

```bash
docker stack rm enterprise-gateway
```

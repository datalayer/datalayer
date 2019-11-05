[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Jupyter Enterprise Gateway on Docker Swarm

```bash
export KG_PORT=8889
cd $DLAHOME/etc/examples/kernels/eg/etc/docker && \
  docker stack deploy -c docker-compose.yml enterprise-gateway
#  docker-compose up
```

```bash
docker service ls
docker ps | grep enterprise-gateway
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

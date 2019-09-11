[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Docker JupyterHub

> You will need a running Keycloak server, see e.g. [this example](https://github.com/datalayer/datalayer/tree/master/lab/apps/keycloak).

JupyterHub in Docker with Keycloak Authenticator and Docker Spawner.

```bash
# build.
cd $DLAHOME/etc/docker/jupyterhub && \
  make check-files && \
  make build
```

```bash
# with docker compose.
cd $DLAHOME/etc/docker/jupyterhub
DLA_KEYCLOAK_HOST=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' keycloak) && \
  echo $DLA_KEYCLOAK_HOST && \
  docker-compose -f jupyterhub.yml up -d
docker ps
docker logs --tail=1000 jupyterhub -f
open http://localhost:8000/jupyterhub
docker exec -it jupyterhub bash # debug (if needed...) - tail -f jupyterhub.log
docker-compose -f jupyterhub.yml down
```

```bash
# with docker swarm.
# see also https://github.com/minrk/jupyterhub-swarm
cd $DLAHOME/etc/docker/jupyterhub
DLA_KEYCLOAK_HOST=??? && \
  docker stack deploy -c jupyterhub.yml jupyterhub
docker service ls
docker service ps jupyterhub_jupyterhub --no-trunc
docker service logs --tail=1000 jupyterhub_jupyterhub -f
open http://localhost:8000/jupyterhub
docker stack rm jupyterhub
```

```bash
# start.
cd $DLAHOME/etc/docker/jupyterhub && \
  make start && \
  sleep 3s && \
  open http://localhost:8000/jupyterhub
```

```bash
# stop.
make stop
```

See also.

+ [JupyterHub Deploy Docker](https://github.com/jupyterhub/jupyterhub-deploy-docker) repository.
+ [Devops Hadoop Use Cases](https://www.linkedin.com/pulse/devops-hadoop-use-cases-get-me-cluster-under-5-dieter-schwarenthorer) post.

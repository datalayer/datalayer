[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Docker HBase big-data-europe/docker-hbase

```bash
# https://github.com/big-data-europe/docker-hbase
cd $DLAHOME/etc/docker/hbase/examples/bde/repo && \
# docker-compose -f docker-compose-standalone.yml up -d && \
  docker-compose -f docker-compose-distributed-local.yml up -d && \
  docker ps && \
  docker-compose -f docker-compose-distributed-local.yml logs -f
docker-compose -f docker-compose-distributed-local.yml down
```

```bash
# https://github.com/big-data-europe/docker-hbase/tree/master/distributed
cd $DLAHOME/etc/docker/hbase/xamples/bde/repo/distributed && \
#  docker swarm init && \
#  docker network create -d overlay hbase && \
  make hadoop && \
  make zookeeper && \
  make hbase && \
  make traefik && \
  docker stack ls
docker stack ps traefik
docker stack ps zookeeper
docker stack ps hadoop
docker stack ps hbase
echo http://localhost:80
echo http://localhost:8080/dashboard/
docker stack rm traefik && \
  docker stack rm hbase && \
  docker stack rm zookeeper && \
  docker stack rm hadoop
```

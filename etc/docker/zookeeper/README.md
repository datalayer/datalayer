[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Docker Zookeeper

```bash
# https://hub.docker.com/_/zookeeper
docker-compose -f example/zk.yml up -d
docker ps
dla zk-cli
docker-compose -f example/zk.yml down
```

## Docker Zookeeper itsaur/zookeeper-docker-swarm

```bash
# https://github.com/itsaur/zookeeper-docker-swarm
docker network create \
    --driver overlay zookeeper
docker service create \
    --env "REPLICAS=3" \
    --env "SERVICE_NAME=zookeeper" \
    --name zookeeper \
    --network zookeeper \
    --publish 2181:2181 \
    --replicas=3 \
    itsaur/zookeeper-replicated
docker ps
docker service ls
docker service ps zookeeper
docker service rm zookeeper
```

## Docker Zookeeper ah45/docker-zookeeper

```bash
# https://github.com/ah45/docker-zookeeper with JMX
docker run -d --name zk1 -h zk1 --env ID=1 -p 2181:2181 -p 7000:7000 ah45/zookeeper
docker run -d --name zk2 -h zk2 --env ID=2 --env QUORUM=localhost:2181 ah45/zookeeper
jconsole localhost:7000
```

## Docker Zookeeper Others

+ https://github.com/31z4/zookeeper-docker

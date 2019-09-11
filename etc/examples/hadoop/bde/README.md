[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Docker Hadoop big-data-europe/docker-hadoop

```bash
# https://github.com/big-data-europe/docker-hadoop/tree/2.0.0-hadoop3.1.1-java8
cd $DLAHOME/etc/docker/hdfs/examples/bde/repo && \
#  docker stack deploy -c docker-compose-v3.yml hadoop
  docker-compose up -d && \
  docker ps && \
  docker-compose logs -f
docker network ls
docker network inspect repo_default
echo http://0.0.0.0:9870 # namenode
echo http://0.0.0.0:9864 # datanode
NAMENODE_IP=$(docker inspect --format '{{ .NetworkSettings.Networks.hdfs_default.IPAddress }}' namenode)
echo http://$NAMENODE_IP:9870
# docker rm -f namenode nodemanager1 resourcemanager historyserver datanode1 datanode2 datanode3
docker-compose down -v
```

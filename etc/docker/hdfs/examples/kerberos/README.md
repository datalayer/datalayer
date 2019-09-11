[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Docker HDFS ifilonenko/hadoop-kerberos

```bash
# https://github.com/ifilonenko/hadoop-kerberos
# deprecates https://github.com/ifilonenko/hadoop-base
cd $DLAHOME/etc/docker/hdfs/examples/kerberos/repo && \
  curl -Lo hadoop-2.7.3.tar.gz https://archive.apache.org/dist/hadoop/core/hadoop-2.7.3/hadoop-2.7.3.tar.gz
docker network create com
docker volume rm hadoopkerberos_server-keytab
docker-compose up -d --force-recreate --build
docker exec -it nn.example /bin/bash
kinit -kt /var/keytabs/hdfs.keytab hdfs/nn.example.com
hdfs dfs -ls /
docker-compose down
```

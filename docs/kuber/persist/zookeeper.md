---
title: Zookeeper
---

# Zookeeper

## Build Zookeeper

```bash
svn checkout http://svn.apache.org/repos/asf/zookeeper/trunk zookeeper.svn
cd zookeeper.svn
jdk6
# ant -Djavac.args="-Xlint -Xmaxwarns 1000" clean test tar
ant -Djavac.args="-Xlint -Xmaxwarns 1000" clean tar
cp build/zookeeper-3.5.0.tar.gz /opt
rm -fr $ZOOKEEPER_HOME
cd $ZOOKEEPER_HOME
cd ..
tar xvfz zookeeper-3.5.0.tar.gz
rm zookeeper-3.5.0.tar.gz
cd zookeeper-3.5.0
mkdir logs 
rm -fr /var/datalayer/zookeeper-3.5.0
cp /t/t4f-data.git/coordination/zookeeper/src/main/resources/zoo-local.cfg conf/zoo.cfg
$ZOOKEEPER_HOME/bin/zkServer.sh start
# $ZOOKEEPER_HOME/bin/zkServer.sh start-foreground
```

```bash
$ZOOKEEPER_HOME/bin/zkCli.sh -server 127.0.0.1:2181
help
ls /
create /zk_test my_data
ls /
get /zk_test
set /zk_test junk
get /zk_test
delete /zk_test
ls /
```

## Eclipse

```bash
ant eclipse
```

## Stop Zookeeper Server

```bash
sudo $ZOOKEEPER_HOME/bin/zkServer.sh stop
```

## Configure Zookeeper

```bash
conf/zoo.cfg
```

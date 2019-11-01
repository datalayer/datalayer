---
title: Install on Docker Swarm
---

# Install on Docker Swarm

> Check the [requirements](/dev/requirements.md) to setup your local environment.

You can install Datalayer a single node local Swarm Cluster, e.g. on your laptop, or any distributed Swarm cluster.

```bash
# Deploy the base DSP.
dla dsp-swarm-up base
```

This will install the services shown on the following image.

**Base DSP on Docker Swarm**

![Base DSP on Docker Swarm](/_images/dsp/dsp-docker-swarm-base.svg)

Initialize the services.

```bash
dla dsp-solr-init
dla dsp-ldap-init
```

Configure the secret in the `~/.datalayer` folder.

```bash
# Deploy the complete DSP.
dla dsp-swarm-up
```

**DSP on Docker Swarm**

![DSP on Docker Swarm](/_images/dsp/dsp-docker-swarm.svg)

```bash
# Tail the logs.
dla dsp-swarm-logs
# Tail the logs of a specific container.
dla dsp-swarm-logs keycloak
```

```bash
# Show the local platform status.
dla dsp-swarm-status
```

## Stop the Services

To stop the services, run the following command.

```bash
# Stop DSP locally.
dla dsp-swarm-down
```

## Volumes Backup

```bash
dla dsp-swarm-backup
```

## HDFS

```bash
# Check HDFS.
# NAMENODE_IP=$(docker inspect --format '{{ .NetworkSettings.Networks.hdfs_default.IPAddress }}' namenode)
# echo http://$NAMENODE_IP:9870
echo http://0.0.0.0:9870 # browse namenode ui
echo http://0.0.0.0:9864 # browse datanode ui
dla hdfs dfs -mkdir /tmp
dla hdfs dfs -ls / # list root folder
```

```bash
# If useful for you (debugging...), you can run some of the services without Docker.
# Init Configuration and Start HDFS.
dla hdfs-conf-gen && dla hdfs-init && dla hdfs-start
```

## Zookeeper

```bash
# Check Zookeeper.
dla zookeeper-cli
```

```bash
# If useful for you (debugging...), you can run some of the services without Docker.
# Init Configuration and Start Zookeeper.
dla zookeeper-conf-gen && dla zookeeper-init && dla zookeeper-start
```

## HBase

```bash
# If useful for you (debugging...), you can run some of the services without Docker.
# Init Configuration and Start HBase.
dla hbase-conf-gen && dla hbase-start
```

## Solr

```bash
# If useful for you (debugging...), you can run some of the services without Docker.
# Init Configuration and Start Solr.
dla solr-conf-gen && dla solr-start
```

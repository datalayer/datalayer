---
title: Architecture
---

# Architecture

Datalayer runs `Kubernetes` as distributed orchestrator.

Datalayer solutions help you create and manage your cluster in the cloud and deploy applications for your `Big Data Science` projects. We support [AWS](https://aws.amazon.com), the Amazon Cloud. Read our [Release Plan](/releases/plan.md) to know more on other cloud support. 

The platform architecture is depicted here after.

![Architecture](/_images/what/architecture.svg)

<!--

```
+---+-----------------------------------------------------+---+
|   |              EXPLORER EXPLORER                        |   |
+   +-----------------------------------------------------+   +
|   |                      spaces                         |   |
|   |                     channels                        |   |
+   +-----------------------------------------------------+   +
|   |                                                     |   |
|   |             join                stories             |   |
|   |              |                     |                |   |
|   |              +----------+----------+                |   |
|   |                         |                           |   |
|   |                     jupyterlab                      |   |
|   |                         |                           |   |
| K |         social-+--------+------------+-library      |   |
| U |        github--+        |            +--datasets    | I |
| B |        google--+        |            +--notes       | A |
| E |      linkedin--+        |            +--papers      | M |
| R |       twitter--+        |            +--models      |   |
|   |                    jupyterhub        +--flows       |   |
|   |                         |                           |   |
|   |           apis-+--------+------------+-jobs         |   |
|   |           bots-+        |                           |   |
|   |                         |                           |   |
|   |                  kernel-(gateway)    airflow        |   |
|   |                  [python R spark]                   |   |
|   |                         |                           |   |
|   +---------------------------------------------------- +   |
|   |                   datalayer-api                     |   |
|   +---------------------------------------------------- +   |
|   |                      storage                        |   |
|   |      [gdrive hdfs ipfs hbase solr janusgraph]       |   |
|   +---------------------------------------------------- +   |
|   |                  local kubernetes                   |   |
|   +-----------------------------------------------------+   |
|   |                  local aws azure                    |   |
+---+-----------------------------------------------------+---+
```

+ Layer 6 - UI - The collaborative user interface that Big Data Scientists will use to `Collect`, `Explore`, `Model` and `Serve`. - explorer <- ui + auth
+ Layer 5 - Interpreter - REST endpoints to invoke and interpeter commands from upper layers - spitfire <- interpreters
+ Layer 4 - Utils - Middelware toolings to complement common use case such as `Functions`, `Scheduled Batch`, `Queuing`...
+ Layer 3 - Store - Various store to fit common storage patterns - hbase / solr <- library / datasets
+ Layer 2 - File System - The distributed file systems running on Kubernetes - ipfs / hdfs 
+ Layer 1 - Cluster - The Kubernetes cluster infrastructure - etcd / secrets <- config

```
+----------------------------------------------------------------+
|             DATALAYER BIG DATA SCIENCE PLATFORM                |
|----------------------------------------------------------------|
|    K    | 7 |                   ACCESS                         |
|    U    |   |                  Ingress                         |
|    B    |------------------------------------------------------|
|    E    | 6 |                    UI                            |
|    R    |   |          UI | CLI | JSApps | Widgets             |
|   CLI   |------------------------------------------------------|
|   SDK   | 5 |                  SPITIFIRE                       |
|   LIB   |   |         Spark | TensorFlow | Markdown | ...      |
|         |------------------------------------------------------|
|   OPS   | 4 |                    UTILS                         |
|         |   |       Kubeless | Batch | Kafka | Kubeflow        |
|  MONIT  |------------------------------------------------------|
|         | 3 |                   STORE                          |
| BACK/RES|   |       HBase | Solr | JanusGraph | Etcd           |
|         |------------------------------------------------------|
|  DIAG   | 2 |                 FILE-SYSTEM                      |
|         |   |             HDFS | IFPS | Minio                  |
|  IAM    |------------------------------------------------------|
|         | 1 |                K8S-CLUSTER                       |
|  RBAC   |   | Kubeadm | Kubicorn/Kubespray | Reshifter/ARK     |
|         |   |            Gitkube | Kubed-sh                    |
+----------------------------------------------------------------+
```

-->

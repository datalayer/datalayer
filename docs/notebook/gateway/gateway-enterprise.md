---
title: Enterprise Gateway
---

# Enterprise Gateway

> Jupyter Enterprise Gateway enables Jupyter Notebook to launch remote kernels in a distributed cluster, including Apache Spark managed by YARN, Kubernetes or Docker Swarm.

```
BROWSER --- ENTERPRISE_GATEWAY --- ORCHESTRATOR -- KERNEL                                
```

Enterprise Gateway [GitHub](https://github.com/jupyter/enterprise_gateway) repository.

Enterprise Gateway [Docs](https://jupyter-enterprise-gateway.readthedocs.io/en/latest).

![Enterprise Gateway](https://raw.githubusercontent.com/jupyter/enterprise_gateway/master/docs/source/images/deployment.png)

+ https://blog.jupyter.org/on-demand-notebooks-with-jupyterhub-jupyter-enterprise-gateway-and-kubernetes-e8e423695cbf

## Install

```bash
# conda install -c conda-forge jupyter_enterprise_gateway
pip install --upgrade jupyter_enterprise_gateway
```

```bash
jupyter enterprisegateway --help-all
```

```bash
# Install Kernels - Considering we would like to enable the IPython kernel to run on YARN Cluster and Client mode we would have to copy the sample configuration folder spark_python_yarn_client and spark_python_yarn_client to where the Jupyter kernels are installed (e.g. jupyter kernelspec list).
export KERNELS_FOLDER=/usr/local/share/jupyter/kernels
rm -fr $KERNELS_FOLDER
mkdir -p $KERNELS_FOLDER
cd $KERNELS_FOLDER
curl -Lo jupyter_enterprise_gateway_kernelspecs-2.0.0rc1.tar.gz https://github.com/jupyter/enterprise_gateway/releases/download/v2.0.0rc2/jupyter_enterprise_gateway_kernelspecs-2.0.0rc2.tar.gz
# tar -zxvf jupyter_enterprise_gateway_kernelspecs-2.0.0rc1.tar.gz --strip 1 --directory $KERNELS_FOLDER/spark_python_yarn_cluster/ spark_python_yarn_cluster/
# tar -zxvf jupyter_enterprise_gateway_kernelspecs-2.0.0rc1.tar.gz --strip 1 --directory $KERNELS_FOLDER/spark_python_yarn_client/ spark_python_yarn_client/
tar -zxvf jupyter_enterprise_gateway_kernelspecs-2.0.0rc2.tar.gz
ls -alp
jupyter kernelspec list
```

```bash
#!/bin/bash
LOG=/var/log/enterprise_gateway.log
PIDFILE=/var/run/enterprise_gateway.pid
jupyter enterprisegateway --ip=0.0.0.0 --port_retries=0 --log-level=DEBUG > $LOG 2>&1 &
if [ "$?" -eq 0 ]; then
  echo $! > $PIDFILE
else
  exit 1
fi
```

```bash
# SPARK_HOME: Must point to the Apache Spark installation path.
export SPARK_HOME=/opt/spark
# EG_YARN_ENDPOINT: Must point to the YARN Resource Manager endpoint if remote from YARN cluster.
export YARN_RESOURCE_MANAGER_FQDN=localhost
export EG_YARN_ENDPOINT=http://${YARN_RESOURCE_MANAGER_FQDN}:8088/ws/v1/cluster
```

## Start Enterprise Gateway

```bash
jupyter enterprisegateway --ip=0.0.0.0 --port 9007 --port_retries=0
```

## Start JupyterLab

```bash
# export KG_HTTP_USER=guest
# export KG_HTTP_PASS=guest-password
# export KG_REQUEST_TIMEOUT=30
# export KERNEL_USERNAME=${KG_HTTP_USER}
cd ~/notebooks && \
  export KG_URL=http://127.0.0.1:9007 && \
  jupyter lab \
    --NotebookApp.session_manager_class=nb2kg.managers.SessionManager \
    --NotebookApp.kernel_manager_class=nb2kg.managers.RemoteKernelManager \
    --NotebookApp.kernel_spec_manager_class=nb2kg.managers.RemoteKernelSpecManager
```

## Docker

```bash
# Launch elyra/nb2kg with Jupyter Notebook, Jupyter Lab and NB2KG which can be launched.
docker run -t --rm \
  -e KG_URL='http://localhost:8888' \
  -e KG_HTTP_USER=guest \
  -e KG_HTTP_PASS=guest-password \
  -p 8888:8888 \
  -e VALIDATE_KG_CERT='no' \
  -e LOG_LEVEL=DEBUG \
  -e KG_REQUEST_TIMEOUT=40 \
  -e KG_CONNECT_TIMEOUT=40 \
  -v ${HOME}/notebooks/:/tmp/notebooks \
  -w /tmp/notebooks \
  elyra/nb2kg
```

## Kernel Session Persistence

`EG_KERNEL_SESSION_PERSISTENCE=True`: All active sessions are written to a file. If one EG goes down, another can startup and, assuming access to that (shared) file, will "rehydrate" the active sessions. Active/Passive solution right now. It also requires the "failed over" sessions be 'reconnected' from the Notebook/Lab applications.

## JupyterHub

+ https://github.com/jupyter/enterprise_gateway/issues/448
+ https://github.com/jupyter/enterprise_gateway/issues/661
+ https://github.com/jupyter/enterprise_gateway/pull/458
+ [On-demand Notebooks with JupyterHub, Jupyter Enterprise Gateway and Kubernetes](https://blog.jupyter.org/on-demand-notebooks-with-jupyterhub-jupyter-enterprise-gateway-and-kubernetes-e8e423695cbf)

+ https://github.com/jupyterhub/kubespawner/pull/304
+ https://github.com/jupyterhub/kubespawner/pull/218

## Scalability

+ https://discourse.jupyter.org/t/scalable-enterprise-gateway/2014
+ https://github.com/jupyter/enterprise_gateway/issues/732

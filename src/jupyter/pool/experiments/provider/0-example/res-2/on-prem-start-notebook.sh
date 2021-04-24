#!/bin/bash

echo "Using jupyter from: " `which jupyter`

timestamp() {
  date +"%Y-%m-%d"
}

if [ "$(whoami)" != "gateway" ]; then
        echo "Script must be run as user: gateway"
        exit -1
fi


unset XDG_RUNTIME_DIR
export EG_REMOTE_HOSTS=yarn-eg-node-1,yarn-eg-node-3,yarn-eg-node-2
export EG_REMOTE_USER=gateway
# provide password if passwordless ssh is not configured
#export EG_REMOTE_PWD=

export EG_ENABLE_TUNNELING=FALSE

export EG_YARN_ENDPOINT=http://yarn-eg-node-1.fyre.ibm.com:8088/ws/v1/cluster
#export EG_ALT_YARN_ENDPOINT=http://yarn-eg-node-1.fyre.ibm.com:8088/ws/v1/cluster

export EG_PROXY_LAUNCH_LOG=/var/log/enterprise_gateway_proxy_launch_$(timestamp).log

export EG_KERNEL_LAUNCH_TIMEOUT=40

export EG_YARN_LOG_LEVEL=WARNING
export EG_YARN_SHUTDOWN_WAIT_TIME=20.0

#START_CMD="jupyter notebook --ip=0.0.0.0 --port=8888 --port-retries=0 --log-level=DEBUG --MappingKernelManagerBase.cull_idle_timeout=180 --MappingKernelManagerBase.cull_interval=-30"
START_CMD="jupyter notebook --ip=0.0.0.0 --port=8888 --port-retries=0 --log-level=DEBUG --MappingKernelManager.cull_idle_timeout=180 --MappingKernelManager.cull_interval=30"

#NOTEBOOK_OPTS="--NotebookApp.kernel_manager_class='enterprise_gateway.services.kernels.remotemanager.RemoteMappingKernelManager' --NotebookApp.allow_remote_access=True --NotebookApp.allow_origin='*' --no-browser"
NOTEBOOK_OPTS="--NotebookApp.allow_remote_access=True --NotebookApp.allow_origin='*' --no-browser"

# Options NOT available to Notebook...
# --JupyterWebsocketPersonality.list_kernels=True

# Enable white list of kernels...
#WHITE_LIST=--KernelSpecManager.whitelist="['spark_python_yarn_cluster','spark_r_yarn_cluster','spark_scala_yarn_cluster']"

LOG=/opt/gateway/log/notebook_$(timestamp).log
PIDFILE=/opt/gateway/runtime/notebook.pid

$START_CMD $NOTEBOOK_OPTS $WHITE_LIST > $LOG 2>&1 &
if [ "$?" -eq 0 ]; then
  echo $! > $PIDFILE
  exit 0
fi
exit 1

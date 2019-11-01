---
title: Spark on Kubernetes
---

# Spark on Kubernetes

[Apache Spark on Kubernetes Documentation](https://spark.apache.org/docs/latest/running-on-kubernetes.html).

## User Group

https://github.com/kubernetes/community/tree/master/ug-big-data

## JIRA

[SPARK-24793 Make spark-submit more useful with k8s](https://issues.apache.org/jira/browse/SPARK-24793).

[SPARK-23153 Support application dependencies in submission client's local file system](https://issues.apache.org/jira/browse/SPARK-23153).

[SPARK-24902 Add integration tests for PVs](https://issues.apache.org/jira/browse/SPARK-24902).

## Automated Build

Write `K8S` in the PR name.

+ https://amplab.cs.berkeley.edu/jenkins/job/testing-k8s-prb-spark-integration
+ https://amplab.cs.berkeley.edu/jenkins/job/testing-k8s-prb-make-spark-distribution
+ https://amplab.cs.berkeley.edu/jenkins/job/testing-k8s-prb-make-spark-distribution/729/consoleFull
+ https://amplab.cs.berkeley.edu/jenkins//job/testing-k8s-prb-make-spark-distribution-unified/856

```bash
# Build Command 1.
mvn -T 1C clean install -DskipTests -Phadoop-2.7 -Dhadoop.version=2.9.0 -Pkubernetes
# Build Command 2.
mvn -T 1C clean package -DskipTests -DzincPort=3427 -Phadoop-2.7 -Pkubernetes -Pkinesis-asl -Phive -Phive-thriftserve`
```

## Test Grid

```bash
open https://k8s-testgrid.appspot.com/sig-big-data
open https://k8s-testgrid.appspot.com/sig-big-data#spark-periodic-default-gke
```

## Fork Repository

[Sources](https://github.com/apache-spark-on-k8s/spark).

[Docs](https://apache-spark-on-k8s.github.io/userdocs/running-on-kubernetes.html).

Automated Build

+ http://spark-jenkins.pepperdata.org:8080/view/upstream%20spark/
+ http://spark-jenkins.pepperdata.org:8080/job/PR-spark-integration-test
+ http://spark-jenkins.pepperdata.org:8080/job/PR-spark-integration-test/1361/consoleFull

```bash
# Build Command 1
./build/mvn -B -Dmaven.repo.local=/home/jenkins/.m2/pr_intg_test_repo clean integration-test -Pkubernetes -Pkubernetes-integration-tests -pl resource-managers/kubernetes/integration-tests -am -Dtest=none -DwildcardSuites=org.apache.spark.deploy.k8s.integrationtest.KubernetesSuite
# Build Command 2
./build/mvn -B clean integration-test -Pkubernetes -Pkubernetes-integration-tests -pl resource-managers/kubernetes/integration-tests -am -Dtest=none -DwildcardSuites=org.apache.spark.deploy.k8s.integrationtest.KubernetesSuite
```

Create the `datalayer` branch.

```
cd $DLAHOME/repos/spark && \
  git checkout branch-2.2-kubernetes && \
  dla spark-merge && \
  git push -f origin datalayer
```

## Build

```bash
dla spark-build 2.4 # Apache.
dla spark-build 2.2 # Fork.
```

## Build Docker Images

```bash
# Apache.
dla spark-docker-build 2.4 # Build.
dla spark-docker-push 2.4 # Push to Docker Hub.
dla spark-docker-push-local 2.4 # Push to Local Registry.
```

```bash
# Fork.
dla spark-docker-build 2.2 # Build.
dla spark-docker-push 2.2 # Push to Docker Hub.
dla spark-docker-push-local 2.2 # Push to Local Registry.
```

## Minikube

```bash
# Share your docker daemon with minikube.
eval $(minikube docker-env)
# Or...
kubectl port-forward --namespace kube-system $(kubectl get po -n kube-system | grep kube-registry-v0 | awk '{print $1;}') 5000:5000
```

## Only for the Fork

```bash
# Shuffle Service
kubectl delete -f $DLAHOME/lab/k8s/spark/spark-shuffle-service.yaml
kubectl create -f $DLAHOME/lab/k8s/spark/spark-shuffle-service.yaml
```

```bash
# Resource Staging Server
kubectl delete -f $DLAHOME/lab/k8s/spark/spark-resource-staging-server.yaml
kubectl create -f $DLAHOME/lab/k8s/spark/spark-resource-staging-server.yaml
minikube service spark-resource-staging-service
kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}'
```

```bash
RSS_POD=$(kubectl get pods -n default -l "spark-resource-staging-server-instance=default" -o jsonpath="{.items[0].metadata.name}")
echo $RSS_POD
kubectl exec -it $RSS_POD -- bash
kubectl port-forward $RSS_POD 10000:10000
curl http://localhost:10000
open http://localhost:10000
```

```bash
RESOURCESTAGINGSERVER=$(kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}')
echo -e """
RESOURCESTAGINGSERVER=$RESOURCESTAGINGSERVER
"""
```

```bash
# Example.
export RESOURCESTAGINGSERVER=10.98.57.131
```

## API Server

```bash
APISERVER=$(kubectl config view | grep server | cut -f 2- -d ":" | tr -d " ")
echo -e "APISERVER=$APISERVER"
# Example.
export APISERVER=https://192.168.99.100:8443
```

## Out-Cluster

```bash
# RESOURCESTAGINGSERVER_URI=http://$(kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}'):10000 \
APP_NAME=submit-cluster-mode-out-cluster \
APISERVER=https://192.168.99.100:8443 \
DEPLOY_MODE=cluster \
DRIVER_POD_NAME=spark-driver \
RESOURCESTAGINGSERVER_URI=http://192.168.99.100:31000 \
dla spark-submit-spl
kubectl logs spark-driver | grep roughly
kubectl delete pod spark-driver --grace-period 0 --force
```

```bash
# RESOURCESTAGINGSERVER_URI=http://$(kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}'):10000 \
APP_NAME=submit-client-mode-out-cluster \
APISERVER=https://192.168.99.100:8443 \
DEPLOY_MODE=client \
DRIVER_POD_NAME=$HOSTNAME \
RESOURCESTAGINGSERVER_URI=http://192.168.99.100:31000 \
dla spark-submit-spl | grep roughly
```

```bash
# RESOURCESTAGINGSERVER_URI=http://$(kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}'):10000 \
APP_NAME=shell-client-mode-out-cluster \
APISERVER=https://192.168.99.100:8443 \
DEPLOY_MODE=client \
RESOURCESTAGINGSERVER_URI=http://192.168.99.100:31000 \
DRIVER_POD_NAME=spark-driver \
dla spark-shell-spl
```

## In-Cluster

```bash
# Apache.
kubectl delete pod spark-pod --grace-period 0 --force; kubectl run -it spark-pod --image-pull-policy=Always --image=localhost:5000/spark:2.4.0 --restart=Never -- bash
```

```bash
# Fork.
kubectl delete pod spark-pod --grace-period 0 --force; kubectl run -it spark-pod --image-pull-policy=Always --image=localhost:5000/spark-driver:2.2.0 --restart=Never -- bash
```

```bash
# Option 1.
kubectl delete -f $DLAHOME/lab/k8s/spark/spark-base.yaml
export POD_NAME=$(kubectl get pods -n default -l spark-base=base -o jsonpath="{.items[0].metadata.name}")
kubectl delete pod $POD_NAME --grace-period 0 --force
kubectl apply -f $DLAHOME/lab/k8s/spark/spark-base.yaml
export POD_NAME=$(kubectl get pods -n default -l spark-base=base -o jsonpath="{.items[0].metadata.name}")
kubectl exec -it $POD_NAME bash
```

```bash
# Option 2.
kubectl attach -it spark-pod
kubectl delete pod spark-exec-1 --grace-period 0 --force; kubectl delete pod spark-exec-2 --grace-period 0 --force
```

```bash
# RESOURCESTAGINGSERVER_URI=http://$(kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}'):10000 \
APP_NAME=submit-cluster-mode-in-cluster \
APISERVER=https://kubernetes:443 \
DEPLOY_MODE=cluster \
DRIVER_POD_NAME=spark-driver \
RESOURCESTAGINGSERVER_URI=http://192.168.99.100:31000 \
$DLAHOME/sbin/spark-submit-spl | grep roughly
```

```bash
# RESOURCESTAGINGSERVER_URI=http://$(kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}'):10000 \
APP_NAME=submit-client-mode-in-cluster \
APISERVER=https://kubernetes:443 \
DEPLOY_MODE=client \
DRIVER_POD_NAME=$HOSTNAME \
RESOURCESTAGINGSERVER_URI=http://192.168.99.100:31000 | grep roughly
```

```bash
# RESOURCESTAGINGSERVER_URI=http://$(kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}'):10000 \
APP_NAME=shell-client-mode-in-cluster \
APISERVER=https://kubernetes:443 \
DEPLOY_MODE=client \
DRIVER_POD_NAME=$HOSTNAME \
RESOURCESTAGINGSERVER_URI=http://192.168.99.100:31000 \
cat $DLAHOME/sbin/spark-shell-spl
```

## Incremental Build

```bash
# Apache.
cd $DLAHOME/repos/spark/resource-managers/kubernetes/core
dla spark-mvn clean -DskipTests
dla spark-mvn install -DskipTests
cp $DLAHOME/repos/spark/resource-managers/kubernetes/core/target/spark-kubernetes_*.jar /opt/spark/jars
cd /opt/spark; ./bin/docker-image-tool.sh -r localhost:5000 -t 2.4.0 build
cd /opt/spark; ./bin/docker-image-tool.sh -r localhost:5000 -t 2.4.0 push
```

```bash
# Fork.
cd $DLAHOME/repos/spark/resource-managers/kubernetes/core
dla spark-mvn clean -DskipTests
dla spark-mvn install -DskipTests
cp $DLAHOME/repos/spark/resource-managers/kubernetes/core/target/spark-kubernetes_*.jar /opt/spark/jars
dla spark-docker-build-push-local
```

## Integration Tests

```bash
cd $DLAHOME/repos/spark/resource-managers/kubernetes/integration-tests
dev/dev-run-integration-tests.sh --spark-tgz $DLAHOME/packages/spark/spark-2.4.0-SNAPSHOT-bin-hdfs-2.9.0.tgz
```

```bash
# Apache.
cd $DLAHOME/repos/spark-integration
./dev/dev-run-integration-tests.sh \
  --spark-tgz $DLAHOME/packages/spark-2.4.0-SNAPSHOT-bin-hdfs-2.9.0.tgz
cd $DLAHOME/repos/spark-integration
./dev/dev-run-integration-tests.sh \
  --spark-tgz $DLAHOME/packages/spark-2.4.0-SNAPSHOT-bin-hdfs-2.9.0.tgz \
  --image-repo localhost:5000 \
  --image-tag 2.4.0
```

```bash
# Fork.
dla spark-integration-test
# dla spark-integration-test-pre
# dla spark-integration-test-run
kubectl apply -f $DLAHOME/repos/spark-integration/dev/spark-rbac.yaml
```

## Run from IDE

```bash
# Main Class.
org.apache.spark.deploy.SparkSubmit \
# VM Options.
-Dscala.usejavacp=true -Xmx1g \
# Program Arguments.
--conf spark.kubernetes.container.image.pullPolicy=Always --conf spark.master=k8s://https://192.168.99.100:8443 --conf spark.local.dir=/tmp/spark-local --conf spark.kubernetes.driver.container.image=localhost:5000/spark:2.4.0 --conf spark.kubernetes.docker.image.pullPolicy=Always --conf spark.sql.catalogImplementation=in-memory --conf spark.app.name=shell-client-mode-out-cluster --conf spark.submit.deployMode=client --conf spark.kubernetes.shuffle.namespace=default --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-init:2.2.0 --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-executor:2.2.0 --conf spark.kubernetes.namespace=default --conf spark.kubernetes.resourceStagingServer.uri=http://10.110.168.204:10000 --conf spark.kubernetes.shuffle.labels=app=spark-shuffle-service,spark-version=2.2.0 --conf spark.shuffle.service.enabled=false --conf spark.executor.instances=1 --conf spark.kubernetes.executor.container.image=localhost:5000/spark:2.4.0 --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-driver:2.2.0 --conf spark.dynamicAllocation.enabled=false --conf spark.sql.warehouse.dir=/tmp/spark-warehouse --name dla-spark --class org.apache.spark.repl.Main spark-shell
# --class org.apache.spark.examples.SparkPi 10 local:///opt/spark/examples/jars/spark-examples_2.11-*.jar 
# Use classpath of module spark-repl_2.11
```

## Msc

```bash
cd $DLAHOME/repos/spark/resource-managers/kubernetes/core
dla spark-mvn clean -DskipTests
dla spark-mvn install -DskipTests
cp $DLAHOME/repos/spark/resource-managers/kubernetes/core/target/spark-kubernetes_*.jar /opt/spark/jars
cd /opt/spark; ./bin/docker-image-tool.sh -r localhost:5000 -t 2.4.0 build
cd /opt/spark; ./bin/docker-image-tool.sh -r localhost:5000 -t 2.4.0 push

-----------------------------------------------------------------------------

kubectl delete pod spark-pod --grace-period 0 --force; kubectl run -it spark-pod --image-pull-policy=Always --image=localhost:5000/spark:2.4.0 --restart=Never -- bash

-----------------------------------------------------------------------------

APP_NAME=client-mode-out-cluster APISERVER=https://192.168.99.100:8443 DEPLOY_MODE=client DRIVER_POD_NAME=$HOSTNAME RESOURCESTAGINGSERVER_URI=http://192.168.99.100:31000

/opt/spark/bin/spark-submit   --name "$APP_NAME"   --conf spark.app.name="$APP_NAME"   --conf spark.master=k8s://"$APISERVER"   --conf spark.submit.deployMode="$DEPLOY_MODE"   --conf spark.sql.catalogImplementation=in-memory   --conf spark.sql.warehouse.dir=/tmp/spark-warehouse  --conf spark.kubernetes.namespace=default   --conf spark.kubernetes.resourceStagingServer.uri="$RESOURCESTAGINGSERVER_URI"   --conf spark.executor.instances=2   --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-init:2.2.0   --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-driver:2.2.0   --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-executor:2.2.0   --conf spark.kubernetes.docker.image.pullPolicy=Always   --conf spark.kubernetes.driver.container.image=localhost:5000/spark:2.4.0   --conf spark.kubernetes.executor.container.image=localhost:5000/spark:2.4.0   --conf spark.kubernetes.container.image.pullPolicy=Always   --conf spark.dynamicAllocation.enabled=false   --conf spark.shuffle.service.enabled=false  --conf spark.kubernetes.shuffle.namespace=default   --conf spark.kubernetes.shuffle.labels="app=spark-shuffle-service,spark-version=2.2.0"   --conf spark.local.dir=/tmp/spark-local   --class org.apache.spark.examples.SparkPi   http://dl.bintray.com/palantir/releases/org/apache/spark/spark-examples_2.11/2.1.0-palantir1-58-g7f02e95/spark-examples_2.11-2.1.0-palantir1-58-g7f02e95.jar   10

/opt/spark/bin/spark-shell   --name "$APP_NAME"   --conf spark.app.name=$APP_NAME   --conf spark.master=k8s://"$APISERVER"   --conf spark.submit.deployMode="$DEPLOY_MODE"   --conf spark.executor.instances=2   --conf spark.sql.catalogImplementation=in-memory   --conf spark.sql.warehouse.dir=/tmp/spark-warehouse   --conf spark.kubernetes.resourceStagingServer.uri="$RESOURCESTAGINGSERVER_URI"   --conf spark.kubernetes.namespace=default --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-init:2.2.0   --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-driver:2.2.0   --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-executor:2.2.0   --conf spark.kubernetes.driver.container.image=localhost:5000/spark:2.4.0   --conf spark.kubernetes.executor.container.image=localhost:5000/spark:2.4.0   --conf spark.kubernetes.container.image.pullPolicy=Always   --conf spark.kubernetes.docker.image.pullPolicy=Always   --conf spark.dynamicAllocation.enabled=false   --conf spark.shuffle.service.enabled=false   --conf spark.kubernetes.shuffle.namespace=default   --conf spark.kubernetes.shuffle.labels="app=spark-shuffle-service,spark-version=2.2.0"   --conf spark.local.dir=/tmp/spark-local   --jars http://central.maven.org/maven2/org/apache/hbase/hbase-common/1.4.0/hbase-common-1.4.0.jar

-----------------------------------------------------------------------------

kubectl apply -f $DLAHOME/lab/k8s/spark/spark-driver-headless-service.yaml

kubectl delete pod spark-pod --grace-period 0 --force; kubectl run -it spark-pod --image-pull-policy=Always --image=localhost:5000/spark:2.4.0 --restart=Never -- bash

-----------------------------------------------------------------------------

APP_NAME=submit-client-mode-in-cluster \
APISERVER=https://kubernetes:443 \
DEPLOY_MODE=client \
DRIVER_POD_NAME=$HOSTNAME \
RESOURCESTAGINGSERVER_URI=http://192.168.99.100:31000

/opt/spark/bin/spark-submit   --name "$APP_NAME"   --conf spark.app.name="$APP_NAME"   --conf spark.master=k8s://"$APISERVER"   --conf spark.submit.deployMode="$DEPLOY_MODE"   --conf spark.sql.catalogImplementation=in-memory   --conf spark.sql.warehouse.dir=/tmp/spark-warehouse  --conf spark.kubernetes.namespace=default   --conf spark.kubernetes.resourceStagingServer.uri="$RESOURCESTAGINGSERVER_URI"   --conf spark.executor.instances=2   --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-init:2.2.0    --conf spark.driver.host=spark-driver-svc  --conf spark.driver.port=7077   --conf spark.driver.blockManager.port=10000  --conf spark.kubernetes.driver.pod.name="$DRIVER_POD_NAME" --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-driver:2.2.0   --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-executor:2.2.0   --conf spark.kubernetes.docker.image.pullPolicy=Always   --conf spark.kubernetes.driver.container.image=localhost:5000/spark:2.4.0   --conf spark.kubernetes.executor.container.image=localhost:5000/spark:2.4.0   --conf spark.kubernetes.container.image.pullPolicy=Always   --conf spark.dynamicAllocation.enabled=false   --conf spark.shuffle.service.enabled=false  --conf spark.kubernetes.shuffle.namespace=default   --conf spark.kubernetes.shuffle.labels="app=spark-shuffle-service,spark-version=2.2.0"   --conf spark.local.dir=/tmp/spark-local   --class org.apache.spark.examples.SparkPi   http://dl.bintray.com/palantir/releases/org/apache/spark/spark-examples_2.11/2.1.0-palantir1-58-g7f02e95/spark-examples_2.11-2.1.0-palantir1-58-g7f02e95.jar   10

/opt/spark/bin/spark-shell \
  --name "$APP_NAME" \
  --conf spark.app.name=$APP_NAME \
  --conf spark.master=k8s://"$APISERVER" \
  --conf spark.submit.deployMode="$DEPLOY_MODE" \
  --conf spark.executor.instances=2 \
  --conf spark.sql.catalogImplementation=in-memory \
  --conf spark.sql.warehouse.dir=/tmp/spark-warehouse \
  --conf spark.kubernetes.resourceStagingServer.uri="$RESOURCESTAGINGSERVER_URI" \
  --conf spark.kubernetes.namespace=default \
  --conf spark.kubernetes.driver.pod.name="$DRIVER_POD_NAME" \
  --conf spark.driver.host=spark-driver-svc \
  --conf spark.driver.port=7077 \
  --conf spark.driver.blockManager.port=10000 \
  --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-init:2.2.0 \
  --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-driver:2.2.0 \
  --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-executor:2.2.0 \
  --conf spark.kubernetes.driver.container.image=localhost:5000/spark:2.4.0 \
  --conf spark.kubernetes.executor.container.image=localhost:5000/spark:2.4.0 \
  --conf spark.kubernetes.container.image.pullPolicy=Always \
  --conf spark.kubernetes.docker.image.pullPolicy=Always \
  --conf spark.dynamicAllocation.enabled=false \
  --conf spark.shuffle.service.enabled=false \
  --conf spark.kubernetes.shuffle.namespace=default \
  --conf spark.kubernetes.shuffle.labels="app=spark-shuffle-service,spark-version=2.2.0" \
  --conf spark.local.dir=/tmp/spark-local \
  --jars http://central.maven.org/maven2/org/apache/hbase/hbase-common/1.4.0/hbase-common-1.4.0.jar
```

```
we create the headless service in spark-submit here: https://github.com/apache/spark/blob/master/resource-managers/kubernetes/core/src/main/scala/org/apache/spark/deploy/k8s/features/DriverServiceFeatureStep.scala#L69

Note that we only invoke any of the feature steps and the entry point of KubernetesClientApplication if we run in cluster mode. If we run in client mode, we enter directly into the user's main class, or, the user is in a process that just created a Spark context from scratch with the right master URL (i.e. new SparkContext(k8s://my-master:8443)). If you wanted to create the headless service in client mode, you'd have to do it when instantiating the KubernetesClusterSchedulerBackend somewhere, probably before creating the ExecutorPodsAllocator so that you'd set spark.driver.host and spark.driver.port properly when telling the created executors where to find the driver via the --driver-url argument.

I've deferred implementing this code path. The documentation for using a headless service is only suggested, but not mentioned as a hard requirement: https://github.com/apache/spark/pull/21748/files#diff-b5527f236b253e0d9f5db5164bdb43e9R131. I didn't put this as a hard requirement because I could imagine some users wanting to not specifically use a headless service for this; perhaps they want to use a full Service object and share that service object with ports to be exposed for other reachable endpoints their pod exposes.
```

## Dynamic Allocation

This is linked to External Shuffle Service.

https://issues.apache.org/jira/browse/SPARK-25299 Use remote storage for persisting shuffle data
https://docs.google.com/document/d/1uCkzGGVG17oGC6BJ75TpzLAZNorvrAU3FRd2X-rVHSM/edit#heading=h.btqugnmt2h40
https://docs.google.com/document/d/1d6egnL6WHOwWZe8MWv3m8n4PToNacdx7n_0iMSWwhCQ/edit#heading=h.a0c578jvjr47

https://www.youtube.com/watch?v=GbpMOaSlMJ4 Scaling and Securing Spark on Kubernetes at Bloomberg

https://github.com/apache/spark/pull/22722 [SPARK-24432][k8s] Add support for dynamic resource allocation on Kubernetes
https://github.com/apache/spark/pull/24083 [SPARK-24432] Support dynamic allocation without external shuffle service
https://github.com/apache/spark/pull/24817 [SPARK-27963][core] Allow dynamic allocation without a shuffle service.

https://github.com/palantir/spark/pull/427 Support dynamic allocation without external shuffle service
https://github.com/palantir/spark/pull/445 Fix dynamic allocation with external shuffle service

https://github.com/kris-nova/spark-cluster-api-operator
https://docs.google.com/presentation/d/1AoHJWbfe1txwciWLDlcKwTFMWvPMZpGJ7t6obA8MH5o/edit#slide=id.g56f319e3bc_0_284

## Helm


You need to install the Spark `Resource Staging Server` and the Spark `Shuffle Service`.

```
helm install spark \
  -n spark
```

```bash
# Deploy Spark Helm Chart.
cd $DLAHOME/etc/helm/spark
helm install \
  spark \
  --set spark.resourceStagingServer.image=localhost:5000/spark-resource-staging-server:2.2.0 \
  --set spark.resourceStagingServer.masterOperator=In \
  --set spark.shuffleService.image=localhost:5000/spark-shuffle-service:2.2.0 \
  --set spark.shuffleService.masterOperator=In \
  --set spark.imagePullPolicy=Always \
  -n spark
```

List the pods with `kubectl get pods -l kuber=spark` and check the running Spark pods.

```
NAME                                                READY     STATUS    RESTARTS   AGE
spark-resource-staging-server-c5db88df9-n42gw   1/1       Running   0          15s
spark-shuffle-service-5r2h7                     1/1       Running   0          15s
spark-shuffle-service-9pxxc                     1/1       Running   0          15s
spark-shuffle-service-s2vk8                     1/1       Running   0          15s
```

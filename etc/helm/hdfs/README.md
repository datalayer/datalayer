[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# HDFS

Install the `HDFS` chart.

```
helm install \
  --set persistence.nameNode.enabled=true \
  --set persistence.nameNode.storageClass=gp2 \
  --set persistence.dataNode.enabled=true \
  --set persistence.dataNode.storageClass=gp2 \
  --set hdfs.dataNode.replicas=3 \
  hdfs \
  -n hdfs
```

```bash
# Deploy HDFS Helm Chart.
cd $DLAHOME/etc/helm/hdfs
helm install \
  hdfs \
  --set hdfs.nameNode.image=localhost:5000/hdfs-nn:2.9.0 \
  --set hdfs.nameNode.masterOperator=In \
  --set hdfs.dataNode.image=localhost:5000/hdfs-dn:2.9.0 \
  --set hdfs.dataNode.masterOperator=In \
  --set imagePullPolicy=Always \
  --set persistence.nameNode.enabled=true \
  --set persistence.nameNode.storageClass=standard \
  --set persistence.nameNode.size=1Gi \
  --set persistence.dataNode.enabled=true \
  --set persistence.dataNode.storageClass=standard \
  --set persistence.dataNode.size=1Gi \
  --set hdfs.dataNode.replicas=2 \
  -n hdfs
kubectl exec -n default -it hdfs-hdfs-hdfs-nn-0 -- hdfs dfsadmin -report
```

This will launch one Hadoop Namenode and 3 Hadoop Datanodes.

If you list the pods with `kubectl get pods -l app=hdfs`, you should see the running Hadoop pods.

```
NAME                              READY     STATUS    RESTARTS   AGE
hdfs-hdfs-hdfs-nn-0   1/1       Running   0          5s
hdfs-hdfs-hdfs-dn-0   1/1       Running   0          5s
hdfs-hdfs-hdfs-dn-1   1/1       Running   0          5s
hdfs-hdfs-hdfs-dn-2   1/1       Running   0          5s
```

Helm should also list the chart you have just deployed. Type `helm ls hdfs` which will return:

```
NAME         	REVISION	UPDATED                 	STATUS  	CHART                     	NAMESPACE
hdfs   	1       	Mon Nov 20 14:23:52 2017	DEPLOYED	hdfs-1.0.0          	default  
```

Check the sanity of your cluster with `dfsadmin` and create a `/tmp` folder.

```
kubectl exec -it hdfs-hdfs-hdfs-nn-0 -- hdfs dfsadmin -report
kubectl exec -it hdfs-hdfs-hdfs-nn-0 -- hdfs dfs -mkdir /tmp
kubectl exec -it hdfs-hdfs-hdfs-nn-0 -- hdfs dfs -ls /
kubectl exec -n default -it hdfs-hdfs-hdfs-nn-0 -- bash
```

To access the Namenode user interface: `kubectl port-forward hdfs-hdfs-hdfs-nn-0 50070:50070` and open in your browser `http://localhost:50070`.

If you want to scale the number of Datanodes, you just need to upgrade.

```
helm upgrade \
  --set hdfs.dataNode.replicas=6 \
  hdfs \
  hdfs
```

# HDFS

## Ozone

https://hadoop.apache.org/ozone

## HDFS

+ namenode                    http://localhost:50070
+ namenode-browser            http://localhost:50075/logs
+ secondary-namenode          http://localhost:50090

```
curl -i "http://localhost:50070/webhdfs/v1/tmp?user.name=istvan&op=GETFILESTATUS"
HTTP/1.1 200 OK
Content-Type: application/json
Expires: Thu, 01-Jan-1970 00:00:00 GMT
Set-Cookie: hadoop.auth="u=istvan&p=istvan&t=simple&e=1370210454798&s=zKjRgOMQ1Q3NB1kXqHJ6GPa6TlY=";Path=/
Transfer-Encoding: chunked
Server: Jetty(6.1.26)
{"FileStatus":{"accessTime":0,"blockSize":0,"group":"supergroup","length":0,"modificationTime":1370174432465,"owner":"istvan","pathSuffix":"","permission":"755","replication":0,"type":"DIRECTORY"}}
```

FORMAT NAMENODE

rm -fr /var/datalayer/hadoop-3.0.0-*
hadoop namenode -format AosCluster

START HADOOP

start-dfs.sh

STOP HADOOP

stop-dfs.sh

WEB UI

+ hdfs namenode               http://localhost:50070
+ hdfs namenode explorer      http://localhost:50070/explorer.html
+ namenode-browser            http://localhost:50075
+ secondary-namenode          http://localhost:50090

+ nohup hadoop fsck / -files -blocks -locations
+ cat nohup.out | grep [your block name]

HADOOP APPEND

+ https://svn.apache.org/repos/asf/hadoop/common/branches/branch-0.20-append/ 
+ https://github.com/facebook/hadoop-20-append 
+ https://github.com/trendmicro/hbase/tree/security
+ https://github.com/trendmicro/hadoop-common  

# HDFS K8S

```
kubectl delete -f k8s/dla-vol-local.1.yaml
rm -fr /tmp/dla-vol-01
mkdir /tmp/dla-vol-01
kubectl apply -f k8s/dla-vol-local.1.yaml
kubectl delete -f k8s/dla-vol-local.2.yaml
rm -fr /tmp/dla-vol-02
mkdir /tmp/dla-vol-02
kubectl apply -f k8s/dla-vol-local.2.yaml
```

```
helm install $(stable/hadoop/tools/calc_resources.sh 50) \
  --set persistence.nameNode.enabled=true \
  --set persistence.nameNode.storageClass="" \
  --set persistence.dataNode.enabled=true \
  --set persistence.dataNode.storageClass="" \
  --set persistence.nameNode.size=2Gi \
  --set persistence.dataNode.size=2Gi \
  stable/hadoop \
  -n hadoop
```

```
helm delete hadoop --purge
```

# HDFS K8S

```
helm install --repo http://helm.datalayer.io \
  --set persistence.nameNode.enabled=false \
  --set persistence.dataNode.enabled=false \
  hadoop-k8s \
  -n hadoop-k8s
kubectl exec -n default -it hdfs-hdfs-hdfs-nn-0 -- hdfs dfsadmin -report
kubectl exec -n default -it hdfs-hdfs-hdfs-nn-0 -- hdfs dfs -mdkir /tmp
kubectl exec -n default -it hdfs-hdfs-hdfs-nn-0 -- hdfs dfs -ls /
```

# HDFS K8S Local + Kerberos

```
helm delete hdfs-datanode --purge
helm delete hdfs-namenode --purge
```

```
kubectl label nodes datalayer-001 hdfs-namenode-selector=hdfs-namenode-0
kubectl label node datalayer-001 hdfs-datanode-exclude=yes
kubectl label node datalayer-001 hdfs-datanode-exclude=no --overwrite
kubectl label node datalayer-001 hdfs-datanode-exclude-
helm install charts/hdfs-kerberos/hdfs-datanode-k8s -n hdfs-datanode
```

# HDFS

##  Examples

sudo -u hdfs hdfs dfs -mkdir /user/hdfs/test
sudo -u hdfs hadoop jar /usr/hdp/2.3.2.0-2950/hadoop-mapreduce/hadoop-mapreduce-examples.jar pi 10 10
sudo -u hdfs hdfs dfs -mkdir /user/yarn
sudo -u hdfs hdfs dfs -chown -R yarn:hadoop /user/yarn
sudo -u yarn yarn jar /usr/hdp/2.3.2.0-2950/hadoop-mapreduce/hadoop-mapreduce-examples.jar pi 10 10

HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -ls /user
HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-yarn jar $DATALAYER_HOME/ext/hadoop-2.7.1/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.1.jar pi -D hdp.version=2.3.4.0-3485 10 10

## Head

```
hadoop fs -cat /your/file | head
```

is efficient here, as cat will close the stream as soon as head will finish reading all the lines.

To get the tail there is a special effective command in hadoop:

```
hadoop fs -tail /your/file
```

Unfortunately it returns last kilobyte of the data, not a given number of lines.

# HDP Version

VERSION=`hdp-select status hadoop-client | sed 's/hadoop-client - \([0-9]\.[0-9]\).*/\1/'`

## Safe Mode

if needed, force leave safe mode:

```
sudo -u hdfs hdfs dfsadmin -safemode leave
sudo -u hdfs hdfs dfsadmin -fs hdfs://ambari.datalayer.io.local:8020 -safemode leave
```


# User Group Information

Use `HADOOP_USER_NAME` to force authenticated user.

# Hadoop

mkdir /hadoop-kerberos which must must not be world or group writable, 

```
sudo mkdir /hadoop-kerberos
sudo chmod 700 -R /hadoop-kerberos
# sudo chmod -R 775 /hadoop-kerberos
```

# Environment

Add this in your /root/.bashrc

```
export JAVA_HOME=/opt/jdk
export PATH=$JAVA_HOME/bin:$PATH
export HADOOP_HOME=/hadoop-kerberos
export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop
export PATH=$HADOOP_HOME/bin:$PATH
export DATALAYER_HOME=/src/platform/sdk
export PATH=$DATALAYER_HOME/bin:$PATH
export DATALAYER_REPOSITORY=/home/datalayer/.m2/repository
```

# Users

```
addgroup hadoop
useradd hdfs -G hadoop
useradd mapred -G hadoop
useradd yarn -G hadoop
useradd spitfire -G hadoop
usermod -a -G hadoop eric
usermod -a -G hadoop datalayer
useradd -G hadoop root
```

# Password-less Shell

Ensure password-less Shell.

```
sudo su
passwd
ssh-keygen -t rsa -f ~/.ssh/id_rsa -P ''
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
ssh-copy-id root@localhost
ssh-copy-id root@datalayer-001
ssh-copy-id root@datalayer-001.datalayer.io.local
```

# Container Executor

The container-executor program, which is used on YARN only and supported on GNU/Linux only, runs the containers as the user who submitted the application.

It requires all user accounts to be created on the cluster nodes where the containers are launched.

It uses a setuid executable that is included in the Hadoop distribution.

The NodeManager uses this executable to launch and kill containers.

The setuid executable switches to the user who has submitted the application and launches or kills the containers.

For maximum security, this executor sets up restricted permissions and user/group ownership of local files and directories used by the containers such as the shared objects, jars, intermediate files, log files, and so on.

As a result, only the application owner and NodeManager can access any of the local files/directories including those localized as part of the distributed cache.

The container-executor program must have a very specific set of permissions and ownership in order to function correctly. In particular, it must:

+ Be owned by root
+ Be owned by a group that contains only the user running the YARN daemons
+ Be setuid
+ Be group readable and executable

This corresponds to the ownership root:yarn and the permissions 6050.

```
sudo chmod 400 $HADOOP_HOME/etc/hadoop/container-executor.cfg
ls -alp $HADOOP_HOME/etc/hadoop/container-executor.cfg
-r-------- 1 root hadoop   318 Nov 13  2014 container-executor.cfg
```

```
sudo chown root:hadoop $HADOOP_HOME/bin/container-executor
sudo chmod 6050 $HADOOP_HOME/bin/container-executor
ls -alp $HADOOP_HOME/bin/container-executor
---Sr-s--- 1 root hadoop 91886 2012-04-01 19:54 container-executor
```

```
more $HADOOP_HOME/etc/hadoop/container-executor.cfg
```

The file content should look like this.

```
yarn.nodemanager.linux-container-executor.group=hadoop
banned.users=test
min.user.id=0
allowed.system.users=root
```

The container-executor program requires that the paths including and leading up to the directories specified in yarn.nodemanager.local-dirs and yarn.nodemanager.log-dirs to be set to 755 permissions.

Check permissions: http://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-common/SecureMode.html#Mapping_from_user_to_group

```
$HADOOP_HOME/bin/container-executor --checksetup
```

# Keytabs

```
sudo su
mkdir -p /etc/datalayer/conf/keytabs
chown root:hadoop /etc/datalayer/conf/keytabs
chmod 750 /etc/datalayer/conf/keytabs
```

```
sudo su
kadmin.local -q "delete_principal eric@DATALAYER.IO"
kadmin.local -q unixmachine.keyta"addprinc eric@DATALAYER.IO"
kadmin.local -q "delete_principal eric/directory.datalayer.io.local@DATALAYER.IO"
kadmin.local -q "addprinc eric/directory.datalayer.io.local@DATALAYER.IO"
kadmin.local -q "delete_principal datalayer@DATALAYER.IO"
kadmin.local -q "addprinc datalayer@DATALAYER.IO"
kadmin.local -q "delete_principal datalayer/datalayer-001.datalayer.io.local@DATALAYER.IO"
kadmin.local -q "addprinc -randkey datalayer/datalayer-001.datalayer.io.local@DATALAYER.IO"
```

```
sudo su
cd /etc/datalayer/conf/keytabs
rm datalayer.keytab
kadmin.local -q "xst -k datalayer.keytab datalayer/datalayer-001.datalayer.io.local@DATALAYER.IO"
chown hdfs:hadoop /etc/datalayer/conf/keytabs/datalayer.keytab
klist -ket /etc/datalayer/conf/keytabs/datalayer.keytab
kinit -kt /etc/datalayer/conf/keytabs/datalayer.keytab datalayer/datalayer-001.datalayer.io.local@DATALAYER.IO
klist
```

```
kdestroy
kinit -kt /etc/datalayer/conf/keytabs/datalayer.keytab datalayer/datalayer-001.datalayer.io.local@DATALAYER.IO
klist
```

```
sudo su
cd /etc/datalayer/conf/keytabs
rm spnego.keytab
kadmin.local -q "addprinc -randkey HTTP/directory.datalayer.io.local@DATALAYER.IO"
kadmin.local -q "xst -k spnego.keytab HTTP/directory.datalayer.io.local@DATALAYER.IO"
chown datalayer:datalayer spnego.keytab
chmod 400 spnego.keytab
mv spnego.keytab /etc/datalayer/conf/keytabs
klist -ket /etc/datalayer/conf/keytabs/spnego.keytab
kinit -kt /etc/datalayer/conf/keytabs/spnego.keytab HTTP/directory.datalayer.io.local@DATALAYER.IO
klist
```

# SSL

Certificates Setup

```
$JAVA_HOME/bin/keytool -genkey -keystore datalayer.keystore -keyalg RSA -alias datalayer -dname "CN=datalayer.io.local,O=datalayer" -keypass datalayer -storepass datalayer
$JAVA_HOME/bin/keytool -exportcert -keystore datalayer.keystore -alias datalayer -file datalayer.cert -storepass datalayer
$JAVA_HOME/bin/keytool -import -keystore datalayer.truststore -alias datalayer -file datalayer.cert -noprompt -storepass datalayer
openssl x509 -inform der -in datalayer.cert >> datalayer.pem
keytool -list -v -keystore datalayer.keystore -storepass datalayer
```

```
rm $DATALAYER_HOME/conf-template/hadoop-kerberos/jks/datalayer.keystore
rm $DATALAYER_HOME/conf-template/hadoop-kerberos/jks/datalayer.keystore
mv datalayer.* $DATALAYER_HOME/conf-template/hadoop-kerberos/jks
chown datalayer:datalayer $DATALAYER_HOME/conf-template/hadoop-kerberos/jks/datalayer.*
cd $DATALAYER_HOME/conf-template/hadoop-kerberos/jks/
chown yarn:hadoop datalayer.keystore
chmod 0440 datalayer.keystore
chown yarn:hadoop datalayer.cert
chmod 0440 datalayer.cert
chown yarn:hadoop datalayer.truststore
chmod 0444 datalayer.truststore
```

The ssl-server.xml should be owned by the hdfs or mapred Hadoop system user, belong to the hadoop group, and it should have 440 permissions. Regular users should not belong to the hadoop group.

```
cp $DATALAYER_HOME/conf-template/hadoop-kerberos/ssl-server.xml $HADOOP_HOME/etc/hadoop
chown hdfs:hadoop  $HADOOP_HOME/etc/hadoop/ssl-server.xml
chmod 440 $HADOOP_HOME/etc/hadoop/ssl-server.xml
ll $HADOOP_HOME/etc/hadoop/ssl-server.xml
```

The ssl-client.xml file should be owned by the mapred user for MRv1 and by the yarn user for MRv2; the file permissions should be 444 (read access for all users). 

```
cp $DATALAYER_HOME/conf-template/hadoop-kerberos/ssl-client.xml $HADOOP_HOME/etc/hadoop
chown yarn:hadoop  $HADOOP_HOME/etc/hadoop/ssl-client.xml
chmod 444 $HADOOP_HOME/etc/hadoop/ssl-client.xml
ll $HADOOP_HOME/etc/hadoop/ssl-client.xml
```

!!! Put the ssl-*.xml in /hadoop-ssl folder owned by yarn:hadoop (parents must be own by yarn:hadoop)

# Debug

To enable SSL debugging in the reducers, set `-Djavax.net.debug=all` in the `mapred.reduce.child.java.opts` property.

```
<configuration>
  <property>
    <name>mapred.reduce.child.java.opts</name>
    <value>-Xmx200m -Djavax.net.debug=all</value>
  </property>
</configuration>
```

You can do this on a per-job basis, or by means of a cluster-wide setting in mapred-site.xml.

To set this property in TaskTrackersfor MRv1, set it in hadoop-env.sh: `HADOOP_TASKTRACKER_OPTS="-Djavax.net.debug=all $HADOOP_TASKTRACKER_OPTS"`

To set this property in NodeManagers for YARN, set it in hadoop-env.sh: `YARN_OPTS="-Djavax.net.debug=all $YARN_OPTS"`

# Configure

As normal user, generate the configuration (it will use the conf-template folder and write the file in `$DATALAYER_HOME/conf/hadoop`).

```
HADOOP_HOME=/hadoop-kerberos DATALAYER_HADOOP_DATA_DIR=/hadoop-kerberos-data/data DATALAYER_HADOOP_CONF_TEMPLATE_DIR=$DATALAYER_HOME/conf-template/hadoop-kerberos datalayer-hadoop-conf-generate
cp $DATALAYER_HOME/conf/hadoop/*-site.xml $HADOOP_HOME/etc/hadoop
cp $DATALAYER_HOME/conf/hadoop/ssl-*.xml $HADOOP_HOME/etc/hadoop
```

# Start

As root user, and without keberos ticket, you can initialize (=format) Hadoop.

```
sudo su
kdestroy
$HADOOP_HOME/bin/hadoop namenode -format
```

Or root user, and without keberos ticket, you can init and start Hadoop...

```
sudo su
kdestroy
./sbin/start-dfs.sh 
cat $HADOOP_HOME/logs/hadoop-root-namenode-datalayer-001.log
cat $HADOOP_HOME/logs/hadoop-root-datanode-datalayer-001.log
xdg-open https://localhost:50070
cat $HADOOP_HOME/logs/hadoop-root-namenode-datalayer-001.log
./sbin/start-yarn.sh 
cat $HADOOP_HOME/logs/yarn-root-resourcemanager-datalayer-001.log
cat $HADOOP_HOME/logs/yarn-root-nodemanager-datalayer-001.log
xdg-open http://localhost:8088
$HADOOP_HOME/sbin/mr-jobhistory-daemon.sh start historyserver --config $HADOOP_CONF_DIR
xdg-open http://localhost:19888
# $HADOOP_HOME/sbin/yarn-daemon.sh start timelineserver
# xdg-open http://localhost:8188
```

```
# or...
HADOOP_HOME=/hadoop-kerberos DATALAYER_HADOOP_DATA_DIR=/hadoop-kerberos-data/data DATALAYER_HADOOP_CONF_TEMPLATE_DIR=$DATALAYER_HOME/conf-template/hadoop-kerberos DATALAYER_HADOOP_DATA_DIR=/hadoop-kerberos-data/data DATALAYER_SECURITY=kerberos datalayer-hadoop-init
HADOOP_HOME=/hadoop-kerberos DATALAYER_HADOOP_DATA_DIR=/hadoop-kerberos-data/data DATALAYER_SECURITY=kerberos datalayer-hadoop-start
```

Check you are secured.

```
sudo su
kdestroy
hadoop fs -ls /tmp
15/03/11 12:11:03 WARN ipc.Client: Exception encountered while connecting to the server : javax.security.sasl.SaslException: GSS initiate failed [Caused by GSSException: No valid credentials provided (Mechanism level: Failed to find any Kerberos tgt)]
ls: Failed on local exception: java.io.IOException: javax.security.sasl.SaslException: GSS initiate failed [Caused by GSSException: No valid credentials provided (Mechanism level: Failed to find any Kerberos tgt)]; Host Details : local host is: "directory.datalayer.io.local/127.0.0.1"; destination host is: "directory.datalayer.io.local":9000; 
```

Create base HDFS structure.

```
kinit -kt /etc/datalayer/conf/keytabs/datalayer.keytab datalayer/datalayer-001.datalayer.io.local@DATALAYER.IO
klist
hadoop fs -mkdir /tmp
hadoop fs -ls /tmp
hadoop fs -chmod 777 /tmp
hadoop fs -mkdir -p /user/spitfire
hadoop fs -chown -R spitfire:hdfs /user/spitfire
hadoop fs -mkdir /user
hadoop fs -ls /user
hadoop fs -mkdir /user/datalayer
hadoop fs -chown datalayer:hadoop /user/datalayer
hadoop fs -mkdir /user/eric
hadoop fs -chown eric:hadoop /user/eric
hadoop fs -ls /user
hadoop fs -chmod -R 777 /user
hadoop fs -ls /
hadoop fs -chmod -R 777 /tmp
```

```
hdfs dfsadmin -report
```

Time to ask for a ticket as a user.

```
kdestroy
kinit spitfire@DATALAYER.IO
Password for spitfire@DATALAYER.IO:
*****
```

Check you have a ticket.

```
klist
Ticket cache: FILE:/tmp/krb5cc_0
Default principal: datalayer@DATALAYER.IO
Valid starting       Expires              Service principal
2015-03-11 12:12:18  2015-03-12 12:12:18  krbtgt/DATALAYER.IO@DATALAYER.IO
```

Check you are authenticated.

```
hadoop fs -ls /tmp
hadoop fs -mkdir /user/spitfire/sub1
hadoop fs -ls /user/spitfire
Found 1 items
drwxrwx---   - spitfire hdfs          0 2015-03-11 12:08 /tmp/hadoop-yarn
```

Test with a few more cool example.

```
hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar randomwriter randomwriter-out
hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar pi 10 10
```

Test from Ambari Machine to HDP 2.3 Kerberos.

```
kinit eric@DATALAYER.IO
hdfs dfs -mkdir /user/eric
hdfs dfs -ls /user/eric
yarn jar /usr/hdp/2.3.4.0-3485/hadoop-mapreduce/hadoop-mapreduce-examples.jar pi 10 10
sudo -u yarn yarn jar /usr/hdp/2.3.4.0-3485/hadoop-mapreduce/hadoop-mapreduce-examples.jar pi 10 10
```

Test from Remote Machine to HDP 2.3 Kerberos.

```
kinit eric@DATALAYER.IO
HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hadoop-kerberos/template/hdp-2.3-kerberos datalayer-hdfs dfs -ls /tmp
HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hadoop-kerberos/template/hdp-2.3-kerberos datalayer-hdfs dfs -ls /user
HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hadoop-kerberos/template/hdp-2.3-kerberos datalayer-yarn jar $DATALAYER_HOME/ext/hadoop-2.7.1/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.1.jar pi -D hdp.version=2.3.4.0-3485 10 10
!!! Does not work: HADOOP_OPTS="-Dhdp.version=2.3.4.0-3485" HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hadoop-kerberos/template/hdp-2.3-kerberos datalayer-yarn jar $DATALAYER_HOME/ext/hadoop-2.7.1/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.1.jar pi 10 10
```

# Stop

As root user, you can stop Hadoop.

```
HADOOP_HOME=/hadoop-kerberos DATALAYER_HADOOP_DATA_DIR=/hadoop-kerberos-data/data DATALAYER_SECURITY=kerberos datalayer-hadoop-stop
```

# Other Properties

Additional property to set manually in `core-site.xml`.

```
<property>
  <name>hadoop.ssl.client.conf</name>
  <value>/etc/hadoop/conf/ssl-client.xml</value>
</property>
<property>
  <name>hadoop.ssl.hostname.verifier</name>
  <value>DEFAULT</value>
</property>
<property>
  <name>hadoop.ssl.keystores.factory.class</name>
  <value>org.apache.hadoop.security.ssl.FileBasedKeyStoresFactory</value>
</property>
<property>
  <name>hadoop.ssl.require.client.cert</name>
  <value>false</value>
</property>
<property>
  <name>hadoop.ssl.server.conf</name>
  <value>/etc/hadoop/conf/ssl-server.xml</value>
</property>
```

Additional property to set manually in `hdfs-site.xml`.

```
<property>
  <name>dfs.http.policy</name>
  <value>HTTPS_ONLY</value>
</property>
<property>
  <name>dfs.datanode.address</name>
  <value>0.0.0.0:10019</value>
</property>
<property>
  <name>dfs.datanode.http.address</name>
  <value>0.0.0.0:10022</value>
</property>
</property>
<property>
  <name>dfs.data.transfer.protection</name>
  <value>authentication</value>
</property>
```

In the DataNode section

```
<property>
  <name>DataNode directories permission</name>
  <value>750</value>
</property>
```

# Proxy User

In core-site.xml:

```
<property>
  <name>hadoop.proxyuser.datalayer.hosts</name>
  <value>*</value>
</property>
<property>
  <name>hadoop.proxyuser.datalayer.groups</name>
  <value>*</value>
</property>
```

## Contributions

<table class="bodyTable table table-striped table-hover" border="1">
  <tbody>
  <tr class="a">
    <td style="text-align: center;"><b>DESCRIPTION</b></td>
    <td style="text-align: center;"><b>ISSUE</b></td>
    <td style="text-align: center;"><b>REPOSITORY</b></td>
    <td style="text-align: center;"><b>DOC</b></td>
    <td style="text-align: center;"><b>PR</b></td>
    <td style="text-align: center;"><b>STATUS</b></td>
  </tr>
  <tr class="b">
    <td>Jar with dependencies</td>
    <td></td>
    <td><a href="https://github.com/datalayer-contrib/hdfs/tree/jar-with-dependencies">datalayer-contrib:hdfs/jar-with-dependencies</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache-spark-on-k8s/kubernetes-HDFS/pull/27">#27</a></td>
    <td>OPEN</td>
  </tr>
  </tbody>
</table>

# Apache Hadoop - HDFS Helm Chart

```bash
# https://github.com/ifilonenko/hadoop-kerberos-helm
```

```bash
# https://github.com/flokkr/charts
# https://github.com/flokkr/runtime-kubernetes
# https://issues.apache.org/jira/browse/HDFS-13022
```

```bash
# https://github.com/apache-spark-on-k8s/kubernetes-hdfs
```

Hadoop 3.1.0

HDFS

The secondary namenode http/https server address and port.
Service	Servers	Default Ports Used	Protocol	Configuration Parameter	Comments
WebUI for NameNode

Master (incl. back-up NameNodes)	9870/9871	http/https	
dfs.namenode.http-address

dfs.namenode.https-address

The address and the base port where the dfs namenode web ui will listen on.

The namenode secure http server address and port.

Metadata service (NameNode)	Master (incl. back-up NameNodes)		IPC	
fs.defaultFS

The name of the default file system.

For example,

hdfs://hdp-master:19000

Data Node	All slave nodes	9864/9865	http/https	
dfs.datanode.http.address

dfs.datanode.https.address

The secondary namenode http/https server address and port.

Data Node	All slave nodes	9866		dfs.datanode.address	
The datanode server address and port for data transfer.

Data Node	All slave nodes	9867	IPC	dfs.datanode.ipc.address	
The datanode ipc server address and port (for metadata operations).

Secondary NameNode	Secondary NameNode and any backup NameNodes	9868/9869	http/https	
dfs.namenode.secondary.http-address

fs.namenode.secondary.https-address

JournalNode		8485	IPC	dfs.journalnode.rpc-address	The JournalNode RPC server address and port.
JournalNode		8480/8481	http/https	
dfs.journalnode.http-address

dfs.journalnode.https-address

The address and port the JournalNode http/https server listens on.
Aliasmap Server

NameNode	50200

dfs.provided.aliasmap.inmemory.dnrpc-address
The address where the aliasmap server will be running 
MapReduce
Service	Servers	Default Ports Used	Protocol	Configuration Parameter	Comments
MapReduce Job History		10020	
mapreduce.jobhistory.address	MapReduce JobHistory Server IPC host:port
MapReduce Job History UI		19888/19890	http/https
mapreduce.jobhistory.webapp.address

mapreduce.jobhistory.webapp.https.address

MapReduce JobHistory Server Web UI URL (http/https)

History server admin

10033
http
mapreduce.jobhistory.admin.address
The address of the History server admin interface.


YARN
Service	Servers	Default Ports Used	Protocol	Configuration Parameter	Comments

8032	http	yarn.resourcemanager.address	The address of the applications manager interface in the RM.
8030	http	yarn.resourcemanager.scheduler.address	The address of the scheduler interface.


8088/8090
http/https
yarn.resourcemanager.webapp.address

yarn.resourcemanager.webapp.https.address

The http/https address of the RM web application.


8031

yarn.resourcemanager.resource-tracker.address



8033

yarn.resourcemanager.admin.address
The address of the RM admin interface.


0

yarn.nodemanager.address
The address of the container manager in the NM.


8040

yarn.nodemanager.localizer.address
Address where the localizer IPC is.


8048

yarn.nodemanager.collector-service.address
Address where the collector service IPC is.


8042/8044
http/https
yarn.nodemanager.webapp.address

yarn.nodemanager.webapp.https.address

The http/https address of the NM web application. 


10200

yarn.timeline-service.address
This is default address for the timeline server to start the RPC server.


8188/8190

yarn.timeline-service.webapp.address

yarn.timeline-service.webapp.https.address

The http/https address of the timeline service web application.


8047

yarn.sharedcache.admin.address
The address of the admin interface in the SCM (shared cache manager)


8788

yarn.sharedcache.webapp.address
The address of the web application in the SCM (shared cache manager)


8046

yarn.sharedcache.uploader.server.address
The address of the node manager interface in the SCM (shared cache manager)


8045

yarn.sharedcache.client-server.address
The address of the client interface in the SCM (shared cache manager)


8049

yarn.nodemanager.amrmproxy.address
The address of the AMRMProxyService listener. 


8089/8091

yarn.router.webapp.address

yarn.router.webapp.https.address

The http/https address of the Router web application. 


References

The following links provide information about all the default configurations for Hadoop v3.1.0.

http://hadoop.apache.org/docs/r3.1.0/hadoop-project-dist/hadoop-common/core-default.xml
http://hadoop.apache.org/docs/r3.1.0/hadoop-project-dist/hadoop-hdfs/hdfs-default.xml
http://hadoop.apache.org/docs/r3.1.0/hadoop-mapreduce-client/hadoop-mapreduce-client-core/mapred-default.xml
http://hadoop.apache.org/docs/r3.1.0/hadoop-yarn/hadoop-yarn-common/yarn-default.xml

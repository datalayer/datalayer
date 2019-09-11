A namenode topology plugin mapping pods to cluster nodes for a K8S configured
with pod CIDR. Currently, this is known to work only with the `kubenet` network
provider. For more details, see README.md of the parent directory.

## Installation
To use this plugin, add the followings to the hdfs-site.xml:

```
  <property>
    <name>net.topology.node.switch.mapping.impl</name>
    <value>org.apache.hadoop.net.PodCIDRToNodeMapping</value>
  </property>
  <property>
    <name>net.topology.impl</name>
    <value>org.apache.hadoop.net.NetworkTopologyWithNodeGroup</value>
  </property>
  <property>
    <name>net.topology.nodegroup.aware</name>
    <value>true</value>
  </property>
  <property>
    <name>dfs.block.replicator.classname</name>
    <value>org.apache.hadoop.hdfs.server.blockmanagement.BlockPlacementPolicyWithNodeGroup</value>
  </property>
```

HDFS namenode topology plugins for various Kubernetes network providers.

HDFS namenode handles RPC requests from clients. Namenode often gets the IP
addresses of clients from the remote endpoints of RPC connections.

In Kubernetes, HDFS clients may run inside pods. The client IP addresses can
be virtual pod IP addresses. This can confuse the namenode when it runs
the data locality optimization code, which requires the comparison of client
IP addresses against the IP addresses associated with datanodes. The latter
are physical IP addresses of cluster nodes that datanodes are running on.
The client pod virtual IP addresses would not match any datanode IP addresses.

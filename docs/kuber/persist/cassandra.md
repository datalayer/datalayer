---
title: Cassandra
---

# Cassandra

## Build

git clone http://git-wip-us.apache.org/repos/asf/cassandra.git cassandra.git
cd cassandra.git
ant clean artifacts
rm -fr /opt/apache-cassandra-*
cp build/apache-cassandra-*-SNAPSHOT-bin.tar.gz /opt

## Configure

Tune in conf/cassandra.yaml:
+ folders
++ data_file_directories
++ commitlog_directory
++ saved_caches_directory
+ name
++ cluster_name
+ partitioner
++ partitioner : Murmur3Partitioner(default)/RandomPartitioner ByteOrderedPartitioner OrderPreservingPartitioner CollatingOPP
+ ports
++ storage_port
++ rpc_portexti

## Start

bin/cassandra -f

## Use cassandra-cli

bin/cassandra-cli -h 127.0.0.1 -p 9160
help;
create keyspace DEMO;  
use DEMO;
create column family Users;
set Users[utf8('1234')][utf8('name')] = utf8('scott');
set Users[utf8('1234')][utf8('password')] = utf8('tiger');
get Users[utf8('1234')];
assume Users keys as utf8;
assume Users comparator as utf8;
assume Users validator as utf8;      
get Users['1234'];

[default@unknown] help
... ;
Getting around:
?                       Display this help.
help;                   Display this help.
help <command>;         Display command-specific help.
exit;                   Exit this utility.
quit;                   Exit this utility.

Commands:
assume                  Apply client side validation.
connect                 Connect to a Cassandra node.
consistencylevel        Sets consisteny level for the client to use.
count                   Count columns or super columns.
create column family    Add a column family to an existing keyspace.
create keyspace         Add a keyspace to the cluster.
del                     Delete a column, super column or row.
decr                    Decrements a counter column.
describe cluster        Describe the cluster configuration.
describe                Describe a keyspace and its column families or column family in current keyspace.
drop column family      Remove a column family and its data.
drop keyspace           Remove a keyspace and its data.
drop index              Remove an existing index from specific column.
get                     Get rows and columns.
incr                    Increments a counter column.
list                    List rows in a column family.
set                     Set columns.
show api version        Show the server API version.
show cluster name       Show the cluster name.
show keyspaces          Show all keyspaces and their column families.
show schema             Show a cli script to create keyspaces and column families.
truncate                Drop the data in a column family.
update column family    Update the settings for a column family.
update keyspace         Update the settings for a keyspace.
use                     Switch to a keyspace.

Configure for Clustering
--
Must not use localhost
+ listen_address
+ rpc_address
+ seeds

Use cassandra-note-token-lister.py to get a list of tokens such as
0: 0
1: 42535295865117307932921825928971026432
2: 85070591730234615865843651857942052864
3: 127605887595351923798765477786913079296

Set in cassandra.yaml  (only for startup)
+ initial_token key
Check with
+ bin/nodetool ring 
Once you boot a node, use 'nodetool move' command to change the assigned token.
You need to specify appropriate initial_token for each node to balance data load across the nodes
As from second node
+ auto_bootstrap: true

## Nodetool

bin/nodetool
Starting NodeTool
Missing required option: h
usage: java org.apache.cassandra.tools.NodeCmd --host <arg> <command>

 -h,--host <arg>        node hostname or ip address
 -p,--port <arg>        remote jmx agent port number
 -pw,--password <arg>   remote jmx agent password
 -u,--username <arg>    remote jmx agent username

Available commands:
  ring                   - Print informations on the token ring
  join                   - Join the ring
  info                   - Print node informations (uptime, load, ...)
  cfstats                - Print statistics on column families
  clearsnapshot          - Remove all existing snapshots
  version                - Print cassandra version
  tpstats                - Print usage statistics of thread pools
  drain                  - Drain the node (stop accepting writes and flush all column families)
  decommission           - Decommission the node
  loadbalance            - Loadbalance the node
  compactionstats        - Print statistics on compactions
  disablegossip          - Disable gossip (effectively marking the node dead)
  enablegossip           - Reenable gossip
  disablethrift          - Disable thrift server
  enablethrift           - Reenable thrift server
  snapshot [snapshotname] - Take a snapshot using optional name snapshotname
  netstats [host]        - Print network information on provided host (connecting node by default)
  move <new token>       - Move node on the token ring to a new token
  removetoken status|force|<token> - Show status of current token removal, force completion of pending removal or remove providen token
  flush [keyspace] [cfnames] - Flush one or more column family
  repair [keyspace] [cfnames] - Repair one or more column family
  cleanup [keyspace] [cfnames] - Run cleanup on one or more column family
  compact [keyspace] [cfnames] - Force a (major) compaction on one or more column family
  scrub [keyspace] [cfnames] - Scrub (rebuild sstables for) one or more column family
  invalidatekeycache [keyspace] [cfnames] - Invalidate the key cache of one or more column family
  invalidaterowcache [keyspace] [cfnames] - Invalidate the key cache of one or more column family
  getcompactionthreshold <keyspace> <cfname> - Print min and max compaction thresholds for a given column family
  cfhistograms <keyspace> <cfname> - Print statistic histograms for a given column family
  setcachecapacity <keyspace> <cfname> <keycachecapacity> <rowcachecapacity> - Set the key and row cache capacities of a given column family
  setcompactionthreshold <keyspace> <cfname> <minthreshold> <maxthreshold> - Set the min and max compaction thresholds for a given column family

## Cassandra Mailbox Data Model

HFactory.createKeyspace(CassandraConstants.KEYSPACE, cassandraCluster);
keyspaces:
- name: mailbox
  replica_placement_strategy: org.apache.cassandra.locator.RackUnawareStrategy
  replication_factor: 1
  column_families:
    - name: subscriptions
      compare_with: UTF8Type
    - name: mailboxes
      column_type: Super
      compare_with: UTF8Type
      compare_subcolumns_with: UTF8Type
    - name: messagesContent
      compare_with: LongType
    - name: messagesMetaData
      column_metadata:
        - name: mailboxId
          validator_class: UTF8Type
          index_type: KEYS

## Links

+ https://issues.apache.org/jira/browse/HDFS-347 DFS read performance suboptimal when client co-located on nodes with data + HDFS-265
+ https://issues.apache.org/jira/browse/LUCENE-2756 IndexSearcher.rewrite() incorrectly rewrites queries  + LUCENE-3191
+ http://lucene.grantingersoll.com/2008/03/28/why-lucene-isnt-that-good-javalobby/   http://java.dzone.com/news/why-lucene-isnt-good?page=0%2C1  
+ http://mail-archives.apache.org/mod_mbox/hbase-user/201102.mbox/%3CAANLkTinZwuyBea=bM2EP0A2hEBDBuRCwutowmOqWWZ5D@mail.gmail.com%3E

# CASSANDRA

+ http://code.google.com/p/lucene-on-cassandra/ 
+ http://www.elasticsearch.org/
+ http://wiki.apache.org/solr/SolrCloud
+ https://github.com/bixolabs/cascading.solr
+ https://github.com/NGDATA/lilyproject
+ http://katta.sourceforge.net/
+ http://anismiles.wordpress.com/2010/05/19/apache-lucene-and-cassandra/
+ http://anismiles.wordpress.com/2010/05/27/lucandra-an-inside-story/

# CASSANDRA SECONDARY INDICES

+ https://issues.apache.org/jira/browse/CASSANDRA-4324 Implement Lucene FST in for key index
+ https://issues.apache.org/jira/browse/CASSANDRA-2915 Lucene based Secondary Indexes

# BUILD

git clone http://git-wip-us.apache.org/repos/asf/cassandra.git cassandra.git
cd cassandra.git
ant clean artifacts
rm -fr /opt/apache-cassandra-*
cp build/apache-cassandra-*-bin.tar.gz /opt
cd /opt
tar xvfz apache-cassandra-2.0.5-SNAPSHOT-bin.tar.gz
cp /i/nosql/cassandra/server/src/main/conf/cassandra.yaml /opt/apache-cassandra-2.0.5-SNAPSHOT/conf

CONFIGURE                                                                   |

cp /i/nosql/cassandra/server/src/main/conf/cassandra.yaml /opt/apache-cassandra-2.0/conf

storage_port: 7000
ssl_storage_port: 7001
rpc_address: localhost
rpc_port: 9160

tune in conf/cassandra.yaml:
+ folders
++ data_file_directories
++ commitlog_directory
++ saved_caches_directory
+ name
++ cluster_name
+ partitioner
++ partitioner
+++ Murmur3Partitioner(default)
+++ RandomPartitioner
+++ ByteOrderedPartitioner
+++ OrderPreservingPartitioner
+++ CollatingOPP
+ ports
++ storage_port
++ rpc_portexti

# START

bin/cassandra -f

# OPSCENTER

bin/opscenter -f
firefox http://localhost:8888

# DEVCENTER

bin/devcenter -f
firefox http://localhost:8888

# OPS

+ sstable2json /var/datalayer/cassandra/data/mykeyspace/users/mykeyspace-users-jb-1-Data.db

# CLI

cassandra-cli -h 127.0.0.1 -p 9160
create keyspace DEMO;  
use DEMO;
create column family Users;
set Users[utf8('1234')][utf8('name')] = utf8('scott');
set Users[utf8('1234')][utf8('password')] = utf8('tiger');
get Users[utf8('1234')];
assume Users keys as utf8;
assume Users comparator as utf8;
assume Users validator as utf8;      
get Users['1234'];
exit;

[default@unknown] help;
Getting around:
?                       Display this help.
help;                   Display this help.
help <command>;         Display command-specific help.
exit;                   Exit this utility.
quit;                   Exit this utility.
Commands:
assume                  Apply client side validation.
connect                 Connect to a Cassandra node.
consistencylevel        Sets consisteny level for the client to use.
count                   Count columns or super columns.
create column family    Add a column family to an existing keyspace.
create keyspace         Add a keyspace to the cluster.
del                     Delete a column, super column or row.
decr                    Decrements a counter column.
describe cluster        Describe the cluster configuration.
describe                Describe a keyspace and its column families or column family in current keyspace.
drop column family      Remove a column family and its data.
drop keyspace           Remove a keyspace and its data.
drop index              Remove an existing index from specific column.
get                     Get rows and columns.
incr                    Increments a counter column.
list                    List rows in a column family.
set                     Set columns.
show api version        Show the server API version.
show cluster name       Show the cluster name.
show keyspaces          Show all keyspaces and their column families.
show schema             Show a cli script to create keyspaces and column families.
truncate                Drop the data in a column family.
update column family    Update the settings for a column family.
update keyspace         Update the settings for a keyspace.
use                     Switch to a keyspace.

create keyspace mutable
  with placement_strategy = 'NetworkTopologyStrategy'
    and strategy_options = {'eu-west': 3}
    and durable_writes = true;

# CQL

cqlsh
Connected to DATALAYER Cluster at localhost:9160.
[cqlsh 4.1.1 | Cassandra 2.0.5-SNAPSHOT | CQL spec 3.1.1 | Thrift protocol 19.39.0]
Use HELP for help.
cqlsh> help
Documented shell commands:
CAPTURE      COPY  DESCRIBE  EXPAND  SHOW    TRACING
CONSISTENCY  DESC  EXIT      HELP    SOURCE
CQL help topics:
ALTER                        CREATE_TABLE_OPTIONS  SELECT             
ALTER_ADD                    CREATE_TABLE_TYPES    SELECT_COLUMNFAMILY
ALTER_ALTER                  CREATE_USER           SELECT_EXPR        
ALTER_DROP                   DELETE                SELECT_LIMIT       
ALTER_RENAME                 DELETE_COLUMNS        SELECT_TABLE       
ALTER_USER                   DELETE_USING          SELECT_WHERE       
ALTER_WITH                   DELETE_WHERE          TEXT_OUTPUT        
APPLY                        DROP                  TIMESTAMP_INPUT    
ASCII_OUTPUT                 DROP_COLUMNFAMILY     TIMESTAMP_OUTPUT   
BEGIN                        DROP_INDEX            TRUNCATE           
BLOB_INPUT                   DROP_KEYSPACE         TYPES              
BOOLEAN_INPUT                DROP_TABLE            UPDATE             
COMPOUND_PRIMARY_KEYS        DROP_USER             UPDATE_COUNTERS    
CREATE                       GRANT                 UPDATE_SET         
CREATE_COLUMNFAMILY          INSERT                UPDATE_USING       
CREATE_COLUMNFAMILY_OPTIONS  LIST                  UPDATE_WHERE       
CREATE_COLUMNFAMILY_TYPES    LIST_PERMISSIONS      USE                
CREATE_INDEX                 LIST_USERS            UUID_INPUT         
CREATE_KEYSPACE              PERMISSIONS         
CREATE_TABLE                 REVOKE              

DROP KEYSPACE mykeyspace;
CREATE KEYSPACE mykeyspace WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };
USE mykeyspace;
CREATE TABLE users (
  user_id int PRIMARY KEY,
  fname text,
  lname text
);
INSERT INTO users (user_id,  fname, lname) VALUES (1745, 'john', 'smith');
INSERT INTO users (user_id,  fname, lname) VALUES (1744, 'john', 'doe');
INSERT INTO users (user_id,  fname, lname) VALUES (1746, 'john', 'smith');
SELECT * FROM users;
CREATE INDEX ON users (lname);
SELECT * FROM users WHERE lname = 'smith';
exit;

DROP KEYSPACE users;
CREATE KEYSPACE users WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };
USE users;
CREATE TABLE users (
   userID uuid,
   firstname text,
   lastname text,
   email text,
   address text,
   zip int,
   state text,
   PRIMARY KEY (userID)
   );
CREATE INDEX user_state ON users (state);
CREATE INDEX ON users (zip);

DROP COLUMNFAMILY users;
DROP KEYSPACE twissandra;
CREATE KEYSPACE twissandra WITH 
  REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };
USE twissandra;
CREATE TABLE users (
  KEY varchar PRIMARY KEY,
  password varchar,
  gender varchar,
  session_token varchar,
  state varchar,
  birth_year bigint);
INSERT INTO users (KEY, password) VALUES ('jsmith', 'ch@ngem3a') USING TTL 86400;
SELECT * FROM users WHERE KEY='jsmith';
ALTER TABLE users ADD coupon_code varchar;
ALTER TABLE users ALTER coupon_code TYPE int;
UPDATE users USING TTL 432000 SET password = 'ch@ngem3a' WHERE KEY = 'jsmith';
ALTER TABLE users DROP coupon_code;
CREATE INDEX state_key ON users (state);
CREATE INDEX birth_year_key ON users (birth_year);
INSERT INTO users (KEY, password) VALUES ('jsmith', 'ch@ngem4a') USING TTL 86400;
INSERT INTO users (KEY, password, state, gender, birth_year) VALUES ('jsmith', 'ch@ngem5a', 'TX', 'f', 1968) USING TTL 86400;
SELECT * FROM users
  WHERE gender = 'f' AND
  state='TX' AND
  birth_year = 1968
  ALLOW FILTERING;
DELETE session_token FROM users where KEY = 'jsmith';
DELETE FROM users where KEY = 'jsmith';

DROP KEYSPACE songs;
CREATE KEYSPACE songs WITH 
  REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };
USE songs;
CREATE TABLE songs (
  id uuid PRIMARY KEY,
  title text,
  album text,
  artist text
 );
CREATE INDEX songs_by_album ON songs.songs(album)", 0);
CREATE INDEX songs_by_artist ON songs.songs(artist)", 0);
INSERT INTO songs.songs (id, title, artist, album) VALUES (83ffa30a-e426-410a-9e95-a0458bd650b9, 'Outside Woman Blues', 'Back Door Slam', 'Roll Away');
INSERT INTO songs.songs (id, title, artist, album) VALUES (d3bec4b3-26e2-4e8f-9cfb-3db3f0c7d64f, 'Sharp Dressed Man', 'ZZ Top', 'Eliminator');
INSERT INTO songs.songs (id, title, artist, album) VALUES (acb739d0-b906-4598-ba94-e21ced2926ff, 'Waitin for the Bus', 'ZZ Top', 'Tres Hombres');
SELECT * FROM songs.songs WHERE album = 'Tres Hombres';
SELECT * FROM songs.songs WHERE artist = 'ZZ Top' AND album >= 'Eliminator' ALLOW FILTERING;
SELECT * FROM songs.songs WHERE album >= 'Eliminator';

CREATE TABLE fans (watcherID uuid, favorite_actor text, address text, zip int, state text, PRIMARY KEY (watcherID));
CREATE INDEX watcher_state ON fans (state);

NODE TOOL                                                                   |

nodetool -h localhost version
nodetool -h localhost flush
nodetool -h localhost tpstats

bin/nodetool
Starting NodeTool
Missing required option: h
usage: java org.apache.cassandra.tools.NodeCmd --host <arg> <command>
            
 -a,--include-all-sstables   includes sstables that are already on the
                             most recent version during upgradesstables
 -c,--compact                print histograms in a more compact format
 -cf,--column-family <arg>   only take a snapshot of the specified table
                             (column family)
 -dc,--in-dc <arg>           only repair against nodes in the specified
                             datacenters (comma separated)
 -et,--end-token <arg>       token at which repair range ends
 -h,--host <arg>             node hostname or ip address
 -hosts,--in-host <arg>      only repair against specified nodes (comma
                             separated)
 -i,--ignore                 ignore the supplied list of
                             keyspace.columnfamiles in statistics
 -local,--in-local-dc        only repair against nodes in the same
                             datacenter
 -ns,--no-snapshot           disables snapshot creation for scrub
 -p,--port <arg>             remote jmx agent port number
 -par,--parallel             repair nodes in parallel.
 -pr,--partitioner-range     only repair the first range returned by the
                             partitioner for the node
 -pw,--password <arg>        remote jmx agent password
 -r,--resolve-ip             show node domain names instead of IPs
 -s,--skip-corrupted         when scrubbing counter tables, skip corrupted
                             rows
 -st,--start-token <arg>     token at which repair range starts
 -T,--tokens                 display all tokens
 -t,--tag <arg>              optional name to give a snapshot
 -u,--username <arg>         remote jmx agent username
Available commands
  cfhistograms <keyspace> <cfname> - Print statistic histograms for a given column family
  cfstats [keyspace].[cfname] ... - Print statistics on column families. Use the -i flag to ignore the list of column families and display the remaining cfs.
  cleanup [keyspace] [cfnames] - Run cleanup on one or more column families
  clearsnapshot [keyspaces...] -t [snapshotName] - Remove snapshots for the specified keyspaces. Either remove all snapshots or remove the snapshots with the given name.
  compact [keyspace] [cfnames] - Force a (major) compaction on one or more column families
  compactionhistory      - Print history of compaction
  compactionstats        - Print statistics on compactions
  decommission           - Decommission the *node I am connecting to*
  describecluster        - Print the name, snitch, partitioner and schema version of a cluster.
  describering [keyspace] - Shows the token ranges info of a given keyspace.
  disableautocompaction [keyspace] [cfnames] - Disable autocompaction for the given keyspace and column family
  disablebackup          - Disable incremental backup
  disablebinary          - Disable native transport (binary protocol)
  disablegossip          - Disable gossip (effectively marking the node down)
  disablehandoff         - Disable the future hints storing on the current node
  disablethrift          - Disable thrift server
  drain                  - Drain the node (stop accepting writes and flush all column families)
  enableautocompaction [keyspace] [cfnames] - Enable autocompaction
  enablebackup           - Enable incremental backup
  enablebinary           - Reenable native transport (binary protocol)
  enablegossip           - Reenable gossip
  enablehandoff          - Reenable the future hints storing on the current node
  enablethrift           - Reenable thrift server
  flush [keyspace] [cfnames] - Flush one or more column families
  getcompactionthreshold <keyspace> <cfname> - Print min and max compaction thresholds for a given column family
  getcompactionthroughput - Print the MB/s throughput cap for compaction in the system
  getendpoints <keyspace> <cf> <key> - Print the end points that owns the key
  getsstables <keyspace> <cf> <key> - Print the sstable filenames that own the key
  getstreamthroughput    - Print the MB/s throughput cap for streaming in the system
  gossipinfo             - Shows the gossip information for the cluster
  info [-T/--tokens]     - Print node information (uptime, load, ...)
  invalidatekeycache     - Invalidate the key cache
  invalidaterowcache     - Invalidate the row cache
  join                   - Join the ring
  move <new token>       - Move node on the token ring to a new token. (for negative tokens, use \\ to escape, Example: move \\-123)
  netstats [host]        - Print network information on provided host (connecting node by default)
  pausehandoff           - Pause hints delivery process
  proxyhistograms        - Print statistic histograms for network operations
  rangekeysample         - Shows the sampled keys held across all keyspaces.
  rebuild [src-dc-name] - Rebuild data by streaming from other nodes (similarly to bootstrap)
  rebuild_index <keyspace> <cf-name> <idx1,idx1> - a full rebuilds of native secondry index for a given column family. IndexNameExample: Standard3.IdxName,Standard3.IdxName1
  refresh <keyspace> <cf-name> - Load newly placed SSTables to the system without restart.
  reloadtriggers         - reload trigger classes
  removenode status|force|<ID> - Show status of current node removal, force completion of pending removal or remove provided ID
  repair [keyspace] [cfnames] - Repair one or more column families
   Use -dc to repair specific datacenters (csv list).
   Use -et to specify a token at which repair range ends.
   Use -local to only repair against nodes in the same datacenter.
   Use -pr to repair only the first range returned by the partitioner.
   Use -par to carry out a parallel repair.
   Use -st to specify a token at which the repair range starts.
  resetlocalschema       - Reset node's local schema and resync
  resumehandoff          - Resume hints delivery process
  ring                   - Print information about the token ring
  scrub [keyspace] [cfnames] [-s|--skip-corrupted] - Scrub (rebuild sstables for) one or more column families.
   Use -s/--skip-corrupted to skip corrupted rows even when scrubbing
   tables that use counters.
  setcachecapacity <key-cache-capacity> <row-cache-capacity> - Set global key and row cache capacities (in MB units).
  setcachekeystosave <key-cache-keys-to-save> <row-cache-keys-to-save> - Set number of keys saved by each cache for faster post-restart warmup. 0 to disable.
  setcompactionthreshold <keyspace> <cfname> - Set min and max compaction thresholds for a given column family
  setcompactionthroughput <value_in_mb> - Set the MB/s throughput cap for compaction in the system, or 0 to disable throttling.
  setstreamthroughput  <value_in_mb> - Set the MB/s throughput cap for streaming in the system, or 0 to disable throttling.
  settraceprobability [value] - Sets the probability for tracing any given request to value. 0 disables, 1 enables for all requests, 0 is the default
  snapshot [keyspaces...] -cf [columnfamilyName] -t [snapshotName] - Take a snapshot of the optionally specified column family of the specified keyspaces  using optional name snapshotName
  status                 - Print cluster information (state, load, IDs, ...)
  statusbinary           - Status of native transport (binary protocol)
  statusthrift           - Status of thrift server
  stop <compaction_type> - Supported types are COMPACTION, VALIDATION, CLEANUP, SCRUB, INDEX_BUILD
  taketoken <token, ...> - Move the token(s) from the existing owner(s) to this node.  For vnodes only.  Use \\ to escape negative tokens.
  tpstats                - Print usage statistics of thread pools
  truncatehints <host-name> - Truncate all hints on the local node, or truncate hints for the endpoint specified.
  upgradesstables [-a|--include-all-sstables] [keyspace] [cfnames] - Rewrite sstables (for the requested column families) that are not on the current version (thus upgrading them to said current version).
   Use -a to include all sstables, even those already on the current version.
  version                - Print cassandra version

CONFIGURE FOR CLUSTERING                                                    |

Must not use localhost
+ listen_address
+ rpc_address
+ seeds

Use cassandra-node-token-lister.py to get a list of tokens such as
0: 0
1: 42535295865117307932921825928971026432
2: 85070591730234615865843651857942052864
3: 127605887595351923798765477786913079296
4: ...

Set in cassandra.yaml  (only for startup)
+ initial_token key
Check with
+ bin/nodetool ring 
Once you boot a node, use 'nodetool move' command to change the assigned token.
You need to specify appropriate initial_token for each node to balance data load across the nodes
As from second node
+ auto_bootstrap: true

MAILBOX DATA MODEL                                                          |

HFactory.createKeyspace(CassandraConstants.KEYSPACE, cassandraCluster);
keyspaces:
- name: mailbox
  replica_placement_strategy: org.apache.cassandra.locator.RackUnawareStrategy
  replication_factor: 1
  column_families:
    - name: subscriptions
      compare_with: UTF8Type
    - name: mailboxes
      column_type: Super
      compare_with: UTF8Type
      compare_subcolumns_with: UTF8Type
    - name: messagesContent
      compare_with: LongType
    - name: messagesMetaData
      column_metadata:
        - name: mailboxId
          validator_class: UTF8Type
          index_type: KEYS


+ use mahout

+ increase accuracy or precision (minimizing false positives)
+ increase coverage or recall    (minimizing false negatives)
+ clustering
++ k-means
++ knn
+ non-linear / unbalanced data >> MR or DB-Scan clustering

books on complex systems
+ Melanie Mitchell: Complexity a Guided Tour
+ Miller, John, and Scott E Page Complex Adaptive Social Systems
+ Mitchell Waldrop Complexity: the emerging science at the edge of order and chaos
+ Newman, Mark ``Complex Systems: A Survey' Am. J. Phys. 79, 800-810 (2011)

videos on complex systems
+ Scott E Page Understanding Complexity – The Great Courses
+ [http://www.thegreatcourses.com/tgc/courses/course_detail.aspx?cid=5181]
+ Geoff West: Scaling Laws [http://www.youtube.com/watch?v=uEB4p9qbliE]
+ Deborah Gordon: Ants [http://www.youtube.com/watch?v=uEB4p9qbliE]

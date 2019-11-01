---
title: HBase
---

# HBase

## Build and Deploy HBase

```bash
dla hbase-build-deploy
```

Available hadoop profiles are:

+ 1.0
+ 1.1
+ 2.0
+ 3.0

```bash
mvn clean install assembly:single -PrunAllTests -Dmaven.test.redirectTestOutputToFile=true -Dsurefire.secondPartThreadCount=2 -Dhadoop.profile=2.0 -Dit.test=noTest
```

to build on the various profiles:

```bash
mvn clean install assembly:single -DskipTests -Dhadoop.profile=1.0
# mvn clean install assembly:single -DskipTests -P'hadoop-1.0, !hadoop-1.1, !hadoop-2.0, !hadoop-3.0' <<< Don't do this, it is not supported, use rather 'mvn clean install assembly:single -Dhadoop.profile=1.0'
mvn clean install assembly:single -DskipTests -Dhadoop.profile=1.1
# mvn clean install assembly:single -DskipTests -P'!hadoop-1.0, hadoop-1.1, !hadoop-2.0, !hadoop-3.0' <<< Don't do this, it is not supported, use rather 'mvn clean install assembly:single -Dhadoop.profile=1.1'
# mvn clean install assembly:single -DskipTests -Dhadoop.profile=2.0 <<< Don't do this, it is not supported, use rather 'mvn clean install assembly:single -DskipTests' to build by default with hadoop.profile=2.0
mvn clean install assembly:single -DskipTests # default uses hadoop.profile=2.0
mvn clean install assembly:single -DskipTests -P'!hadoop-1.0, !hadoop-1.1, hadoop-2.0, !hadoop-3.0'
mvn clean install assembly:single -DskipTests -Dhadoop.profile=3.0
mvn clean install assembly:single -DskipTests -P'!hadoop-1.0, !hadoop-1.1, !hadoop-2.0, hadoop-3.0'
# to check the hadoop embedded in the tar.gz:
tar xvfz ./hbase-assembly/target/hbase-*-SNAPSHOT-bin.tar.gz | grep lib/hadoop; rm -fr hbase-*-SNAPSHOT
```

HOSTS

update /etc/hosts so hostname is resolved to 127.0.0.1 (not to 127.0.1.1)

```bash
# more /etc/hosts
127.0.0.1   localhost
127.0.0.1   eric.datalayer.io eric
```

ZOOKEEPER

To point HBase at an existing ZooKeeper cluster, one that is not managed by HBase, 
set HBASE_MANAGES_ZK in conf/hbase-env.sh to 'false'.
Next set ensemble locations and client port, if non-standard, in hbase-site.xml, 
or add a suitably configured zoo.cfg to HBase's CLASSPATH. 
HBase will prefer the configuration found in zoo.cfg over any settings in hbase-site.xml.

START

```bash
#start-hbase.sh
$HBASE_HOME/bin/hbase-daemons.sh start master
tail -f $HBASE_HOME/logs/hbase-eric-master-eric.log
cat $HBASE_HOME/logs/hbase-eric-master-eric.log
$HBASE_HOME/bin/hbase-daemons.sh start regionserver
tail -f $HBASE_HOME/logs/hbase-eric-regionserver-eric.log
cat $HBASE_HOME/logs/hbase-eric-regionserver-eric.log
```

CONNECTION PORT

+ HMaster: 6000
+ HRegion: ????

UI

+ hmaster       http://localhost:16030 ???
+ region-server http://localhost:48552 ???

SHELL

```bash
$HBASE_HOME/bin/hbase shell
help
create 'test', 'cf'
list 'test'
put 'test', 'row1', 'cf:a', 'value1'
put 'test', 'row2', 'cf:b', 'value2'
put 'test', 'row3', 'cf:c', 'value3'
scan 'test'
get 'test', 'row1'
disable 'test'
drop 'test'
exit
```

STOP

```bash
#stop-hbase.sh
$HBASE_HOME/bin/hbase-daemons.sh stop regionserver
$HBASE_HOME/bin/hbase-daemons.sh stop master
```

ECLIPSE

Import with m2eclipse with profile='!hadoop-1.0, !hadoop-1.1, !hadoop-2.0, hadoop-3.0'

BUILD HBASE DOC

```bash
mvn site
# mvn site -Dmaven.javadoc.skip=true
# mvn docbkx-maven-plugin:generate-html
# mvn docbookx:generate-html (generate-rtf, generate-html, generate-pdf, generate-manpages, generate-epub, generate-javahelp, generate-xhtml, generate-webhelp, generate-eclipse)
```

DATA MODEL

+ key for time series userid % const,reverse ts,userid

OTHERS

+ hbase-avro-connector
+ http://www.slideshare.net/alexbaranau/transactions-over-hbase
+ https://github.com/continuuity/tephra

Datalayer Data NoSql HBase MapReduce

HBase MapReduce usage examples.

BUILD A DISTRIBUTION                                                        |

```bash
$ git clone git@github.com:yahoo/samoa.git samoa.git
$ cd samoa.git
$ mvn install -DskipTests -Pstorm

# Forest CoverType contains the forest cover type for 30 x 30 meter cells obtained from US Forest Service (USFS) 
# Region 2 Resource Information System (RIS) data. It contains 581,012 instances and 54 attributes, 
# and it has been used in several papers on data stream classification.

$ wget "http://downloads.sourceforge.net/project/moa-datastream/Datasets/Classification/covtypeNorm.arff.zip"
$ unzip covtypeNorm.arff.zip
$ wget "http://repo1.maven.org/maven2/org/slf4j/slf4j-simple/1.7.2/slf4j-simple-1.7.2.jar"

# Run an Example. Classifying the CoverType dataset with the VerticalHoeffdingTree in local mode.

$ java -cp ./slf4j-simple-1.7.2.jar:./target/SAMOA-Storm-${DLAVERSION}-SNAPSHOT.jar:/opt/apache-storm-0.9.1-incubating/lib/* com.yahoo.labs.samoa.LocalStormDoTask "PrequentialEvaluation -l classifiers.trees.VerticalHoeffdingTre-s (ArffFileStream -f covtypeNorm.arff) -f 100000"

# The output will be a sequence of the evaluation metrics for accuracy, taken every 100,000 instances.
# To run the example on Storm, please refer to the instructions on the wiki [http://github.com/yahoo/samoa/wiki/Executing-SAMOA-with-Apache-Storm]
```

## Spark-Connector

+ HBASE-14789 Enhance the current spark-hbase connector
 + https://github.com/zhzhan/shc
 + https://www.youtube.com/watch?v=gJMawtiRBio
extend Lucene by implementing own Directory class,
  or 
implement new IndexReader and IndexWriter (a-la-Lucandra)?

do we use distributed memory cache? (hazelcast...)
are there json, avro... requirements?
need for special queries? (spatial with geohash...)

## Lucene on HBase

+ https://github.com/jasonrutherglen/HBASE-SEARCH
+ https://github.com/jasonrutherglen/LUCENE-FOR-HBASE
+ http://www.infoq.com/articles/LuceneHbase
+ http://www.infoq.com/articles/LuceneSpatialSupport 
+ https://github.com/akkumar/hbasene
+ https://github.com/thkoch2001/lucehbase - https://github.com/thainb/lucehbase.git)
+ http://bizosyshsearch.sourceforge.net/ 
+ https://issues.apache.org/jira/browse/HBASE-3529 Add search to HBase + HBASE-3954
+ https://issues.apache.org/jira/browse/HBASE-2233 Support both Hadoop 0.20, 0.21, and 0.22
+ https://issues.apache.org/jira/browse/HBASE-4002
+ https://issues.apache.org/jira/browse/HBASE-2000

hbase secondary indexes
+ https://github.com/hbase-trx/hbase-transactional-tableindexed/Transaction and indexing extensions for hbase
+ http://www.lilyproject.org/lily/about/playground/hbaseindexes.html Lily indexes
+ https://github.com/ykulbak/ihbase support faster scans at the expense of larger RAM consumption

lucene on cassandra
+ https://github.com/tjake/Solandra and previous https://github.com/tjake/Lucandra
+ http://code.google.com/p/lucene-on-cassandra/ 
+ http://www.elasticsearch.org/
+ http://wiki.apache.org/solr/SolrCloud
+ https://github.com/bixolabs/cascading.solr
+ https://github.com/NGDATA/lilyproject
+ http://katta.sourceforge.net/
+ http://anismiles.wordpress.com/2010/05/19/apache-lucene-and-cassandra/
+ http://anismiles.wordpress.com/2010/05/27/lucandra-an-inside-story/

cassandra secondary indexes
+ https://issues.apache.org/jira/browse/CASSANDRA-4324 Implement Lucene FST in for key index
+ https://issues.apache.org/jira/browse/CASSANDRA-2915 Lucene based Secondary Indexes

hadoop append
+ https://svn.apache.org/repos/asf/hadoop/common/branches/branch-0.20-append/ 
+ https://github.com/facebook/hadoop-20-append 
+ https://github.com/trendmicro/hbase/tree/security  + https://github.com/trendmicro/hadoop-common  

solr & solrcloud

elasticsearch

senseidb
+ https://github.com/senseidb/sensei

msc
+ http://sna-projects.com/sna/  SNA LinkedIn
+ http://voldemortlucene.svn.sourceforge.net/viewvc/voldemortlucene/trunk/
+ http://www.mongodb.org/display/DOCS/Geospatial+Indexing  Geospatial Index
+ http://code.google.com/p/hop/ Hadoop online
+ http://labs.yahoo.com/node/476 S4

helpful links
+ https://issues.apache.org/jira/browse/HDFS-347 DFS read performance suboptimal when client co-located on nodes with data + HDFS-265
+ https://issues.apache.org/jira/browse/LUCENE-2756 MultiSearcher.rewrite() incorrectly rewrites queries  + LUCENE-3191
+ http://lucene.grantingersoll.com/2008/03/28/why-lucene-isnt-that-good-javalobby/   http://java.dzone.com/news/why-lucene-isnt-good?page=0%2C1  
+ http://mail-archives.apache.org/mod_mbox/hbase-user/201102.mbox/%3CAANLkTinZwuyBea=bM2EP0A2hEBDBuRCwutowmOqWWZ5D@mail.gmail.com%3E

## Apache HBase Phoenix

+ org.apache.phoenix.jdbc.PhoenixDriver
+ jdbc:phoenix:localhost:2181

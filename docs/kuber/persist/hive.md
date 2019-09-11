---
title: Hive
---

# Hive

```bash
mvn clean install -DskipTests -Phadoop-2
mvn clean install -DskipTests -Phadoop-1
```

## Configuration

```bash
cp ./src/main/resources/io/datalayer/hive/config/hive-site.xml $HIVE_HOME/conf
```

MAP STAGE SYNTAX

SELECT 
  TRANSFORM (...)
  USING "mapper.sh" 
  AS (...)
  FROM
    (...)

REDUCE STAGE SYNTAX

SELECT 
  FROM
    (...)
    SELECT 
      TRANSFORM (...)
      USING "reducer.sh" 
      AS (...)

  FROM (
    FROM pv_users
    MAP pv_users.userid, pv_users.date
    USING 'map_script'
    AS dt, uid
    CLUSTER BY dt) map_output
  INSERT OVERWRITE TABLE pv_users_reduced
    REDUCE map_output.dt, map_output.uid
    USING 'reduce_script'
    AS date, count;

  FROM (
    FROM pv_users
    SELECT TRANSFORM(pv_users.userid, pv_users.date)
    USING 'map_script'
    AS dt, uid
    CLUSTER BY dt) map_output
  INSERT OVERWRITE TABLE pv_users_reduced
    SELECT TRANSFORM(map_output.dt, map_output.uid)
    USING 'reduce_script'
    AS date, count;

  FROM (
    FROM src
    SELECT TRANSFORM(src.key, src.value) ROW FORMAT SERDE 'org.apache.hadoop.hive.contrib.serde2.TypedBytesSerDe'
    USING '/bin/cat'
    AS (tkey, tvalue) ROW FORMAT SERDE 'org.apache.hadoop.hive.contrib.serde2.TypedBytesSerDe'
    RECORDREADER 'org.apache.hadoop.hive.ql.exec.TypedBytesRecordReader'
  ) tmap
  INSERT OVERWRITE TABLE dest1 SELECT tkey, tvalue

CASE SYNTAX

CASE
  WHEN (...) THEN value
  WHEN (...) THEN value
  ELSE value 
  END

-- SELECT isTrueSelfReferrer, count(*) FROM (...) GROUP BY isTrueSelfReferrer;

BUILD

mvn clean install -DskipTests -Phadoop-2
mvn clean install -DskipTests -Phadoop-1

CONFIGURE

$ cp ./src/main/resources/io/datalayer/hive/config/hive-site.xml $HIVE_HOME/conf

MAP STAGE SYNTAX

SELECT 
  TRANSFORM (...)
  USING "mapper.sh" 
  AS (...)
  FROM
    (...)

REDUCE STAGE SYNTAX

SELECT 
  FROM
    (...)
    SELECT 
      TRANSFORM (...)
      USING "reducer.sh" 
      AS (...)

  FROM (
    FROM pv_users
    MAP pv_users.userid, pv_users.date
    USING 'map_script'
    AS dt, uid
    CLUSTER BY dt) map_output
  INSERT OVERWRITE TABLE pv_users_reduced
    REDUCE map_output.dt, map_output.uid
    USING 'reduce_script'
    AS date, count;

  FROM (
    FROM pv_users
    SELECT TRANSFORM(pv_users.userid, pv_users.date)
    USING 'map_script'
    AS dt, uid
    CLUSTER BY dt) map_output
  INSERT OVERWRITE TABLE pv_users_reduced
    SELECT TRANSFORM(map_output.dt, map_output.uid)
    USING 'reduce_script'
    AS date, count;

  FROM (
    FROM src
    SELECT TRANSFORM(src.key, src.value) ROW FORMAT SERDE 'org.apache.hadoop.hive.contrib.serde2.TypedBytesSerDe'
    USING '/bin/cat'
    AS (tkey, tvalue) ROW FORMAT SERDE 'org.apache.hadoop.hive.contrib.serde2.TypedBytesSerDe'
    RECORDREADER 'org.apache.hadoop.hive.ql.exec.TypedBytesRecordReader'
  ) tmap
  INSERT OVERWRITE TABLE dest1 SELECT tkey, tvalue

CASE SYNTAX                                                                 |

CASE
  WHEN (...) THEN value
  WHEN (...) THEN value
  ELSE value 
  END

-- SELECT isTrueSelfReferrer, count(*) FROM (...) GROUP BY isTrueSelfReferrer;

Cascading for the Impatient, Part 6
===================================
The goal is to expand on our Word Count example in Cascading, adding a custom **function** to calculate [TF-IDF](http://en.wikipedia.org/wiki/Tf*idf). This shows how to use a **sumby** and also a **cogroup**.

We'll keep building on this example to show features related to TDD and "local" mode.

More detailed background information and step-by-step documentation is provided at https://github.com/ConcurrentCore/impatient/wiki

Build Instructions
==================
To generate an IntelliJ project use:

    gradle ideaModule

To build the sample app from the command line use:

    gradle clean jar

Before running this sample app, be sure to set your `HADOOP_HOME` environment variable. Then clear the `output` directory, then to run on a desktop/laptop with Apache Hadoop in standalone mode:

    rm -rf output
    hadoop jar ./build/libs/impatient.jar data/rain.txt output/wc data/en.stop output/tfidf output/trap output/check

To view the results:

    more output/tfidf/part-00000
    more output/trap/part-m-00001-00000 
    more output/check/part-00000 

An example of log captured from a successful build+run is at https://gist.github.com/3044049

For more discussion, see the [cascading-user](https://groups.google.com/forum/?fromgroups#!forum/cascading-user) email forum.

Stay tuned for the next installments of our [Cascading for the Impatient](http://www.cascading.org/category/impatient/) series.

BUILD A DISTRIBUTION

$ jdk7
$ mvn clean install assembly:assembly -P release -Dhadoop2.version=2.4.0 -DskipTests

ASF MAIL

./src/main/shell/asf-email-examples-2.sh /dataset/asf-mails/james.apache.org/ output/

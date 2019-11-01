---
title: Spark
---

# Spark

[Apache Spark](http://spark.apache.org) is a fast and general cluster computing system for Big Data.

It provides high-level APIs in Scala, Java, and Python, and an optimized engine that supports general computation graphs for data analysis.

It also supports a rich set of higher-level tools including Spark SQL for SQL and structured data processing, MLlib for machine learning, GraphX for graph processing, and Spark Streaming for stream processing.

You can find the latest Spark documentation, including a programming guide, on the [project web page](http://spark.apache.org/documentation.html)
and [project wiki](https://cwiki.apache.org/confluence/display/SPARK).

[Apache Spark source on GitHub](https://github.com/apache/spark).

[Apache Spark Documentation](https://spark.apache.org/docs/latest).

## Download

https://spark.apache.org/downloads.html

```bash
# “Hadoop free” builds that lets you more easily connect a single Spark binary to any Hadoop version.
# https://spark.apache.org/docs/latest/hadoop-provided.html

### In conf/spark-env.sh ###
# If 'hadoop' binary is on your PATH
export SPARK_DIST_CLASSPATH=$(hadoop classpath)
# With explicit path to 'hadoop' binary
export SPARK_DIST_CLASSPATH=$(/path/to/hadoop/bin/hadoop classpath)
# Passing a Hadoop configuration directory
export SPARK_DIST_CLASSPATH=$(hadoop --config /path/to/configs classpath)
```

## Building Spark

Spark is built using [Apache Maven](http://maven.apache.org/).
To build Spark and its example programs, run:

```bash
mvn -DskipTests clean package
```

(You do not need to do this if you downloaded a pre-built package.)
More detailed documentation is available from the project site, at
["Building Spark with Maven"](http://spark.apache.org/docs/latest/building-with-maven.html).

## Interactive Scala Shell

The easiest way to start using Spark is through the Scala shell:

    ./bin/spark-shell

Try the following command, which should return 1000:

    scala> sc.parallelize(1 to 1000).count()

## Interactive Python Shell

Alternatively, if you prefer Python, you can use the Python shell:

    ./bin/pyspark

And run the following command, which should also return 1000:

    >>> sc.parallelize(range(1000)).count()

## Example Programs

Spark also comes with several sample programs in the `examples` directory.
To run one of them, use `./bin/run-example <class> [params]`. For example:

    ./bin/run-example SparkPi

will run the Pi example locally.

You can set the MASTER environment variable when running examples to submit
examples to a cluster. This can be a mesos:// or spark:// URL, 
"yarn-cluster" or "yarn-client" to run on YARN, and "local" to run 
locally with one thread, or "local[N]" to run locally with N threads. You 
can also use an abbreviated class name if the class is in the `examples`
package. For instance:

    MASTER=spark://host:7077 ./bin/run-example SparkPi

Many of the example programs print usage help if no params are given.

## Running Tests

Testing first requires [building Spark](#building-spark). Once Spark is built, tests
can be run using:

    ./dev/run-tests

Please see the guidance on how to 
[run all automated tests](https://cwiki.apache.org/confluence/display/SPARK/Contributing+to+Spark#ContributingtoSpark-AutomatedTesting).

## A Note About Hadoop Versions

Spark uses the Hadoop core library to talk to HDFS and other Hadoop-supported
storage systems. Because the protocols have changed in different versions of
Hadoop, you must build Spark against the same version that your cluster runs.

Please refer to the build documentation at
["Specifying the Hadoop Version"](http://spark.apache.org/docs/latest/building-with-maven.html#specifying-the-hadoop-version)
for detailed guidance on building for a particular distribution of Hadoop, including
building for particular Hive and Hive Thriftserver distributions. See also
["Third Party Hadoop Distributions"](http://spark.apache.org/docs/latest/hadoop-third-party-distributions.html)
for guidance on building a Spark application that works with a particular
distribution.

## Configuration

Please refer to the [Configuration guide](http://spark.apache.org/docs/latest/configuration.html)
in the online documentation for an overview on how to configure Spark.

## YARN

```bash
spark-shell \
  --master yarn \
  --deploy-mode client
```

# Run with SBT

```bash
sbt package
spark-submit \
  --class "SimpleApp" \
  --master local[4] \
  target/scala-2.11/simple-project_2.11-1.0.jar
```

# Spark Graphx Extension

+ https://github.com/Sotera/distributed-graph-analytics

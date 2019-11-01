# JupyterLab

```bash
!pip install findspark pyspark awscli --user
```

```python
import findspark, pyspark, os, socket
from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pyspark.sql.types import IntegerType
from pyspark.sql.functions import concat, lit
findspark.init(os.getenv('SPARK_HOME'))
```

```python
#  .set('spark.jars', 'http://central.maven.org/maven2/org/apache/hadoop/hadoop-aws/2.7.3/hadoop-aws-2.7.3.jar,http://central.maven.org/maven2/com/amazonaws/aws-java-sdk-bundle/1.11.563/aws-java-sdk-bundle-1.11.563.jar') \
#  .enableHiveSupport() \
spark_conf = SparkConf() \
  .set('spark.app.name', 'spark-jupyterlab') \
  .set('spark.master', 'k8s://https://kubernetes.default.svc:443') \
  .set('spark.kubernetes.namespace', 'jupyterhub') \
  .set('spark.kubernetes.container.image', 'datalayer/spark-k8s:0.0.1') \
  .set('spark.kubernetes.container.image.pullPolicy', 'IfNotPresent') \
  .set('spark.driver.host', socket.gethostbyname(socket.gethostname())) \
  .set('spark.driver.memory', '1g') \
  .set('spark.executor.memory', '1g') \
  .set('spark.executor.instances', '3') \
  .set('spark.executor.memoryOverhead', '500m') \
  .set('spark.submit.deployMode', 'client') \
  .set('spark.scheduler.mode', 'FAIR') \
  .set('spark.shuffle.compress', 'true') \
  .set('spark.speculation', 'true') \
  .set('spark.serializer', 'org.apache.spark.serializer.KryoSerializer') \
  .set('spark.sql.sources.partitionOverwriteMode', 'dynamic') \
  .set('spark.hadoop.parquet.enable.summary-metadata', 'false') \
  .set('spark.sql.parquet.mergeSchema', 'false') \
  .set('spark.sql.parquet.filterPushdown', 'true') \
  .set('spark.sql.catalogImplementation', 'in-memory') \
  .set('spark.sql.warehouse.dir', '/tmp/spark-warehouse') \
  .set('spark.sql.hive.metastorePartitionPruning', 'true') \
  .set('spark.hadoop.fs.s3a.impl', 'org.apache.hadoop.fs.s3a.S3AFileSystem') \
  .set('spark.hadoop.fs.s3a.aws.credentials.provider', 'org.apache.hadoop.fs.s3a.TemporaryAWSCredentialsProvider') \
  .set('spark.hadoop.fs.s3a.access.key', 'access') \
  .set('spark.hadoop.fs.s3a.secret.key', 'secret') \
  .set('spark.hadoop.fs.s3a.session.token', 'token')
spark = SparkSession \
  .builder \
  .config(conf=spark_conf) \
  .getOrCreate()
sc = spark.sparkContext
spark
sc
```

```python
l = [1, 2, 3, 4]
df = spark.createDataFrame(l, IntegerType())
df.toPandas()
```

```python
spark.stop()
```

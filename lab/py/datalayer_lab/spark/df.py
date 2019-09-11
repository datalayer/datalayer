from pyspark.sql.types import IntegerType
d = spark.createDataFrame(range(1, 200), IntegerType())
d.show(100)
d \
  .write \
  .saveAsTable(
    name = 'test',
    format = 'parquet',
    mode = 'overwrite',
    path = 's3://.../test',
  )

# aws s3 ls s3://.../test
# hdfs dfs ls .

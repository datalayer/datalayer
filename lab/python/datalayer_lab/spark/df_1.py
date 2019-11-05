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

from pyspark.sql import Row
l = [('Ankit',25), ('Jalfaizy',22), ('saurabh',20),('Bala',26)]
rdd = sc.parallelize(l)
people = rdd.map(lambda x: Row(name=x[0], age=int(x[1])))
schemaPeople = sqlContext.createDataFrame(people)
def r(x):
    return Row(name=x[0], age=int(x[1]))

people = rdd.map(r)

d = spark.range(10)
d = spark.range(10000000).toDF('i').cache()

df_pd = pd.DataFrame(
    data={'integers': [1, 2, 3],
     'floats': [-1.0, 0.5, 2.7],
     'integer_arrays': [[1, 2], [3, 4, 5], [6, 7, 8, 9]]}
)
df = spark.createDataFrame(df_pd)

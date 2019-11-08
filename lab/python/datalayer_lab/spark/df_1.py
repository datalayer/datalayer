d = spark.range(10)
d = spark.range(10000000).toDF('i').cache()

from pyspark.sql import Row
l = [
  ('user1', 25), 
  ('user2', 22), 
  ('user3', 20),
  ('user4', 26),
  ('user4', 22),
]
rdd = sc.parallelize(l)

people = rdd.map(lambda x: Row(name=x[0], age=int(x[1])))
ds = spark.createDataFrame(people)
ds.show()
ds.groupBy('name').agg({'age': 'count'}).show()
ds.groupBy('age').agg({'age': 'count'}).show()
from pyspark.sql import functions as F
ds.agg(F.min(ds.age)).collect()
ds.groupBy('age').agg(F.min('age')).show()
ds.groupBy('name').agg(F.count('age')).show()
ds.groupBy('name').agg(F.count('age').alias('count')).orderBy(F.desc('count')).show()

ds.registerTempTable('ds')
spark.sql('select count(*) from ds').show()
spark.sql("select name, count('age') from ds group by name").show()
spark.sql("select count('age') from ds group by name").show()

def r(x):
    return Row(name=x[0], age=int(x[1]))
people = rdd.map(r)

df_pd = pd.DataFrame(
    data={
      'integers': [1, 2, 3],
      'floats': [-1.0, 0.5, 2.7],
      'integer_arrays': [[1, 2], [3, 4, 5], [6, 7, 8, 9]]}
)
df = spark.createDataFrame(df_pd)

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

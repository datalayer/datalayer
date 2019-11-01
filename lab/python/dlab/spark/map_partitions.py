from pyspark.sql import Row
from pyspark.sql.types import IntegerType

d = spark.createDataFrame(range(1, 20), IntegerType())
d.show(100)

def r(iterator):
    import random
    i = []
    for it in iterator:
        r = str(random.randint(1, 2))
        if r == '1':
            d = {'a': 1, 'b': 2, 'v': it['value']}
        else:
#            d = {'v': it['value'], 'b': 2, 'a': 1,}
            d = {'v': it['value'],  'a': 1,}
        i.append(Row(**d))
    return iter(i)

d1 = d \
    .repartition('value') \
    .rdd \
    .mapPartitions(r)

d2 = spark.createDataFrame(d1)

d2.orderBy('v').show(100)
"""
d1 = d \
    .repartition('value') \
    .rdd \
    .mapPartitions(r) \
    .toDF()

d1.orderBy('v').show(100)
"""

# ---

d1 = [Row(k1="value1.1", k2="value1.2")]                                             
d2 = [Row(k1="value2.1")]                                                            
rdd1 = spark.sparkContext.parallelize(d1)                                                    
rdd2 = spark.sparkContext.parallelize(d2)                                            
urdd = rdd1.union(rdd2)                                             
urdd.collect()                                                      
urdd.toDF()                                                                          
urdd.toDF().show()   

# ---

dict1 = [{"k1":"v1.1", "k2":"v1.2"}]
dict2 = [{"k1":"v2.1"}]
rdd1 = spark.sparkContext.parallelize(dict1)
rdd2 = spark.sparkContext.parallelize(dict2)
rdd1.collect()
rdd2.collect()
urdd = rdd1.union(rdd2)
urdd.collect()
spark.createDataFrame(urdd).show()
urdd.toDF().show()

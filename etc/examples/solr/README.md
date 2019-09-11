[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Solr Examples

Read the official [Solr tutorial](https://lucene.apache.org/solr/guide/7_6/solr-tutorial.html).

Follow the below steps to start your Solr server and then read the [tutorial](./tut/README.md) and [python](./python/README.md) docs.

```bash
# Start.
docker-compose -f $DLAHOME/etc/examples/solr/swarm/solr.yml up -d && \
  dla solr-help && \
  sleep 3s && \
  docker ps && \
  open http://localhost:8983
# docker-compose -f solr.yml logs -f solr
# Create the `demo` collection.
# cd $SOLR_HOME
docker exec -it --user=solr solr bin/solr create_collection -c demo -shards 1 -replicationFactor 1
# docker exec -it --user=solr solr bin/solr create_collection -c demo -shards 3 -replicationFactor 3
docker exec -it --user=solr solr bin/post -c demo example/exampledocs/manufacturers.xml
# docker cp $DLAHOME/opt/solr-7.6.0/example/exampledocs/manufacturers.xml solr:/opt/solr/manufacturers.xml
# docker exec -it --user=solr solr bin/post -c demo manufacturers.xml
docker cp $DLAHOME/etc/conf/solr/datalayer  solr:/opt/solr/example
docker exec -it --user=solr solr bin/solr create_collection -c datalayer -shards 1 -replicationFactor 1 -d /opt/solr/example/datalayer\
# View the UI.
open http://localhost:8983/solr
# Delete the `demo` collection.
curl http://localhost:8983/solr/admin/collections?action=DELETE -d 'name=demo'
docker exec -it --user=solr solr solr delete -c demo
# Stop.
docker-compose -f $DLAHOME/etc/examples/solr/swarm/solr.yml down
```

More info.

+ https://blog.quiltdata.com/find-your-jupyter-notebooks-with-elasticsearch-1fe300c1cd0f #elasticsearch
+ https://github.com/quiltdata/examples/tree/master/JupyterSearch #elasticsearch

+ https://github.com/abranubhav/Search-using-SOLR
+ https://github.com/pkiraly/solr-and-elasticsearch

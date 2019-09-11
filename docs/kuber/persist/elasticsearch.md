---
title: Elasticsearch
---

# Elasticsearch

+ I kept running into cases where I needed full text search capabilities
  in my key-value based models only to discover key-value has none. 
+ In addition to full text search, I also needed the ability to filter 
  ranges of data points in the searches and even highlight matches.
+ Indexing latency
+ Change in analysis rules
+ Non stored fiels are "lost", only the result of their analysis remains.
+ Blobs not aimed to be stored/searched.
+ Lazilly change/enrich the datamodel without reindexing everything

## Install

```bash
git clone https://github.com/elasticsearch/elasticsearch-servicewrapper.git elasticsearch-servicewrapper.git

rm -fr /opt/elasticsearch-1.0.0.RC1-SNAPSHOT
cp /o/elasticsearch.git/target/releases-elasticsearch-1.0.0.RC1-SNAPSHOT.tar.gz /opt
cd /opt
tar xvfz elasticsearch-1.0.0.RC1-SNAPSHOT.tar.gz
rm elasticsearch-1.0.0.RC1-SNAPSHOT.tar.gz
cp /t/data/search/elasticsearch/src/main/config/*.yml $ELASTICSEARCH_HOME/config
cp -r /o/elasticsearch-servicewrapper.git/service $ELASTICSEARCH_HOME/bin

curl -XPUT 'http://localhost:9200/index-geo-index?pretty'

curl -XPUT 'http://localhost:9200/index-geo-index/index-geo-type/_mapping?pretty' -d '
{
    "index-geo-type" : {
       "properties" : {
            "pin" : {
                "properties" : {
                    "location" : {
                        "type" : "geo_point",
                        "lat_lon": true
                    }
                }
            }
        }
    }
}
'
curl -XGET 'http://localhost:9200/index-geo-index/_mapping?pretty'
curl -XPUT 'http://localhost:9200/index-geo-index/index-geo-type/1?pretty' -d '
{
    "pin" : {
        "location" : {
            "lat" : 0.0,
            "lon" : 0.0
        }
    }
}
'
curl -XPOST 'http://localhost:9200/index-geo-index/index-geo-type/_search?pretty' -d '
{
    "query": {
        "filtered": {
            "query": {
                "match_all": {}
            },
            "filter": {
                "geo_bounding_box": {
                    "pin.location": {
                        "top_left": {
                            "lat": 90.0,
                            "lon": -180.0
                        },
                        "bottom_right": {
                            "lat": -90.0,
                            "lon": 180.0
                        }
                    }
                }
            }
        }
    }
}
'

{
  "size" : 100,
  "query" : {
    "match_all" : { }
  },
  "filter" : {
    "geo_distance" : {
      "pin.location" : [ 0.0, 0.0 ],
      "distance" : "200.0km",
      "distance_type" : "arc",
      "optimize_bbox" : "memory"
    }
  }
}

{
    "query" : {
        "match_all" : {}
    },
    "filter" : {
        "geo_distance" : {
            "distance" : "200km",
            "pin.location" : {
                "lat" : 0,
                "lon" : 0
            }
        }
    }
}
```

# Plugins

```bash
$ELASTICSEARCH_HOME/bin/plugin -install mobz/elasticsearch-head
$ELASTICSEARCH_HOME/bin/plugin -install lukas-vlcek/bigdesk
$ELASTICSEARCH_HOME/bin/plugin -install karmi/elasticsearch-paramedic
$ELASTICSEARCH_HOME/bin/plugin -install polyfractal/elasticsearch-segmentspy
$ELASTICSEARCH_HOME/bin/plugin -install polyfractal/elasticsearch-inquisitor
```

Use git://github.com/royrusso/elasticsearch-HQ.git for realtime monitoring.

+ Check http://localhost:9200/_plugin/head
+ Check http://localhost:9200/_plugin/bigdesk
+ Check http://localhost:9200/_plugin/paramedic
+ Check http://localhost:9200/_plugin/segmentspy
+ Check http://localhost:9200/_plugin/inquisitor

# Other Pluginss

+ https://github.com/crate/elasticsearch-timefacets-plugin
+ https://github.com/jprante/elasticsearch-index-termlist
+ https://github.com/yakaz/elasticsearch-action-updatebyquery
+ https://github.com/spinscale/elasticsearch-suggest-plugin
+ https://github.com/ptdavteam/elasticsearch-approx-plugin
+ https://github.com/crate/elasticsearch-inout-plugin
+ https://github.com/imotov/elasticsearch-facet-script
+ https://github.com/bleskes/elasticfacets
+ https://github.com/yakaz/elasticsearch-query-acrossvariants

dla elasticsearch-restart.sh

OTHER PLUGINS (RIVERS)

https://github.com/mallocator/Elasticsearch-HBase-River

BASIC COMMANDS

```bash
curl -XPOST 'http://localhost:9200/twitter?pretty'
curl -i -XHEAD 'http://localhost:9200/twitter?pretty'
curl -XDELETE 'http://localhost:9200/twitter?pretty'
curl -XDELETE 'http://localhost:9200/_all?pretty'

curl -XPUT 'http://localhost:9200/test-index'
curl -XPUT 'http://localhost:9200/test-index/test-type/1' -d '{ "test": "Hello World" }'
curl -XPUT 'http://localhost:9200/test-index/test-type/2' -d '{ "test": "Hello Éric" }'
curl -XPUT 'http://localhost:9200/test-index/test-type/3' -d '{ "message": "elastic search" }'

curl -XGET 'http://localhost:9200/test-index/test-type/_search?q=hello&pretty'
curl -XGET 'http://localhost:9200/test-index/test-type/_search?q=test:hello&pretty'
curl -XGET 'http://localhost:9200/test-index/test-type/_search?q=test:éric&pretty'
curl -XPOST 'http://localhost:9200/test-index/_search?pretty' -d '
{
  "size" : 100,
  "query" : {
        "match_all" : {}
    }
}
'   
curl -XPOST 'http://localhost:9200/test-index/_search?pretty' -d '
  {
    "query" : { 
      "query_string" : {"query" : "T*"} 
    }
  }
'   

FACET EXAMPLE
-------------

curl -XDELETE 'http://localhost:9200/articles'
curl -XPOST 'http://localhost:9200/articles/article?pretty' -d '{"title" : "One",   "tags" : ["foo"]}'
curl -XPOST 'http://localhost:9200/articles/article?pretty' -d '{"title" : "Two",   "tags" : ["foo", "bar"]}'
curl -XPOST 'http://localhost:9200/articles/article?pretty' -d '{"title" : "Three", "tags" : ["foo", "bar", "baz"]}'
curl -XPOST 'http://localhost:9200/articles/_search?pretty' -d '
  {
    "query" : {
      "query_string" : {
        "query" : "T*"
      } 
    },
    "facets" : {
      "tags" : { 
        "terms" : {
          "field" : "tags"
        }
      }
    }
  }
'   
```

OTHER COMMANDS

http://www.elasticsearch.org/guide/reference/api/index_

curl -XGET 'http://localhost:9200?pretty'


curl -XPUT 'http://localhost:9200/twitter/' -d '
index :
    number_of_shards : 3 
    number_of_replicas : 2
'

curl -XPUT 'http://localhost:9200/twitter/' -d '{
    "settings" : {
        "index" : {
            "number_of_shards" : 1,
            "number_of_replicas" : 1
        }
    }
}'
   
curl -XPOST 'http://localhost:9200/twitter/_optimize?pretty'
curl -XPUT 'http://localhost:9200/twitter/tweet/1?pretty' -d '{
    "user" : "eric",
    "post_date" : "2009-11-15T14:12:12",
    "message" : "trying out Elastic Search"
}'
curl -XPUT 'localhost:9200/twitter/tweet/1?version=2?pretty' -d '{
    "message" : "elasticsearch now has versioning support, double cool!"
}'
curl -XPUT 'http://localhost:9200/twitter/tweet/1?op_type=create&pretty' -d '{
    "user" : "kimchy",
    "post_date" : "2009-11-15T14:12:12",
    "message" : "trying out Elastic Search"
}'

curl -XGET 'http://localhost:9200/twitter/tweet/_mapping?pretty'
curl -XGET 'http://localhost:9200/_all/_mapping'
curl -XGET 'http://localhost:9200/_mapping'

USEFUL COMMANDS

http://www.elasticsearch.org/guide/reference/api/get
----------------------------------------------------
curl -XGET 'http://localhost:9200/twitter/tweet/1?pretty'
curl -XGET 'http://localhost:9200/twitter/tweet/1?fields=title,content&pretty'

http://www.elasticsearch.org/guide/reference/api/delete
-------------------------------------------------------
curl -XDELETE 'http://localhost:9200/twitter/tweet/1?pretty'
curl -XDELETE 'http://localhost:9200/twitter/tweet/1?routing=eric&pretty'

http://www.elasticsearch.org/guide/reference/api/admin-cluster-health
---------------------------------------------------------------------
curl -XGET 'http://localhost:9200/_cluster/health?pretty'

http://www.elasticsearch.org/guide/reference/api/admin-cluster-state/
---------------------------------------------------------------------
curl -XGET 'http://localhost:9200/_cluster/state?pretty'

http://www.elasticsearch.org/guide/reference/api/admin-cluster-nodes-info
-------------------------------------------------------------------------
curl -XGET 'http://localhost:9200/_cluster/nodes?pretty'

http://www.elasticsearch.org/guide/reference/api/admin-cluster-nodes-stats
----------------------------------------------------------------------------------------------------------------------------------------------------
curl -XGET 'http://localhost:9200/_cluster/nodes/stats?pretty'

http://www.elasticsearch.org/guide/reference/api/admin-indices-segments
------------------------------------------------------------------------
curl -XGET 'http://localhost:9200/twitter/_segments?pretty'
curl -XGET 'http://localhost:9200/_segments?pretty'

http://www.elasticsearch.org/guide/reference/api/admin-indices-open-close
-------------------------------------------------------------------------
curl -XPOST 'localhost:9200/my_index/_close?pretty'
curl -XPOST 'localhost:9200/my_index/_open?pretty'

http://www.elasticsearch.org/guide/reference/api/admin-indices-flush
--------------------------------------------------------------------
curl -XPOST 'http://localhost:9200/twitter1,twitter2/_flush?pretty'

http://www.elasticsearch.org/guide/reference/api/admin-indices-optimize/
---------------------------------------------------------------------
curl -XPOST 'http://localhost:9200/twitter/_optimize?max_num_segments=1&pretty'

http://www.elasticsearch.org/guide/reference/api/admin-cluster-health
---------------------------------------------------------------------
curl -XGET 'http://localhost:9200/_cluster/health?pretty'
curl -XGET 'http://localhost:9200/_cluster/health/twitter?pretty&level=shards'

http://www.elasticsearch.org/guide/reference/api/admin-cluster-nodes-info
-------------------------------------------------------------------------
# this will also give the plugin list
curl -XGET 'http://localhost:9200/_nodes?all&pretty'



PLUGINS
=======

INSTALL FROM SRC AND TEST
------------------------

$ELASTICSEARCH_HOME/bin/plugin -i termlist -u file:///o/elasticsearch-index-termlist.git/target/elasticsearch-index-termlist-1.2.0.zip
$ELASTICSEARCH_HOME/bin/plugin -l
$ELASTICSEARCH_HOME/bin/plugin -r termlist

curl -XPUT 'http://localhost:9200/termlist-index?pretty'
curl -XPUT 'http://localhost:9200/termlist-index/termlist-type/1?pretty' -d '{ "message": "Hello World" }'
curl -XPUT 'http://localhost:9200/termlist-index/termlist-type/2?pretty' -d '{ "message": "Hello Éric" }'
curl -XPUT 'http://localhost:9200/termlist-index/termlist-type/3?pretty' -d '{ "message": "elastic search" }'

curl -XGET 'http://localhost:9200/termlist-index/_termlist?pretty'

---

$ELASTICSEARCH_HOME/bin/plugin -i timefacets -u file:///o//elasticsearch-timefacets-plugin.git/target/releases-elasticsearch-timefacets-plugin-0.7.1.zip
$ELASTICSEARCH_HOME/bin/plugin -l
$ELASTICSEARCH_HOME/bin/plugin -r timefacets

curl -XDELETE 'http://localhost:9200/timefacets-index'
curl -XPUT 'http://localhost:9200/timefacets-index'
curl -XPUT 'http://localhost:9200/timefacets-index/tf/1?pretty' -d '{ "message": "Hello World", "post_date" : "2013-11-15T14:12:12"}'
curl -XPUT 'http://localhost:9200/timefacets-index/test/2?pretty' -d '{ "message": "Hello Éric", "post_date" : "2013-11-16T14:12:12" }'
curl -XPUT 'http://localhost:9200/timefacets-index/test/3?pretty' -d '{ "message": "elastic search", "post_date" : "2013-11-17T14:12:12" }'
curl -XPUT 'http://localhost:9200/timefacets-index/test/3?pretty' -d '{ "message": "elastic search2", "post_date" : "2013-11-18T14:12:12" }'
curl -XPUT 'http://localhost:9200/timefacets-index/test/3?pretty' -d '{ "message": "elastic2 search", "post_date" : "2013-11-18T14:12:12" }'

This facet counts distinct values for string and numeric fields.
The "count" is the number of distinct values in the time period. The
outer "count" is the number of total distinct values.

curl -XPOST 'http://localhost:9200/timefacets-index/_search?pretty' -d '
  {
    "query" : {
        "match_all" : {}
    },
    "facets" : {
        "distinct" : {
            "distinct_date_histogram" : {
                "field" : "post_date",
                "value_field" : "message",
                "interval" : "day"
            }
        }
    }

  }
'

This facet collapses matching documents to ``key_field`` and uses only
the document with the highest value of ``ts_field``.
The result is always sorted on descending ``value_field``.

curl -XPOST 'http://localhost:9200/timefacets-index/_search?pretty' -d '
 {
   "query": { "match_all":{}},
   "facets": {
      "l": {
       "latest": {
        "size": 100,
        "start": 1,
        "key_field": "post_date",
        "value_field": "post_date",
        "ts_field": "post_date"
      }
    }
   }}
'

---

plugin -i facet-script -u file:///o//elasticsearch-facet-script.git/target/releases-elasticsearch-facet-script-1.1.1-SNAPSHOT.zip
plugin -l
plugin -r facet-script

cp -r /o/elasticsearch-facet-script.git/config/scripts $ELASTICSEARCH_HOME/config

curl -XDELETE http://localhost:9200/test-idx
echo
curl -XPUT http://localhost:9200/test-idx -d '{
    "settings" : {
        "index" : {
            "number_of_shards" : 2,
            "number_of_replicas" : 0
        }
    },
    "mappings" : {
        "rec" : {
            "_source" : { "enabled" : false },
            "properties" : {
                "message": { "type": "string", "store": "yes"}
            }
        }
    }
}'
echo
curl -XPUT http://localhost:9200/test-idx/rec/1 -d '{
    "message": "Trying out elasticsearch, so far so good?"
}'
echo
curl -XPUT http://localhost:9200/test-idx/rec/2 -d '{
    "message": "You know, for Search"
}'
echo
curl -XPOST http://localhost:9200/test-idx/_refresh
echo
curl -XGET 'http://localhost:9200/test-idx/rec/_search?pretty=true&search_type=count' -d '{
    "query": {
        "query_string": {
            "query": "*:*"
        }
    },
    "facets": {
        "facet1": {
            "script": {
                "init_script" : "charfreq_init",
                "map_script": "charfreq_map",
                "reduce_script" : "charfreq_reduce",
                "params" : {
                    "facet" : [],
                    "field" : "message"
                }
            }
        }
    }
}
'

---

???

plugin -url http://bit.ly/19b58FW -install skywalker
curl 0:9200/_cluster/consistency?pretty
curl 0:9200/_cluster/consistency?pretty

INTEGRATIONS
------------

https://github.com/elasticsearch/elasticsearch-hadoop

START
-----

$ELASTICSEARCH_HOME/bin/service/elasticsearch start

STOP
----

$ELASTICSEARCH_HOME/bin/service/elasticsearch stop

grep -r controller.registerHandler src/main/java | sed "s/<<???>>//g" | sort
----------------------------------------------------------------------------

DELETE 
DELETE _template/{name}
DELETE {index}
DELETE {index}/_alias/{name}
DELETE {index}/_query
DELETE {index}/_warmer
DELETE {index}/_warmer/{name}
DELETE {index}/{type}
DELETE {index}/{type}/_mapping
DELETE {index}/{type}/_query
DELETE {index}/{type}/_warmer/{name}
DELETE {index}/{type}/{id}

GET 
GET _alias/{name}
GET _aliases
GET _analyze
GET _cache/clear
GET _cluster/health
GET _cluster/health/{index}
GET _cluster/nodes
GET _cluster/nodes/hot_threads
GET _cluster/nodes/hotthreads
GET _cluster/nodes/stats
GET _cluster/nodes/{nodeId}
GET _cluster/nodes/{nodeId}/hot_threads
GET _cluster/nodes/{nodeId}/hotthreads
GET _cluster/nodes/{nodeId}/stats
GET _cluster/settings
GET _cluster/state
GET _count
GET _flush
GET _mapping
GET _mget
GET _msearch
GET _nodes
GET _nodes/fs/stats", fsHandler);
GET _nodes/hot_threads
GET _nodes/hotthreads
GET _nodes/http", new RestHttpHandler());
GET _nodes/http/stats", httpHandler);
GET _nodes/indices/" + flag.getRestName() + "/stats", indicesHandler);
GET _nodes/indices/" + flag.getRestName() + "/{fields}/stats", indicesHandler);
GET _nodes/indices/stats", indicesHandler);
GET _nodes/jvm", new RestJvmHandler());
GET _nodes/jvm/stats", jvmHandler);
GET _nodes/network", new RestNetworkHandler());
GET _nodes/network/stats", networkHandler);
GET _nodes/os", new RestOsHandler());
GET _nodes/os/stats", osHandler);
GET _nodes/plugin", new RestPluginHandler());
GET _nodes/process", new RestProcessHandler());
GET _nodes/process/stats", processHandler);
GET _nodes/settings", new RestSettingsHandler());
GET _nodes/stats
GET _nodes/stats/fs", fsHandler);
GET _nodes/stats/http", httpHandler);
GET _nodes/stats/indices", indicesHandler);
GET _nodes/stats/indices/" + flag.getRestName() + "/{fields}", indicesHandler);
GET _nodes/stats/indices/" + flag.getRestName(), indicesHandler);
GET _nodes/stats/jvm", jvmHandler);
GET _nodes/stats/network", networkHandler);
GET _nodes/stats/os", osHandler);
GET _nodes/stats/process", processHandler);
GET _nodes/stats/thread_pool", threadPoolHandler);
GET _nodes/stats/transport", transportHandler);
GET _nodes/thread_pool", new RestThreadPoolHandler());
GET _nodes/thread_pool/stats", threadPoolHandler);
GET _nodes/transport", new RestTransportHandler());
GET _nodes/transport/stats", transportHandler);
GET _nodes/{nodeId}
GET _nodes/{nodeId}/fs/stats", fsHandler);
GET _nodes/{nodeId}/hot_threads
GET _nodes/{nodeId}/hotthreads
GET _nodes/{nodeId}/http", new RestHttpHandler());
GET _nodes/{nodeId}/http/stats", httpHandler);
GET _nodes/{nodeId}/indices/" + flag.getRestName() + "/stats", indicesHandler);
GET _nodes/{nodeId}/indices/" + flag.getRestName() + "/{fields}/stats", indicesHandler);
GET _nodes/{nodeId}/indices/stats", indicesHandler);
GET _nodes/{nodeId}/jvm", new RestJvmHandler());
GET _nodes/{nodeId}/jvm/stats", jvmHandler);
GET _nodes/{nodeId}/network", new RestNetworkHandler());
GET _nodes/{nodeId}/network/stats", networkHandler);
GET _nodes/{nodeId}/os", new RestOsHandler());
GET _nodes/{nodeId}/os/stats", osHandler);
GET _nodes/{nodeId}/plugin", new RestPluginHandler());
GET _nodes/{nodeId}/process", new RestProcessHandler());
GET _nodes/{nodeId}/process/stats", processHandler);
GET _nodes/{nodeId}/settings", new RestSettingsHandler());
GET _nodes/{nodeId}/stats
GET _nodes/{nodeId}/stats/fs", fsHandler);
GET _nodes/{nodeId}/stats/http", httpHandler);
GET _nodes/{nodeId}/stats/indices", indicesHandler);
GET _nodes/{nodeId}/stats/indices/" + flag.getRestName() + "/{fields}", indicesHandler);
GET _nodes/{nodeId}/stats/indices/" + flag.getRestName(), indicesHandler);
GET _nodes/{nodeId}/stats/jvm", jvmHandler);
GET _nodes/{nodeId}/stats/network", networkHandler);
GET _nodes/{nodeId}/stats/os", osHandler);
GET _nodes/{nodeId}/stats/process", processHandler);
GET _nodes/{nodeId}/stats/thread_pool", threadPoolHandler);
GET _nodes/{nodeId}/stats/transport", transportHandler);
GET _nodes/{nodeId}/thread_pool", new RestThreadPoolHandler());
GET _nodes/{nodeId}/thread_pool/stats", threadPoolHandler);
GET _nodes/{nodeId}/transport", new RestTransportHandler());
GET _nodes/{nodeId}/transport/stats", transportHandler);
GET _optimize
GET _refresh
GET _search
GET _search/scroll
GET _search/scroll/{scroll_id}
GET _search_shards
GET _segments
GET _settings
GET _stats
GET _stats/fielddata", new RestFieldDataStatsHandler());
GET _stats/fielddata/{fields}", new RestFieldDataStatsHandler());
GET _stats/filter_cache", new RestFilterCacheStatsHandler());
GET _stats/flush", new RestFlushStatsHandler());
GET _stats/get", new RestGetStatsHandler());
GET _stats/id_cache", new RestIdCacheStatsHandler());
GET _stats/indexing", new RestIndexingStatsHandler());
GET _stats/indexing/{indexingTypes1}", new RestIndexingStatsHandler());
GET _stats/merge", new RestMergeStatsHandler());
GET _stats/refresh", new RestRefreshStatsHandler());
GET _stats/search", new RestSearchStatsHandler());
GET _stats/search/{searchGroupsStats1}", new RestSearchStatsHandler());
GET _stats/store", new RestStoreStatsHandler());
GET _stats/warmer", new RestWarmerStatsHandler());
GET _status
GET _suggest
GET _template/{name}
GET _validate/query
GET {index}/_alias/{name}
GET {index}/_aliases
GET {index}/_analyze
GET {index}/_cache/clear
GET {index}/_count
GET {index}/_flush
GET {index}/_mapping
GET {index}/_mget
GET {index}/_msearch
GET {index}/_optimize
GET {index}/_refresh
GET {index}/_search
GET {index}/_search_shards
GET {index}/_segments
GET {index}/_settings
GET {index}/_stats
GET {index}/_stats/docs", new RestDocsStatsHandler());
GET {index}/_stats/fielddata", new RestFieldDataStatsHandler());
GET {index}/_stats/fielddata/{fields}", new RestFieldDataStatsHandler());
GET {index}/_stats/filter_cache", new RestFilterCacheStatsHandler());
GET {index}/_stats/flush", new RestFlushStatsHandler());
GET {index}/_stats/get", new RestGetStatsHandler());
GET {index}/_stats/id_cache", new RestIdCacheStatsHandler());
GET {index}/_stats/indexing", new RestIndexingStatsHandler());
GET {index}/_stats/indexing/{indexingTypes2}", new RestIndexingStatsHandler());
GET {index}/_stats/merge", new RestMergeStatsHandler());
GET {index}/_stats/refresh", new RestRefreshStatsHandler());
GET {index}/_stats/search", new RestSearchStatsHandler());
GET {index}/_stats/search/{searchGroupsStats2}", new RestSearchStatsHandler());
GET {index}/_stats/store", new RestStoreStatsHandler());
GET {index}/_stats/warmer", new RestWarmerStatsHandler());
GET {index}/_status
GET {index}/_suggest
GET {index}/_validate/query
GET {index}/_warmer
GET {index}/_warmer/{name}
GET {index}/{type}/_count
GET {index}/{type}/_mapping
GET {index}/{type}/_mget
GET {index}/{type}/_msearch
GET {index}/{type}/_percolate
GET {index}/{type}/_search
GET {index}/{type}/_search_shards
GET {index}/{type}/_validate/query
GET {index}/{type}/_warmer/{name}
GET {index}/{type}/{id}
GET {index}/{type}/{id}/_explain
GET {index}/{type}/{id}/_mlt
GET {index}/{type}/{id}/_source
GET {index}/{type}/{id}/_termvector
GET/_stats/docs"

HEAD 
HEAD _alias/{name}
HEAD {index}
HEAD {index}/_alias/{name}
HEAD {index}/{type}
HEAD {index}/{type}/{id}
HEAD {index}/{type}/{id}/_source

POST _aliases
POST _analyze
POST _bulk
POST _cache/clear
POST _cluster/nodes/_restart
POST _cluster/nodes/_shutdown
POST _cluster/nodes/{nodeId}/_restart
POST _cluster/nodes/{nodeId}/_shutdown
POST _cluster/reroute
POST _count
POST _flush
POST _gateway/snapshot
POST _mget
POST _msearch
POST _optimize
POST _refresh
POST _search
POST _search/scroll
POST _search/scroll/{scroll_id}
POST _search_shards
POST _shutdown
POST _suggest
POST _template/{name}
POST _validate/query
POST {index}
POST {index}/_analyze
POST {index}/_bulk
POST {index}/_cache/clear
POST {index}/_close
POST {index}/_count
POST {index}/_flush
POST {index}/_gateway/snapshot
POST {index}/_mapping
POST {index}/_mget
POST {index}/_msearch
POST {index}/_open
POST {index}/_optimize
POST {index}/_refresh
POST {index}/_search
POST {index}/_search_shards
POST {index}/_suggest
POST {index}/_validate/query
POST {index}/{type}   auto id creation
POST {index}/{type}/_bulk
POST {index}/{type}/_count
POST {index}/{type}/_mapping
POST {index}/{type}/_mget
POST {index}/{type}/_msearch
POST {index}/{type}/_percolate
POST {index}/{type}/_search
POST {index}/{type}/_search_shards
POST {index}/{type}/_validate/query
POST {index}/{type}/{id}
POST {index}/{type}/{id}/_create
POST {index}/{type}/{id}/_explain
POST {index}/{type}/{id}/_mlt
POST {index}/{type}/{id}/_termvector
POST {index}/{type}/{id}/_update

PUT _alias
PUT _alias/{name}
PUT _bulk
PUT _cluster/settings
PUT _settings
PUT _template/{name}
PUT {index}
PUT {index}/_alias
PUT {index}/_alias/{name}
PUT {index}/_bulk
PUT {index}/_mapping
PUT {index}/_settings
PUT {index}/_warmer/{name}
PUT {index}/{type}/_bulk
PUT {index}/{type}/_mapping
PUT {index}/{type}/_warmer/{name}
PUT {index}/{type}/{id}
PUT {index}/{type}/{id}/_create

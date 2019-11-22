[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Solr Nested Example 3

```bash
export SOLR_HOME=~/datalayer/opt/solr-7.6.0
$SOLR_HOME/bin/solr create -c nested3 -shards 1 -replicationFactor 1 -d $DLAHOME/etc/conf/solr/nested -p 8983 -force
curl http://localhost:8983/solr/nested3/update?commitWithin=500 -d '{ delete: { query: "*:*" } }'
curl http://localhost:8983/solr/admin/collections?action=DELETE -d 'name=nested3'
```

## Index

> https://lucene.apache.org/solr/guide/8_2/indexing-nested-documents.html

See also https://issues.apache.org/jira/browse/SOLR-12638

```json
curl http://localhost:8983/solr/nested3/update?commitWithin=500 -d '
[
  {
    "ID": "1",
    "title": "Cooking Recommendations",
    "tags": ["cooking", "meetup"],
    "_nest_path_": "cook",
    "posts": [{
        "ID": "2",
        "title": "Cookies",
        "_nest_path_": "recom/post",
        "comments": [{
            "ID": "3",
            "_nest_path_": "recom/post/comment",
            "content": "Lovely recipe"
          },
          {
            "ID": "4",
            "_nest_path_": "recom/post/comment",
            "content": "A-"
          }
        ]
      },
      {
        "ID": "5",
        "_nest_path_": "cook/post",
        "title": "Cakes"
      }
    ]
  },
  {
    "ID": "6",
    "title": "For Hire",
    "tags": ["professional", "jobs"],
    "_nest_path_": "cook",
    "posts": [{
        "ID": "7",
        "title": "Search Engineer",
        "_nest_path_": "cook/post",
        "comments": [{
           "ID": "8",
           "_nest_path_": "cook/post/comment",
           "content": "I am interested"
         },
         {
           "ID": "9",
           "_nest_path_": "cook/post/comment",
           "content": "How large is the team?"
         }
        ]
      },
      {
        "ID": "10",
        "_nest_path_": "cook/post",
        "title": "Low level Engineer"
      }
    ]
  }
]
'
```

```bash
curl http://localhost:8983/solr/nested3/update?commitWithin=500 -d '
[
  {
    "id": "1",
    "title": "Solr adds block join support",
    "content_type": "parentDocument",
    "_childDocuments_": [
      {
        "id": "2",
        "comments": "SolrCloud supports it too!"
      },
      {
        "id": "3",
        "comments": "New filter syntax"
      }
    ]
  },
  {
    "id": "4",
    "title": "New Lucene and Solr release is out",
    "content_type": "parentDocument",
    "_childDocuments_": [
      {
        "id": "5",
        "comments": "Lots of new features"
      }
    ]
  }
]
'
```

## Search

> https://lucene.apache.org/solr/guide/8_2/searching-nested-documents.html

```bash
curl http://localhost:8983/solr/nested3/query -d '{
  params : {
    q : "ID: 1",
    fl : "ID,[child parentFilter='title:cookie']" 
  }
}'
```

```bash
curl http://localhost:8983/solr/nested3/query -d '{
  params : {
    q : "ID: 1",
    fl : "ID, [child parentFilter='title:cookie' childFilter='/comments/ID:33']" 
  }
}'
```

```bash
curl http://localhost:8983/solr/nested3/query -d '{
  params : {
    q : "ID: 1",
    fl : "ID, [child parentFilter='title:cookie' childFilter='/comments/content:recipe']" 
  }
}'
```

```bash
curl http://localhost:8983/solr/nested3/query -d '{
  params : {
    q: "{!child of=_nest_path_:/posts}title:'Search Engineer'"
  }
}'
```

```bash
curl http://localhost:8983/solr/nested3/query -d '{
  params : {
    q: "{!parent which='-_nest_path_:* *:*'}title:"Search Engineer"
  }
}'
```

```bash
curl http://localhost:8983/solr/nested3/query -d '{
  params : {
    q: "+{!child of='-__nest_path__:* *:*'}+tags:"jobs",
    fl: "*,[child]"
  }
}'
```

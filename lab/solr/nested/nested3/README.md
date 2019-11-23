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

```bash
curl http://localhost:8983/solr/nested3/update?commitWithin=500 -d '
[
  {
    "id": "1",
    "title": "Cooking Recommendations",
    "tags": ["cooking", "meetup"],
    "posts": [{
        "id": "2",
        "title": "Cookies",
        "comments": [
          {
            "id": "3",
            "content_t": "Lovely recipe"
          },
          {
            "id": "4",
            "content_t": "A-"
          }
        ]
      },
      {
        "id": "5",
        "title": "Cakes"
      }
    ]
  },
  {
    "id": "6",
    "title": "For Hire",
    "tags": ["professional", "jobs"],
    "posts": [{
        "id": "7",
        "title": "Search Engineer",
        "comments": [
          {
           "id": "8",
           "content_t": "I am interested"
         },
         {
           "id": "9",
           "content_t": "How large is the team?"
         }
        ]
      },
      {
        "id": "10",
        "title": "Low level Engineer"
      }
    ]
  }
]
'
```

## Update

```bash
curl http://localhost:8983/solr/nested3/update?commitWithin=500 -d '
  [ {"id": "1", "tags": {"set": ["fun"]}} ]
'
curl http://localhost:8983/solr/nested3/update?commitWithin=500 -d '
  [ {"id": "1", "tags": {"add": ["fun2"]}} ]
'
```

```bash
curl http://localhost:8983/solr/nested3/update?commitWithin=500 -d '
  [ {"id": "5", "title": {"set": ["cooking", "meetup", "fun"]}} ]
'
```

```bash
curl http://localhost:8983/solr/nested3/update?commitWithin=500 -d '
[
  {
  "id":"1",
  "posts": {
    "add":
      {
        "id": "99",
        "title": "Search Engineer"
      }
    }
  }
]
'
```

```bash
curl http://localhost:8983/solr/demo/get?id=5
```

## Search

> https://lucene.apache.org/solr/guide/8_2/searching-nested-documents.html

```bash
curl http://localhost:8983/solr/nested3/query -d '{
  params : {
    q : "id: 5",
  }
}
'
```

```bash
curl http://localhost:8983/solr/nested3/query -d '{
  params : {
    q : "id: 1",
    fl : "*,[child]"
  }
}
'
```

```bash
curl http://localhost:8983/solr/nested3/query -d '{
  params : {
    q : "id: 1",
    fl : "*,[child childFilter='/posts/comments/content_t:recipe']" 
  }
}
'
```

```bash
curl http://localhost:8983/solr/nested3/query -d '{
  params : {
    q: "{!child of=_nest_path_:\\/posts}title:\"Search Engineer\""
  }
}
'
```

```bash
curl http://localhost:8983/solr/nested3/query -d '{
  params : {
    q: "{!parent which=\"-_nest_path_:* *:*\"}title:\"Search Engineer\""
  }
}
'
```

```bash
curl http://localhost:8983/solr/nested3/query -d '{
  params : {
    q: "+{!child of=\"-_nest_path_:* *:*\"}+tags:\"jobs\"",
    fl: "*,[child]"
  }
}
'
```

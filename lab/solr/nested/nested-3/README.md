[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Solr Nested Example 3

```bash
docker exec -it --user=solr solr bin/solr create_collection -c nested3 -shards 1 -replicationFactor 1
```

## Index

> https://lucene.apache.org/solr/guide/8_2/indexing-nested-documents.html

```bash
curl http://localhost:8983/solr/nested3/update?commitWithin=5000 -d '
[
  {
    "id": "1",
    "title": "Solr adds block join support",
    "content_type": "parentDocument",
    "comments": [{
        "id": "2",
        "content": "SolrCloud supports it too!"
      },
      {
        "id": "3",
        "content": "New filter syntax"
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

```bash
curl http://localhost:8983/solr/nested3/update?commitWithin=5000 -d '
[
  {
    "ID": "1",
    "title": "Cooking Recommendations",
    "tags": ["cooking", "meetup"],
    "posts": [{
        "ID": "2",
        "title": "Cookies",
        "comments": [{
            "ID": "3",
            "content": "Lovely recipe"
          },
          {
            "ID": "4",
            "content": "A-"
          }
        ]
      },
      {
        "ID": "5",
        "title": "Cakes"
      }
    ]
  },
  {
    "ID": "6",
    "title": "For Hire",
    "tags": ["professional", "jobs"],
    "posts": [{
        "ID": "7",
        "title": "Search Engineer",
        "comments": [{
           "ID": "8",
           "content": "I am interested"
         },
         {
           "ID": "9",
           "content": "How large is the team?"
         }
        ]
      },
      {
        "ID": "10",
        "title": "Low level Engineer"
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
    q : "ID:1",
    fl : "ID,[child childFilter=/comments/content:recipe]" 
  }
}'
```

```bash
curl http://localhost:8983/solr/nested3/query -d '{
  params : {
    q: "{!child of='nest_path:/posts}content: "Search Engineer"
  }
}'
```

```bash
curl http://localhost:8983/solr/nested3/query -d '{
  params : {
    q: "{!parent which='-nest_path:* *:*'}title:"Search Engineer"
  }
}'
```

```bash
curl http://localhost:8983/solr/nested3/query -d '{
  params : {
    q: "+{!child of='-_nest_path_:* *:*'}+tags:"jobs",
    fl: "*,[child]"
  }
}'
```

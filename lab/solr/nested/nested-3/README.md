[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Solr Nested Example 3

> https://lucene.apache.org/solr/guide/8_2/indexing-nested-documents.html
> https://lucene.apache.org/solr/guide/8_2/searching-nested-documents.html

```bash
docker exec -it --user=solr solr bin/solr create_collection -c nested3 -shards 1 -replicationFactor 1
```

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

[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Solr Nested Example 4

> https://medium.com/@pablocastelnovo/nesting-documents-in-apache-solr-12ef44ea2901

```bash
curl http://localhost:8983/solr/nested4/update?commitWithin=5000 -d '
[
  {
    "id":"profile_1",
    "nodeType":"profile",
    "_childDocuments_":[
      {
        "id":"comment_1",
        "nodeType":"comment",
        "content":"term1"
      },
      {
        "id":"comment_2",
        "nodeType":"comment",
        "content":"term2"
      }
    ]
  },
  {
    "id":"profile_2",
    "nodeType":"profile",
    "_childDocuments_":[
      {
        "id":"comment_3",
        "nodeType":"comment",
        "content":"term2"
      },
      {
        "id":"comment_4",
        "nodeType":"comment",
        "content":"term3"
      }
    ]
  }
]'
```

```bash
# Retrieving the parents of the matching documents.
curl http://localhost:8983/solr/nested4/query -d '
{
  "query" : "{!parent which=\"nodeType: profile\"} nodeType: comment AND content: term1",
}'
```

```bash
# Adding the matching documents nested into their parents
curl http://localhost:8983/solr/nested4/query -d '
{
  params: {
    q : "*: *",
    fl : "*, [child parentFilter=\"nodeType: profile\" childFilter=\"nodeType: comment AND content: term1\"]",
  }
}'
```

```bash
curl http://localhost:8983/solr/nested4/query -d '
{
  params: {
    q : "{!parent which=\"nodeType: profile\"} nodeType: comment AND content: term2",
    fl : "id, [child parentFilter=\"nodeType: profile\" childFilter=\"nodeType: comment AND content: term2\"]",
  }
}'
```

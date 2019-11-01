[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Solr Nested Example 5

```bash
curl http://localhost:8983/solr/nested5/update?commitWithin=5000 -d '
[
  {
    "id":"Project 1",
    "type":"project",
    "_childDocuments_":[
      {
        "id":"item 1.1",
        "type":"item",
        "content":"item11"
      },
      {
        "id":"tiem 1.2",
        "type":"item",
        "content":"item12"
      }
    ]
  },
  {
    "id":"Project 2",
    "type":"project",
    "_childDocuments_":[
      {
        "id":"item 2.1",
        "type":"item",
        "content":"item21"
      },
      {
        "id":"tiem 2.2",
        "type":"item",
        "content":"item22"
      }
    ]
  }
]'
```

```bash
curl http://localhost:8983/solr/nested5/query -d '
{
  params: {
    q : "{!parent which=\"type: project\"} type: item AND content: item1*",
    fl : "id, [child parentFilter=\"type: project\" childFilter=\"type: item AND content: item1*\"]",
  }
}'
```

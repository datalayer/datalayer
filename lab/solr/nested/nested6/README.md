[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Solr Nested Example 6

> http://yonik.com/solr-nested-objects

```bash
docker cp $DLAHOME/etc/conf/solr/nested solr:/opt/solr/example
docker exec -it --user=solr solr bin/solr create_collection -c nested6 -shards 1 -replicationFactor 1 -d /opt/solr/example/nested
curl http://localhost:8983/solr/nested6/update?commitWithin=500 -d '{ delete: { query: "*:*" } }'
curl http://localhost:8983/solr/admin/collections?action=DELETE -d 'name=nested6'
```

```bash
curl http://localhost:8983/solr/nested6/update?commitWithin=500 -d '
[
 {
   id : book1, 
   nest_path:book, 
   title_t : "The Way of Kings", 
   author_s : "Brandon Sanderson",
   cat_s:fantasy, 
   pubyear_i:2010, 
   publisher_s:Tor,
   _childDocuments_ : [
    { id: book1_c1, 
      nest_path:book/review,
      review_dt:"2015-01-03T14:30:00Z",
      stars_i:5, 
      author_s:yonik,
      comment_t:"A great start to what looks like an epic series!"
    },
    { id: book1_c2, 
      nest_path:book/review,
      review_dt:"2014-03-15T12:00:00Z",
      stars_i:3, 
      author_s:dan,
      comment_t:"This book was too long."
    }
  ]
 }
]'
```

```bash
curl http://localhost:8983/solr/nested6/query -d 'q=*:*&fl=id'
```

```bash
curl http://localhost:8983/solr/nested6/update?commitWithin=500 -d '
[
 {
   id : book2, 
   nest_path:book, 
   title_t : "Snow Crash", 
   author_s : "Neal Stephenson",
   cat_s:sci-fi, 
   pubyear_i:1992, 
   publisher_s:Bantam,
   _childDocuments_ : [
    { id: book2_c1, 
      nest_path:book/review, 
      review_dt:"2015-01-03T14:30:00Z",
      stars_i:5, 
      author_s:yonik,
      comment_t:"Ahead of its time... I wonder if it helped inspire The Matrix?"
    },
    { id: book2_c2, 
      nest_path:book/review, 
      review_dt:"2015-04-10T9:00:00Z",
      stars_i:2, 
      author_s:dan,
      comment_t:"A pizza boy for the Mafia franchise? Really?"
    },
    { id: book2_c3, 
      nest_path:book/review, 
      review_dt:"2015-06-02T00:00:00Z",
      stars_i:4, 
      author_s:mary,
      comment_t:"Neal is so creative and detailed! Loved the metaverse!"
    }
  ]
 }
]'
```

```bash
curl http://localhost:8983/solr/nested6/query -d 'q=id:book2'
```

```bash
curl http://localhost:8983/solr/nested6/query -d 'q=id:book2_c3'
```

```bash
curl http://localhost:8983/solr/nested6/query -d 'q=cat_s:(fantasy OR sci-fi)&fl=id,[child parentFilter=nest_path:book]'
```

```bash
curl http://localhost:8983/solr/nested6/query -d 'q=cat_s:(fantasy OR sci-fi)&fl=id,[child parentFilter=nest_path:book childFilter=author_s:mary]'
```

```bash
curl http://localhost:8983/solr/nested6/query -d 'q=id:book2&fl=id,[child parentFilter=nest_path:book childFilter=comment_t:time]'
```

```bash
curl http://localhost:8983/solr/nested6/query -d '
q=author_s:yonik&
fl=id,comment_t&
json.facet={
  genres : {
    type: terms,
    field: cat_s,
    domain: { blockParent : "nest_path:book" } 
  }
}'
```

```bash
curl http://localhost:8983/solr/nested6/query -d '
q=cat_s:(sci-fi OR fantasy)&
fl=id,title_t&
json.facet={
  top_reviewers : {
    type: terms,
    field: author_s,
    domain: { blockChildren : "nest_path:book" } 
  }
}'
```

```bash
curl http://localhost:8983/solr/nested6/query -d '
q=cat_s:(sci-fi OR fantasy)&
fl=id,title_t&
json.facet={
  top_reviewers : {
    type: terms,
    field: author_s,
    domain: {
      blockChildren : "nest_path:book",
      filter : "stars_i:5"
    }
  }
}'
```

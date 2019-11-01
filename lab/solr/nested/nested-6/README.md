[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Solr Nested Example 6

> http://yonik.com/solr-nested-objects

```bash
curl http://localhost:8983/solr/nested6/update?commitWithin=3000 -d '
[
 {id : book1, type_s:book, title_t : "The Way of Kings", author_s : "Brandon Sanderson",
  cat_s:fantasy, pubyear_i:2010, publisher_s:Tor,
  _childDocuments_ : [
    { id: book1_c1, type_s:review, review_dt:"2015-01-03T14:30:00Z",
      stars_i:5, author_s:yonik,
      comment_t:"A great start to what looks like an epic series!"
    }
    ,
    { id: book1_c2, type_s:review, review_dt:"2014-03-15T12:00:00Z",
      stars_i:3, author_s:dan,
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
curl http://localhost:8983/solr/nested6/update?commitWithin=3000 -d '
[
 {id : book2, type_s:book, title_t : "Snow Crash", author_s : "Neal Stephenson",
  cat_s:sci-fi, pubyear_i:1992, publisher_s:Bantam,
  _childDocuments_ : [
    { id: book2_c1, type_s:review, review_dt:"2015-01-03T14:30:00Z",
      stars_i:5, author_s:yonik,
      comment_t:"Ahead of its time... I wonder if it helped inspire The Matrix?"
    }
    ,
    { id: book2_c2, type_s:review, review_dt:"2015-04-10T9:00:00Z",
      stars_i:2, author_s:dan,
      comment_t:"A pizza boy for the Mafia franchise? Really?"
    }
    ,
    { id: book2_c3, type_s:review, review_dt:"2015-06-02T00:00:00Z",
      stars_i:4, author_s:mary,
      comment_t:"Neal is so creative and detailed! Loved the metaverse!"
    }
  ]
 }
]'
```

```bash
curl http://localhost:8983/solr/nested6/query -d 'q=cat_s:(fantasy OR sci-fi)&fl=id,[child]'
```

```bash
curl http://localhost:8983/solr/nested6/query -d '
q=author_s:yonik&fl=id,comment_t&
json.facet={
  genres : {
    type: terms,
    field: cat_s,
    domain: { blockParent : "type_s:book" } 
  }
}'
```

```bash
curl http://localhost:8983/solr/nested6/query -d '
q=cat_s:(sci-fi OR fantasy)&fl=id,title_t&
json.facet={
  top_reviewers : {
    type: terms,
    field: author_s,
    domain: { blockChildren : "type_s:book" } 
  }
```

```bash
curl http://localhost:8983/solr/nested6/query -d '
q=cat_s:(sci-fi OR fantasy)&fl=id,title_t&
json.facet={
  top_reviewers : {
    type: terms,
    field: author_s,
    domain: {
      blockChildren : "type_s:book",
      filter : "stars_i:5"
    }
  }
}'
```

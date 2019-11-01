[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Solr Nested Example 2

## Talk at Lucene/Solr Revolution 2016

+ https://github.com/alisatl/solr-revolution-2016-nested-nested2
+ https://www.slideshare.net/lucidworks/working-with-deeply-nested-documents-in-apache-solr-presented-by-anshum-gupta-alisa-zhila-ibm-watson
+ https://www.youtube.com/watch?v=qV0fIg-LGBE

Demo queries and command  that accompany the talk Working with Deeply Nested Documents in Apache Solr (to be) presented at SolrRevolution2016 conference in Boston, MA on Oct 14, 2016.

## Data Pre-processing

All necessary data is provided in the ./data folder in all formats and with different pre-processing options.

Example how to run a script:

```bash
python2 ./scripts/convert_data2solrjson -i ./data/example-data.json -o ./data/example-data-solr-facet.json
```

## Creating Collection

```bash
export SOLR_HOME=~/datalayer/opt/solr-7.6.0
$SOLR_HOME/bin/solr create -c nested2 -p 8983
$SOLR_HOME/bin/post -c nested2 ./data/example-data-solr.json -format solr
# $SOLR_HOME/bin/solr create -c nested2 -shards 1 -replicationFactor 1 -d $DLAHOME/etc/conf/solr/nested2 -p 8983 -force
# $SOLR_HOME/bin/post -c nested2 ./out/example-data-solr.json -format solr
# $SOLR_HOME/bin/post -c nested2 ./out/example-data-solr-for-faceting.json -format solr
```

## Schema Modification

```bash
curl -X POST -H 'Content-type:application/json' --data-binary '{
  "replace-field":{
     "name":"text",
     "type":"text_general",
     "stored":true }
}' http://localhost:8983/solr/nested2/schema
```

## Queries

Query base.

```
open http://localhost:8983/solr/nested2/query?q=*%3A*
```

## "Flat queries"

```bash
# Find all comments and replies that mention Trump.
curl http://localhost:8983/solr/nested2/query -d '{
  query : "(path:2.posts.comments OR path:3.posts.comments.replies) AND text:Trump" 
}'
```

```bash
# Find all documents at level 2 that mention Hillary.
curl http://localhost:8983/solr/nested2/query -d '{
  query : "path:2.* AND (text:Hillary OR Clinton)" 
}'
```

## Cross-Level Querying

```bash
# Block Join Query: Parent Domain.
curl http://localhost:8983/solr/nested2/query -d '{
  query : "{!parent which='path:1.posts'}path:*.keywords AND text:Hillary AND sentiment:negative" 
}'
```

```bash
# Block Join Query: Child Domain.
curl http://localhost:8983/solr/nested2/query -d '{
  query : "{!child of='path:2.posts.comments'}path:2.posts.comments AND sentiment:negative&",
  filter: "path:3.posts.comments.replies"
}'
curl http://localhost:8983/solr/nested2/query -d '{
  params : {
    q : "{!child of='path:2.posts.comments'}path:2.posts.comments AND sentiment:negative&",
    fl: "path:3.posts.comments.replies"
  }
}'
```

```bash
# ChildDocTransformer
q=path:2.posts.comments AND sentiment:negative&fl=id,text,path,sentiment,[child parentFilter=path:2.* childFilter=path:3.posts.comments.replies fl=text]
```

```bash
# Cousin Queries
q={!parent which="path:2.post.comments"}path:3.posts.comments.keywords AND text:Trump&fq={!parent which=”path:2.post.comments”}path:3.posts.comments.replies AND sentiment:positive&fl=*,[child parentFilter=”path:2.*” childFilter=”path:3.*”]
```

## Faceting

### JSON Faceting API

```bash
# JSON faceting API: Parent Domain.
curl http://localhost:8983/solr/nested2/query -d 'q=path:2.posts.comments AND sentiment:positive&fl=path,text,sentiment&
json.facet={
 most_liked_authors : {
 type: terms,
 field: author,
 domain: { blockParent : "path:1.posts"}
}}'
```

```bash
# JSON faceting API: Child Domain
curl http://localhost:8983/solr/nested2/query -d 'q=path:1.posts&rows=0&
json.facet={
 filter_by_child_type :{
   type:query,
   q:"path:*comments*keywords",
   domain: { blockChildren : "path:1.posts" },
   facet:{
     top_keywords : {
       type: terms,
       field: text,
       sort: "counts_by_posts desc",
       facet: {
         counts_by_posts: "unique(_root_)"
}}}}}'
```

```bash
# JSON faceting API: Child Faceting by intermediate ancestors
curl http://localhost:8983/solr/nested2-facet/query -d  'q=path:2.posts.comments&rows=0&
json.facet={
 filter_by_child_type :{
   type:query,
   q:"path:*comments*keywords",
   domain: { blockChildren : "path:2.posts.comments" },
   facet:{
     top_keywords : {
       type: terms,
       field: text,
       sort: "counts_by_comments desc",
       facet: {
         counts_by_comments: "unique(2.posts.comments-id)"
 }}}}}'
```

## Block Join Faceting

Changes to solrconfig.xml of nested2 index:

```xml
<searchComponent name=”bjqFacetComponent” class=”org.apache.solr.search.join.BlockJoinFacetComponent”/>
<requestHandler name=”/bjqfacet” class=”org.apache.solr.handler.component.SearchHandler”>
  <lst name=”defaults”>
    <str name=”shards.qt”>/bjqfacet</str>
  </lst>
  <arr name=”last-components”>
    <str>bjqFacetComponent</str>
  </arr>
</requestHandler>
```

```bash
bjqfacet?q={!parent which=path:1.posts}path:*.comments*keywords&rows=0&facet=true&child.facet.field=text&wt=json&indent=true
```

```bash
bjqfacet?q={!parent which=path:2.posts.comments}path:*.comments*keywords&rows=0&facet=true&child.facet.field=text&wt=json&indent=true
```

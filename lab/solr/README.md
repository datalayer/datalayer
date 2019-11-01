[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Lab Solr

Read the official [Solr Tutorial](https://lucene.apache.org/solr/guide/8_2/solr-tutorial.html).

> https://hub.docker.com/_/solr
> https://github.com/docker-solr/docker-solr/blob/master/README.md

## Setup

Follow the below steps to start your Solr server.

```bash
# Start.
docker-compose -f $DLAHOME/lab/solr/swarm/solr.yml up -d && \
  dla solr-help && \
  sleep 3s && \
  docker-compose -f $DLAHOME/lab/solr/swarm/solr.yml ps && \
  docker-compose -f $DLAHOME/lab/solr/swarm/solr.yml logs -f solr
open http://localhost:8983
```

```bash
# Delete the `demo` collection.
curl http://localhost:8983/solr/admin/collections?action=DELETE -d 'name=demo'
docker exec -it --user=solr solr solr delete -c demo
```

```bash
# Create the `demo` collection.
# docker cp $DLAHOME/etc/conf/solr/demo solr:/opt/solr/example
docker exec solr solr create -c demo
docker exec -it --user=solr solr bin/solr create_collection -c demo -shards 1 -replicationFactor 1
# docker exec -it --user=solr solr bin/solr create_collection -c demo -shards 3 -replicationFactor 3
docker exec -it --user=solr solr bin/post -c demo example/exampledocs/manufacturers.xml
```

```bash
# docker cp $DLAHOME/opt/solr-7.6.0/example/exampledocs/manufacturers.xml solr:/opt/solr/manufacturers.xml
# docker exec -it --user=solr solr bin/post -c demo manufacturers.xml
docker cp $DLAHOME/etc/conf/solr/datalayer solr:/opt/solr/example
docker exec -it --user=solr solr bin/solr create_collection -c datalayer -shards 1 -replicationFactor 1 -d /opt/solr/example/datalayer
```

```bash
# View the UI.
open http://localhost:8983/solr
```

```bash
# Teardown.
docker-compose -f $DLAHOME/lab/solr/swarm/solr.yml down
```

## More Info

+ https://blog.quiltdata.com/find-your-jupyter-notebooks-with-elasticsearch-1fe300c1cd0f #elasticsearch
+ https://github.com/quiltdata/examples/tree/master/JupyterSearch #elasticsearch

+ https://github.com/abranubhav/Search-using-SOLR
+ https://github.com/pkiraly/solr-and-elasticsearch

## Reset

```bash
# Ensure you start clean...
curl http://localhost:8983/solr/demo/update?commitWithin=3000 -d '{delete:{query:"*:*"}}'
```

## Index

```bash
curl http://localhost:8983/solr/demo/update?commitWithin=5000 -d '
[
 {
  "id" : "book1",
  "title_t" : "The Way of Kings",
  "author_s" : "Brandon Sanderson"
 }
]'
# {"responseHeader":{"status":0,"QTime":40}}
```

## Get

```bash
curl http://localhost:8983/solr/demo/get?id=book1
```

```json
{
  "doc": {
    "id" : "book1",
    "author_s": "Brandon Sanderson",
    "title_t" : "The Way of Kings",
    "_version_": 1410390803582287872
  }
}
```

## Fields

The `id` field is already pre-defined in every schema.

Lucene and Solr need to know the types of fields so that they can be indexed in the correct way.

There are a number of options for defining new fields:

+ Edit the `schema.xml` file to define the fields.
+ Use the Schema API to add the new fields.
+ Use dynamicFields, a form of convention-over-configuration that maps field names to field types based on patterns in the field name. 
  For example, every field ending in “_i” is taken to be an integer.
+ Use “schemaless” mode, where field types are auto-detected (guessed) based on the first value seen for that field

For other document fields in this tutorial, we have chosen to use convention over configuration via dynamic fields.

Dynamic fields includes the essential benefits of schemaless – namely the ability to add new fields on the fly without having to pre-define them.

Our schema has some common dynamicField patterns defined for use:

```
Field Suffix  Multivalued Suffix  Type  Description
_t  _txt  text_general  Indexed for full-text search so individual words or phrases may be matched.
_s  _ss   string  A string value is indexed as a single unit. This is good for sorting, faceting, and analytics. It’s not good for full-text search.
_i  _is   int   a 32 bit signed integer
_l  _ls   long  a 64 bit signed long
_f  _fs   float   IEEE 32 bit floating point number (single precision)
_d  _ds   double  IEEE 64 bit floating point number (double precision)
_b  _bs   boolean   true or false
_dt   _dts  date  A date in Solr’s date format
_p    location  A lattitude and longitude pair for geo-spatial search
```

## Update

Let’s update book1 and add cat_s, a category field, a publication year, and an ISBN. Via dynamic fields, a field name ending with _i tells Solr to treat the value as an integer, while a field name ending with _s is treated as a string.

```bash
curl http://localhost:8983/solr/demo/update -d '
[
 {"id"         : "book1",
  "title_t"    : { "set" : ""The Way of Kings 2" },
  "cat_s"      : { "add" : "fantasy" },
  "pubyear_i"  : { "add" : 2010 },
  "ISBN_s"     : { "add" : "978-0-7653-2635-5" }
 }
]'
```

Now go ahead and ask for the document back, and you should see the new fields:

```bash
curl http://localhost:8983/solr/demo/get?id=book1
```

## Atomic Update

See Atomic Updates for more document update options.

https://lucene.apache.org/solr/guide/8_2/updating-parts-of-documents.html

## Requests

First, lets add a few more documents so we have something to search for.

This time we’ll demonstrate indexing documents in CSV (comma separated values) format:

```bash
curl http://localhost:8983/solr/demo/update?commitWithin=5000 -H 'Content-type:text/csv' -d '
id,cat_s,pubyear_i,title_t,author_s,series_s,sequence_i,publisher_s
book1,fantasy,2010,The Way of Kings,Brandon Sanderson,The Stormlight Archive,1,Tor
book2,fantasy,1996,A Game of Thrones,George R.R. Martin,A Song of Ice and Fire,1,Bantam
book3,fantasy,1999,A Clash of Kings,George R.R. Martin,A Song of Ice and Fire,2,Bantam
book4,sci-fi,1951,Foundation,Isaac Asimov,Foundation Series,1,Bantam
book5,sci-fi,1952,Foundation and Empire,Isaac Asimov,Foundation Series,2,Bantam
book6,sci-fi,1992,Snow Crash,Neal Stephenson,Snow Crash,,Bantam
book7,sci-fi,1984,Neuromancer,William Gibson,Sprawl trilogy,1,Ace
book8,fantasy,1985,The Black Company,Glen Cook,The Black Company,1,Tor
book9,fantasy,1965,The Black Cauldron,Lloyd Alexander,The Chronicles of Prydain,2,Square Fish
book10,fantasy,2001,American Gods,Neil Gaiman,,,Harper'
```

We added the `commitWithin=5000` parameter to indicate that we would like our updates to be visible within 5000 milliseconds (5 seconds).

The Lucene library that Solr uses for full-text search works off of point-in-time snapshots that must be periodically refreshed in order for queries to see new changes.

Note that although we often use JSON in our examples, Solr is actually data format agnostic – you’re not artificially tied to any particular transfer-syntax or serialization format such as JSON or XML.

## Search Request

Now let’s query our book collection! For example, we can find all books with “black” in the title field:

```bash
curl http://localhost:8983/solr/demo/query?q=title_t:black&fl=author_s,title_t
```

The fl parameter stands for “field list” and specifies what stored fields should be returned from documents matching the query. We should see a result like the following:

```json
{"response":{"numFound":2,"start":0,"docs":[
    {
      "title_t":"The Black Company",
      "author_s":"Glen Cook"},
    {
      "title_t":"The Black Cauldron",
      "author_s":"Lloyd Alexander"}]
}}
```

See the Solr Query docs for more solr query examples and syntax.

If you prefer using JSON to search the index, you can use the JSON Request API.

```bash
curl http://localhost:8983/solr/demo/query -d '
{
  "query" : "title_t:black",
  "fields" : ["title_t", "author_s"]
}'
```

## Sorting and Paging

By default, Solr will return the top 10 documents ordered by highest score (relevance) first.

Let’s change things up and return the top 3 search results, limiting them to books published by Bantam, and sorting by publication year descending.

```bash
curl http://localhost:8983/solr/demo/query -d '
q=*:*&
fq=publisher_s:Bantam&
rows=3&
sort=pubyear_i desc&
fl=title_t,pubyear_i'
```

And we get the response as requested.

```json
"response":{"numFound":5,"start":0,"docs":[
    {
      "pubyear_i":1999,
      "title_t":["A Clash of Kings"]},
    {
      "pubyear_i":1996,
      "title_t":["A Game of Thrones"]},
    {
      "pubyear_i":1992,
      "title_t":["Snow Crash"]}]
}
```

Parameter Explanation

+ q=*:* – The *:* query matches all documents in the index.
+ fq=publisher_s:Bantam – “fq” parameters are filter queries, which don’t affect scoring, but filter out documents that don’t match the given query. These are cached separately and reused across different requests, greatly accelerating throughput. See Advanced Filter Caching in Solr for more details.
sort=pubyear_i desc – This sorts on the “pubyear_i” field descending. Solr has many advanced sorting options such as tie-break sorts and sorting by a function of document fields!
+ rows=3 – “rows” specifies the number of results to return, while “start” specifies an offset into the sorted list for paging purposes. Also see Deep Paging for options to efficiently page deeply into result sets.

## Facet

The structured nature of nested sub-facets are more naturally expressed in a nested structure like JSON rather than the flat structure that normal query parameters provide.

Goals of the Faceting Module.

+ First class JSON support
+ Easier programmatic construction of complex nested facet commands
+ Support a much more canonical response format that is easier for clients to parse
+ First class analytics support
+ Ability to sort facet buckets by any calculated metric
+ Support a cleaner way to do distributed faceting
+ Support better integration with other search features

Ease of Use

Some of the ease-of-use enhancements over traditional Solr faceting come from the inherent nested structure of JSON.
As an example, here is the faceting command for two different range facets using Solr’s flat API:

&facet=true
&facet.range={!key=age_ranges}age
&f.age.facet.range.start=0
&f.age.facet.range.end=100
&f.age.facet.range.gap=10
&facet.range={!key=price_ranges}price
&f.price.facet.range.start=0
&f.price.facet.range.end=1000
&f.price.facet.range.gap=50

And here is the equivalent faceting command in the new JSON Faceting API:

```json
{
  age_ranges: {
    type : range
    field : age,
    start : 0,
    end : 100,
    gap : 10
  }
  ,
  price_ranges: {
    type : range
    field : price,
    start : 0,
    end : 1000,
    gap : 50 
  }
}
```

These aren’t even nested facets, but already one can see how much nicer the JSON API looks. With deeply nested sub-facets and statistics, the clarity of the inherently nested JSON API only grows.
JSON extensions

A number of JSON extensions have been implemented to further increase the clarity and ease of constructing a JSON faceting command by hand. For example:
{  // this is a single-line comment, which can help add clarity to large JSON commands
     /* traditional C-style comments are also supported */
  x : "avg(price)" , // Simple strings can occur unquoted
  y : 'unique(manu)' // Strings can also use single quotes (easier to embed in another String)
}

### Facet Types

There are two types of facets, one that breaks up the domain into multiple buckets, and aggregations / facet functions that provide information about the set of documents belonging to each bucket.

Faceting can be nested! Any bucket produced by faceting can further be broken down into multiple buckets by a sub-facet.

### Statistics are Facets

Statistics are now fully integrated into faceting. 

Since we start off with a single facet bucket with a domain defined by the main query and filters, we can even ask for statistics for this top level bucket, before breaking up into further buckets via faceting. 

Example:

json.facet={
  x : "avg(price)",           // the average of the price field will appear under "x"
  y : "unique(manufacturer)"  // the number of unique manufacturers will appear under "y"
}

See facet functions for a complete list of the available aggregation functions.
JSON Facet Syntax

The general form of the JSON facet commands are:

<facet_name> : { <facet_type> : <facet_parameter(s)> }

Example: top_authors : { terms : { field : authors, limit : 5 } }

After Solr 5.2, a flatter structure with a “type” field may also be used:

<facet_name> : { "type" : <facet_type> , <other_facet_parameter(s)> }

Example: top_authors : { type : terms, field : authors, limit : 5 }

The results will appear in the response under the facet name specified.
Facet commands are specified using json.facet request parameters.

### Test Using Curl

To test out different facet requests by hand, it’s easiest to use “curl” from the command line.

```bash
curl http://localhost:8983/solr/query -d 'q=*:*&rows=0&
 json.facet={
   categories:{
     type : terms,
     field : cat,
     sort : { x : desc},
     facet:{
       x : "avg(price)",
       y : "sum(price)"
     }
   }
 }
'
```

### Terms Facet

The terms facet, or field facet, produces buckets from the unique values of a field. The field needs to be indexed or have docValues.

The simplest form of the terms facet

```json
{
  top_genres : { terms : genre_field }
}
```

An expanded form allows for more parameters:

```json
{
  top_genres : {
    type : terms,
    field : genre_field,
    limit : 3,
    mincount : 2
  }
}
```

Example response:

```json
"top_genres":{
  "buckets":[
    {
      "val":"Science Fiction",
      "count":143},
    {
      "val":"Fantasy",
      "count":122},
    {
      "val":"Biography",
      "count":28}
  ]
}
```

Parameters:

+ field – The field name to facet over.
+ offset – Used for paging, this skips the first N buckets. Defaults to 0.
+ limit – Limits the number of buckets returned. Defaults to 10.
+ mincount – Only return buckets with a count of at least this number. Defaults to 1.
+ sort – Specifies how to sort the buckets produced. “count” specifies document count, “index” sorts by the index (natural) order of the bucket value. One can also sort by any facet function / statistic that occurs in the bucket. The default is “count desc”. This parameter may also be specified in JSON like sort:{count:desc}. The sort order may either be “asc” or “desc”
+ missing – A boolean that specifies if a special “missing” bucket should be returned that is defined by documents without a value in the field. Defaults to false.
+ numBuckets – A boolean. If true, adds “numBuckets” to the response, an integer representing the number of buckets for the facet (as opposed to the number of buckets returned). Defaults to false.
+ allBuckets – A boolean. If true, adds an “allBuckets” bucket to the response, representing the union of all of the buckets. For multi-valued fields, this is different than a bucket for all of the documents in the domain since a single document can belong to multiple buckets. Defaults to false.
+ prefix – Only produce buckets for terms starting with the specified prefix.
 
### Query Facet

The query facet produces a single bucket that matches the specified query.

An example of the simplest form of the query facet.

```json
{
  high_popularity : { query : "popularity:[8 TO 10]" }
}
```

An expanded form allows for more parameters (or sub-facets / facet functions).

```json
{
  high_popularity : {
    type : query,
    q : "popularity:[8 TO 10]",
    facet : { average_price : "avg(price)" }
  }
}
```

Example response.

```json
"high_popularity" : {
  "count" : 147,
  "average_price" : 74.25
}
```

### Range Facet

The range facet produces multiple range buckets over numeric fields or date fields.

Range facet example.

```json
{
  prices : {
    type : range,
    field : price,
    start : 0,
    end : 100,
    gap : 20
  }
}
```

Example response.

```json
"prices":{
  "buckets":[
    {
      "val":0.0,  // the bucket value represents the start of each range.  This bucket covers 0-20
      "count":5},
    {
      "val":20.0,
      "count":3},
    {
      "val":40.0,
      "count":2},
    {
      "val":60.0,
      "count":1},
    {
      "val":80.0,
      "count":1}
  ]
}
```

To ease migration, these parameter names, values, and semantics were taken directly from the old-style (non JSON) Solr range faceting.

Parameters:

+ field – The numeric field or date field to produce range buckets from
+ mincount – Minimum document count for the bucket to be included in the response. Defaults to 0.
+ start – Lower bound of the ranges
+ end – Upper bound of the ranges
+ gap – Size of each range bucket produced
+ hardend – A boolean, which if true means that the last bucket will end at “end” even if it is less than “gap” wide. If false, the last bucket will be “gap” wide, which may extend past “end”.
+ other – This param indicates that in addition to the counts for each range constraint between facet.range.start and facet.range.end, counts should also be computed for…
  + "before" all records with field values lower then lower bound of the first range
  + "after" all records with field values greater then the upper bound of the last range
  + "between" all records with field values between the start and end bounds of all ranges
  + "none" compute none of this information
  + "all" shortcut for before, between, and after
+ include – By default, the ranges used to compute range faceting between facet.range.start and facet.range.end are inclusive of their lower bounds and exclusive of the upper bounds. The “before” range is exclusive and the “after” range is inclusive. This default, equivalent to lower below, will not result in double counting at the boundaries. This behavior can be modified by the facet.range.include param, which can be any combination of the following options…
  + "lower" all gap based ranges include their lower bound
  + "upper" all gap based ranges include their upper bound
  + "edge" the first and last gap ranges include their edge bounds (ie: lower for the first one, upper for the last one) even if the corresponding upper/lower option is not specified
  + "outer" the “before” and “after” ranges will be inclusive of their bounds, even if the first or last ranges already include those boundaries.
  + "all" shorthand for lower, upper, edge, outer

### Facet Functions and Analytics

Traditional faceted search (also called guided navigation) involves counting search results that belong to categories (also called facet constraints). The new facet functions in Solr extends normal faceting by allowing additional aggregations on document fields themselves. Combined with the new Sub-facet feature, this provides powerful new realtime analytics capabilities. Also see the page about the new JSON Facet API.

## Aggregation Functions

Faceting involves breaking up the domain into multiple buckets and providing information about each bucket.

There are multiple aggregation functions / statistics that can be used:

Aggregation   Example   Effect
sum   sum(sales)  summation of numeric values
avg   avg(popularity)   average of numeric values
sumsq   sumsq(rent)   sum of squares
min   min(salary)   minimum value
max   max(mul(price,popularity))  maximum value
unique  unique(state)   number of unique values
percentile  percentile(salary,50,75,99,99.9)  calculates percentiles

Numeric aggregation functions such as avg can be on any numeric field, or on another function of multiple numeric fields.

The faceting domain starts with the set of documents that match the main query and filters.
We can ask for statistics over this whole set of documents:

http://localhost:8983/solr/query?q=*:*&
   json.facet={x:'avg(price)'}

And the response will contain a facets section:
[...]
  "facets":{
    "count":32,
    "x":164.10218846797943
  }
[...]

 
If we want to break up the domain into buckets and then calculate a function per bucket, we simply add a nested facet command to the facet parameters.

For example (using curl this time).

```bash
curl http://localhost:8983/solr/query -d 'q=*:*&
 json.facet={
   categories:{
     type : terms, // terms facet creates a bucket for each indexed term (or value) in the field
     field : cat,
     facet:{
       x : "avg(price)",
       y : "sum(price)"
     }
   }
 }'
```

The response will contain the two stats we asked for in each category bucket.

```json
[...]
  "facets":{
    "count":32,
    "categories":{
      "buckets":[
        {
          "val":"electronics",
          "count":12,
          "x":231.02666823069254,
          "y":2772.3200187683105
        },
        {
          "val":"memory",
          "count":3,
          "x":86.66333262125652,
          "y":259.98999786376953
        },
[...]
```

### Facet Sorting

The default sort for a field or terms facet is by bucket count descending.

We can optionally sort ascending or descending by any facet function that appears in each bucket. For example, if we wanted to find the top buckets by average price, then we would add sort:"x desc" to the previous facet request:

```bash
curl http://localhost:8983/solr/query -d 'q=*:*&
 json.facet={
   categories:{
     type : terms,
     field : cat,
     sort : "x desc",   // can also use sort:{x:desc}
     facet:{
       x : "avg(price)",
       y : "sum(price)"
     }
   }
 }
'
```

### Subfacets

NOTE: Some examples use syntax only supported in Solr 5.2!
Download a Solr 5.2 snapshot to try them out.

Subfacets (also called Nested Facets) is a more generalized form of Solr’s current pivot faceting that allows adding additional facets for every bucket produced by a parent facet.

Subfacet advantages over pivot faceting:

+ Subfacets work with facet functions (statistics), enabling powerful real-time analytics
+ Can add a subfacet to any facet type (field, query, range)
+ A subfacet can be of any type (field/terms, query, range)
+ A given facet can have multiple subfacets
+ Just like top-level facets, each subfacet can have it’s own configuration (i.e. offset, limit, sort, stats)

Subfacet Syntax

Subfacets are part of the new Facet Module, and are naturally expressed in the JSON Facet API. Every facet command is actually a sub-facet since there is an implicit top-level facet bucket (the domain) defined by the documents matching the main query and filters. Simply add a facet section to the parameters of any existing facet command.

For example, a terms facet on the “genre” field looks like:

```json
top_genres:{ 
  type: terms,
  field: genre,
  limit: 5
}
```

Now if we wanted to add a subfacet to find the top 4 authors for each genre bucket:

```json
top_genres:{
  type: terms,
  field: genre,
  limit: 5,
  facet:{
    top_authors:{
      type: terms,
      field: author,
      limit: 4
    }
  }
}
```

Complex Subfacet Examples

Assume we want to do the following complex faceting request:

    Facet on the “genre” field and find the top buckets
    For ever “genre” bucket generated above, find the top 7 authors
    For ever “genre” bucket, create a bucket of high popularity items (defined by popularity 8 – 10) and call it “highpop”
    For ever “highpop” bucket generated above, find the top 5 publishers

In short, this request finds the top authors for each genre and finds the the top publishers for high popularity books in each genre.
Using the JSON Facet API, the full request (using curl) would look like the following:

```bash
curl http://localhost:8983/solr/query -d 'q=*:*&
json.facet=
{
  top_genres:{ 
    type: terms,
    field: genre,
    facet:{
      top_authors: {
        type : terms,  // nested terms facet
        field: author,
        limit: 7
      },
      highpop:{
        type : query,               // nested query facet
        q: "popularity:[8 TO 10]",  // lucene query string
        facet:{
          publishers:{
            type: terms,   // nested terms facet under the nested query facet
            field: publisher,
            limit: 5
          }
        }
      }
    }
  }
}
'
```

An example response would look like the following:

[...]
  "facets":{
    "top_genres":{
      "buckets":[{
          "val":"Fantasy",
          "count":5432,
          "top_authors":{  // these are the top authors in the "Fantasy" genre
            "buckets":[{
                "val":"Mercedes Lackey",
                "count":121},
              {
                "val":"Piers Anthony",
                "count":98}]}},
          "highpop":{  // bucket for books in the "Fantasy" genre with popularity between 8 and 10
            "count":876
            "publishers":{  // top publishers in this bucket (highpop fantasy)
              "buckets":[{
                  "val":"Bantam Books",
                  "count":346},
                {
                  "val":"Tor",
                  "count":217}]}},
 
        {
          "val":"Science Fiction",  // the next genre bucket
          "count":4188,
[...]

All the reporting and sorting was done using document count (i.e. number of books). If instead, we wanted to find top authors by total revenue (assuming we had a “sales” field), then we could simply change the author facet from the previous example as follows:

top_authors:{ 
  type: terms,
  field: author,
  limit: 7,
  sort: "revenue desc",
  facet:{
    revenue: "sum(sales)"
  }
}

## Backup and Restore

```bash
docker exec -it --user=solr solr rm -fr /tmp/solr_demo_backup
curl http://localhost:8983/solr/admin/collections?action=BACKUP -d '
name=solr_demo_backup&
collection=demo&
location=/tmp'
```

```bash
docker exec -it --user=solr solr ls -alp /tmp/solr_demo_backup
curl http://localhost:8983/solr/admin/collections?action=DELETE -d '
name=demo'
```

```bash
curl http://localhost:8983/solr/admin/collections?action=RESTORE -d '
name=solr_demo_backup&
collection=demo&
location=/tmp'
```

[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Solr Tutorial

## Clean

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

### Solr Facet Functions and Analytics

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

## Join

For people who are used to SQL, it's important to note that Joins in Solr are not really equivalent to SQL Joins because no information about the table being joined "from" is carried forward into the final result. 

A more appropriate SQL analogy would be an "inner query".

This Solr request...

```
/solr/collection1/select ? fl=xxx,yyy & q={!join from=inner_id to=outer_id}zzz:vvv
```

Is comparable to this SQL statement...

```sql
SELECT xxx, yyy
FROM collection1
WHERE outer_id IN (SELECT inner_id FROM collection1 where zzz = "vvv")
```

```bash
curl http://localhost:8983/solr/demo/update?commitWithin=5000 -H 'Content-type:text/csv' -d '
id,region_s,sales_i
1,east,100000
2,west,200000
3,north,300000
4,south,400000
'
```

```bash
curl http://localhost:8983/solr/demo/update?commitWithin=5000 -H 'Content-type:text/csv' -d '
id,name_s,loc_region_s,salary_i,mgr_s
5,chris,east,100000,yes
6,jen,west,200000,yes
7,james,east,75000,no
8,ruby,north,50000,yes
9,charlotte,west,120000,yes
'
```

```bash
curl http://localhost:8983/solr/demo/query -d '
{
  params: {
    q : "{!join from=loc_region_s to=region_s fromIndex=demo}mgr_s:yes",
  }
}'
```

```bash
curl http://localhost:8983/solr/demo/query -d '
{
  params: {
    q : "{!join from=loc_region_s to=region_s fromIndex=demo}salary_i:[120000 TO 120000]",
  }
}'
```

## Nested Example 1

```bash
curl http://localhost:8983/solr/demo/update?commitWithin=5000 -d '
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
curl http://localhost:8983/solr/demo/query -d '
{
  params: {
    q : "{!parent which=\"type: project\"} type: item AND content: item1*",
    fl : "id, [child parentFilter=\"type: project\" childFilter=\"type: item AND content: item1*\"]",
  }
}'
```

## Nested Example 2

+ https://medium.com/@pablocastelnovo/nesting-documents-in-apache-solr-12ef44ea2901

```bash
curl http://localhost:8983/solr/demo/update?commitWithin=5000 -d '
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
curl http://localhost:8983/solr/demo/query -d '
{
  "query" : "{!parent which=\"nodeType: profile\"} nodeType: comment AND content: term1",
}'
```

```bash
# Adding the matching documents nested into their parents
curl http://localhost:8983/solr/demo/query -d '
{
  params: {
    q : "*: *",
    fl : "*, [child parentFilter=\"nodeType: profile\" childFilter=\"nodeType: comment AND content: term1\"]",
  }
}'
```

```bash
curl http://localhost:8983/solr/demo/query -d '
{
  params: {
    q : "{!parent which=\"nodeType: profile\"} nodeType: comment AND content: term2",
    fl : "id, [child parentFilter=\"nodeType: profile\" childFilter=\"nodeType: comment AND content: term2\"]",
  }
}'
```

## Nested Example 3

+ https://medium.com/@alisazhila/solr-s-nesting-on-solr-s-capabilities-to-handle-deeply-nested-document-structures-50eeaaa4347a
+ https://github.com/alisatl/solr_nesting

```bash
curl http://localhost:8983/solr/demo/update?commitWithin=5000 -d '
[
    {
        "date": "2015-04-10T9:00:00Z",
        "path": "1.blog-posts",
        "_childDocuments_": [
            {
                "path": "2.blog-posts.body",
                "_childDocuments_": [
                    {
                        "path": "3.blog-posts.body.keywords",
                        "type": "search engine",
                        "id": "13092-16908",
                        "text": "Solr"
                    }
                ],
                "id": "13092-80687",
                "text": "Here I write how useful Solr is..."
            },
            {
                "path": "2.blog-posts.title",
                "_childDocuments_": [
                    {
                        "path": "3.blog-posts.title.keywords",
                        "type": "search engine",
                        "id": "13092-22146",
                        "text": "Solr"
                    },
                    {
                        "path": "3.blog-posts.title.keywords",
                        "type": "entity",
                        "id": "13092-23089",
                        "text": "Search Engine"
                    }
                ],
                "id": "13092-15993",
                "text": "My Post #1: About Solr and Other Search Engines"
            },
            {
                "sentiment": "positive",
                "author": "Bob",
                "text": "Great post about Solr",
                "_childDocuments_": [
                    {
                        "path": "3.blog-posts.comments.keywords",
                        "type": "search engine",
                        "id": "13092-26117",
                        "text": "Solr"
                    },
                    {
                        "sentiment": "positive",
                        "author": "Dave",
                        "text": "Yeah, I like Solr too",
                        "_childDocuments_": [
                            {
                                "path": "4.blog-posts.comments.replies.keywords",
                                "type": "search engine",
                                "id": "13092-12539",
                                "text": "Solr"
                            }
                        ],
                        "date": "2015-04-10T12:00:00Z",
                        "path": "3.blog-posts.comments.replies",
                        "id": "13092-63236"
                    },
                    {
                        "sentiment": "negative",
                        "author": "Sri",
                        "text": "I disagree, I prefer Elasticsearch",
                        "_childDocuments_": [
                            {
                                "path": "4.blog-posts.comments.replies.keywords",
                                "type": "search engine",
                                "id": "13092-10289",
                                "text": "Elasticsearch"
                            }
                        ],
                        "date": "2015-04-12T05:00:00Z",
                        "path": "3.blog-posts.comments.replies",
                        "id": "13092-19513"
                    }
                ],
                "date": "2015-04-10T11:30:00Z",
                "path": "2.blog-posts.comments",
                "id": "13092-22593"
            }
        ],
        "id": "13092",
        "author": "Alice"
    },
    {
        "date": "2015-11-10T9:00:00Z",
        "path": "1.blog-posts",
        "_childDocuments_": [
            {
                "path": "2.blog-posts.body",
                "_childDocuments_": [
                    {
                        "path": "3.blog-posts.body.keywords",
                        "type": "search engine",
                        "id": "77947-34285",
                        "text": "Solr"
                    }
                ],
                "id": "77947-38796",
                "text": "Here I also write how useful Solr is..."
            },
            {
                "path": "2.blog-posts.title",
                "_childDocuments_": [
                    {
                        "path": "3.blog-posts.title.keywords",
                        "type": "search engine",
                        "id": "77947-14309",
                        "text": "Solr"
                    },
                    {
                        "path": "3.blog-posts.title.keywords",
                        "type": "entity",
                        "id": "77947-20442",
                        "text": "feature"
                    }
                ],
                "id": "77947-23787",
                "text": "About useful features of Solr"
            },
            {
                "sentiment": "negative",
                "author": "Bob",
                "text": "You forgot that useful Solrs feature!",
                "_childDocuments_": [
                    {
                        "path": "3.blog-posts.comments.keywords",
                        "type": "search engine",
                        "id": "77947-24703",
                        "text": "Solr"
                    },
                    {
                        "path": "3.blog-posts.comments.keywords",
                        "type": "entity",
                        "id": "77947-20250",
                        "text": "feature"
                    },
                    {
                        "sentiment": "neutral",
                        "author": "Dave",
                        "text": "But it only appeared in Solr 5.5, after the post was written",
                        "_childDocuments_": [
                            {
                                "path": "4.blog-posts.comments.replies.keywords",
                                "type": "search engine",
                                "id": "77947-84762",
                                "text": "Solr"
                            },
                            {
                                "path": "4.blog-posts.comments.replies.keywords",
                                "type": "search engine",
                                "id": "77947-93247",
                                "text": "Solr 5.5"
                            }
                        ],
                        "date": "2016-04-10T12:00:00Z",
                        "path": "3.blog-posts.comments.replies",
                        "id": "77947-49763"
                    }
                ],
                "date": "2016-04-10T11:30:00Z",
                "path": "2.blog-posts.comments",
                "id": "77947-67565"
            },
            {
                "sentiment": "negative",
                "author": "Sri",
                "text": "Elasticsearch had it earlier than Solr",
                "_childDocuments_": [
                    {
                        "path": "3.blog-posts.comments.keywords",
                        "type": "search engine",
                        "id": "77947-15984",
                        "text": "Elasticsearch"
                    },
                    {
                        "path": "3.blog-posts.comments.keywords",
                        "type": "search engine",
                        "id": "77947-19320",
                        "text": "Solr"
                    }
                ],
                "date": "2015-12-12T05:00:00Z",
                "path": "2.blog-posts.comments",
                "id": "77947-12995"
            }
        ],
        "id": "77947",
        "author": "Aadit"
    }
]'
```

```bash
# Example I.1.1.
# First, let’s try to find all comments that expressed positive sentiment.
curl http://localhost:8983/solr/demo/query -d '{ 
  query : "path:2.blog-posts.comments AND sentiment:positive" 
}'
# Example I.2.1.
# Now, let’s try to get the top-level posts that received positive comments using the Block Join feature.
# In the Block Join part: `{!parent which=”path:1.blog-posts”}` we query for all the parents of type “blog-post”, and in the main query, for the documents of type “comments” that express positive sentiment.
curl http://localhost:8983/solr/demo/query -d '{ 
  query : "{!parent which=\"path:1.blog-posts\"}+(path:2.blog-posts.comments AND sentiment:positive)" 
}'
# # Example I.2.2.
# Now let’s see what replies the negative comments received (i.e., Children Block Join query from parent “comments” to children “replies”).
# This is not the most straightforward syntax. We are querying for all children of a parent that is specified in the Block Join part `{!child%20of=”path:2.blog-posts.comments”}`, and it cannot be “lower” than the documents returned by the main query, `path:2.blog-posts.comments AND sentiment:negative`(that is, we cannot simply specify `{!child of=”path:3.blog-posts.comments.replies”}`). For our query the “comment” level is sufficient, we do not want to climb any higher otherwise we might bring “cousins” instead of direct descendants. Then, the children are filtered by their type for “reply” documents only in the filter query, `fq=path:3.blog-posts.comments.replies`, which brings us just what we asked for.
# If we wanted to get all the comments that received negative replies, i.e., “reply” level in the main query and “comment” level in the Block Join query, we would use Parent Block Join instead.
curl http://localhost:8983/solr/demo/query -d '{ 
  params : {
    q : "{!parent which=\"path:2.blog-posts.comments\"}path:3.blog-posts.comments.replies AND sentiment:positive",
    fq : "path:3.blog-posts.comments.replies" 
  }
}'
# Example I.3.1.
# First, we are querying through Block Join query to return all comments (i.e., documents whose path is path:2.blog-posts.comments) that have replies with positive sentiment. Then, using ChildDocTransformerFactory in square brackets in the `fl` parameter, namely,`[child parentFilter=path:2.blog-posts.comments childFilter=path:3.blog-posts.comments.* limit=50]`, we specify that we would like to get a document tree starting from “comments” as top parents (`parentFilter=path:2.blog-posts.comments`) and get all their children of type “replies” (`childFilter=path:3.blog-posts.comments.replies`).
# One peculiarity of ChildDocTransformerFactory is that you probably would like to set up a higher default limit for the number of returned nested documents (e.g., `limit=50` in the example) when working with real cases because its default value is 10 which is very restrictive.
curl http://localhost:8983/solr/demo/query -d '{ 
  params : {
    q : "{!parent which=\"path:2.blog-posts.comments\"}path:3.blog-posts.comments.replies AND sentiment:positive",
    fl : "*, [child parentFilter=path:2.blog-posts.comments childFilter=path:3.blog-posts.comments.replies limit=50]"
  }
}'
# Example I.3.2.
# Another thing, which might be actually considered a drawback, is that ChildDocTransformerFactory flattens the descending structure. This means that any descendant, albeit a grandchild, a ‘niece’, a ‘great-grand-niece’, becomes direct child.
# Here I restricted the descendants only by the “comments” branch (childFilter=path:*.blog-posts.comments.*) that includes comment keywords and replies on level 3, and reply keywords on level 4. Yet it can be seen that all the descendants are flattened under their common ancestor.
curl http://localhost:8983/solr/demo/query -d '{ 
  params : {
    q: "{!parent which=\"path:2.blog-posts.comments\"}path:3.blog-posts.comments.replies AND sentiment:positive",
    fl: "*,[child parentFilter=path:2.blog-posts.comments childFilter=path:3.blog-posts.comments.replies limit=50]",
  }
}'
# Example I.4.1.
# One of the good applications of combining wildcards and path fields is to overcome the lack of binary logic for parent specification in Block Join Query. For example, the syntax does not support a Block Join query querying for parents either of type “body” or “title”:
# ~q={!parent%20which=”path:2.blog-posts.body” OR “path:2.blog-posts.title”}path:3.blog-posts.*.keywords AND text:Solr~
# The good news is that Block Join actually supports wildcards so we can query for ANY parent document from level 2 that has “Solr” as its keyword and then filter only those of the desired types through filter query `fq`:
curl http://localhost:8983/solr/demo/query -d '{ 
  params : {
    q: "{!parent which=\"path:2.*\"}path:\"3.blog-posts.*.keywords\" AND text:Solr",
    fq: "path:2.blog-posts.title OR path:2.blog-posts.body",
  }
}'
# Example I.4.2.
# Similar to Examples I.3.1 and I.3.2, we can specify the general level for documents to be returned (using ChildDocTransformerFactory). Let’s say we want to see all other keywords for the documents at level 2 that have “feature” as their keyword. Due to the structure of the example document hierarchy where each keyword is treated as an independent document with “text” and “type” fields, querying for the whole list of keywords at a certain level directly (q=path:3.*.keywords AND text:feature) will not bring the desired results. It will only return precisely the “keyword” document that contains text field “feature”. No other keywords will be returned.
# Therefore, ChildDocTransformerFactory with its childFilter again comes handy.
curl http://localhost:8983/solr/demo/query -d '{ 
  params : {
    q: "{!parent which=\"path:2.*\"}path:3.*.keywords AND text:feature",
    fl: "id,text,path,[child parentFilter=path:2.* childFilter=path:3.*.keywords",
    fl: "text",
  }
}'
# Example I.5.
# If we are interested in more complex traversing of the document hierarchy, we can also use Block Join Query in filter query part. For example, we want to get all level 2 documents that contain keyword “Solr” and positive replies. “Keyword” documents are at the same level as “reply” documents, so they are “cousins”. Therefore, they cannot be specified in one main query as in:
# ~q={!parent%20which=”path:2.*”}path:3.*.keywords%20AND%20text:Solr%20AND%20path:3.*.replies%20AND%20sentiment:positive~
which returns 0 documents because documents cannot be of type “keywords” (`path:3.*.keywords`) and “replies” (`path:3.*.replies`) at the same time.
# The correct way would be to use a filter query with corresponding Block Join query:
# Here I am also returning the substructure via ChildDocTransformerFactory to verify the results.
curl http://localhost:8983/solr/demo/query -d '{ 
  params : {
    q: "{!parent which=”path:2.*”}path:3.blog-posts.*.keywords AND text:Solr",
    fq: "{!parent which=”path:2.*”}path:3.blog-posts.*.replies AND sentiment:positive",
    fl: "*,[child parentFilter=”path:2.*” childFilter=”path:3.*”]",
  }
}'
```

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

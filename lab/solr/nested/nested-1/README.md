[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Solr Nested Example 1

+ https://medium.com/@alisazhila/solr-s-nesting-on-solr-s-capabilities-to-handle-deeply-nested-document-structures-50eeaaa4347a#.90xb5dqo8
+ https://github.com/alisatl/nested1

```bash
python2 ./py/data2solr_json.py -i ./in/example-data.json -o ./out/example-data-solr.json
python2 ./py/data2solr_json_faceting.py -i ./in/example-data.json -o ./out/example-data-solr-for-faceting.json
```

```bash
export SOLR_HOME=~/datalayer/opt/solr-7.6.0
$SOLR_HOME/bin/solr create -c nested1 -shards 1 -replicationFactor 1 -d $DLAHOME/etc/conf/solr/demo -p 8983 -force
$SOLR_HOME/bin/post -c nested1 ./out/example-data-solr.json -format solr
$SOLR_HOME/bin/post -c nested1 ./out/example-data-solr-for-faceting.json -format solr
```

```bash
open http://localhost:8983/solr
```

## Queries

```bash
# And now let the querying begin…
# Example I.1.1.
# First, let’s try to find all comments that expressed positive sentiment.
curl http://localhost:8983/solr/nested1/query -d '{ 
  query : "path:2.blog-posts.comments AND sentiment:positive" 
}'
# Example I.2.1.
# Now, let’s try to get the top-level posts that received positive comments using the Block Join feature.
# In the Block Join part: `{!parent which=”path:1.blog-posts”}` we query for all the parents of type "blog-post”, and in the main query, for the documents of type "comments” that express positive sentiment.
curl http://localhost:8983/solr/nested1/query -d '{
  query : "{!parent which=\"path:1.blog-posts\"}+(path:2.blog-posts.comments AND sentiment:positive)" 
}'
# # Example I.2.2.
# Now let’s see what replies the negative comments received (i.e., Children Block Join query from parent "comments” to children "replies”).
# This is not the most straightforward syntax. We are querying for all children of a parent that is specified in the Block Join part `{!child%20of=”path:2.blog-posts.comments”}`, and it cannot be "lower” than the documents returned by the main query, `path:2.blog-posts.comments AND sentiment:negative`(that is, we cannot simply specify `{!child of=”path:3.blog-posts.comments.replies”}`). For our query the "comment” level is sufficient, we do not want to climb any higher otherwise we might bring "cousins” instead of direct descendants. Then, the children are filtered by their type for "reply” documents only in the filter query, `fq=path:3.blog-posts.comments.replies`, which brings us just what we asked for.
# If we wanted to get all the comments that received negative replies, i.e., "reply” level in the main query and "comment” level in the Block Join query, we would use Parent Block Join instead.
curl http://localhost:8983/solr/nested1/query -d '{
  params : {
    q : "{!parent which=\"path:2.blog-posts.comments\"}path:3.blog-posts.comments.replies AND sentiment:positive",
    filter : "path:3.blog-posts.comments.replies" 
  }
}'
# Example I.3.1.
# First, we are querying through Block Join query to return all comments (i.e., documents whose path is path:2.blog-posts.comments) that have replies with positive sentiment. Then, using ChildDocTransformerFactory in square brackets in the `fl` parameter, namely,`[child parentFilter=path:2.blog-posts.comments childFilter=path:3.blog-posts.comments.* limit=50]`, we specify that we would like to get a document tree starting from "comments” as top parents (`parentFilter=path:2.blog-posts.comments`) and get all their children of type "replies” (`childFilter=path:3.blog-posts.comments.replies`).
# One peculiarity of ChildDocTransformerFactory is that you probably would like to set up a higher default limit for the number of returned nested documents (e.g., `limit=50` in the example) when working with real cases because its default value is 10 which is very restrictive.
curl http://localhost:8983/solr/nested1/query -d '{ 
  params : {
    q : "{!parent which=\"path:2.blog-posts.comments\"}path:3.blog-posts.comments.replies AND sentiment:positive",
    fl : "*, [child parentFilter=path:2.blog-posts.comments childFilter=path:3.blog-posts.comments.replies limit=50]"
  }
}'
# Example I.3.2.
# Another thing, which might be actually considered a drawback, is that ChildDocTransformerFactory flattens the descending structure. This means that any descendant, albeit a grandchild, a ‘niece’, a ‘great-grand-niece’, becomes direct child.
# Here I restricted the descendants only by the "comments” branch (childFilter=path:*.blog-posts.comments.*) that includes comment keywords and replies on level 3, and reply keywords on level 4. Yet it can be seen that all the descendants are flattened under their common ancestor.
curl http://localhost:8983/solr/nested1/query -d '{
  params : {
    q: "{!parent which=\"path:2.blog-posts.comments\"}path:3.blog-posts.comments.replies AND sentiment:positive",
    fl: "*,[child parentFilter=path:2.blog-posts.comments childFilter=path:3.blog-posts.comments.replies limit=50]",
  }
}'
# Example I.4.1.
# One of the good applications of combining wildcards and path fields is to overcome the lack of binary logic for parent specification in Block Join Query. For example, the syntax does not support a Block Join query querying for parents either of type "body” or "title”:
# ~q={!parent%20which=”path:2.blog-posts.body” OR "path:2.blog-posts.title”}path:3.blog-posts.*.keywords AND text:Solr~
# The good news is that Block Join actually supports wildcards so we can query for ANY parent document from level 2 that has "Solr” as its keyword and then filter only those of the desired types through filter query `fq`:
curl http://localhost:8983/solr/nested1/query -d '{ 
  params : {
    q: "{!parent which=\"path:2.*\"}path:\"3.blog-posts.*.keywords\" AND text:Solr",
    fq: "path:2.blog-posts.title OR path:2.blog-posts.body",
  }
}'
# Example I.4.2.
# Similar to Examples I.3.1 and I.3.2, we can specify the general level for documents to be returned (using ChildDocTransformerFactory). Let’s say we want to see all other keywords for the documents at level 2 that have "feature” as their keyword. Due to the structure of the example document hierarchy where each keyword is treated as an independent document with "text” and "type” fields, querying for the whole list of keywords at a certain level directly (q=path:3.*.keywords AND text:feature) will not bring the desired results. It will only return precisely the "keyword” document that contains text field "feature”. No other keywords will be returned.
# Therefore, ChildDocTransformerFactory with its childFilter again comes handy.
curl http://localhost:8983/solr/nested1/query -d '{
  params : {
    q: "{!parent which=\"path:2.*\"}path:3.*.keywords AND text:feature",
    fl: "id,text,path,[child parentFilter=path:2.* childFilter=path:3.*.keywords",
    fl: "text",
  }
}'
# Example I.5.
# If we are interested in more complex traversing of the document hierarchy, we can also use Block Join Query in filter query part. For example, we want to get all level 2 documents that contain keyword "Solr” and positive replies. "Keyword” documents are at the same level as "reply” documents, so they are "cousins”. Therefore, they cannot be specified in one main query as in:
# ~q={!parent%20which=”path:2.*”}path:3.*.keywords%20AND%20text:Solr%20AND%20path:3.*.replies%20AND%20sentiment:positive~
# which returns 0 documents because documents cannot be of type "keywords” (`path:3.*.keywords`) and "replies” (`path:3.*.replies`) at the same time.
# The correct way would be to use a filter query with corresponding Block Join query:
# Here I am also returning the substructure via ChildDocTransformerFactory to verify the results.
curl http://localhost:8983/solr/nested1/query -d '{
  params : {
    q: "{!parent which=”path:2.*”}path:3.blog-posts.*.keywords AND text:Solr",
    fq: "{!parent which=”path:2.*”}path:3.blog-posts.*.replies AND sentiment:positive",
    fl: "*,[child parentFilter=”path:2.*” childFilter=”path:3.*”]",
  }
}'
# I.6 Nested Document Querying Summary
# As we have seen, Solr now possesses quite extensive capabilities for nested document querying. One might argue that the syntax is not straightforward, yet after certain practice it allows a lot of flexibility. Although there might be restrictive cases of tree traversing, their scenarios must be rare. Moreover, other search engines also has restrictions in hierarchy traversing.
# Consequently, the main drawback is descendant structure flattening by ChildDocTransformerFactory, which hopefully will be solved in future Solr versions.
# Now that we have looked through various options of querying nested documents, let’s move on to faceting.
```

## Facets

```bash
# Nested document faceting has been introduced right in Solr 5.3 in the JSON Faceting syntax variant. The Block Join Faceting has been introduced in Solr 5.5 and is an experimental functionality (see further).
#  II.1 Nested Document Faceting with JSON Facet API
# By itself JSON Facet API has relatively user-friendly JSON syntax. However, things become more complicated whenever we want to include faceting on nested documents and even more so if we want to facet not on immediately adjacent levels. Because of the hierarchical nature of JSON syntax, I will provide query examples for the curl command rather than browser-friendly line.
# Solr JSON Faceting API provides possibilities for querying on parents as well as on children using Domain Blocks.
# II.1.1 JSON Facet API: Parent Domain
# Let’s start with faceting from children to parents: querying some descendant documents and returning statistics about the corresponding parent documents.
# Let’s begin with a "shallow" example and find out who were the authors of the blog posts that received most positive comments (adjacent levels "1.blog-posts" and "2.blog-posts.comments"):
curl http://localhost:8983/solr/nested1/query -d "q=path:2.blog-posts.comments AND sentiment:positive&fl=text&
json.facet={
  sentiment : {
  type: terms,
  field: author,
  domain: { blockParent : 'path:1.blog-posts' }
}}"
# The main part of the query `q=path:2.blog-posts.comments AND sentiment:positive` defines positive comments. The JSON faceting part of the query contains the name of the faceting "blog_authors_with_positive_comments", the type of faceting and the field from the parent document to be faceted on. The key part is the domain switch to parent documents in the domain block that specifies what type of parent we want to facet: `domain: { blockParent : "path:1.blog-posts" }`.
# Now let’s skip one level and see who were the authors of blog posts, replies to comments on which were positive. Here we are skipping one level in the hierarchy.
curl http://localhost:8983/solr/nested1/query -d "q=path:3.blog-posts.comments.replies AND sentiment:positive&fl=text&
json.facet={
  blog_authors_with_positive_replies : {
  type: terms,
  field: author,
  domain: { blockParent : 'path:1.blog-posts' }
}}"
# And again Alice is the only author in our toy dataset who gets positive attitude even from those who replied to the comments.
# Faceting on parent domain is quite straightforward. If we are interested in the authors of the comments that received positive replies, i.e, intermediate level documents, we should change the parent domain to `domain: { blockParent : "path:2.blog-posts.comments" }` and then Bob becomes the winner with the same reply.
# Now let’s move on to faceting on the child domain. We’ll see that it requires some additional tweaks.
# II.1.2 JSON Facet API: Children Domain
# II.1.2.1 Faceting on adjacent levels
# Let’s reverse the situation and figure out the distribution of comment sentiments by blog posts, i.e., how many posts received each kind of sentiment.
curl http://localhost:8983/solr/nested1/query -d "q=path:1.blog-posts&rows=0&
json.facet={
 filter_by_child_type :{
   type:query,
   q: 'path:2.blog-posts.comments',
   domain: { blockChildren : 'path:1.blog-posts' },
   facet:{
     comment_sentiments : {
       type: terms,
       field: sentiment,
       sort: 'counts_by_blog-posts desc',
       facet: {
         counts_by_blog-posts: 'unique(_root_)'
 }}}}}"
# We see that the syntax becomes more complex. In the main query we specify just all documents of the type that interests us, `q=path:1.blog-posts`. We set `row=0` because we do not want to print all the blog-post documents returned by the main query. Further, we elaborate on JSON faceting query. First, we need to define the type of descendant documents we are interested in by specifying a facet query in "filter_by_child_type" faceting, `q:"path:2.blog-posts.comments"`. Then again we have to switch the domain indicating that we are interested in children of the documents of the type we want to facet by, namely, `domain: { blockChildren : "path:1.blog-posts" }`. Then we go further and define the field we want to facet on, i.e., `field:"sentiment"` in the "comment_sentiments" faceting. Yet if we leave faceting definition at this stage, we will get counts only by the descendant documents (by "comments" in this case) and not by the parent documents as we want. Consequently, we have to specify an additional statistical faceting level "counts_by_blog-posts" on the pre-defined unique field `_root_`, `facet: {counts_by_blog-posts: "unique(_root_)"}` and then sort our "comment_sentiments" results by its counts, `sort: "counts_by_blog-posts desc"`. In the results, "count" gives us the total count of the sentiment occurrence whereas "counts_by_blog-posts" provides us counts of the top-level blog-post documents that received positive comments.
# II.1.2.2 Faceting on descendants with wildcards and level numbering
# Now let’s go a few levels deeper and figure out the distribution of keywords in reader’s reaction, namely, in comments and replies on levels 3 and 4 respectively, by the top-level posts.
currl http://localhost:8983/solr/nested1/query -d "q=path:1.blog-posts&rows=0&
json.facet={
 filter_by_child_type :{
   type:query,
   q: 'path:*comments*keywords',
   domain: { blockChildren : "path:1.blog-posts" },
   facet:{
     top_keywords : {
       type: terms,
       field: text,
       sort: 'counts_by_blog-posts desc',
       facet: {
         counts_by_blog-posts: 'unique(_root_)'
 }}}}}"
# In this example "filter_by_child_type" faceting defines the query `q:"path:*comments*keywords"` that specifies the "comment branch" with all levels that go to keywords.
# Here comes an edit of the previous version of the post after consulting with the Solr mailing list (thanks to Yonik Seeley and Mikhail Khludnev in particular).
# Fortunately, it turns out that faceting by intermediate levels actually can be done with JSON faceting API…if you torture the data "long enough". It is for this case, why we introduced those ugly "unique sub-branch identifier" fields like "2.blog-posts.body-id": "50224".
# In Example II.1.2.2.b we facet keywords by comments, i.e., documents of a particular type from the 2nd level.
# Example II.1.2.2.b: JSON API faceting on intermediate levels  
curl http://localhost:8983/solr/nested1/query -d "q=path:2.blog-posts.comments&rows=0&json.facet={
   filter_by_child_type :{
     type:query,
     q: 'path:*comments*keywords',
     domain: { blockChildren : 'path:2.blog-posts.comments' },
       facet:{
         top_entity_text : {
           type: terms,
           field: text,
           limit: 10,
           sort: 'counts_by_comments desc',
             facet: {
              counts_by_comments: 'unique(2.blog-posts.comments-id)'
}}}}}"
# As it can be seen, I replaced the `counts_by_blog-posts: "unique(_root_)"` faceting by `counts_by_comments: "unique(2.blog-posts.comments-id)"` where the most significant replacement is of course our introduced unique sub-branch identifying field "2.blog-posts.comments-id". And we see that the results are different: a total of 3 comments have "Solr" as their keyword.
# My only concern for this faceting technique is that it requires quite a bit of pre-processing of the original data (in Section 
```

# Pre-processing

```bash
# you can see how much the data changed with all these additional auxiliary fields) and somewhat "user-not-friendly" syntax.
# II.2 Block Join Faceting (Solr 5.5 and up)
# Block Join Faceting is the whole new approach to nested document faceting introduced in Solr 5.5 and is parallel to JSON Facet API. It is an experimental functionality and at the moment it has less controls than the more developed JSON Facet API. In particular, there is no "limit" or "mincount" parameters to limit the number of the top terms. Also, there is no way to set a sorting order. By default, the facets are returned in index (alphabetical) order rather than ordered by count. That is why it becomes very inconvenient in scenarios when you have hundreds of keywords and you cannot get the top 10 most frequent of them.
# One of the possible reasons for its existence is its "inline" syntax that allows querying directly from browser or other Web API endpoints. Another good point is that its syntax is way more compact and readable compared to the JSON Facet API. And I assume that the main reason of pursuing this alternative is that it can actually handle faceting by intermediate level documents that failed for JSON Facet API (Example II.1.2.2.b).
# Now let’s proceed to experimenting.
# II.2.1 Preliminary Steps for Block Join Faceting
# Due to the experimental status of this functionality, it must be turned on explicitly by modifying `solrconfig.xml` file as wiki explains. There are two alternative search components that provide this functionality with slightly different performance. For demonstrative purposes, I will use just one of them. The following search component and request handler must be added in corresponding parts of `solrconfig.xml` of your index as shown in Listing 7:
```

```xml
<searchComponent name="bjqFacetComponent" class="org.apache.solr.search.join.BlockJoinFacetComponent"/>
<requestHandler name="/bjqfacet" class="org.apache.solr.handler.component.SearchHandler">
  <lst name="defaults">
    <str name="shards.qt">/bjqfacet</str>
  </lst>
  <arr name="last-components">
    <str>bjqFacetComponent</str>
  </arr>
</requestHandler>
```

```bash
# Now we are good to go.
# II.2.2 Block Join Faceting on Children Domain
# Currently, Block Join Faceting exists only for Children Domain, that is, it return distribution of terms in child documents by parents. Let’s see how some of the previously considered queries will look like in Block Join Faceting syntactic variant.
# Let’s jump straight ino more difficult example of faceting by all keywords in reader’s reactions (Example II.1.2.2.a). Note that we have change the request handler from "query" to "bjqfacet" that we have just defined in `solrconfig.xml`.
bjqfacet?q={!parent which=path:1.blog-posts}path:*.comments*keywords&rows=0&facet=true&child.facet.field=text&wt=json&indent=true
# As you see, the faceting querying syntax as well as the results is more compact. Yet as I mentioned above, there is no way to set a limit to the number of faceting categories we want to get which does not affect this particular toy dataset with only 4 different keywords but can be crucial for real cases with hundreds and even thousands of keywords.
# Now let’s see whether it can handle intermediate level faceting where we wanted to facet by "comments" documents. I remind you that to perform it with for JSON Faceting API, we had to introduce a "unique sub-branch identifying" field and to propagate it all the way down the sub-branch. Here we actually do not even make use of it, so that part of data pre-processing becomes unnecessary.
bjqfacet?q={!parent which=path:2.blog-posts.comments}path:*.comments*keywords&rows=0&facet=true&child.facet.field=text&wt=json&indent=true
# And — hooray! — it has returned the proper counts by "comment" documents showing that "Solr" is mention in all 3 comments of our toy dataset.
```

[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Solr Join

```bash
export SOLR_HOME=~/datalayer/opt/solr-7.6.0 && \
  $SOLR_HOME/bin/solr create -c join -shards 1 -replicationFactor 1 -p 8983 -force
```

```bash
curl http://localhost:8983/solr/join/update?commitWithin=500 -d '{ delete: { query: "*:*" } }'
curl http://localhost:8983/solr/admin/collections?action=DELETE -d 'name=join'
```

For people who are used to SQL, it's important to note that Joins in Solr are not really equivalent to SQL Joins because no information about the table being joined "from" is carried forward into the final result.  A more appropriate SQL analogy would be an "inner query".

This Solr request...

```bash
/solr/collection1/select ? fl=xxx,yyy & q={!join from=inner_id to=outer_id}zzz:vvv
```

...iss comparable to this SQL statement...

```sql
SELECT xxx, yyy
FROM collection1
WHERE outer_id IN (SELECT inner_id FROM collection1 where zzz = "vvv")
```

```bash
curl http://localhost:8983/solr/join/update?commitWithin=500 -H 'Content-type:text/csv' -d '
id,region_s,sales_i
1,east,100000
2,west,200000
3,north,300000
4,south,400000
'
```

```bash
curl http://localhost:8983/solr/join/update?commitWithin=500 -H 'Content-type:text/csv' -d '
id,name_s,loc_region_s,salary_i,mgr_s
5,chris,east,100000,yes
6,jen,west,200000,yes
7,james,east,75000,no
8,ruby,north,50000,yes
9,charlotte,west,120000,yes
'
```

```bash
curl http://localhost:8983/solr/join/query -d '
{
  params: {
    q : "{!join from=loc_region_s to=region_s fromIndex=join}mgr_s:yes",
  }
}
'
```

```bash
curl http://localhost:8983/solr/join/query -d '
{
  params: {
    q : "{!join from=loc_region_s to=region_s fromIndex=join}salary_i:[120000 TO 120000]",
  }
}
'
```

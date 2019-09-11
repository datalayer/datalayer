import os, logging, pysolr

solr = None

def __init_solr():
    pysolr.ZooKeeper.CLUSTER_STATE = '/collections/datalayer/state.json'
    zookeeper = pysolr.ZooKeeper(os.getenv('DLA_SOLR_ZK_HOST'))
    global solr
    solr = pysolr.SolrCloud(zookeeper, "datalayer", always_commit=True)

def index_tweet(tweet):
    logging.info('Indexing Tweet Document: {}'.format(tweet))
    get_solr().add([tweet], commit=True)

def search_tweets(q):
    logging.info('Search Tweets Query: {}'.format(q))
    docs = get_solr().search(q, sort='date desc', rows=50)
    logging.info("Found {} document(s): {}".format(len(docs), docs))
    return docs

def get_solr():
    global solr
    if solr == None:
        __init_solr()
    return solr

import os
import logging
import pysolr

from dsp_utils import now_string


logger = logging.getLogger("__name__")


solr = None


def __init_solr():
#    pysolr.ZooKeeper.CLUSTER_STATE = '/collections/datalayer/state.json'
    zookeeper = pysolr.ZooKeeper(os.getenv('DSP_SOLR_ZK_HOST'))
    global solr
    solr = pysolr.SolrCloud(zookeeper, "datalayer", always_commit=True)


def __get_solr():
    global solr
    if solr == None:
        __init_solr()
    return solr


def index_tweet(tweet):
    logger.info('Indexing Tweet: {}'.format(tweet))
    __get_solr().add([tweet], commit=True)


def search_tweets(q):
    logging.info('Search Tweets Query: {}'.format(q))
    tweets = __get_solr().search(q, sort='date desc', rows=50)
    logger.info("Found {} Tweet(s): {}".format(len(tweets), tweets))
    return tweets

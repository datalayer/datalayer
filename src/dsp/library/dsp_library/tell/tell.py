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


def index_tell(tell):
    tell['type_s'] = 'tell'
    tell['last_update_ts_dt'] = now_string()
    logger.info(f'Indexing Tell: {tell}')
    __get_solr().add([tell], commit=True)


def update_tell(tell):
    logger.info(f'Update Tell: {tell}')
    tell['last_update_ts_dt'] = now_string()
    """
    __get_solr().add(
        [tell],
        commit = True,
        fieldUpdates = {
            'title_t': 'set',
            'description_t': 'set',
            'source_t': 'set',
            'outputshot_url_s': 'set',
            }
        )
    """
    __get_solr().add([tell], commit=True)


def get_tell(username, ulid):
    tells = __get_solr().search(f'type_s:tell AND username_s:{username} AND ulid_s:{ulid}', rows=50)
    logger.info(f'Found {len(tells)} tell(s) for username: {username} and ulid_s: {ulid}')
    if len(tells) != 1:
        return None
    return list(tells)[0]


def get_published_tell(username, ulid):
    tells = __get_solr().search(f'type_s:tell AND published_b:true AND username_s:{username} AND ulid_s:{ulid}', rows=50)
    logger.info(f'Found {len(tells)} tell(s) for username: {username} and ulid_s: {ulid}')
    if len(tells) != 1:
        return None
    return list(tells)[0]


def get_tells(username):
    logging.info(f'Get Tells for username: {username}')
    tells = __get_solr().search(f'type_s:tell AND username_s:{username}', sort='last_update_ts_dt desc', rows=50)
    logger.info(f'Found {len(tells)} Tell(s): {tells}')
    return tells


def get_published_tells():
    logging.info(f'Get published Tells')
    tells = __get_solr().search(f'type_s:tell AND published_b:true', sort='last_update_ts_dt desc', rows=50)
    logger.info(f'Found {len(tells)} Tell(s): {tells}')
    return tells


def publish_tell(tell):
    logger.info(f'Publish Tell: {tell}')
    tell['last_update_ts_dt'] = now_string()
    tell['last_publish_ts_dt'] = now_string()
    tell['published_b'] = True
    __get_solr().add([tell], commit=True)


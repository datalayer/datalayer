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


def index_user(user):
    user['type_s'] = "user"
    user['last_update_ts_dt'] = now_string()
    logger.debug(f'Indexing User: {user}')
    __get_solr().add([user], commit=True)


def update_user(user):
    logger.info(f'Update User: {user}')
    __get_solr().add([user], commit=True)


def check_user_exists(username):
    return get_user_by_username(username) != None


def get_user_by_username(username):
    users = __get_solr().search(f'type_s:user AND username_s:{username}', rows=50)
    logger.info(f'Found {len(users)} user(s) for username {username}')
    if len(users) != 1:
        return None
    return list(users)[0]


def get_users_by_email(email):
    users = __get_solr().search(f'type_s:user AND email_s:{email}', rows=50)
    logger.debug(f'Found {len(users)} user(s) for email: {email}')
    for user in users:
        logger.debug(f"user: {user.get('id', None)}")
    return users


def search_users(q, rows = 50):
    logger.info('Search Users: {}'.format(q))
    users = __get_solr().search(f'type_s:user AND {q}', sort='create_timestamp_dt desc', rows=rows)
    logger.debug(f'Found {len(users)} {users}')
    return users


def delete_users(q):
    CONFIRM = f'I CONFIRM I WANT TO PERMANENTLY DELETE USERS WITH ID LIKE {q}'
    print('You have requested a irreversible operation.')
    print('Ensure you have a backup of users if you want to restore them.')
    print('Please confirm this by typing the following.')
    confirm = input(f'{CONFIRM}: ')
    if confirm == CONFIRM:
        _ = __get_solr().delete(q=f'type_s:user AND {q}', commit=True)
#        print(f'Users have been deleted: {d}')
        print(f'Users deletion request has been executed.')
    else:
        print('Confirm does not match - Users will NOT be deleted...')

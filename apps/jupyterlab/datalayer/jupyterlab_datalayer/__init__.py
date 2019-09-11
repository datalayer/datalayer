"""
Module to initialize the Notebook Server Extension.
"""
import os, logging, json
from jupyterlab_datalayer.handlers import setup_handlers

def _jupyter_server_extension_paths():
    """
    Declare Jupyter Server Extension Paths.
    """
    return [{
        'module': 'jupyterlab_datalayer',
    }]

def _jupyter_nbextension_paths():
    """
    Declare Jupyter Notebook Extension Paths.
    """
    return [{
        "section": "notebook", 
        "dest": "jupyterlab_datalayer",
    }]

def load_jupyter_server_extension(nbapp):
    """
    Load JupyterLab Datalayer Server Extension.
    """    
    logging.basicConfig(level=logging.DEBUG)
    logging.info('Loading Jupyter Datalayer Server Extension.')
    openid_user_info_env = os.getenv('OPENID_USER_INFO')
    logging.info('openid_user_info_env: {}'.format(openid_user_info_env))
    if openid_user_info_env:
        import ast
        dic_j = ast.literal_eval(openid_user_info_env.replace(' false', ' False').replace(' true', ' True'))
        openid_user_info = json.loads(json.dumps(dic_j))
        print('openid_user_info: {}'.format(openid_user_info))
        logging.info('openid_user_info: {}'.format(openid_user_info))
        nbapp.web_app.settings['openid_user_info'] = openid_user_info
    else:
        nbapp.web_app.settings['openid_user_info'] = {
            'preferred_username': 'jdoe',
            'given_name': 'Jane',
            'family_name': 'Doe',
            'name': 'Jane Doe',
            }
    nbapp.web_app.settings['xsrf_cookies'] = False
    nbapp.web_app.settings['twitter_consumer_key'] = os.environ['DLA_TWITTER_CONSUMER_KEY']
    nbapp.web_app.settings['twitter_consumer_secret'] = os.environ['DLA_TWITTER_CONSUMER_SECRET']
    nbapp.web_app.settings['cookie_secret'] = "32oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo="
    nbapp.web_app.settings['debug'] = True
    setup_handlers(nbapp.web_app)

"""
Module to initialize the Notebook Server Extension.
"""
import os, logging, json
from .handlers import setup_handlers

def _jupyter_server_extension_paths():
    """
    Declare Jupyter Server Extension Paths.
    """
    return [{
        'module': 'jupyter_twitter',
    }]

def _jupyter_nbextension_paths():
    """
    Declare Jupyter Notebook Extension Paths.
    """
    return [{
        "section": "notebook", 
        "dest": "jupyter_twitter",
    }]

def load_jupyter_server_extension(app):
    """
    Load JupyterLab Twitter Server Extension.
    """    
    logging.basicConfig(level=logging.DEBUG)
    logging.info('Loading Jupyter Twitter Server Extension.')
    openid_user_info_env = os.getenv('OPENID_USER_INFO')
    logging.info('openid_user_info_env: {}'.format(openid_user_info_env))
    if openid_user_info_env:
        import ast
        dic_j = ast.literal_eval(openid_user_info_env.replace(' false', ' False').replace(' true', ' True'))
        openid_user_info = json.loads(json.dumps(dic_j))
        print('openid_user_info: {}'.format(openid_user_info))
        logging.info('openid_user_info: {}'.format(openid_user_info))
        app.web_app.settings['openid_user_info'] = openid_user_info
    else:
        app.web_app.settings['openid_user_info'] = {
            'preferred_username': 'jdoe',
            'given_name': 'Jane',
            'family_name': 'Doe',
            'name': 'Jane Doe',
            }
    app.web_app.settings['xsrf_cookies'] = False
    app.web_app.settings['twitter_consumer_key'] = os.environ['DLA_TWITTER_CONSUMER_KEY']
    app.web_app.settings['twitter_consumer_secret'] = os.environ['DLA_TWITTER_CONSUMER_SECRET']
    app.web_app.settings['cookie_secret'] = "32oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo="
    app.web_app.settings['debug'] = True
    setup_handlers(app.web_app)

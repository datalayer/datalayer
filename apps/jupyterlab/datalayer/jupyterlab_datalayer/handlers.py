import logging
from jupyterlab_datalayer.twitter import TwitterInfoHandler, TwitterAuthHandler, TwitterAuthPopupHandler, TwitterSignoutHandler, TwitterPostHandler
from jupyterlab_datalayer.content import ContentHandler
from notebook.utils import url_path_join as ujoin

def setup_handlers(web_app):
    """
    Function used to setup all of the Handlers.
    """
    datalayer_handlers = [
        (r"/twitter/info", TwitterInfoHandler),
        (r"/twitter/auth", TwitterAuthHandler),
        (r"/twitter/auth/popup", TwitterAuthPopupHandler),
        (r"/twitter/signout", TwitterSignoutHandler),
        (r"/twitter/post", TwitterPostHandler),
        (r"/content", ContentHandler),
    ]
    # Add the base url to our paths.
    base_url = web_app.settings['base_url']
    datalayer_handlers = [
        (ujoin(base_url, x[0]), x[1])
        for x in datalayer_handlers
    ]
    logging.info('Base URL: {}'.format(base_url))
    logging.info(datalayer_handlers)
    web_app.add_handlers('.*', datalayer_handlers)

import logging
from .twitter import TwitterInfoHandler, TwitterAuthHandler, TwitterAuthPopupHandler, TwitterSignoutHandler, TwitterPostHandler
from .content import ContentHandler
from notebook.utils import url_path_join as ujoin

def setup_handlers(web_app):
    """
    Function used to setup all of the Handlers.
    """
    twitter_handlers = [
        (r"/twitter/info", TwitterInfoHandler),
        (r"/twitter/auth", TwitterAuthHandler),
        (r"/twitter/auth/popup", TwitterAuthPopupHandler),
        (r"/twitter/signout", TwitterSignoutHandler),
        (r"/twitter/post", TwitterPostHandler),
        (r"/content", ContentHandler),
    ]
    # Add the base url to our paths.
    base_url = web_app.settings['base_url']
    twitter_handlers = [
        (ujoin(base_url, x[0]), x[1])
        for x in twitter_handlers
    ]
    logging.info('Base URL: {}'.format(base_url))
    logging.info(twitter_handlers)
    web_app.add_handlers('.*', twitter_handlers)

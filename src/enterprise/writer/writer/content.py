import logging, os, sys, json, datetime, uuid, traceback
import tornado.httpserver, tornado.ioloop, tornado.options, tornado.web, tornado.gen, tornado.auth
from tornado.options import define, options
from notebook.base.handlers import APIHandler

class BaseHandler(APIHandler):
#    @tornado.gen.coroutine
    def get_current_user(self):
        twitter_user = self.get_secure_cookie("twitter_user")
        if twitter_user:
            return tornado.escape.json_decode(twitter_user)
        return None

class ContentHandler(BaseHandler):
    @tornado.gen.coroutine
    def post(self):
        body = tornado.escape.json_decode(self.request.body)
        path = body['path']
        contents_manager = self.settings['contents_manager']
        notebook = contents_manager.get(path)
        logging.info('Notebook: {}'.format(notebook))
        logging.info('Notebook Content: {}'.format(notebook['content']))
        text = []
        for cell in notebook['content']['cells']:
            logging.info('--- {}'.format(cell))
            if 'source' in cell and 'cell_type' in cell:
                if cell['cell_type'] == 'code' or cell['cell_type'] == 'markdown':
                    text.append(cell['source'])
        texts = '\n'.join(text)
        logging.info(texts)
        self.write({'success': True, 'path': path, 'texts': texts})

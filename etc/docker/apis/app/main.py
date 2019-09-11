import os
import tornado.ioloop, tornado.web
from swagger_ui import utils

class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self, *args, **kwargs):
        self.set_header("Content-Security-Policy", "upgrade-insecure-requests")
        
class PingHandler(BaseHandler):
    def get(self, *args, **kwargs):
        return self.write('<h1>Pong</h1>')

def make_app():
    return tornado.web.Application([
        (r'/api/ping', PingHandler),
    ])

def tornado_api_doc(app, config_path, url_prefix=r'/api/doc', title='API doc'):
    from tornado.web import RequestHandler, StaticFileHandler

    class ApiBaseHandler(RequestHandler):
        def set_default_headers(self, *args, **kwargs):
            self.set_header("Content-Security-Policy", "upgrade-insecure-requests")

    class SwaggerIndexHandler(ApiBaseHandler):
        def get(self, *args, **kwargs):
            return self.write(utils.render_html(url_prefix=url_prefix, title=title))

    class SwaggerConfigHandler(ApiBaseHandler):
        def get(self, *args, **kwargs):
            return self.write(utils.load_swagger_config(config_path=config_path,
                                                        host=self.request.host))

    handlers = [(url_prefix, SwaggerIndexHandler),
                (r'%s/swagger.json' % url_prefix, SwaggerConfigHandler),
                (r'%s/(.+)' % url_prefix, StaticFileHandler, {'path': utils.get_static_dir()})]
    app.add_handlers('.*', handlers)

if __name__ == '__main__':

    app = make_app()
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    config_path = os.path.join(cur_dir, 'spec.yaml')

    print('Starting API Doc.')
    tornado_api_doc(
        app, 
        config_path=config_path,
        url_prefix='/api/doc',
        title='API doc',
        )

    PORT = 8989
    app.listen(PORT)
    print('Server listening on port {} - Browse http://localhost:{}/api/doc'.format(PORT, PORT))
    tornado.ioloop.IOLoop.current().start()

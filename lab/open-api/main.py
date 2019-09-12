import os
import tornado.ioloop, tornado.web

class HelloWorldHandler(tornado.web.RequestHandler):
    def get(self, *args, **kwargs):
        return self.write('Hello World!!!')

def make_app():
    return tornado.web.Application([
        (r'/hello/world', HelloWorldHandler),
    ])

if __name__ == '__main__':

    app = make_app()
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    config_path = os.path.join(cur_dir, 'spec.yaml')

    print('Starting API Doc.')
    from swagger_ui import tornado_api_doc
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

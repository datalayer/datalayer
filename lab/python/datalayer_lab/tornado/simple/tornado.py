import os
import tornado.ioloop, tornado.web, tornado.httpserver

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/(.*)", tornado.web.StaticFileHandler, {"path": "./..", "default_filename": "index.min.html"}),
        ]
        settings = dict(
            cookie_secret=os.urandom(32),
            debug=True,
        )
        tornado.web.Application.__init__(self, handlers, **settings)

if __name__ == '__main__':
    app = Application()
    http_server = tornado.httpserver.HTTPServer(app)
    PORT = 9600
    http_server.listen(PORT)
    print('Server listening on port {} - Browse http://localhost:{}'.format(PORT, PORT))
    tornado.ioloop.IOLoop.instance().start()

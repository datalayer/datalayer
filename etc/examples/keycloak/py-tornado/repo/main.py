import json
import os
from handlers.base import MainHandler
from tornado import web, ioloop

settings = {
    "autoreload": True,
    "static_path": os.path.join(os.path.dirname(__file__), "static"),
    "open_id_certs_url": "http://localhost:8080/auth/realms/datalayer/protocol/openid-connect/certs",
    "login_url": "/login",
}


def make_app():
    return web.Application([
        (r"/", MainHandler),
    ], **settings)

if __name__ == "__main__":
    app = make_app()
    print('Starting Tornado Server.')
    app.listen(8888)
    ioloop.IOLoop.current().start()
#!/usr/bin/env python3

import logging, os, json, sys
import tornado.httpserver, tornado.ioloop, tornado.options, tornado.web, tornado.gen, tornado.auth
from tornado.options import define, options

define("port", default=8888, help="run on the given port", type=int)

class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        user_json = self.get_secure_cookie("twitter_user")
        if user_json == None:
            return None
        return tornado.escape.json_decode(user_json)

class MainHandler(BaseHandler, tornado.auth.TwitterMixin):
    @tornado.gen.coroutine
    def get(self):
        self.render('index.html')

class TwitterAuthHandler(BaseHandler, tornado.auth.TwitterMixin):
    @tornado.gen.coroutine
    def get(self):
        if self.get_argument("oauth_token", None):
            user = yield self.get_authenticated_user()
            print(user)
            twitter_user = {'name': user['name'], 'screen_name': user['screen_name'], 'username': user['screen_name']}
            self.set_secure_cookie("twitter_user", tornado.escape.json_encode(twitter_user))
            self.set_secure_cookie("twitter_user_access", tornado.escape.json_encode(user['access_token']))
            self.redirect("/")
        else:
            yield self.authorize_redirect(callback_uri='http://localhost:8888/twitter/auth')

class TwitterAuthPopupHandler(BaseHandler, tornado.auth.TwitterMixin):
    @tornado.gen.coroutine
    def get(self):
        if self.get_argument("oauth_token", None):
            user = yield self.get_authenticated_user()
            twitter_user = {'name': user['name'], 'screen_name': user['screen_name'], 'username': user['screen_name']}
            self.set_secure_cookie("twitter_user", tornado.escape.json_encode(twitter_user))
            self.set_secure_cookie("twitter_user_access", tornado.escape.json_encode(user['access_token']))
            self.write("""
                <!doctype html>
                <html lang="en">
                <head>
                    <title>Close Me</title>
                    <script type="text/javascript">
                        window.opener.postMessage({twitterAuth: true}, '*');
                        window.close();
                    </script>
                </head>
                <body>
                </body>
                </html>
            """)
        else:
            yield self.authorize_redirect(callback_uri='http://localhost:8888/twitter/auth/popup')

class TwitterSignoutHandler(BaseHandler, tornado.auth.TwitterMixin):
    @tornado.gen.coroutine
    def get(self):
        self.clear_cookie("twitter_user")
        self.clear_cookie("twitter_user_access")
        self.redirect("/")

class TwitterInfoHandler(BaseHandler, tornado.auth.TwitterMixin):
    @tornado.gen.coroutine
    def get(self):
        self.set_header('Content-Type', 'application/json')
        if not self.current_user:
            self.write({'name': '', 'screen_name': '', 'username': ''})
            return
        self.write(json.dumps(self.current_user, indent=1, sort_keys=True))
        
class TwitterPostHandler(BaseHandler, tornado.auth.TwitterMixin):
    @tornado.web.authenticated
    @tornado.gen.coroutine
    def post(self):
        try:
            status = tornado.escape.json_decode(self.request.body)
            new_entry = yield self.twitter_request(
                "/statuses/update",
                post_args={"status": status['status']},
                access_token=tornado.escape.json_decode(self.get_secure_cookie('twitter_user_access'))
                )
            print(new_entry)
            if not new_entry:
                # Call failed; perhaps missing permission?
                self.write(json.dumps("""{ 'success': 'false' }""", indent=1, sort_keys=True))
                return
            res={}
            res['success']='true'
            res['status']=new_entry
            self.write(json.dumps(res, indent=1, sort_keys=True))
        except:
            self.write(json.dumps("""{ 'success': 'false' }""", indent=1, sort_keys=True))

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/", MainHandler),
            (r"/twitter/info", TwitterInfoHandler),
            (r"/twitter/auth", TwitterAuthHandler),
            (r"/twitter/auth/popup", TwitterAuthPopupHandler),
            (r"/twitter/signout", TwitterSignoutHandler),
            (r"/twitter/post", TwitterPostHandler),
            (r"/(.*)", tornado.web.StaticFileHandler, {"path": "."}),
        ]
        settings = dict(
            twitter_consumer_key=os.environ['DLA_TWITTER_CONSUMER_KEY'],
            twitter_consumer_secret=os.environ['DLA_TWITTER_CONSUMER_SECRET'],
#            cookie_secret=os.environ['jupyterhub_cookie_secret'],
#            cookie_secret="32oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",
            cookie_secret=os.urandom(32),
            login_url="/twitter/auth",
            debug=True,
        )
        tornado.web.Application.__init__(self, handlers, **settings)

if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = Application()
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    print('Tornado Server starting on port ' + str(options.port))
    tornado.ioloop.IOLoop.instance().start()

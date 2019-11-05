import tornado.ioloop
import tornado.web

class Main(tornado.web.RequestHandler):
        def get_current_user(self):
                return self.get_secure_cookie("user").decode("utf-8")

        def get(self):
                if not self.current_user:
                        self.redirect("/")
                        return
                username = self.current_user
                self.write('Hi there, '+ username)

class Login(Main):
        def get(self):
                self.render('index.html')
        def post(self):
                print(self.get_argument("username"))
                self.set_secure_cookie("user", self.get_argument("username"))
                self.redirect("/user")

application = tornado.web.Application([
                (r"/", Login),
                (r"/user", Main),
                (r"/(style\.css)",tornado.web.StaticFileHandler, {"path": "./css/"}),
        ],
        debug=True, 
        cookie_secret="61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo="
        )

if __name__ == "__main__":
    application.listen(8888)
    print('open http://localhost:8888')
    tornado.ioloop.IOLoop.instance().start()

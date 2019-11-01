from tornado import web
from .auth import AuthenticatedRequestHandler

class MainHandler(AuthenticatedRequestHandler):
    @web.authenticated
    def get(self):
        self.write('Hi ' + self.current_user['preferred_username'])

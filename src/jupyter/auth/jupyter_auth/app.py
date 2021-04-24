import os
import jinja2

from jupyter_server.extension.application import ExtensionApp, ExtensionAppJinjaMixin
from jupyter_server.utils import url_path_join

from .handlers import DefaultHandler, MeHandler, UsersHandler


class JupyterLabAuth(ExtensionApp):

    # The name of the extension.
    name = "jupyter_auth"

    # The url that your extension will serve its homepage.
    extension_url = '/jupyter_auth/default'

    # Should your extension expose other server extensions when launched directly?
    load_other_extensions = True

    def initialize_settings(self):
        self.log.info(f'{self.name} is enabled.')

    def initialize_handlers(self):
        self.handlers.extend([
            (r'/{}/default'.format(self.name), DefaultHandler),
            (r'/{}/me'.format(self.name), MeHandler),
            (r'/{}/users'.format(self.name), UsersHandler),
        ])

# Entry Point Definition

main = launch_new_instance = JupyterLabAuth.launch_instance

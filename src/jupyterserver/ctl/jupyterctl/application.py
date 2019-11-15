import os, jinja2
from jupyter_server.extension.application import ExtensionApp
from .handlers import DefaultHandler, TemplateHandler, ErrorHandler
from tornado.web import StaticFileHandler

# DEFAULT_STATIC_FILES_PATH = os.path.join(os.path.dirname(__file__), "static")
DEFAULT_STATIC_FILES_PATH = os.path.join(os.path.dirname(__file__), "./../build")
DEFAULT_TEMPLATE_FILES_PATH = os.path.join(os.path.dirname(__file__), "templates")

class JupyterCtl(ExtensionApp):
    
    # The name of the extension.
    extension_name = "jupyterctl"

    # Te url that your extension will serve its homepage.
    default_url = '/'

    # Should your extension expose other server extensions when launched directly?
    load_other_extensions = True

    # Local path to static files directory.
    static_paths = [
        DEFAULT_STATIC_FILES_PATH
    ]

    # Local path to templates directory.
    template_paths = [
        DEFAULT_TEMPLATE_FILES_PATH
    ]

    def initialize_handlers(self):
        self.handlers.extend([
            (r'/static/js/(.*)', StaticFileHandler, {'path': DEFAULT_STATIC_FILES_PATH + '/static/js'}),
            (r'/static/css/(.*)', StaticFileHandler, {'path': DEFAULT_STATIC_FILES_PATH + '/static/css'}),
            (r'/static/media/(.*)', StaticFileHandler, {'path': DEFAULT_STATIC_FILES_PATH + '/static/media'}),
            (r'/static/(.*)', StaticFileHandler, {'path': DEFAULT_STATIC_FILES_PATH}),
            (r'/{}/default'.format(self.extension_name), DefaultHandler),
            (r'/{}/template/(.*)$'.format(self.extension_name), TemplateHandler),
            (r'/(.*)', StaticFileHandler, {'path': DEFAULT_STATIC_FILES_PATH, 'default_filename': 'index.html'}),
            (r'/{}/(.*)', ErrorHandler)
        ])

    def initialize_templates(self):
        jenv_opt = {"autoescape": True}
        env = jinja2.Environment(
            loader=jinja2.FileSystemLoader(self.template_paths),
            extensions=["jinja2.ext.i18n"],
            **jenv_opt
        )
        template_settings = {"jupyterctl_jinja2_env": env}
        self.settings.update(**template_settings)

    def initialize_settings(self):
        pass

#-----------------------------------------------------------------------------
# Main entry point
#-----------------------------------------------------------------------------

main = launch_new_instance = JupyterCtl.launch_instance

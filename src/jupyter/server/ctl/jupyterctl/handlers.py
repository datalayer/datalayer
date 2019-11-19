from jupyter_server.extension.handler import ExtensionHandler

class DefaultHandler(ExtensionHandler):
    def get(self):
        self.write('<h1>Hello Jupyter - I am the default...</h1>')

class BaseTemplateHandler(ExtensionHandler):
    def get_template(self, path):
        """Return the jinja template object for a given name"""
        return self.settings['jupyterctl_jinja2_env'].get_template(path)

class TemplateHandler(BaseTemplateHandler):
    def get(self, path):
        self.write(self.render_template('simple1.html', path=path))

class ErrorHandler(BaseTemplateHandler):
    def get(self, path):
        self.write(self.render_template('error.html', path=path))

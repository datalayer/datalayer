from jupyter_server.extension.handler import ExtensionHandler

class Server1TemplateHandler(ExtensionHandler):
    
    def get_template(self, name):
        """Return the jinja template object for a given name"""
        return self.settings['server_1_jinja2_env'].get_template(name)

    def get(self):
#        print(self.get_template('server_1.html'))
        self.write(self.render_template('server_1.html'))

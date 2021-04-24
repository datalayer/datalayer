c.ServerApp.jpserver_extensions={
  'jupyterlab': True,
  'jupyter_auth': True,
  }
from jupyter_auth import github
c.ServerApp.login_handler_class=github.LoginHandler

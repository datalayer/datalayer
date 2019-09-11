import os

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex('c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')
c.JupyterHub.confirm_no_ssl = False
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'
# Set the log level by value or name.
c.JupyterHub.log_level = 'DEBUG'

# --- Users ---
c.Authenticator.admin_users = { os.environ['USER'] }
c.Authenticator.whitelist = { os.environ['USER'] }

# --- Authenticator ---
# The LocalAuthenticator is a special kind of authenticator that has the ability to manage users on the local system. 
# When you try to add a new user to the Hub, a LocalAuthenticator will check if the user already exists.
c.JupyterHub.authenticator_class = 'jupyterhub.auth.LocalAuthenticator'
# If you set the configuration value, create_system_users, to True in the configuration file, the LocalAuthenticator 
# has the privileges to add users to the system.
c.LocalAuthenticator.create_system_users = False

# --- Spawner ---
c.JupyterHub.spawner_class = 'jupyterhub.spawner.LocalProcessSpawner'
# c.Spawner.notebook_dir = '~/notebooks'
# c.Spawner.args = ['--debug', '--profile=PHYS131']
# c.Spawner.args = ['--NotebookApp.default_url=/notebooks/Welcome.ipynb']
# Enable debug-logging of the single-user server
c.Spawner.debug = True
# Enable debug-logging of the single-user server
c.LocalProcessSpawner.debug = True

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex('c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')
c.JupyterHub.confirm_no_ssl = False
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'

# --- Users ---
c.Authenticator.admin_users = {os.environ['USER']}
c.Authenticator.whitelist = set()

# --- Authenticator ---
from jupyterhub.auth import PAMAuthenticator
class ValidatingPAMAuthenticator(PAMAuthenticator):
    def validate_username(self, username):
        if (username == os.environ['USER']):
            return True
        print('Invalid username: ' + username)
        return False
c.JupyterHub.authenticator_class = ValidatingPAMAuthenticator
c.Authenticator.username_map  = {
  'service-name': 'localname'
}
c.Authenticator.username_pattern = r'd.*'

# --- Spawner ---
c.JupyterHub.spawner_class='sudospawner.SudoSpawner'
c.SudoSpawner.default_url = '/lab'

"""
JupyterHub config file enabling gist-access via environment variables

1. enable persisted auth_state
2. pass select auth_state to Spawner via environment variables
3. enable auth_state via `JUPYTERHUB_CRYPT_KEY` and `enable_auth_state = True`
"""

# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex('c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')
c.JupyterHub.confirm_no_ssl = True
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'

# --- Users ---
c.Authenticator.admin_users = { os.environ['USER'] }
c.Authenticator.whitelist = { os.environ['USER'] }

# --- Authenticator ---
from jupyterhub.auth import PAMAuthenticator
c.JupyterHub.authenticator_class = PAMAuthenticator
# c.PAMAuthenticator.open_sessions = False


import os
import warnings

from oauthenticator.github import GitHubOAuthenticator
from tornado import gen

# define our OAuthenticator with `.pre_spawn_start`
# for passing auth_state into the user environment

class GitHubEnvAuthenticator(GitHubOAuthenticator):

    @gen.coroutine
    def pre_spawn_start(self, user, spawner):
        auth_state = yield user.get_auth_state()
        import pprint
        pprint.pprint(auth_state)
        if not auth_state:
            # user has no auth state
            return
        # define some environment variables from auth_state
        spawner.environment['GITHUB_TOKEN'] = auth_state['access_token']
        spawner.environment['GITHUB_USER'] = auth_state['github_user']['login']
        spawner.environment['GITHUB_EMAIL'] = auth_state['github_user']['email']

c.GitHubOAuthenticator.scope = ['gist', 'user:email']
c.JupyterHub.authenticator_class = GitHubEnvAuthenticator

# enable authentication state
c.GitHubOAuthenticator.enable_auth_state = True

if 'JUPYTERHUB_CRYPT_KEY' not in os.environ:
    warnings.warn(
        "Need JUPYTERHUB_CRYPT_KEY env for persistent auth_state.\n"
        "    export JUPYTERHUB_CRYPT_KEY=$(openssl rand -hex 32)"
    )
    c.CryptKeeper.keys = [ os.urandom(32) ]

# launch with Docker
c.JupyterHub.spawner_class = 'simplespawner.DockerSpawner'
c.JupyterHub.hub_ip = '0.0.0.0'

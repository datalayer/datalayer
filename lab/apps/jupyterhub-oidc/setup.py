import os
from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))

VERSION = '0.0.1'

setup(
    name = 'jupyterhub_oidc',
    version = VERSION,
    packages = find_packages(),
    description = 'JupyterHub with OpenID Connect Authenticator',
    long_description = open('README.md').read(),
    setup_requires = [
        'pytest-runner',
        'pytest-pylint',
    ],
    install_requires = [
        'dockerspawner',
        'jupyter',
        'jupyterhub',
        'jwt',
        'oauthenticator',
        'pyjwt',
    ],
    tests_require = [ 
        'coverage==5.0a3',
        'pytest',
        'pytest-cov',
        'pylint==1.9.2',
     ],
    zip_safe = False
)

import os
from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))

VERSION = '0.0.1'

setup(
    name = 'tornado_oidc',
    version = VERSION,    
    packages = find_packages(),
    description = 'Tornado OpenID Connect Authentication Handler',
    long_description = open('README.md').read(),
    setup_requires = [
        'pytest-runner',
        'pytest-pylint',
    ],
    install_requires = [
        'tornado==5.1.1',
        'jwt==0.6.1',
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

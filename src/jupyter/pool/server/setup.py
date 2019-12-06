"""
Setup Module for Datalayer JupyterPool.
"""
import setuptools

VERSION = '0.0.1'

setuptools.setup(
    name = 'jupyterpool_server',
    version = VERSION,
    description = 'Datalayer JupyterPool',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    package_data = {
        'jupyterpool_server': [
            '*',
        ],
    },
    setup_requires = [
        'flask',
        'flask_oidc',
        'flask_cors',
        'ldap3',
        'requests'
    ],
    install_requires = [
        'flask',
        'flask_oidc',
        'flask_cors',
        'ldap3',
        'requests',
        'jupyterhub'
    ],
    tests_requires = [
        'pytest',
        'pytest-cov',
        'pylint',
    ],
)

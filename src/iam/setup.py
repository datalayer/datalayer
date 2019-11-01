"""
Setup Module for Datalayer IAM.
"""
import setuptools

VERSION = '0.0.1'

setuptools.setup(
    name = 'datalayer_iam',
    version = VERSION,
    description = 'Datalayer IAM',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    package_data = {
        'datalayer_iam': [
            '*',
        ],
    },
    setup_requires = [
        'flask',
        'flask_oidc',
        'flask_cors',
        'ldap3',
        'requests',
    ],
    install_requires = [
        'flask',
        'flask_oidc',
        'flask_cors',
        'ldap3',
        'requests',
    ],
    tests_requires = [
        'pytest',
        'pytest-cov',
        'pylint',
    ],
)

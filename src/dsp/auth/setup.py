"""
Setup Module for Datalayer DSP Auth.
"""
import setuptools

VERSION = '0.0.3'

setuptools.setup(
    name = 'dsp_auth',
    version = VERSION,
    description = 'Datalayer DSP Auth',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    package_data = {
        'dsp_auth': [
            '*',
        ],
    },
    install_requires = [
        'dsp_utils',
        'flask',
        'flask_cors',
        'flask_jwt_extended==4.1.0',
        'flask_oidc==1.4.0',
        'ldap3',
        'pysolr @ git+https://github.com/datalayer-contrib/pysolr@master#egg=pysolr'
        'kazoo',
        'requests',
    ],
    extras_require = {
        'test': [
            'pytest',
            'pytest-cov',
            'pylint',
        ]
    },
)

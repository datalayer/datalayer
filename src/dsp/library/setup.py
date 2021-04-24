"""
Setup Module for Datalayer DSP Library.
"""
import setuptools

VERSION = '0.0.3'

setuptools.setup(
    name = 'dsp_library',
    version = VERSION,
    description = 'Datalayer DSP Library',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    package_data = {
        'dsp_library': [
            '*',
        ],
    },
    install_requires = [
        'boto3',
        'dsp_auth',
        'dsp_utils',
        'flask',
        'flask_cors',
        'flask_jwt_extended==4.1.0',
        'flask_oidc==1.4.0',
        'ldap3',
        'pysolr @ git+https://github.com/datalayer-contrib/pysolr@master#egg=pysolr'
        'kazoo',
        'requests',
        'ulid-py',
    ],
    extras_require = {
        'test': [
            'pytest',
            'pytest-cov',
            'pylint',
        ]
    },
)

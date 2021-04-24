"""
Setup Module for Datalayer DSP Studio.
"""
import setuptools

VERSION = '0.0.3'

setuptools.setup(
    name = 'dsp_studio',
    version = VERSION,
    description = 'Datalayer DSP Studio',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    package_data = {
        'datalayer': [
            '*',
        ],
    },
    install_requires = [
        'flask',
        'flask_cors',
        'flask_jwt_extended==4.1.0',
        'flask_oidc==1.4.0',
    ],
    extras_require = {
        'test': [
            'pytest',
            'pytest-cov',
            'pylint',
        ]
    },
)

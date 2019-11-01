"""
Setup Module for Datalayer.
"""
import setuptools

VERSION = '0.0.1'

setuptools.setup(
    name = 'datalayer_studio',
    version = VERSION,
    description = 'Datalayer',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    package_data = {
        'datalayer': [
            '*',
        ],
    },
    setup_requires = [
        'flask',
    ],
    install_requires = [
        'flask',
    ],
    tests_requires = [
        'pytest',
        'pytest-cov',
        'pylint',
    ],
)

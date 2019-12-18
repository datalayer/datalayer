"""
Setup Module for Datalayer Library.
"""
import setuptools

VERSION = '0.0.1'

setuptools.setup(
    name = 'datalayer_library',
    version = VERSION,
    description = 'Datalayer Library',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    package_data = {
        'datalayer_library': [
            '*',
        ],
    },
    setup_requires = [
        'flask',
        'flask_oidc',
        'flask_cors',
        'requests',
        "kazoo",
        "simplejson",
    ],
    install_requires = [
        'flask',
        'flask_oidc',
        'flask_cors',
        'requests',
        "kazoo",
        "simplejson",
        "pysolr@ git+https://github.com/django-haystack/pysolr.git@master"
    ],
    tests_requires = [
        'pytest',
        'pytest-cov',
        'pylint',
    ],
)

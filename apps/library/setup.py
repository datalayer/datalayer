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
        "pysolr",
        "kazoo",
        "simplejson",
    ],
    install_requires = [
        'flask',
        'flask_oidc',
        'flask_cors',
        'requests',
        "pysolr",
        "kazoo",
        "simplejson",
    ],
    dependency_links = [
     "git+https://github.com/django-haystack/pysolr.git#egg=pysolr",
    ],
    tests_requires = [
        'pytest',
        'pytest-cov',
        'pylint',
    ],
)

"""Setup Module for Datalayer JupyterHub.
"""
import setuptools

VERSION = '0.0.1'

setuptools.setup(
    name = 'jupyterhub',
    version = VERSION,
    description = 'Datalayer JupyterHub',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    package_data = {
        'jupyterhub': [
            '*',
        ],
    },
    setup_requires = [
        'jupyterhub',
    ],
    install_requires = [
        'jupyterhub',
    ],
    tests_requires = [
        'pytest',
        'pytest-cov',
        'pylint',
    ],
)

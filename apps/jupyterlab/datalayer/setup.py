"""
Setup Module to setup Python Handlers for the JupyterLab Datalayer Plugin.
"""
import setuptools

VERSION = '0.0.1'

setuptools.setup(
    name = 'jupyterlab_datalayer',
    version = VERSION,
    description = 'JupyterLab Datalayer',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    package_data = {
        'jupyterlab_datalayer': [
            '*',
        ],
    },
    setup_requires = [
    ],
    install_requires = [
        'notebook',
        'psutil',
        'tornado==5.1.1',
        'twitter',
        'requests',
        'datalayer-library'
    ],
    tests_requires = [
        'pytest',
        'pytest-cov',
        'pylint',
    ],
)

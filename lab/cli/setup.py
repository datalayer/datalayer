"""
Setup Module for dla_cli.
"""
import setuptools

VERSION = '0.0.1'

setuptools.setup(
    name = 'dcli',
    version = VERSION,
    description = 'Datalayer Lab CLI',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    package_data = {
        'dcli': [
            '*',
        ],
    },
    setup_requires = [
        'requests',
    ],
    install_requires = [
        'configparser',
        'pathlib'
    ],
    tests_requires = [
        'pytest',
        'pytest-cov',
        'pylint',
    ],
    entry_points={
        'console_scripts': [
            'dcli=dcli.__main__:main',
        ]
    }
)

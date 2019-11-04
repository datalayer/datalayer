"""Setup Module for Datalayer Control.
"""
from setuptools import find_packages

VERSION = '0.0.1'

setuptools.setup(
    name = 'datalayerctl',
    version = VERSION,
    description = 'Datalayer Control',
    long_description = open('README.md').read(),
    packages = find_packages(),
    package_data = {
        'datalayerctl': [
            '*',
        ],
    },
    setup_requires = [
        'requests',
    ],
    install_requires = [
        'boto3',
        'docker',
        'kubernetes',
        'configparser',
        'urllib3',
        'pathlib',
        'requests',
    ],
    tests_requires = [
        'pytest',
        'pytest-cov',
        'pylint',
    ],
    entry_points={
        'console_scripts': [
            'datalayerctl=datalayerctl.__main__:main',
        ]
    }
)

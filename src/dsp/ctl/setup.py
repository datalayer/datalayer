"""Setup Module for Dsplayer Control.
"""
from setuptools import find_packages

VERSION = '0.0.1'

setuptools.setup(
    name = 'datalayer_dsp',
    version = VERSION,
    description = 'Datalayer Dsp',
    long_description = open('README.md').read(),
    packages = find_packages(),
    package_dsp = {
        'datalayer_dsp': [
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
            'data=datalayer_dsp.__main__:main',
        ]
    }
)

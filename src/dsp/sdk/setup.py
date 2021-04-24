"""Setup Module for Datalayer SDK.
"""
import setuptools

VERSION = '0.0.3'

setuptools.setup(
    name = 'dsp_sdk',
    version = VERSION,
    description = 'Datalayer SDK',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    package_dsp = {
        'dsp_sdk': [
            '*',
        ],
    },
    install_requires = [
        'boto3',
        'configparser',
        'dsp_utils',
        'docker',
        'kubernetes',
        'pandas',
        'pathlib',
        'requests',
        'urllib3',
    ],
    extras_require = {
        'test': [
            'pytest',
            'pytest-cov',
            'pylint',
        ]
    },
    entry_points={
        'console_scripts': [
            'dsp-sdk=dsp_sdk.__main__:main'
        ]
    }
)

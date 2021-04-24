"""Setup Module for Datalayer DSP Utis.
"""
import setuptools

VERSION = '0.0.3'

setuptools.setup(
    name = 'dsp_utils',
    version = VERSION,
    description = 'Datalayer DSP Utils',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    package_dsp = {
        'dsp_utils': [
            '*',
        ],
    },
    install_requires = [
        'boto3',
        'configparser',
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
            'dsp-utils=dsp_admin.__main__:main',
        ]
    }
)

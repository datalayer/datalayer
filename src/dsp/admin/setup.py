"""Setup Module for Datalayer DSP Admin.
"""
import setuptools

VERSION = '0.0.3'

setuptools.setup(
    name = 'dsp_admin',
    version = VERSION,
    description = 'Datalayer DSP Admin',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    package_dsp = {
        'dsp_admin': [
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
            'dsp-admin=dsp_admin.__main__:main',
            'dsp=dsp_admin.__main__:main',
        ]
    }
)

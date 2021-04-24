"""
Setup Module to setup Python Handlers for the Jupyter Twitter Plugin.
"""
import os, setuptools

VERSION = '0.0.3'

def get_data_files():
    """Get the data files for the package.
    """
    data_files = [
        ('etc/jupyter/jupyter_server_config.d', ['etc/jupyter/jupyter_server_config.d/writer.json']),
    ]
    def add_data_files(path):
        for (dirpath, dirnames, filenames) in os.walk(path):
            if filenames:
                data_files.append((dirpath, [os.path.join(dirpath, filename) for filename in filenames]))
    # Add all static and templates folders.
    add_data_files('lib')
    return data_files

setuptools.setup(
    name = 'writer',
    version = VERSION,
    description = 'Jupyter Twitter',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    include_package_data = True,
    data_files = get_data_files(),
#    package_data = {
#        'writer': [
#            '*',
#        ],
#    },
    platforms="Linux, Mac OS X, Windows",
    install_requires = [
        'nbclassic',
        'jupyter_server @ git+https://github.com/jupyter/jupyter_server@master',
        'psutil',
        'tornado==5.1.1',
        'twitter',
        'requests',
        'datalayer-library'
    ],
    extras_require = {
        'test': [
            'pytest',
            'pytest-cov',
            'pylint',
        ]
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    entry_points = {
        'console_scripts': [
             'jupyter-twitter = writer.application:main',
        ]
    },
)

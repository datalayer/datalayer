"""
Setup Module to setup Python Handlers for the Jupyter Twitter Plugin.
"""
import os, setuptools

VERSION = '0.0.1'

def get_data_files():
    """Get the data files for the package.
    """
    data_files = [
        ('etc/jupyter/jupyter_server_config.d', ['etc/jupyter/jupyter_server_config.d/jupyter_twitter.json']),
    ]
    def add_data_files(path):
        for (dirpath, dirnames, filenames) in os.walk(path):
            if filenames:
                data_files.append((dirpath, [os.path.join(dirpath, filename) for filename in filenames]))
    # Add all static and templates folders.
    add_data_files('lib')
    return data_files

setuptools.setup(
    name = 'jupyter_twitter',
    version = VERSION,
    description = 'Jupyter Twitter',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    include_package_data = True,
    data_files = get_data_files(),
#    package_data = {
#        'jupyter_twitter': [
#            '*',
#        ],
#    },
    platforms="Linux, Mac OS X, Windows",
    setup_requires = [
    ],
    install_requires = [
        'nbclassic',
        'jupyter_server @ git+https://github.com/Zsailer/jupyter_server/@master'
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
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    entry_points = {
        'console_scripts': [
             'jupyter-twitter = jupyter_twitter.application:main',
        ]
    },
)

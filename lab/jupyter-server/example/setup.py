import setuptools

VERSION = '0.0.1'

setuptools.setup(
    name = 'jupyter_server_1',
    version = VERSION,
    description = 'Datalayer',
    long_description = open('README.md').read(),
#    packages = setuptools.find_packages(),
    packages = [
        'jupyter_server_1',
    ],
    package_data = {
        'jupyter_server_1': [
            '*',
        ],
    },
    setup_requires = [
    ],
    install_requires = [
        'jupyter_server==0.2.0.dev0',
        'jinja2',
    ],
    tests_requires = [
        'pytest',
        'pytest-cov',
        'pylint',
    ],
    python_requires = '>=3.5',
    data_files = [
        ('etc/jupyter/jupyter_server_config.d', ['etc/jupyter/jupyter_server_config.d/server_1.json']),
    ],
    entry_points = {
        'console_scripts': [
             'jupyter-server-1 = jupyter_server_1.application:main'
        ]
    },
)

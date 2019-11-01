import setuptools

VERSION = '0.0.1'

setuptools.setup(
    name = 'dlab',
    version = VERSION,
    description = 'Datalayer',
    long_description = open('README.md').read(),
#    packages = setuptools.find_packages(),
    packages = [
        'dlab',
    ],
    package_data = {
        'dlab': [
            '*',
        ],
    },
    setup_requires = [
    ],
    install_requires = [
        'notebook',
        'psutil',
    ],
    tests_requires = [
        'pytest',
        'pytest-cov',
        'pylint',
    ],
)

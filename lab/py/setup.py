import setuptools

VERSION = '0.0.1'

setuptools.setup(
    name = 'datalayer_lab',
    version = VERSION,
    description = 'Datalayer',
    long_description = open('README.md').read(),
#    packages = setuptools.find_packages(),
    packages = [
        'datalayer_lab',
    ],
    package_data = {
        'datalayer_lab': [
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

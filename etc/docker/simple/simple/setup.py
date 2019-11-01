import setuptools

VERSION = '0.0.3'

setuptools.setup(
    name = 'simple',
    version = VERSION,
    description = '',
    long_description = '',
    packages = [
        '.',
    ],
    setup_requires = [
    ],
    install_requires = [
        'tornado==4.3'
    ],
)

import setuptools

VERSION = '0.0.1'

setuptools.setup(
    name = 'dlab_jserver',
    version = VERSION,
    description = 'Datalayer Lab for Jupyter Kernel Management',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    install_requires = [
        'jupyter_server @ git+https://github.com/jupyter/jupyter_server@master',
        'nbclassic @ git+https://github.com/zsailer/nbclassic@master',
        'notebook @ git+https://github.com/zsailer/notebook@notebook-ext',
    ],
)

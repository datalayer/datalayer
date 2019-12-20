import setuptools

VERSION = '0.0.1'

setuptools.setup(
    name = 'dlab_jkm',
    version = VERSION,
    description = 'Datalayer Lab for Jupyter Kernel Management',
    long_description = open('README.md').read(),
    packages = setuptools.find_packages(),
    install_requires = [
        'jupyter_protocol @ git+https://github.com/takluyver/jupyter_protocol@master',
        'jupyter_kernel_mgmt @ git+https://github.com/takluyver/jupyter_kernel_mgmt@master',
        'jupyter_server @ git+https://github.com/kevin-bates/jupyter_server@jupyter-kernel-mgmt',
        'nbclassic @ git+https://github.com/zsailer/nbclassic@master',
        'notebook @ git+https://github.com/zsailer/notebook@notebook-ext',
    ],
)

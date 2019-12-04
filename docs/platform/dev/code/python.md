---
title: Python
---

# Python

> [Python](https://www.python.org) is a programming language that lets you work quickly and integrate systems more effectively.

## Conda

[Download](https://conda.io/miniconda.html).

[Packages](https://repo.continuum.io/pkgs/main/linux-64).

[Conda Forge](https://conda-forge.org).

```bash
conda info
conda info --envs
```

```bash
conda config --add channels conda-forge
```

```bash
conda create -n py2 python=2.7
conda activate py2
```

```bash
conda create --name datalayer
conda create -n datalayer python=3.6
conda create -n datalayer scipy
conda create -n datalayer python=3.6 scipy=0.15.0 astroid babel
conda install -n datalayer pip
conda upgrade -n datalayer pip
```

```bash
conda config --add channels conda-forge
conda install -n datalayer spark-testing-base
```

```bash
source activate datalayer
source deactivate datalayer
```

```bash
conda list
conda list --explicit
conda list --explicit > specs.txt
conda create --name datalayer2 --file specs.txt
```

```bash
conda create --name datalayer2 --clone datalayer
```

```bash
source deactivate datalayer
conda remove --name datalayer --all
```

```yaml
name: jupyterhub-tutorial
channels:
  - conda-forge
dependencies:
  - python = 3.6
  - jupyterhub == 0.7.2
  - notebook >= 5.0
  - ipykernel >= 4.3
  - jupyterlab = 0.26
  - netifaces
  - pip:
    - oauthenticator
    - dockerspawner
```

```bash
conda env export > environment.yml
conda env create -f environment.yml
```

```bash
pip install -e .
pip install -e .[test]
python setup.py develop
```

## Pip

```bash
python -m pip install --user numpy scipy matplotlib ipython jupyter pandas sympy nose
pip freeze
pip freeze > requirements.txt
pip install -e .
python -m pip install --user -e .
```

## Run Inline

```bash
python <<EOF
print('Hello, World!')
EOF
```

## Setup

```bash
python setup.py check
python setup.py clean
python setup.py build
python setup.py develop
python setup.py install
python setup.py sdist
python setup.py bdist
python setup.py bdist_wheel
python setup.py bdist_egg
```

```
python3 setup.py --help-commands
Standard commands:
  build             build everything needed to install
  build_py          "build" pure Python modules (copy to build directory)
  build_ext         build C/C++ extensions (compile/link to build directory)
  build_clib        build C/C++ libraries used by Python extensions
  build_scripts     "build" scripts (copy and fixup #! line)
  clean             clean up temporary files from 'build' command
  install           install everything from build directory
  install_lib       install all Python modules (extensions and pure Python)
  install_headers   install C/C++ header files
  install_scripts   install scripts (Python or otherwise)
  install_data      install data files
  sdist             create a source distribution (tarball, zip file, etc.)
  register          register the distribution with the Python package index
  bdist             create a built (binary) distribution
  bdist_dumb        create a "dumb" built distribution
  bdist_rpm         create an RPM distribution
  bdist_wininst     create an executable installer for MS Windows
  check             perform some checks on the package
  upload            upload binary package to PyPI

Extra commands:
  js                fetch static client-side components with bower
  css               compile CSS from LESS
  bdist_egg         create an "egg" distribution
  develop           install package in 'development mode'
  bdist_wheel       create a wheel distribution
  build_sphinx      Build Sphinx documentation
  alias             define a shortcut to invoke one or more commands
  dist_info         create a .dist-info directory
  easy_install      Find/get/install Python packages
  egg_info          create a distribution's .egg-info directory
  install_egg_info  Install an .egg-info directory for the package
  rotate            delete older distributions, keeping N newest files
  saveopts          save supplied options to setup.cfg or other config file
  setopt            set an option in setup.cfg or another config file
  test              run unit tests after in-place build
  upload_docs       Upload documentation to PyPI
  isort             Run isort on modules registered in setuptools
  compile_catalog   compile message catalogs to binary MO files
  extract_messages  extract localizable strings from the project code
  init_catalog      create a new catalog based on a POT file
  update_catalog    update message catalogs from a POT file

usage: setup.py [global_opts] cmd1 [cmd1_opts] [cmd2 [cmd2_opts] ...]
   or: setup.py --help [cmd1 cmd2 ...]
   or: setup.py --help-commands
   or: setup.py cmd --help
```

## Test

```bash
python -m pytest -s -v tests/test_foo.py
```

## PyPI

```bash
pip install --upgrade --pre pyqt5
python3 -m pip install --upgrade --pre pyqt5
pip list
pip show pyqt5
```

```bash
# Arbitrary working directory name.
root-dir
  setup.py
  setup.cfg
  LICENSE.txt
  README.md
  mypackage
    __init__.py
    foo.py
    bar.py
    baz.py
```

```bash
python setup.py sdist
python setup.py bdist_wheel
```

```bash
# Upload to PyPI Test.
python setup.py register -r pypitest
python setup.py sdist upload -r pypitest
```

```bash
# See http://jupyter-notebook.readthedocs.io/en/stable/development_release.html
twine upload dist/*
```

```bash
# Upload to PyPI Live.
python setup.py register -r pypi
python setup.py sdist upload -r pypi
```

```bash
python -m easy_install foo.egg
```

## HTTP Server

```bash
python3 -m http.server 8900
```

# Dependencies

```bash
export PYTHONPATH=msgpack.egg:deps.zip:$PYTHONPATH
```

```python
import sys
sys.path.insert(0, 'msgpack.egg')
import msgpack
from msgpack._packer import Packer
```

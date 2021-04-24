# Jupyterlab Extensions Quirkshop - Extensions in JupyterLab 3

## Environment

```bash
conda deactivate && \
  conda remove -y --all -n quirkshop-dev
# Create your conda environment.
conda create -y \
  -n quirkshop-dev \
  python=3.8 \
  twine \
  nodejs=14.5.0 \
  yarn=1.22.5 \
  cookiecutter
conda activate quirkshop-dev
pip install jupyter_packaging
```

```bash
# Clone and build jupyterlab.
git clone https://github.com/jupyterlab/jupyterlab --depth 1 -b master && \
  cd jupyterlab && \
  pip install -e . && \
  jupyter lab build && \
  cd ..
```

## Develop

```bash
# Create an extension skeleton with a cookiecutter.
cookiecutter \
  https://github.com/jupyterlab/extension-cookiecutter-ts \
  --config-file cookiecutter.yaml \
  --checkout 3.0
```

```bash
# Build the extension and link for dev in shell 1.
cd quirkshop_jlab3_react && \
  jupyter labextension develop --overwrite
```

```bash
# List extensions.
jupyter labextension list
pip list | grep quirkshop
```

```bash
# Run and watch jupyterlab in shell 1.
jlpm watch
```

```bash
# Run and watch jupyterlab in shell 2.
# Look at the remote entry javascript, a webpack5 feature.
conda activate quirkshop-dev && \
  mkdir ~/notebooks && \
  jupyter lab \
    --dev-mode \
    --watch \
    --notebook-dir=~/notebooks \
    --ServerApp.token= \
    --extensions-in-dev-mode
```

## Build

```bash
# Generate sourcemaps.
jupyter labextension build --development True .
jupyter lab build --minimize=False
```

```bash
# Do not generate sourcemaps.
jupyter labextension build .
jupyter lab build
```

## Publish

```bash
cd quirkshop_jlab3_react && \
  jlpm build:lib && \
  npm publish --access public
```

```bash
cd quirkshop_jlab3_react && \
  pip install -e . && \
  python setup.py sdist bdist_wheel && \
  twine upload dist/*
```

## Use

```bash
conda deactivate && \
  conda remove -y --all -n quirkshop-user
# Create your conda environment.
conda create -y \
  -n quirkshop-user \
  python=3.8 \
  nodejs=14.5.0
conda activate quirkshop-user
pip install --pre jupyterlab==3.0.0rc6
```

```bash
pip install jupyterlab_widgets==1.0.0a6
jupyter labextension list
# Check the Extension Manager.
jupyter lab --notebook-dir=~/notebooks
```

```bash
# https://pypi.org/project/jupyterlab-geojs/#history
pip search "jupyterlab extension"
pip search "JupyterLab3"
```

```bash
pip install quirkshop-jlab3-react
jupyter labextension list
jupyter lab --notebook-dir=~/notebooks/04-ipywidgets
```

## Migrate

```bash
# Add a migration guide from 2.x to 3.x for extension authors
# - https://github.com/jupyterlab/jupyterlab/issues/9118
# - https://github.com/jupyterlab/jupyterlab/pull/9162
python -m jupyterlab.upgrade_extension .
```

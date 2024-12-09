# Building the Conda Package

## Install Miniconda

Installing Miniconda on Linux.

```bash
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

## Create a conda-build Environment

Create an environment containing the requirements for building the package.

```bash
conda create -y -n conda-build \
  python=3.11 \
  conda-verify conda-build conda-verify \
  anaconda-client \
  nodejs=18.17.1 yarn=3.5.0 jupyterlab
```

## Conda Recipe

The conda recipe, `meta.yaml` contains the basic instructions to build a conda package out of the source code.

The most important section is the `requirements:run` section, which should ideally contain all the requirements listed in `pyproject.toml`. 

However, since none of the dependencies are available as conda packages and also not published to a conda channel, it was necessary to add a section `build:scripts` which contains a `post-link.sh` script responsible for adding the dependencies via PyPi.

> TODO Build conda packages for datalayer_core jupyter_iam jupyter_kernels and publish them to a conda channel, so the `post-link.sh` script can be removed. Once they are available they should be added to the `requirements:run` section.

## Prepare

```bash
conda activate conda-build
```

Login on Anaconda.org.

```bash
anaconda login
Using Anaconda API: https://api.anaconda.org
Username: ...
```

Configure for automatic upload.

```bash
conda config --set anaconda_upload yes
```

## Build and Publish

The script `publish-conda.sh` is responsible for building and publishing the package out of the conda recipe and optionally upload the package to a conda channel.

The script sets variables:

- DATALAYER_VERSION: Should be adjusted so the package version is correctly set.
- ORGANIZATION: The Anaconda.org organization to use for the upload.

Optional: CONDA_CHANNEL_NAME: Holds the name of the channel in which the package should be uploaded.

In the end the package will be located in `conda-recipe/out/noarch` and the file extension is a `tar.bz2`.

```bash
conda activate conda-build
```

```bash
./publish-conda.sh
```

In case of issue, purge the build

```bash
conda build purge
```

# Building conda package
## Requirements
* miniconda
* conda-build
### Installing miniconda on linux
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
### Creating an environment containing all the requirements for building the package
```bash
conda create -n condabuildenv python=3.11 conda-build anaconda-client -y
```

## The conda recipe
The conda recipe, `meta.yaml` contains the basic instructions to build a conda package out of the source code.

The most important section is the `requirements:run` section, which should ideally contain all the requirements listed in `pyproject.toml`. 

However, since none of the dependencies are available as conda packages and also not published to a conda channel, it was necessary to add a section `build:scripts` which contains a `post-link.sh` script responsible for adding the dependencies via PyPi.

### TODO
Build conda packages and publish them to a conda channel, so the `post-link.sh` script can be removed. Once they are available they should be added to the `requirements:run` section.

## Build package script
The script `build-conda.sh` is responsible for building the package out of the conda recipe and optionally upload the package to a conda channel.

The script sets two variables:
* **DATALAYER_VERSION**: Should be adjusted so the package version is correctly set
* **CONDA_CHANNEL_NAME**: Holds the name of the channel in which the package should be uploaded

In the end the package will be located in `conda-recipe/out/noarch/` and the file extension is a `tar.bz2`.

### Running and Building 
```bash
conda activate condabuildenv
./build-conda.sh
```

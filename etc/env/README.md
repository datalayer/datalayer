[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Environement

## Development Environment Example

```bash
ENV=datalayer && \
  conda env create 
#    -n $ENV \
    -f environment.yml
ENV=datalayer && \
  conda deactivate && \
  conda remove -n $ENV -y --all && \
  conda create -y -n $ENV \
    python=3.7 \
    nodejs=10.16.3 \
    yarn=1.19.1 \
    jupyterlab=1.2.3
#    nodejs=13.0.0 \
ENV=datalayer && \
  conda activate $ENV && \
  export PATH=/opt/miniconda3/envs/$ENV/bin:$PATH
```

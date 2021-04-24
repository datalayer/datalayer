#!/usr/bin/env bash -l

CONDA_ENV=datalayer

#. $DLAHOME/opt/miniconda3/etc/profile.d/conda.sh && \
conda activate ${CONDA_ENV} && \
  export PATH=/opt/datalayer/opt/miniconda3/envs/${CONDA_ENV}/bin:$PATH

export PATH=/opt/miniconda3/envs/${CONDA_ENV}/bin:${PATH}

echo $PATH

exec jupyterhub-singleuser "$@"

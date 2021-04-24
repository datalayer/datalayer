---
title: JupyterLab Conda
---

# Conda

- https://github.com/conda-forge/jupyterlab-feedstock

- https://github.com/jtpio/jupyterlab-python-file-feedstock
- https://github.com/conda-forge/jupyterlab-python-file-feedstock

## Conda Environments

- https://github.com/anaconda-platform/nb_conda_kernels
- https://fcollonval.medium.com/conda-environments-in-jupyter-ecosystem-without-pain-e9fab3992fb7

```bash
conda install nb_conda_kernels
jupyter lab \
  --NotebookApp.token= \
  --NotebookApp.kernel_spec_manager_class=nb_conda_kernels.CondaKernelSpecManager \
  --notebook-dir=~/notebooks
```

```json
{
  "NotebookApp": {
    "nbserver_extensions": {
      "nb_conda": true,
      "jupyterlab_twitter": true
    },
    "kernel_spec_manager_class": "nb_conda_kernels.CondaKernelSpecManager"
  }
}
```


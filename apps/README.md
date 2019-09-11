[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Applications

This folder contains applications and libraries that build up the Datalayer Science Platform.

+ [IAM](./iam).
+ [JupyterLab AirFlow](./jupyterlab/airflow) extension.
+ [JupyterLab Datalayer](./jupyterlab/datalayer) extension.
+ [JupyterLab Kernels](./jupyterlab/kernels) extension.
+ [JupyterLab MLFlow](./jupyterlab/mlflow) extension.
+ [JupyterLab Office](./jupyterlab/office) extension.
+ [JupyterLab Reactify](./jupyterlab/reactify) extension.
+ [JupyterLab Spark](./jupyterlab/spark) extension.
+ [JupyterPool](./jupyterpool).
+ [Kuber](./kuber).
+ [Library](./library).
+ [UI](./ui).
+ [VoilaHub](./voilahub).

## Develop with Lerna

```bash
cd $DLAHOME/apps/ui/app && \
  lerna bootstrap && \
  yarn start
```

---
name: datalayer/paper:features
version: latest
description: Datalayer Features
picto:
  - variable: picto
server:
  image: datalayer/server:base:latest
  size: S
  prune: 1h
kernel:
  image: datalayer/kernel:base:latest
  size: S
  prune: 1h
datasets:
  - input:
    - variable : iris
      image: datalayer/dataset:iris:latest
  - output:
    - name: iris_predict
      variable: iris_predict
      type: pandas
      format: csv
      separator: ;
init:
  - load.ipynb
snippets:
  - |
  import ...
---

[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Datalayer Environment

Datalayer Environment

---
title: JupyterLab Benchmarks
---

# JupyterLab Benchmarks

- https://github.com/jupyterlab/benchmarks

```bash
cd $DLAHOME/repos/jupyterlab-benchmarks
jlpm
# errorOutputs
# fixedDataTable
# largePlotly
# longOutput
# manyCells
# manyOutputs
# manyPlotly
env 'BENCHMARK_NOTEBOOKS=["longOutput", "manyOutputs"]' jlpm all
env 'BENCHMARK_NOTEBOOKS=["errorOutputs", "longOutput"]' jlpm all
env 'BENCHMARK_NOTEBOOKS=["manyCells", "longOutput"]' jlpm all
```

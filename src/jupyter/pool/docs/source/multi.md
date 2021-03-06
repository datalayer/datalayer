---
title: Multi Kernel
---

# Multi Kernel

[Discuss](https://github.com/jupyterlab/jupyterlab/issues/2815).

## All The Kernels

All The Kernels [GitHub](https://github.com/minrk/allthekernels) repository.

```
>scala 1+1
>R 1+1
```

## SoS Kernel

- https://vatlab.github.io/sos-docs
- https://vatlab.github.io/blog/post/sos-notebook
- https://github.com/jupyterlab/jupyterlab/issues/4314
- https://vatlab.github.io/blog/post/sos-notebook

## See Also

- https://github.com/jupyterlab/jupyterlab/issues/2815
- https://github.com/Microsoft/AzureNotebooks/issues/254

```bash
# cell 1
%load_ext julia.magic
# cell 2
%%julia
1 - 1
```

```bash
pip install rpy2
# You can then use the two languages together, and even pass variables in between.
%load_ext rpy2.ipython
%R require(ggplot2)
array([1], dtype=int32)
import pandas as pd
df = pd.DataFrame({
    'Letter': ['a', 'a', 'a', 'b', 'b', 'b', 'c', 'c', 'c'],
    'X': [4, 3, 5, 2, 1, 7, 7, 5, 9],
    'Y': [0, 4, 3, 6, 7, 10, 11, 9, 13],
    'Z': [1, 2, 3, 1, 2, 3, 1, 2, 3]
})
%%R -i df
ggplot(data = df) - geom_point(aes(x = X, y= Y, color = Letter, size = Z))
```

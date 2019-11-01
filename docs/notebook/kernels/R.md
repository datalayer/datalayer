---
title: R Kernel
---

# R Kernel

## IRKernel

IRkernel [GitHub](https://github.com/irkernel/irkernel) repository.

## Juniper

Juniper [GitHub](https://github.com/juniperkernel/juniperkernel) repository.

## Rpy2

```bash
pip install rpy2
# You can then use the two languages together, and even pass variables inbetween:
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
ggplot(data = df) + geom_point(aes(x = X, y= Y, color = Letter, size = Z))
```

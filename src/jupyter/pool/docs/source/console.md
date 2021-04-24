---
title: Jupyter Console
---

# Jupyter Console

```
CONSOLE --- KERNEL
```

## Console

[Jupyter Console](https://github.com/jupyter/jupyter_console).

```bashexi
pip install jupyter-console
jupyter console
```

```python
ok = True
if ok:
    print("that's cool!")
exit
```

## Kernel

```bash
jupyter kernel
```

```bash
# Without an ID, --existing will connect to the most recently started kernel.
jupyter console --existing
```

```bash
# jupyter console --existing $(jupyter --runtime-dir)/kernel-....json
jupyter console --existing kernel-....json
```

## QT Console

[Jupyter QtConsole](https://github.com/jupyter/qtconsole).

```bash
pip install qtconsole pyqt5
```

```bash
# ipython qtconsole
jupyter qtconsole
jupyter qtconsole --existing kernel-....json
```

```bash
pip install matplotlib scipy
```

```python
import numpy as np
from scipy.special import jn
from matplotlib.pyplot import plot
from math import pi
x = np.linspace(0,4*pi)

for i in range(6):
  plot(x, jn(1,x))

from mpl_toolkits.mplot3d import axes3d
import matplotlib.pyplot as plt
from matplotlib import cm
fig = plt.figure()
ax = fig.gca(projection='3d')
X, Y, Z = axes3d.get_test_data(0.05)
cset = ax.contour(X, Y, Z, cmap=cm.coolwarm)
ax.clabel(cset, fontsize=9, inline=1)
plt.show()
```

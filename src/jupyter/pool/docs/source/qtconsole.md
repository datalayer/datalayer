---
title: Jupyter QtConsole
---

# Jupyter QtConsole

```
QTCONSOLE --- KERNEL
```

```bash
conda activate jupyter && \
  pip install qtconsole pyqt5 && \
  jupyter qtconsole
```

```bash
jupyter kernel
```

```bash
jupyter qtconsole --existing $(jupyter --runtime-dir)/kernel-....json
```

With the IPython kernel, you can also run the `%qtconsole` magic in the notebook to open a Qt console connected to the same kernel.

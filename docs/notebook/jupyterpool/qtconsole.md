---
title: Jupyter QtConsole
---

# Jupyter QtConsole

```
QTCONSOLE --- KERNEL
```

```bash
conda activate jupyter && \
  pip install pyqt5 && \
  jupyter qtconsole
```

```bash
jupyter kernel
```

```bash
# jupyter console --existing $(jupyter --runtime-dir)/kernel-....json
jupyter qtconsole --existing kernel-....json
```

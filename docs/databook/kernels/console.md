---
title: Jupyter Console
---

# Jupyter Console

```
CONSOLE --- KERNEL
```

## Console

[Jupyter Console](https://github.com/jupyter/jupyter_console).

```bash
jupyter kernel
```

```bash
# jupyter console --existing $(jupyter --runtime-dir)/kernel-....json
jupyter console --existing kernel-....json
```

```bash
# Without an ID, --existing will connect to the most recently started kernel.
jupyter console --existing
```

## QtConsole

[Jupyter QtConsole](https://github.com/jupyter/qtconsole).

```bash
jupyter qtconsole --existing kernel-....json
```

---
title: Nteract Hydrogen
---

# Nteract Hydrogen

Hydrogen [GitHub](https://github.com/nteract/hydrogen) repository.

Hydrogen [Docs](https://nteract.gitbooks.io/hydrogen).

Nteract [Web Site](https://nteract.io/atom).

```bash
apm install hydrogen
```

```bash
cd $DLAHOME/repos/nteract-hydrogen
yarn install
# If I add `hydrogen:hot-reload-package` to `activationCommands` in `package.json`, it shows up, but then it also shows up when not in dev mode.
# Since it's not an activation command, hydrogen will need to be active before you can use it. That said, I've never been sure how that command works so I usually just reload window any time I want to refresh.
# And if I'm doing that a lot during development I write a test to at least make sure things will load.
```

## Kernels

Install the Nteract [Kernels](/nteract/kernels.md).

[No kernel for language python found` on Hydrogen run command](https://github.com/nteract/hydrogen/issues/243)

## Plugins

https://github.com/lgeiger/hydrogen-launcher
https://github.com/nikitakit/hydrogen-python
https://github.com/BenRussert/data-explorer
https://atom.io/packages/hydrogen-python

---
title: Nteract
---

# Nteract

Nteract [Web Site](https://nteract.io).
Nteract [GitHub](https://github.com/nteract/nteract) repository.
React [Components](https://components.nteract.io).
Typedoc [Packages](https://packages.nteract.io).
Content [Guide](https://content-guide.nteract.io).

## Build

```bash
cd $DLAHOME/repos/nteract && \
  yarn && \
  yarn build:packages
```

```bash
# Build and watch packages.
yarn build:packages:watch
# In another shell.
cd packages/kernel-relay && \
  yarn dev
```

```bash
# Build packages separately.
tsc -b packages/ansi-to-react
yarn build:only @nteract/actions
```

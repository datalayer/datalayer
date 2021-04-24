[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Material UI Themes for JupyterLab

This folder contains [Material UI Themes](https://material-ui.com/customization/theming) for [JupyterLab](https://github.com/jupyterlab/jupyterlab).

```bash
git clone https://github.com/datalayer/jupyterlab-mui-themes.git && \
  cd jupyterlab-mui-themes && \
  make install && \
  make build && \
  make storybook
```

The build can take up to one minute (depending on your machine).

The storybook will be available on http://localhost:9001 and showcases the themed JupyterLab widgets.

If feel like a developer, you can change the source code. The changes will be automatically built and displayed in your browser. You are welcome to open [issue](https://github.com/datalayer/jupyterlab-mui-themes/issues) and [pull requests](https://github.com/datalayer/jupyterlab-mui-themes/pulls).

To build a static storybook website, run `yarn build-storybook`. The generated website will be available under the `storybook/.out` folder.

```bash
yarn build-storybook && \
  open storybook/.out/index.html
```

To deep clean your local repository, run `make clean`.

More information on Material UI Theming can be found on:

- [Theming](https://material-ui.com/customization/theming)
- [Default Theme](https://material-ui.com/customization/default-theme)

---
title: JupyterLab Extensions
---

# JupyterLab Extensions

JupyterLab Extensions [Docs](https://jupyterlab.readthedocs.io/en/latest/user/extensions.html)

## Examples

+ [GitHub [1]](https://github.com/topics/jupyterlab-extension)
+ [GitHub [2]](https://github.com/search?utf8=%E2%9C%93&q=topic%3Ajupyterlab-extension&type=Repositories)
+ [GitHub [3]](https://github.com/SolarisYan?utf8=%E2%9C%93&tab=repositories&q=jupyterlab&type=&language=)
+ [TKP extensions](https://github.com/timkpaine/tkp_jupyterlab/blob/master/extensions.txt)

## Catalog

+ [404](https://github.com/afshin/custom404-extension)
+ [autoversion](https://github.com/timkpaine/jupyterlab_autoversion)
+ [bqplot](https://github.com/bloomberg/bqplot)
+ [celltags](https://github.com/jupyterlab/jupyterlab-celltags)
+ [celltests](https://github.com/timkpaine/jupyterlab_celltests)
+ [commenting](https://github.com/jupyterlab/jupyterlab-commenting)
+ [debugger](https://github.com/quantstack/jupyterlab-debugger)
+ [draw.io](https://github.com/quantstack/jupyterlab-drawio)
+ [easygit](https://github.com/jennalandy/jupyterlab-easygit)
+ [email](https://github.com/timkpaine/jupyterlab_email)
+ [file-tree](https://github.com/youngthejames/jupyterlab_filetree)
+ [git](https://github.com/jupyterlab/jupyterlab-git)
+ [github](https://github.com/jupyterlab/jupyterlab-github)
+ [go-to-definition](https://github.com/krassowski/jupyterlab-go-to-definition)
+ [hdf5](https://github.com/telamonian/jupyterlab-hdf)
+ [html-output](https://github.com/jupyterlab/jupyterlab/issues/3748)
+ [iframe](https://github.com/timkpaine/jupyterlab_iframe)
+ [ipycanvas](https://github.com/martinRenou/ipycanvas)
+ [ipysheet](https://github.com/quantstack/ipysheet)
+ [jupytext](https://github.com/mwouts/jupytext)
+ [kernelspy](https://github.com/vidartf/jupyterlab-kernelspy)
+ [latex](https://github.com/jupyterlab/jupyterlab-latex)
+ [monaco](https://github.com/jupyterlab/jupyterlab-monaco)
+ [nbresuse](https://github.com/yuvipanda/nbresuse)
+ [nglview](https://github.com/arose/nglview)
+ [python-file](https://github.com/jtpio/jupyterlab-python-file)
+ [qgrid](https://github.com/quantopian/qgrid)
+ [google-drive](https://github.com/jupyterlab/jupyterlab-google-drive)
+ [perspective](https://github.com/finos/perspective/tree/master/packages/perspective-jupyterlab)
+ [pkg-installer](https://github.com/jupytercalpoly/jupyterlab-pkginstaller)
+ [renderers](https://github.com/jupyterlab/jupyter-renderers)
+ [rise-slideshow](https://github.com/damianavila/rise) (not for jupyterlab yet)
+ [recents](https://github.com/tslaton/jupyterlab-recents)
+ [rich-text-mode](https://github.com/jupytercalpoly/jupyterlab-richtext-mode)
+ [run-all](https://github.com/jupyterlab/runall-extension)
+ [shortcutui](https://github.com/jupyterlab/jupyterlab-shortcutui)
+ [sidecar-output](https://github.com/jupyter-widgets/jupyterlab-sidecar)
+ [spark-monitor](https://github.com/krishnan-r/sparkmonitor)
+ [system-monitor](https://github.com/jtpio/jupyterlab-system-monitor)
+ [telemetry](https://github.com/jupyterlab/jupyterlab-telemetry)
+ [templates](https://github.com/timkpaine/jupyterlab_templates)
+ [tensorboard](https://github.com/lspvic/jupyter_tensorboard) (not for jupyterlab yet)
+ [toastify](https://github.com/fcollonval/jupyterlab_toastify)
+ [toc](https://github.com/jupyterlab/jupyterlab-toc)
+ [variable-inspector](https://github.com/lckr/jupyterlab-variableInspector)
+ [vim](https://github.com/jwkvam/jupyterlab-vim)
+ [voyager](https://github.com/altair-viz/jupyterlab_voyager)
+ [webrtc](https://github.com/maartenbreddels/ipywebrtc)
+ [xkcd](https://github.com/jupyterlab/jupyterlab_xkcd)

## Autocomplete

https://github.com/krassowski/jupyterlab-lsp

## Commands

```bash
jupyter labextension list
# The jupyter labextension install command builds the application, so you do not need to call build.
jupyter labextension install @jupyterlab/xkcd-extension
jupyter labextension disable @jupyterlab/xkcd-extension
jupyter labextension enable @jupyterlab/xkcd-extension
jupyter labextension uninstall @jupyterlab/xkcd-extension
```

```bash
jupyter labextension install $DLAHOME/repos/jupyterlab-xkcd --no-build
jupyter lab build
jupyter labextension uninstall @datalayer/jupyterlab-xkcd
```

```bash
jupyter labextension install @jupyterlab/google-drive
jupyter labextension install @jupyterlab/fasta-extension
jupyter labextension install @jupyterlab/geojson-extension
jupyter labextension install @jupyterlab/katex-extension
jupyter labextension install @jupyterlab/plotly-extension
# jupyter labextension install @jupyterlab/vega2-extension
jupyter labextension install jupyterlab-drawio
jupyter labextension install jupyterlab_voyager
```

```bash
cd $DLAHOME/repos/jupyterlab-git
pip install -e . --upgrade
jupyter serverextension enable --py jupyterlab_git --sys-prefix
jupyter labextension link .
```

```bash
cd $DLAHOME/repos/jupyterlab-github
pip install jupyterlab_github
jupyter labextension install @jupyterlab/github --no-build
jupyter labextension install @jupyterlab/github@0.5.1 --no-build
```

```bash
cd $DLAHOME/repos/jupyterlab-latex
pip install jupyterlab_latex
jupyter serverextension enable --py jupyterlab_latex --sys-prefix
jupyter labextension install @jupyterlab/latex
jupyter labextension install $DLAHOME/repos/jupyterlab-latex
```

## Activate Extension Manager

On the UI menu, select `Settings`, then `Enable Extension Manager (experimental)`.

On the UI menu, select `Settings`, then `Advanced Settings Editor`, then `Extension Manager` and set `enabled` to `true` in the `User Override` panel (click on the save icon at the right)

```bash
# Other option.
cat << EOF > ~/.jupyter/lab/user-settings/@jupyterlab/extensionmanager-extension/plugin.jupyterlab-settings
{
    "enabled": true
}
EOF
```

## Cookie Cutters

+ https://github.com/ktaletsk/cookiecutter-jupyterlab-extension-with-serverextension
+ https://github.com/fcollonval/jupyterlab_api_ext

## Debugger

+ https://github.com/jupyterlab/debugger
+ https://github.com/jupyterlab/debugger/pull/36

## No Webpack

+ [Create and install extensions without Webpack](https://github.com/jupyterlab/jupyterlab/issues/5672#issuecomment-526278264)
+ [Note on JupyterLab Build](https://discourse.jupyter.org/t/notes-on-jupyterlab-build/541)

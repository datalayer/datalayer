# Jupyter Formats

GitHub repo <https://github.com/datalayer/jupyter-formats>

## Jupyter Format

- Jupyter Format [GitHub](https://github.com/jupyter/nbformat) repository.
- Jupyter Format [Docs](https://nbformat.readthedocs.io).
- Jupyter Format [Description](https://nbformat.readthedocs.io/en/latest/format_description.html)
- Jupyter [Schema](https://github.com/jupyter/nbformat/blob/master/nbformat/v4/nbformat.v4.4.schema.json)

## Evolutions

Discussions

- https://discourse.jupyter.org/t/jupyter-and-github-alternative-file-format/4972/89
- https://discourse.jupyter.org/t/how-to-version-control-jupyter-notebooks/566/2
- https://discourse.jupyter.org/t/guidelines-for-submitting-a-notebook-for-peer-review-today/3533/11
- https://discourse.jupyter.org/t/should-jupyter-recommend-a-text-based-representation-of-the-notebook/3273/19
- https://discourse.jupyter.org/t/sustainability-of-the-ipynb-nbformat-document-format/3051/7


https://discourse.jupyter.org/t/jupyter-and-github-alternative-file-format/4972/94?u=echarles I’ve taken the liberty of including it here for easy comparison:

.mystnb
```{metadata}
---
nbformat_minor: 4
nbformat: 4
metadata:
  kernelspec:
    display_name: Python 3
    language: python
    name: python3
  language_info:
    codemirror_mode:
      name: ipython
      version: 3
    file_extension: .py
    mimetype: text/x-python
    name: python
    nbconvert_exporter: python
    pygments_lexer: ipython3
    version: 3.7.7
```
% cell
```{cell_meta}
---
cell_type: code
execution_count: 1
```
```{source}
print("foo")
```
```{output} stream
foo
```
% endcell
% cell
```{cell_meta}
---
cell_type: markdown
```
```{source}
testtest
---------

*test*

of markdown
```
% endcell

And that’s how the same notebook would look in my proposed format:

.jupyter
nbformat 4
nbformat_minor 4
code 1
    print("foo")
 stream stdout
    foo
markdown
    testtest
    ---------
    
    *test*
    
    of markdown
notebook_metadata
    {
     "kernelspec": {
      "display_name": "Python 3",
      "language": "python",
      "name": "python3"
     },
     "language_info": {
      "codemirror_mode": {
       "name": "ipython",
       "version": 3
      },
      "file_extension": ".py",
      "mimetype": "text/x-python",
      "name": "python",
      "nbconvert_exporter": "python",
      "pygments_lexer": "ipython3",
      "version": "3.8.3"
     }
    }

New JEP

- https://discourse.jupyter.org/t/proposed-jep-investigate-alternate-optional-file-formats/5073
- https://github.com/jupyter/enhancement-proposals/issues/60

Previous JEP

- [A new notebook document format for improved workflow integration](https://github.com/jupyter/enhancement-proposals/pull/4)
- https://khinsen.wordpress.com/2015/09/03/beyond-jupyter-whats-in-a-notebook

Julia JLNB

- https://github.com/julia-vscode/julia-vscode/pull/980

## Outputs

Oftentimes cell outputs (e.g. plots) stored in notebooks make it hard to read and manipulate the text representation of such notebooks. They make it also hard to use with version control systems (e.g. Git).

The proposed new format has the same problem, outputs are still stored in the notebook file, right next to the code cells that generated them.

It is recommended to remove all outputs from a notebook before storing it in version control or before doing any manipulations with a text editor.

Outputs can be removed manually in the Jupyter user interface, but there are also tools to remove outputs programmatically:

- https://github.com/kynan/nbstripout
- https://github.com/choldgraf/nbclean
- https://github.com/toobaz/ipynb_output_filter

If you want to present your notebooks publicly, you often want to show the outputs to your audience, without them having to run the notebooks themselves. So do you have to store your outputs after all?

No! You can still store your notebooks without outputs and run your notebooks on a server that will re-create the outputs. One tool to do this is:

- https://nbsphinx.readthedocs.io

This is a Sphinx extension that can convert a bunch of Jupyter notebooks (and other source files) to HTML and PDF pages (and other output formats). This way you have the best of both worlds: No outputs in your (version controlled) notebook files, but full outputs in the public HTML (or PDF) version.

There are still some cases where you do want to store the outputs for some reason. Because of the outputs, it is hard to see the changes to the text/code content of the notebook with traditional tools like diff. But luckily, there is a tool that can make meaningful “diffs” for Jupyter notebooks:

- https://github.com/jupyter/nbdime

- [React.js](./outputs/react.js.md)
- [Plot.ly](./outputs/plot.ly.md)
- [Vega](./outputs/vega.md)
- [Altair](./outputs/altair.md)
- [D3.js](./outputs/d3.js.md)
- [Python](./outputs/python.md)
- [R](./outputs/R.md)
- [Java](./outputs/java.md)
- [Scala](./outputs/scala.md)
- [WISP](./outputs/wisp.md)
- [Plugins](./outputs/plugins.md)

## Markdown

- https://en.wikipedia.org/wiki/Markdown
- https://www.markdownguide.org/cheat-sheet

- https://recommonmark.readthedocs.io
- https://github.com/readthedocs/recommonmark
- https://commonmark.org

Some alternative notebook formats are supported by the very popular projects https://github.com/aaren/notedown (Markdown) and https://github.com/mwouts/jupytext (Markdown, Rmd, Julia/Python/R-scripts etc.).

Those can be very useful, but none of them can store cell outputs, therefore they cannot be a full replacement for the current storage format.

## RST

- https://en.wikipedia.org/wiki/ReStructuredText
- https://docutils.sourceforge.io/rst.html

## YAML

- https://github.com/prabhuramachandran/ipyaml
- https://github.com/mdboom/nbconvert_vc

- https://matthiasbussonnier.com/posts/05-YAML%20Notebook.html
- http://droettboom.com/blog/2018/01/18/diffable-jupyter-notebooks/

## Sphinx

> Sphinx is a tool that makes it easy to create intelligent and beautiful documentation.

- https://www.sphinx-doc.org
- https://www.sphinx-doc.org/en/master/usage/quickstart.html
- https://docutils.sourceforge.io

Sphinx Themes

- https://github.com/pandas-dev/pydata-sphinx-theme
- https://github.com/spyder-ide/spyder-docs-sphinx-theme

Sphinx Jupyter

- https://github.com/jupyter/jupyter-sphinx
- https://jupyter-sphinx.readthedocs.io

- https://github.com/spatialaudio/nbsphinx
- https://github.com/spatialaudio/nbsphinx/issues/420
- https://nbsphinx.readthedocs.io

- https://jupinx.quantecon.org

Sphinx and React

- https://medium.com/@mtiller/rendering-sphinx-documentation-with-react-95b785293a76
- https://github.com/TakesxiSximada/sphinx-react-example
- https://github.com/codejamninja/node-sphinxdoc
- https://github.com/codejamninja/gatsbydoc
- https://github.com/rst-js/rst-js
- https://rst.js.org

Sphinx Gatsby

- https://github.com/codejamninja/gatsbydoc

- https://github.com/rafaelquintanilha/gatsby-transformer-ipynb
- https://www.teaglebuilt.com/gatsby&binder

- https://github.com/nteract/nteract/issues/4263
- https://github.com/gatsby-contrib/gatsby-transformer-ipynb
- https://www.npmjs.com/package/@nteract/gatsby-transformer-ipynb
- https://gatsby-contrib.github.io/gatsby-transformer-ipynb

## JupyterLab

- [How to override the markdown parser?](https://github.com/jupyterlab/jupyterlab/issues/8668)
- [JupyterLab Switch to Markdown for Documentation](https://github.com/jupyterlab/jupyterlab/issues/8677)

## Executablebooks

> Facilitate publishing computational narratives using Jupyter.

- https://executablebooks.org
- https://github.com/executablebooks

- https://github.com/executablebooks/quantecon-example
- https://executablebooks.github.io/quantecon-example
- https://github.com/executablebooks/quantecon-mini-example

- https://medium.com/swlh/the-new-jupyter-book-4028f054893f

Executablebooks JupyterBook

- https://jupyterbook.org
- https://jupyterbook.org/reference/cheatsheet.html
- https://jupyterbook.org/content-types/myst-notebooks.html
- https://jupyterbook.org/interactive/launchbuttons

- https://github.com/executablebooks/jupyter-book

- https://legacy.jupyterbook.org

Executablebooks MyST Parser

- [Jupyter Format](https://github.com/mgeier/jupyter-format)  
- [Mystify](https://github.com/machine-learning-apps/mystify)  
- [Simple Starter RTD Project](https://github.com/executablebooks/myst-parser/issues/186)  

> Markedly Structured Text

- https://myst-parser.readthedocs.io
- https://jupyterbook.org/content/myst.html

- https://github.com/executablebooks/myst-parser
- https://github.com/executablebooks/myst-parser.example-project

Executablebooks MyST VSCode

- https://github.com/executablebooks/myst-language-support
- https://marketplace.visualstudio.com/items?itemName=ExecutableBookProject.myst-highlight

Executablebooks MyST Notebook

> Read, write, and execute Jupyter Notebooks in Sphinx

- https://myst-nb.readthedocs.io
- https://myst-nb.readthedocs.io/en/latest/use/markdown.html
- https://myst-nb.readthedocs.io/en/latest/examples/interactive.html

- https://github.com/executablebooks/myst-nb
- https://github.com/executablebooks/myst-nb/issues/12
- https://github.com/executablebooks/myst-nb.example-project

Executablebooks Sphinx Book Theme

- https://sphinx-book-theme.readthedocs.io
- https://github.com/executablebooks/sphinx-book-theme

Executablebooks Jupyter Cache

- https://jupyter-cache.readthedocs.io
- https://github.com/executablebooks/jupyter-cache

Executablebooks PDF

- https://github.com/executablebooks/jupyter-book/issues/70
- https://github.com/executablebooks/jupyter-book/issues/267
- https://github.com/executablebooks/jupyter-book/pull/279
- https://github.com/executablebooks/jupyter-book/issues/229
- https://github.com/executablebooks/jupyter-book/issues/904

Executablebooks Markdown-it-py

> Markdown parser done right. Fast and easy to extend

- https://markdown-it-py.readthedocs.io
- https://markdown-it-py.readthedocs.io/en/latest/security.html

- https://github.com/executablebooks/markdown-it-py

- https://github.com/markdown-it/markdown-it
- https://markdown-it.github.io

Executablebooks Markdown-it-MyST

> Javascript markdown parser for MyST based on markdown-it

- https://github.com/executablebooks/markdown-it-myst
- https://github.com/executablebooks/meta/issues/70

Executablebooks TheBe

- https://thebe.readthedocs.io/en/latest
- https://github.com/executablebooks/thebe

Executablebooks Sphinx Extensions

> Tools in the Sphinx ecosystem for writing beautiful online books and documents

- https://github.com/executablebooks/sphinx-thebe
- https://sphinx-thebe.readthedocs.io

- https://github.com/executablebooks/sphinx-panels
- https://sphinx-panels.readthedocs.io

- https://github.com/executablebooks/sphinx-copybutton
- https://sphinx-copybutton.readthedocs.io

- https://github.com/executablebooks/sphinx-togglebutton
- https://sphinx-togglebutton.readthedocs.io

Executablebooks Jupytext

- https://jupytext.readthedocs.io/en/latest/formats.html#myst-markdown

Executablebooks RST to MyST

- https://github.com/quantecon/sphinxcontrib-rst2myst

Executablebooks Cookie Cutter

- https://github.com/ubc-mds/cookiecutter-jupyter-book

Executablebooks Commenting

- https://jupyterbook.org/interactive/comments.html
- Hypothes.is https://sphinx-comments.readthedocs.io/en/latest/hypothesis.html

Executablebooks MySTify

> Jupyter backend for textual notebooks in MyST format

- https://github.com/machine-learning-apps/mystify

- By GitHub folks

```{metadata}
---
nbformat_minor: 4
nbformat: 4
metadata:
  kernelspec:
    display_name: Python 3
    language: python
    name: python3
  language_info:
    codemirror_mode:
      name: ipython
      version: 3
    file_extension: .py
    mimetype: text/x-python
    name: python
    nbconvert_exporter: python
    pygments_lexer: ipython3
    version: 3.7.7
```
% cell
```{cell_meta}
---
cell_type: code
execution_count: 1
```
```{source}
print("foo")
```
```{output} stream
foo
```
% endcell
% cell
```{cell_meta}
---
cell_type: markdown
```
```{source}
testtest
---------

*test*

of markdown
```
% endcell

## Jupyter Format

- https://github.com/mgeier/jupyter-format

- https://jupyter-format.readthedocs.io
- https://jupyter-format.readthedocs.io/en/latest/motivation.html

- https://mybinder.org/v2/gh/mgeier/jupyter-format/master 

If you want to test drive this checkout https://mybinder.org/v2/gh/mgeier/jupyter-format/master and open one of the existing .jupyter notebooks in the doc/ sub-directory.

This is what things look like if you add a plot to an existing notebook and the look at git diff (open a terminal and type `cd doc && git diff`)

nbformat 4
nbformat_minor 4
code 1
    print("foo")
 stream stdout
    foo
markdown
    testtest
    ---------
    
    *test*
    
    of markdown
notebook_metadata
    {
     "kernelspec": {
      "display_name": "Python 3",
      "language": "python",
      "name": "python3"
     },
     "language_info": {
      "codemirror_mode": {
       "name": "ipython",
       "version": 3
      },
      "file_extension": ".py",
      "mimetype": "text/x-python",
      "name": "python",
      "nbconvert_exporter": "python",
      "pygments_lexer": "ipython3",
      "version": "3.8.3"
     }
    }

## JupyText

- [JupyText](https://github.com/mwouts/jupytext)
- https://jupytext.readthedocs.io

- https://medium.com/capital-fund-management/automated-reports-with-jupyter-notebooks-using-jupytext-and-papermill-619e60c37330
- https://twitter.com/psychemedia/status/1146728326800859137

- [Jupytext compatible file formats](https://jupytext.readthedocs.io/en/latest/formats.html)

- [Hide inputs, include outputs in Markdown format](https://github.com/mwouts/jupytext/issues/220)
- [Hide metadata header in markdown](https://github.com/mwouts/jupytext/issues/527)

- https://github.com/goerz/jupytext.vim

- https://github.com/drivendataorg/nbautoexport

## Fast.ai

NbDev

- https://github.com/fastai/nbdev
- https://nbdev.fast.ai
- https://www.fast.ai/2019/12/02/nbdev

Fast Pages

- https://github.com/fastai/fastpages

## Pidgy

- https://github.com/deathbeds/pidgy
- https://deathbeds.github.io/pidgy
- https://pidgin-notebook.readthedocs.io

## Pweave

- https://github.com/mpastell/pweave
- http://mpastell.com/pweave

## Codebraid

- https://github.com/gpoore/codebraid

## Markdown Preamble / Front-matter

- https://gist.github.com/inc0/ff98d4eab2159a1fe8617e4799092611
- https://gist.githubusercontent.com/inc0/ff98d4eab2159a1fe8617e4799092611/raw/05c5799ad28ed56827345af8119702e12e03aa3f/amalthea.md

## Other Tools

- nbdime
- nbconvert
- jupyter-text
- jupyter-format
- reviewnb
- wrattler
- testbook
- nbviewer

## Output Specs

Discussion.

- [Feature Idea: A specification for notebook output dependencies](https://discourse.jupyter.org/t/feature-idea-a-specification-for-notebook-output-dependencies/8428/3)
- [Feature: save additional mime bundles in notebook](https://github.com/jupyter-widgets/ipywidgets/pull/3107)
- [Add metadata and APIs for determining reusable mimerenderers and dependencies](https://github.com/jupyterlab/jupyterlab/issues/9993)

Jupyter Output Spec.

- <https://github.com/datalayer-contrib/jupyter-output-spec>
- <https://github.com/blois/js-module-renderer>

Portable Widget.

- <https://github.com/nteract/nes/tree/master/portable-widgets>

`google.colab.kernel` Spec.

- <https://github.com/googlecolab/colabtools/blob/eb61c58715be10b0334af0e6f756105f0263cac7/packages/outputframe/lib/index.d.ts>

## Visualization

- https://blog.bitsrc.io/11-javascript-charts-and-data-visualization-libraries-for-2018-f01a283a5727
- https://towardsdatascience.com/jupyter-superpower-interactive-visualization-combo-with-python-ffc0adb37b7b

- http://idl.cs.washington.edu
- https://github.com/uwdata/falcon

## Mix

- https://github.com/hpcc-systems/visualization

## Dataframe

- https://github.com/quantopian/qgrid
- https://medium.com/@marekermk/take-a-better-look-at-the-pandas-dataframes-a8d6613a46a
- http://holoviews.org/reference/elements/bokeh/Table.html
- https://github.com/vaexio/vaex
- https://github.com/man-group/dtale
- https://github.com/tkrabel/bamboolib
- https://github.com/yifanwu/b2

## Sketch

- https://p5js.org
- https://github.com/gherciu/react-p5
- https://github.com/jtpio/sketches

## Network

- http://sigmajs.org
- http://js.cytoscape.org
- https://github.com/networkx/networkx
- https://github.com/idekerlab/cy-jupyterlab
- https://github.com/WestHealth/pyvis
- https://github.com/ucsd-ccbb/visJS2jupyter
- http://bl.ocks.org/jose187/4733747

## Screenshots

- https://github.com/niklasvh/html2canvas
- https://github.com/hongru/canvas2image
- https://github.com/tsayen/dom-to-image
- https://github.com/ariya/phantomjs/blob/master/examples/rasterize.js
- https://github.com/codesandbox/screenshotter

## Plugins

Create UI [Plugins](./plugins.md).

## Datasette

- https://github.com/simonw/datasette
- https://datasette.readthedocs.io
- https://github.com/simonw/jupyterserverproxy-datasette-demo

## Animated GIFs

- https://github.com/empet/MoviePy-gifs-and-videoclips-from-Plotly-plots/blob/master/MoviePy-gif-from-Plotly-Mesh3d.ipynb

## Maps

- https://python-visualization.github.io/folium

## Latex

- https://github.com/melissawm/qooltikz
- https://github.com/mkrphys/ipython-tikzmagic
- https://github.com/mkrphys/ipython-tikzmagic/blob/master/tikzmagic_test.ipynb
- https://texample.net
- https://texample.net/tikz/examples

- https://github.com/connorferster/handcalcs

## UML Diagrams

- https://github.com/mermaid-js/mermaid 
- https://graphviz.org

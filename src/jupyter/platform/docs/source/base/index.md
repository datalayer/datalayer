---
title: Jupyter
---

# Jupyter

Jupyter [GitHub](https://github.com/jupyter/jupyter) repository metapackage for installation, docs and chat.

<iframe src="https://ghbtns.com/github-btn.html?user=jupyter&repo=jupyter&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>

Jupyter [Docs](https://jupyter.readthedocs.io/en/latest).

Enhancement [Proposals](https://github.com/jupyter/enhancement-proposals) - https://jupyter.org/enhancement-proposals/README.html.

Beginner [Guide](https://jupyter-notebook-beginner-guide.readthedocs.io).

## Enhancement Proposal Guidelines

- https://github.com/jupyter/enhancement-proposals/blob/master/jupyter-enhancement-proposal-guidelines/jupyter-enhancement-proposal-guidelines.md

## Marketing

- https://github.com/jupyter/jupyter.github.io

## Usage

- https://twitter.com/betatim/status/1265591840939610113
- https://pg.ucsd.edu/publications/computational-notebooks-design-space_VLHCC-2020.pdf
- https://discourse.jupyter.org/t/any-recent-usage-polling-on-jupyter-lab-vs-notebook-usage/4344

## Survey

- https://www.jetbrains.com/lp/python-developers-survey-2019
- https://github.com/jupyter/surveys/tree/master/surveys/2015-12-notebook-ux

- Should we have a new UX study? Also, please have a look at the study "What’s Wrong with Computational Notebooks? Pain Points, Needs, and Design Opportunities" from Oregon State University, Microsoft and University of Tennessee-Knoxville.

- There are points (in interpretation and methodology) I disagree with, but still a valuable contribution https://web.eecs.utk.edu/~azh/pubs/Chattopadhyay2020CHI_NotebookPainpoints.pdf

## Why?

- https://www.youtube.com/watch?v=7jiPeIFXb6U
- https://towardsdatascience.com/5-reasons-why-you-should-switch-from-jupyter-notebook-to-scripts-cb3535ba9c95
- https://towardsdatascience.com/5-reasons-why-jupyter-notebooks-suck-4dc201e27086

## Design

- https://github.com/jupyter/design
- https://raw.githubusercontent.com/jupyter/design/master/logos/Square%20Logo/squarelogo-greytext-orangebody-greymoons/squarelogo-greytext-orangebody-greymoons.svg

## Reproducible

- [Literature around reproducibility and computational notebooks](https://nbviewer.jupyter.org/urls/gist.githubusercontent.com/tonyfast/98684f9ec9920c57e388fe747e8c481e/raw/d95e6229f0b17718c2cc96c1a8d81cfd12a37d97/notebook%2520links.ipynb)
- https://hpc.guix.info/blog/2019/10/towards-reproducible-jupyter-notebooks
- https://discourse.jupyter.org/t/guix-jupyter-towards-self-contained-reproducible-notebooks/2379

## RPC

- https://github.com/imjoy-team/imjoy-rpc

## Integration

- https://github.com/JohnOmernik/jupyter_integration_base
- https://github.com/JohnOmernik/jupyter_drill ...

## CLI

- https://github.com/calysto/nbplayer
- https://github.com/charlesaverill/satyrn

# Issues

- Data is too big to fit into memory on my machine/ server.
- Can’t see a list of my current variables.
- Lost data during failure or restart of kernel/ server.
- No grid view for manipulating/ filtering dataframes and arrays.
- Plaintext or environment variable management of database passwords/ keys/ secrets.
- Poor MVC/ ORM integrations (e.g. Django, Flask).

# Gather

- https://github.com/microsoft/gather

# Visualization

No built-in UI for creating charts.
Can't publish my charts as web-based dashboards.
Poor/ buggy support for my plotting tool.
Difficulty displaying highly dimensional data (e.g. array of array of arrays, too many rows/ columns to fit on screen).
Lacking templating support (e.g. Jinja2).

# Dashboard

Dash-Plotly.
Panel
Google Data Studio.
Grafana
Kibana.
Klipfolio.
Looker.
R Shiny.
Spotfire.
Tableau.
Voila.

# Collaboration

Share knowledge.
Feedback about my writing.
Feedback about my code.
Formal code review.
Integrate my code/ data with their downstream or upstream processes.
Edit/ contribute some of their own code.
Edit/ contribute some of their own writing.
Teach/ tutor them.
Peer programming.
Deploy my code/ model/ pipeline/ dashboard.
Other (please specify).

# Collaboration Challenges

Don't know what dependencies (versions of language, packages, extensions) a notebook uses.
Don't know/ have the data a notebook is supposed to use.
Poor support for our version control (git) system.
No built-in way to publish my notebook to a shared location.
Not being able to comment on notebooks. (0) Not a problem for me.	
No "track changes;" can't figure out what changed between notebook checkpoints/ versions.

# Challenges

Can't see hidden `.` files in file browser.
No native desktop app.
Can't collapse sections of a notebook hierarchically.
No modes for editing other Jupyter documents (e.g. MyST, Jupyter Book).
No global search.
Poor autocompletion (e.g. LSP, show methods/ attributes).
No progress bar for running long notebooks.
Don't know which cell failed in long notebook.
No marketplace for Extensions (e.g. 5 star ratings, browsable categories).

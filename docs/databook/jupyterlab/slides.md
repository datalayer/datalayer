---
title: JupyterLab Slides
---

# JupyterLab Slides

## Rise

+ [Rise](https://github.com/damianavila/rise) - Live Reveal.js Jupyter/IPython Slideshow Extension.
+ [Reveal.js](https://github.com/hakimel/reveal.js).

```python
pip install rise
```

+ [Presenting Code using Jupyter Notebook Slides](https://medium.com/@mjspeck/presenting-code-using-jupyter-notebook-slides-a8a3c3b59d67).

## JupyterLab

+ [Rise for JupyterLab [1]](https://github.com/jupyterlab/jupyterlab/issues/5018).
+ [Rise for JupyterLab [2]](https://github.com/damianavila/rise/issues/270).

## Export

```bash
#  --SlidesExporter.reveal_theme=serif \
#  --SlidesExporter.reveal_transition=none
jupyter nbconvert *.ipynb \
  --no-input \
  --to slides \
  --reveal-prefix=reveal.js \
  --post serve \
  --SlidesExporter.reveal_scroll=True
```

+ `SlidesExporter.reveal_theme`: Sets the theme to serif. There’s also the default and sky theme along with many others.
+ `SlidesExporter.reveal_scroll`: Sets the scrolling option to True. For big images or long cells scrolling options are helpful. It’s also helpful for visualizing dataframes.
+ `SlidesExporter.reveal_transition`: Sets the transition to None. I don’t like to use any transition effect because adding them creates a sort of jerkiness to the screen which I believe to be unsuitable for code. The optins are: none, fade, slide, convex, concave and zoom.

[Config Options](https://nbconvert.readthedocs.io/en/latest/config_options.html).

## See Also

+ https://github.com/jxnblk/mdx-deck

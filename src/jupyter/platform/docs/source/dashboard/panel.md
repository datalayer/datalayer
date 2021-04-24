---
title: Holoviz Panel
---

# Holoviz Panel

- [Panel](https://panel.holoviz.org)
- [GitHub](https://github.com/holoviz/panel)

- https://panel.holoviz.org/user_guide/Overview.html

- https://panel.holoviz.org/gallery/index.html
- https://panel.holoviz.org/reference/index.html

## See Also

- https://holoviz.org (previously PyViz)

## Awesome

- https://awesome-panel.org

## Blog Post

- https://medium.com/analytics-vidhya/how-to-create-an-interactive-dashboard-in-python-using-holoviz-panel-2de350b6d8df
- https://medium.com/@philipp.jfr/panel-announcement-2107c2b15f52

## IpyWidgets

- http://blog.holoviz.org/panel_0.7.0.html
- https://stackoverflow.com/questions/55971815/embedding-panel-app-within-flask-figure-not-updating-when-widget-changes
- https://github.com/ppwadhwa/panel-ipywidgets
- https://github.com/quansight/content-marketing/issues/88

## React

- https://panel.holoviz.org/reference/templates/React.html#templates-gallery-react

## Embed

- https://panel.holoviz.org/_modules/panel/io/embed.html

## Examples

- https://panel.holoviz.org/getting_started/index.html
- https://panel.holoviz.org/gallery/apis/stocks_hvplot.html

- https://foxnic.github.io/simple_dashboard.html

## Deploy

- https://panel.holoviz.org/user_guide/Deploy_and_Export.html
- https://panel.holoviz.org/user_guide/Server_Deployment.html

- https://github.com/holoviz/jupyter-panel-proxy

```bash
panel serve app.ipynb
panel serve app1.py app2.ipynb
panel serve apps/*.py
```

## Downnload HTML

To add this button and hide the code by default, create 2 new cells in your Notebook, one at the top (the very 1st cell) and one at the bottom (the very last cell) and make both cells of type ‘Raw NBConvert’:

In the top cell, copy-paste the following code:

```html
<!–– Hide code cells and show a button to allow user to show/hide code cells ––!>
<script>
  function code_toggle() {
    if (code_shown){
      $('div.input').hide('500');
      $('#toggleButton').val('Show Code')
    } else {
      $('div.input').show('500');
      $('#toggleButton').val('Hide Code')
    }
    code_shown = !code_shown
  }
  $( document ).ready(function(){
    code_shown=false; 
    $('div.input').hide()
  });
</script>
<form action="javascript:code_toggle()"><input type="submit" id="toggleButton" value="Show Code"></form>
```

In the bottom cell, copy-paste this:

```html
<!–– Hide JupyterNotebook cell numbers etc ––!>
<script>
  $(document).ready(function(){
    $('div.prompt').hide();
    $('div.back-to-top').hide();
    $('nav#menubar').hide();
    $('.breadcrumb').hide();
    $('.hidden-print').hide();
  });
</script>
<footer id="attribution" style="float:right; color:#999; background:#fff;">
Attribution: Created with Jupyter. Code toggle possible thanks to github.com/csaid.
</footer>
```

This includes an attribution to the GitHub account of the person (Chris Said) who created this code.

---
title: Jupyter Convert
---

# Jupyter Convert

Convert [GitHub](https://github.com/jupyter/nbconvert.git) repository.

Convert [Docs](https://nbconvert.readthedocs.io).

```bash
jupyter nbconvert iris.ipynb && \
  open iris.html
jupyter nbconvert --to markdown iris.ipynb && \
  open iris.md
```

Try this [Example](https://render.githubusercontent.com/view/ipynb?commit=1758c47273e680849e1f80ccca496859fd899683&enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f69626d2d65742f6a7570797465722d73616d706c65732f313735386334373237336536383038343965316638306363636134393638353966643839393638332f6d6c622f6d6c622d73616c61726965732e6970796e62&nwo=ibm-et%2Fjupyter-samples&path=mlb%2Fmlb-salaries.ipynb&repository_id=28919767&repository_type=Repository#d86d1f51-dad6-43c8-8ac0-4cc74530459c) on GitHub.

```bash
jupyter nbconvert -y --RegexRemovePreprocessor.patterns="['(?sm).*PLOT.*']"  --ClearOutputPreprocessor.enabled=True --to python --stdout mynotebook.ipynb | ipython
```

## Templates

- https://blog.jupyter.org/the-templating-system-of-nbconvert-6-47ea781eacd2

## Convert to PDF

- https://github.com/jupyterlab/jupyterlab/issues/4676
- https://github.com/aaren/notedown
- https://github.com/MrRio/jsPDF/blob/2f51a5dc2a00b87762876729706a145f24566743/examples/html2pdf/showcase.html#L77

## Convert to XLS

- https://github.com/ideonate/nb2xls

## Kernel Provider

- [ExecutePreprocessor using jupyter_kernel_mgmt APIs](https://github.com/jupyter/nbconvert/pull/809)

## See Also

- [PDF Qt](https://github.com/deathbeds/nbconvert-pdfqt)
- [ScriptedForms](https://github.com/simonbiggs/scriptedforms)

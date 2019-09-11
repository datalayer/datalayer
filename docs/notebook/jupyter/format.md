---
title: Jupyter Format
---

# Jupyter Format

Jupyter Format [GitHub](https://github.com/jupyter/nbformat.git) repository.

Jupyter Format [Docs](https://nbformat.readthedocs.io).

## Example

```python
"""
Extract Text.
"""
NB_VERSION = 4
def extract_text(notebook_str):
    formatted = nbformat.reads(notebook_str, as_version=NB_VERSION)
    text = []
    for cell in formatted.get('cells', []):
        if 'source' in cell and 'cell_type' in cell:
            if cell['cell_type'] == 'code' or cell['cell_type'] == 'markdown':
                text.append(cell['source'])
    return '\n'.join(text)
```

[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# 🌕 Format Examples

```python
# Extract Text.
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

```python
import nbformat
nb = nbformat.v4.new_notebook()
nb.cells.append(nbformat.v4.new_markdown_cell(
r"""On top of that,
several common characters are not allowed in JSON strings,
which means that they have to be escaped by backslashes,
e.g. `\"` and `\n`.
And since a backslash is used for escaping,
a literal backslash occurring in the text
(which is quite common in programming languages and markup languages)
has to be escaped itself (`\\`)."""))
# The JSON-based storage of this minimal notebook looks like this:
print(nbformat.writes(nb))
```

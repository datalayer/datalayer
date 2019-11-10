[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

> :sparkles: :mega: Documentation for Datalayer Notebook. :lollipop:

The content of this folder is deployed on the [Datalayer documentation website](https://docs.databook.sh).

## Contribute to the Documentation

Clone this repository.

```bash
git clone https://github.com/datalayer/datalayer && \
  cd datalayer/docs/notebook
```

You need [gitbook](https://www.gitbook.com).

```bash
# Install gitbook and its plugins.
make env install
```

You are now ready to build and serve on http://localhost:4000.

```bash
# Build and serve the documentation content.
make build serve
```

To generate the PDF, you need to install [calibre](https://calibre-ebook.com).

For MacOS, you also need to link ebook-convert with `ln -s /Applications/calibre.app/Contents/MacOS/ebook-convert /usr/local/bin`.

```bash
# Generate a PDF - TODO Fix issue with SVG in PDF.
make pdf
```

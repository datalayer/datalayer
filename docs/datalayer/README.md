[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer ReadTheDocs

> :sparkles: :mega: Documentation for Datalayer Notebook. :lollipop:

The content of this folder is deployed on the [Datalayer Readthedocs website](https://datalayer.readthedocs.io/en/latest).

```bash
conda env create -n datalayer_readthedocs -f environment.yml && 
  conda activate datalayer_readthedocs && \
  export PATH=/opt/miniconda3/envs/datalayer_readthedocs/bin:$PATH
make clean && \
  make html && \
  open ./build/html/index.html
open https://datalayer.readthedocs.io
```

<!--

## Read Also

+ https://docs.readthedocs.io/en/stable/builds.html
+ https://docs.readthedocs.io/en/stable/faq.html
+ https://docs.readthedocs.io/en/stable/custom_installs/customization.html
+ https://docs.readthedocs.io/en/stable/config-file/v2.html
+ https://github.com/readthedocs/readthedocs.org/blob/master/docs/conf.py

-->

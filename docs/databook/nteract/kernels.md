---
title: Nteract Kernels
---

# Nteract Kernels

```bash
# Python Kernel via pip.
pip3 install ipykernel
# Python Kernel via conda.
conda install ipykernel
```

```bash
# Node.js Kernel.
npm install ijavascript
sudo npm install -g ijavascript
```

```R
# R Kernel.
/usr/bin/env Rscript -<<EOF
install.packages(c('repr', 'IRdisplay', 'evaluate', 'crayon', 'pbdZMQ', 'devtools', 'uuid', 'digest'), repos='http://cran.us.r-project.org')
devtools::install_github('IRkernel/IRkernel')
IRkernel::installspec()
EOF
```

```bash
jupyter kernelspec list
```

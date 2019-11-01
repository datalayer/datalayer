---
title: R
---

# R

> [R](https://www.r-project.org) is a free software environment for statistical computing and graphics. It compiles and runs on a wide variety of UNIX platforms, Windows and MacOS. 

Run R inline.

```R
/usr/bin/env Rscript -<<EOF
install.packages("data.table", repos='http://cran.us.r-project.org')
mem2 <- 4+5
packageVersion("data.table")
save.image("OUT.RData")
EOF
```

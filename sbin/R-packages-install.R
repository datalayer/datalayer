#!/usr/bin/env Rscript

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

install.packages("roxygen2", repos = "http://cran.us.r-project.org") # For Spark

install.packages("ggplot2", repos = "http://cran.us.r-project.org")
install.packages("knitr", repos = "http://cran.us.r-project.org")
install.packages("glmnet", repos = "http://cran.us.r-project.org")
install.packages("pROC", repos = "http://cran.us.r-project.org")
install.packages("data.table", repos = "http://cran.us.r-project.org")
install.packages("caret", repos = "http://cran.us.r-project.org")
install.packages("sqldf", repos = "http://cran.us.r-project.org")
install.packages("wordcloud", repos = "http://cran.us.r-project.org")
install.packages("RColorBrewer", repos = "http://cran.us.r-project.org")
install.packages("googleVis", repos = "http://cran.us.r-project.org")
install.packages("networkD3", repos = "http://cran.us.r-project.org")
install.packages("dygraphs", repos = "http://cran.us.r-project.org")
install.packages("scatterplot3d", repos = "http://cran.us.r-project.org")
# install.packages("rCharts", repos = "http://cran.us.r-project.org")
install.packages("devtools", repos = "http://cran.us.r-project.org")
install.packages("Rcpp", repos = "http://cran.us.r-project.org")
library(devtools)
library(Rcpp)
install_github('ramnathv/rCharts', repos = "http://cran.us.r-project.org")

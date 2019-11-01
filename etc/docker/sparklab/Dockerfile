FROM datalayer/spark-k8s:0.0.1

RUN pip install --no-cache-dir \
  findspark

RUN pip install --upgrade --pre jupyterlab

# jupyterlab-git
RUN jupyter labextension install @jupyterlab/git && \
  pip install --upgrade jupyterlab-git

# jupyterlab-github
RUN jupyter labextension install @jupyterlab/github && \
  pip install --upgrade jupyterlab_github

# jupyterlab-latex
RUN pip install --upgrade jupyterlab_latex && \
  jupyter labextension install @jupyterlab/latex

# ipyleaflet
RUN pip install ipyleaflet

# bqplot
RUN pip install bqplot

# jupyter-proxy
# RUN pip install jupyter-server-proxy

# jupyterlab visualizations
RUN jupyter labextension install \
  @jupyter-widgets/jupyterlab-manager \
  jupyter-matplotlib \
  @jupyter-widgets/jupyterlab-sidecar \
  @jupyterlab/plotly-extension \
  @pyviz/jupyterlab_pyviz \
  jupyterlab-chart-editor \
  bqplot \
  jupyterlab_bokeh \
  @jupyterlab/geojson-extension \
  jupyter-leaflet

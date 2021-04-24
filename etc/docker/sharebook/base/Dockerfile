FROM jupyter/scipy-notebook:d990a62010ae

USER root

RUN apt-get update && \
 apt-get install -y \
   curl git make && \
 rm -rf /var/lib/apt/lists/*

ARG REPOS_FOLDER=/jupyter
RUN mkdir -p $REPOS_FOLDER && \
  chown jovyan:users $REPOS_FOLDER

USER $NB_UID

WORKDIR $REPOS_FOLDER

RUN pip uninstall -y jupyterlab jupyterlab-server jupyter-server

RUN conda install -y jupyter-packaging \
  jupyter-server-proxy \
  nodejs=14.15.1 pip pycurl \
  rust setuptools-rust yarn=1.22.5

RUN pip install jupyterlab-lsp python-language-server[all]

RUN git clone https://github.com/datalayer-contrib/jupyterlab externals/jupyterlab && \
  cd externals/jupyterlab && \
  git checkout master && \
  pip install -e . && \
  yarn && \
  yarn build

RUN jupyter lab build

COPY ./jupyter_server_config.py externals/jupyterlab//jupyter_server_config.py

RUN mkdir ~/notebooks

# ENV JUPYTERHUB_SINGLEUSER_APP "jupyter_server.serverapp.ServerApp"

COPY ./sharebook.sh /usr/local/sbin/sharebook.sh

WORKDIR $HOME

EXPOSE 8888

ENTRYPOINT ["tini", "-g", "--"]

CMD ["sharebook.sh"]

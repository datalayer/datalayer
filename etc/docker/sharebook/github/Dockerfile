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
  yarn build && \
  jupyter lab build

RUN git clone https://github.com/datalayer/jupyter-auth externals/jupyter-auth && \
  cd externals/jupyter-auth && \
  jupyter labextension develop --overwrite && \
  yarn build && \
  pip install -e .

RUN pip install \
  git+https://github.com/datalayer-contrib/jupyter-server.git@collaborative-kernel-manager

RUN jupyter server extension enable jupyterlab
RUN jupyter server extension enable jupyter_auth
RUN jupyter server extension list
RUN jupyter serverextension list

ENV JUPYTERHUB_SINGLEUSER_APP "jupyter_server.serverapp.ServerApp"

COPY ./sharebook-jupyterhub.sh /usr/local/sbin/sharebook-jupyterhub.sh

WORKDIR $HOME

RUN jupyter labextension list

ENTRYPOINT ["tini", "-g", "--"]

CMD ["sharebook-jupyterhub.sh"]

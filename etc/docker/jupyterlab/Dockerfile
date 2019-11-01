# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

FROM jupyter/scipy-notebook:307ad2bb5fce

RUN pip uninstall -y jupyterlab jupyterlab-server

ARG REPOS_FOLDER=/repos

USER root
# RUN apt update && \
#     apt install -y \
#       curl \
#       iproute2 \
#       iputils-ping \
#       telnet \
#       texlive-xetex
RUN mkdir -p $REPOS_FOLDER
RUN chown jovyan:users $REPOS_FOLDER
USER jovyan

RUN mkdir -p ~/.jupyter/lab/workspaces

RUN conda install -y -c conda-forge yarn

WORKDIR $REPOS_FOLDER
RUN git clone https://github.com/jupyterlab/jupyterlab_server && \
  cd jupyterlab_server && \
  pip install -e . && \
  cd $REPOS_FOLDER
RUN git clone --depth 1 https://github.com/datalayer-contrib/jupyterlab && \
  cd jupyterlab && \
  pip install -e . && \
  yarn install && \
  yarn build
# RUN jupyter lab build

RUN pip install git+https://github.com/datalayer-contrib/jupyterhub-gitpuller && \
  jupyter serverextension enable --py nbgitpuller --sys-prefix

# jupyterlab-google-drive
# RUN jupyter labextension install @jupyterlab/google-drive --no-build
# RUN mkdir -p ~/.jupyter/lab/user-settings/@jupyterlab/google-drive
# COPY google-drive.jupyterlab-settings $REPOS_FOLDER/jupyter/lab/user-settings/@jupyterlab/google-drive/drive.jupyterlab-settings
# COPY google-drive.jupyterlab-settings ~/.jupyter/lab/user-settings/@jupyterlab/google-drive/drive.jupyterlab-settings

# jupyterlab-xkcd
# RUN jupyter labextension install @jupyterlab/xkcd-extension --no-build

# jupyterlab-git
RUN cd $REPOS_FOLDER && \
  git clone --depth 1 https://github.com/datalayer-contrib/jupyterlab-git.git --depth 1 && \
  cd jupyterlab-git && \
  git checkout datalayer && \
  pip install -e . && \
  jupyter serverextension enable --py jupyterlab_git --sys-prefix && \
  jupyter labextension link --no-build

# jupyterlab-github
# RUN cd $REPOS_FOLDER && \
#   git clone --depth 1 https://github.com/datalayer-contrib/jupyterlab-github.git --depth 1 && \
#   cd jupyterlab-github && \
#   git checkout datalayer && \
#   pip install -e . && \
#   jupyter serverextension enable --py jupyterlab_github --sys-prefix && \
#   jupyter labextension link --no-build

# jupyterlab-latex
# RUN cd $REPOS_FOLDER && \
#   git clone --depth 1 https://github.com/datalayer-contrib/jupyterlab-latex.git --depth 1 && \
#   cd jupyterlab-latex && \
#   pip install -e . && \
#   jupyter serverextension enable --py jupyterlab_latex --sys-prefix && \
#   jupyter labextension link --no-build

# jupyterlab-datalayer
RUN cd $REPOS_FOLDER && \
  git clone --depth 1 https://github.com/datalayer/datalayer.git && \
  cd $REPOS_FOLDER/datalayer/src/library && \
  make install && \
  cd $REPOS_FOLDER/datalayer/src/jupyterlab/twitter && \
  make install && \
  make build && \
  make ext-enable

# ---

RUN jupyter lab build

# ---

RUN jupyter labextension install @jupyterlab/github
RUN pip install jupyterlab_github
RUN mkdir -p ~/.jupyter/lab/user-settings/@jupyterlab/github
COPY github-drive.jupyterlab-settings ~/.jupyter/lab/user-settings/@jupyterlab/github/drive.jupyterlab-settings

# ---

RUN jupyter serverextension list
RUN jupyter labextension list

# ---

COPY jupyter_notebook_config.py /etc/jupyter/jupyter_notebook_config.py

# ---

# RUN pip install datascience

# ---

# RUN git clone --depth 1 https://github.com/datalayer-contrib/data8-materials-fa17 --depth 1

# ---

WORKDIR /home/jovyan

# ---

COPY Welcome.ipynb /home/jovyan/Welcome.ipynb
COPY workspace.json $REPOS_FOLDER/workspace.json
RUN jupyter lab workspaces import $REPOS_FOLDER/workspace.json

# ---

ENTRYPOINT ["tini", "-g", "--"]
CMD ["start-notebook.sh"]

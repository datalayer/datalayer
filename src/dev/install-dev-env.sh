#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

source $DLAHOME/sbin/cli

echo -e $BOLD$YELLOW"Install Datalayer Development Environment"$NOCOLOR$NOBOLD
echo

# ------------------------------------

setup_var() {

  mkdir -p $DLAHOME/var/datalayer
  chown -R $USER:$(id -gn) $DLAHOME/var/srv/jupyterhub

  openssl rand -hex 32 > $DLAHOME/var/srv/jupyterhub/jupyterhub_auth_token
  chmod 600 $DLAHOME/var/srv/jupyterhub/jupyterhub_auth_token
  openssl rand -hex 32 > $DLAHOME/var/srv/jupyterhub/jupyterhub_cookie_secret
  chmod 600 $DLAHOME/var/srv/jupyterhub/jupyterhub_cookie_secret

  mkdir -p $DLAHOME/var/log
  touch $DLAHOME/var/log/datalayer.log
  chown -R $USER:$(id -gn) $DLAHOME/var/log/datalayer.log

}

# ------------------------------------

function setup_yarn {
# rm -fr ~/.yarn-cache || true
  yarn config set cache-folder ~/.yarn-cache
}

# ------------------------------------

function install_endpoints() {

  echo
  echo -e $WHITE_BCK"INSTALLING ENDPOINTS"$NOCOLOR
  echo

  declare -a ENDPOINTS=(
    "iam"
    "library"
    "explorer"
    "jupyterpool"
    )

  for ENDPOINT in "${ENDPOINTS[@]}"
  do
    cd $DLAHOME/src/$ENDPOINT && \
      echo && \
      echo -e "Installing \x1b[7m${ENDPOINT}\x1b[0m endpoint" && \
      echo && \
      pip install -e .
  done

}

function install_iam() {

  echo
  echo -e $WHITE_BCK"INSTALLING IAM"$NOCOLOR
  echo

  cd $DLAHOME/src/iam && \
    make clean && \
    make install && \
    make build && \
    make dev

}

# ------------------------------------

function install_library() {

  echo
  echo -e $WHITE_BCK"INSTALLING LIBRARY"$NOCOLOR
  echo

  cd $DLAHOME/src/library && \
    make clean && \
    make install && \
    make build && \
    make dev
}

# ------------------------------------

function install_explorer() {

  echo
  echo -e $WHITE_BCK"INSTALLING EXPLORER"$NOCOLOR
  echo

  cd $DLAHOME/src/explorer && \
    make py-clean && \
    make py-install && \
    make py-build

}

# ------------------------------------

install_jupyter() {

    echo
    echo -e $WHITE_BCK"INSTALLING JUPYTER"$NOCOLOR
    echo

    cd $DLAHOME/repos/jupyter && \
      pip install -e .

}

# ------------------------------------

function install_jupyterhub() {

    echo
    echo -e $WHITE_BCK"INSTALLING JUPYTERHUB"$NOCOLOR
    echo

# sudo npm install -g configurable-http-proxy
# npm install configurable-http-proxy

#    pip install jupyterhub==1.0.0
  cd $DLAHOME/repos/jupyterhub && \
#    git checkout datalayer
#    rm -fr dist
#    rm -fr *.egg-info
    python setup.py clean sdist && \
    pip install -e .

#    pip install oauthenticator
  cd $DLAHOME/repos/jupyterhub-auth-oauth && \
    pip install -e .

  cd $DLAHOME/repos/jupyterhub-auth-ldap && \
    git checkout datalayer && \
    pip install -e .

  cd $DLAHOME/repos/jupyterhub-spawner-batch && \
    pip install -e .
    
  cd $DLAHOME/repos/jupyterhub-spawner-wrap && \
    pip install -e .

  cd $DLAHOME/repos/jupyterhub-spawner-sudo && \
    pip install -e .
    
  cd $DLAHOME/repos/jupyterhub-spawner-docker && \
    pip install -e .

  conda install -y -c anaconda-nb-extensions nb_conda && \
#  jupyter nbextension install nb_conda --py --sys-prefix --symlink
#  jupyter nbextension enable nb_conda --py --sys-prefix

  jupyter serverextension list

}

# ------------------------------------

function install_jupyterlab() {

    echo
    echo -e $WHITE_BCK"INSTALLING JUPYTERLAB"$NOCOLOR
    echo

#    cd $DLAHOME/repos/jupyterlab && \
#      git checkout master && \
#      pip install -e . && \
#      rm -fr node_modules || true && \
#      rm -fr lib || true && \
#      yarn install
#    pip install --pre --upgrade jupyterlab
    pip install jupyterlab

#    cd $DLAHOME/repos/jupyterlab/packages/cells && \
#      yarn install && \
#      yarn build

#    cd $DLAHOME/repos/jupyterlab-server && \
#      pip install -e .

#     cd $DLAHOME/repos/jupyterwidgets-ipy && \
#       ./dev-install.sh

#    pip install ipyresuse \
#      cufflinks

#    pip install matplotlib && \
#      jupyter labextension install jupyter-matplotlib --no-build

#    pip install ipyleaflet && \
#      jupyter labextension install jupyter-leaflet --no-build

#    pip install ipymaterialui && \
#      jupyter labextension install jupyter-materialui --no-build

#    pip install jupyterlab_latex && \
#      jupyter labextension install @jupyterlab/latex --no-build

#    pip install bokeh && \
#      jupyter labextension install jupyterlab_bokeh --no-build

#    pip install bqplot && \
#      jupyter labextension install bqplot --no-build

#    pip install perspective-python && \
#      jupyter labextension install @finos/perspective-jupyterlab --no-build

#    pip install sidecar && \
#      jupyter labextension install @jupyter-widgets/jupyterlab-sidecar --no-build

#    pip install voila && \
#      jupyter labextension install @jupyter-voila/jupyterlab-preview --no-build

    jupyter labextension install \
      @jupyter-widgets/jupyterlab-manager
      --no-build

#    jupyter labextension install \
#      @jupyterlab/geojson-extension \
#      @jupyterlab/plotly-extension \
#      @pyviz/jupyterlab_pyviz \
#      jupyterlab-chart-editor \
#      --no-build

    cd $DLAHOME/src/jupyter/labtwitter && \
      make install && \
      make build && \
      make ext-enable

    jupyter lab build

    jupyter serverextension list && \
      jupyter labextension list

}

# ------------------------------------

function install_ui() {

  echo
  echo -e $WHITE_BCK"INSTALLING UI"$NOCOLOR
  echo

  cd $DLAHOME/src && \
    make install-ui-deps && \
    make build-ui

}

# ------------------------------------

function fix_libs() {

  echo
  echo -e $WHITE_BCK"FIXING LIBS"$NOCOLOR
  echo

#  pip install tornado==6.0.2
#  pip install tornado==5.1.1

}

function commands() {
  echo -e $YELLOW"💛  Valid commands: [ all ]"$NOCOLOR 1>&2
}

function apply_cmd() {

  echo -e $BOLD"🔥  Running [$BLUE$1$NOCOLOR]."$NOBOLD
  echo

  case "$1" in

    all)
      install_endpoints
      install_iam
      install_library
      install_explorer
      install_jupyter
      install_jupyterhub
      install_jupyterlab
      install_ui
      fix_libs
      ;;

    endpoints)
      install_endpoints
      ;;

    iam)
      install_iam
      ;;

    library)
      install_library
      ;;

    explorer)
      install_explorer
      ;;

    jupyter)
      install_jupyter
      ;;

    jupyterhub)
      install_jupyterhub
      ;;

    jupyterlab)
      install_jupyterlab
      ;;

    ui)
      install_ui
      ;;

    *)
      echo -e $RED$BOLD"💔  No valid command to execute has been provided."$NOCOLOR$NOBOLD 1>&2
      echo
      commands

  esac

  echo
  echo -e $BOLD"✅  Completed [$BLUE$1$NOCOLOR]."$NOBOLD
  echo

}

CMDS="$1"

if [ -z "$CMDS" ]; then
  echo -e $RED$BOLD"💔  No command to execute has been provided."$NOCOLOR$NOBOLD 1>&2
  echo
  commands
  echo
  exit 1
fi

IFS=',' read -ra CMD_SPLITS <<< "$CMDS"
for i in "${CMD_SPLITS[@]}"; do
  apply_cmd $i
done

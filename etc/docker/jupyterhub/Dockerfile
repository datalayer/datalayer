# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

FROM jupyterhub/jupyterhub:1.0.0

# Install dockerspawner, oauth, postgres.
RUN apt update && \
  apt install -y libpq-dev python-dev gcc && \
  apt-get autoremove -y && \
  apt-get clean -y
# RUN /opt/conda/bin/conda install -yq psycopg2=2.7 jupyterlab
# RUN /opt/conda/bin/conda install -yq psycopg2
# RUN /opt/conda/bin/conda clean -tipsy
RUN /opt/conda/bin/pip install --no-cache-dir \
  oauthenticator \
  dockerspawner \
  jupyter_client \
  psycopg2
# RUN /opt/conda/bin/pip install --upgrade tornado==5.1.1
# Copy TLS certificate and key
# ENV SSL_CERT /srv/jupyterhub/secrets/jupyterhub.crt
# ENV SSL_KEY /srv/jupyterhub/secrets/jupyterhub.key
# COPY ./secrets/*.crt $SSL_CERT
# COPY ./secrets/*.key $SSL_KEY
# RUN chmod 700 /srv/jupyterhub/secrets && \
#    chmod 600 /srv/jupyterhub/secrets/*

# RUN useradd datalayer && \
#   mkdir /home/datalayer && \
#   chown datalayer:datalayer /home/datalayer
# RUN echo "datalayer:datalayer" | chpasswd

ADD jupyterhub_config.py /srv/jupyterhub/jupyterhub_config.py
ADD cull_idle_servers.py /srv/jupyterhub/cull_idle_servers.py
ADD ./userlist /srv/jupyterhub/userlist

CMD ["jupyterhub", "-f", "/srv/jupyterhub/jupyterhub_config.py"]

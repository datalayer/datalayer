# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

FROM python:3.7.2

RUN mkdir /dla
WORKDIR /dla

COPY index.html index.html
COPY res res

COPY jupyterpool jupyterpool
COPY setup.py setup.py
COPY README.md README.md
RUN python setup.py install

RUN mkdir /root/.datalayer
COPY oidc.json.template /root/.datalayer/oidc.json.template

WORKDIR /dla
EXPOSE 9900
CMD ["python", "jupyterpool/main.py"]

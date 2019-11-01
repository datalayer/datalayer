# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

FROM python:3.7.2

RUN mkdir /dla
WORKDIR /dla

COPY datalayer_studio datalayer_studio
COPY setup.py setup.py
COPY README.md README.md
RUN python setup.py install

COPY build build

EXPOSE 9600
CMD ["python", "datalayer_studio/main.py"]

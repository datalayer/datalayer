FROM debian:bullseye-backports

# ENV REFRESHED_AT 2019-08-06T13:50
RUN apt update
RUN apt install -y python3 python3-pip curl
# RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py && python3 get-pip.py
RUN pip3 install setuptools

COPY simple simple
RUN cd simple && python3 setup.py develop

EXPOSE 9876

CMD [ "python3", "./simple/simple.py" ]  

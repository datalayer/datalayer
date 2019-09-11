FROM python:3.5

ENV REFRESHED_AT 2019-08-06T13:50
COPY simple simple
RUN cd simple && python setup.py develop
EXPOSE 9876
CMD [ "python", "./simple/simple.py" ]

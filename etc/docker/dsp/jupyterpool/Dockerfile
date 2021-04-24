# FROM datalayer/sharebook-base:0.0.3
FROM jupyter/scipy-notebook:d990a62010ae

COPY ./sharebook.sh /usr/local/sbin/sharebook.sh

RUN mkdir $HOME/notebooks

WORKDIR $HOME

EXPOSE 8888

ENTRYPOINT ["tini", "-g", "--"]

CMD ["sharebook.sh"]

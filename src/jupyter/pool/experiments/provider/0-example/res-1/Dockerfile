FROM elyra/kernel-spark-py:2.0.0rc2

COPY *.whl /tmp/

RUN pip install --upgrade tornado==5.1.1 && \
    pip install kubernetes_kernel_provider && \
    pip install /tmp/docker_kernel_provider-0.1.0.dev0-py3-none-any.whl && \
    pip install /tmp/notebook-6.0.0.dev0-py2.py3-none-any.whl && \
    pip freeze > /tmp/requirements.txt && cat /tmp/requirements.txt

ADD docker_kernelspecs.tar /usr/local/share/jupyter/kernels/

USER root

#    jupyter k8s-kernelspec install --language=R --spark && \
#    jupyter k8s-kernelspec install --tensorflow && \
#    jupyter k8s-kernelspec install --language=R && \
#    jupyter k8s-kernelspec install --language=Scala && \
#    jupyter k8s-kernelspec install --language=Scala --spark
# RUN jupyter k8s-kernelspec install --language=python

# RUN jupyter docker-kernelspec install && \
#    jupyter docker-kernelspec install --language=R && \
#    jupyter docker-kernelspec install --language=Scala

RUN chown -R jovyan:users /usr/local/share/jupyter && chmod -R go+rX /usr/local/share/jupyter/kernels/

ENTRYPOINT ["tini", "-g", "--"]
CMD ["start-notebook.sh", "--debug"]

USER jovyan

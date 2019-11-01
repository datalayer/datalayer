FROM ubuntu:16.04

LABEL maintainer="info@datalayer.io"

RUN apt update && apt install git python python-pip unzip wget vim -y && \
    git clone https://github.com/datalayer/datalayer && \
    cd terraform/aws/kubeadm

RUN wget https://releases.hashicorp.com/terraform/0.11.13/terraform_0.11.13_linux_amd64.zip && \
    unzip terraform_0.11.13_linux_amd64.zip && \
    rm terraform_0.11.13_linux_amd64.zip && \
    mv terraform /usr/bin && chmod +x /usr/bin/terraform

RUN cd /kubeadm

WORKDIR /kubeadm

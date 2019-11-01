#!/bin/bash

for IP in a.b.c.d a.b.c.d
do
    echo $IP
    ssh -t -i $DLAHOME/etc/terraform/aws/kubeadm/key ubuntu@$IP "sudo docker pull datalayer/kernel-spark-py:0.0.1"
    ssh -t -i $DLAHOME/etc/terraform/aws/kubeadm/key ubuntu@$IP "sudo docker pull datalayer/spark-k8s:0.0.1"
done

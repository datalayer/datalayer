---
title: Install from Azure Marketplace
---

# Install from Azure Marketplace

For scalable deployments on the Microsoft Azure Cloud, we detail in the following sections the steps to set you-up.

We assume you have an operational [Azure account](http://portal.azure.com) and that you are used to provision resources like virtual images, virtual network.... 

You are also able to connect remotely to those images via SSH and run Linux shell commands.

I you don't have yet an account, Microsoft can provide you with a [free trial subscription](https://azure.microsoft.com/en-us/pricing/free-trial).
  
We describe 2 different techniques:

1. The first one is an easy installation from the [Microsoft Azure Marketplace](#Azure_Marketplace). The current available version is however limited in terms of scalability, this is why we recommend to use the second way.

2. The second one is a separate installation of a [Microsoft Azure HDInsight (Hadoop) cluster](#Azure_HDInsight) and the installation of the Zeppelin Docker image on a separated virtual machine instance located on the same virtual network.

Go to the [Datalayer page on the Microsoft Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps.datalayer-notebook) and click on install.

You will then have to fill a few parameters like the size of the instance..., and then click on `Install`.

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-18.png)](/_images/notebook/microsoft/azure/microsoft-azure-18  .png)

Once done, check the public IP address which has been assigned and browse the welcome page served on that IP address.

This deployment supports Scala, Python and R in `local` mode.

## Azure HDInsight

### Resource Group

First create a dedicated Resource Group for your future Cluster and any upcoming servers you will add.

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-07.png)](/_images/notebook/microsoft/azure/microsoft-azure-07.png)

### Virtual Network

In this Resource Groupe, create a dedicated Virtual Network for you Cluster and any upcoming servers you will add.

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-08.png)](/_images/notebook/microsoft/azure/microsoft-azure-08.png)

### HDInsight Cluster

Launch a new HDInsigh Cluster.

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-01.png)](/_images/notebook/microsoft/azure/microsoft-azure-01.png)

The `Hadoop` cluster type is the one you need (not Spark, as the Zeppelin image will ship the needed Spark Libraries to the Hadoop Cluster in YARN mode).

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-02.png)](/_images/notebook/microsoft/azure/microsoft-azure-02.png)

As second step, define the credentials.

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-03.png)](/_images/notebook/microsoft/azure/microsoft-azure-03.png)

Then choose the number of nodes you want. A tiny 3 nodes cluster will do the job to start.

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-04.png)](/_images/notebook/microsoft/azure/microsoft-azure-04.png)

Configure the network and the resource group (indicate the ones you have created in the previous steps).

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-09.png)](/_images/notebook/microsoft/azure/microsoft-azure-09.png)

Follow the operation events. If something goes wrong, delete and restart...

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-06.png)](/_images/notebook/microsoft/azure/microsoft-azure-06.png)

If everything goes well, your Hadoop cluster will be available in the Resource Group you have defined.

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-10.png)](/_images/notebook/microsoft/azure/microsoft-azure-10.png)

You can verify that your Head and Worker nodes are available on the Virtual Network you have created.

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-11.png)](/_images/notebook/microsoft/azure/microsoft-azure-11.png)

The public IP adresses with which you will connect to from your remote environment are also listed.

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-12.png)](/_images/notebook/microsoft/azure/microsoft-azure-12.png)

You can connect via SSH to the Head Node.

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-19.png)](/_images/notebook/microsoft/azure/microsoft-azure-19.png)

### Create Zeppelin Node

This section explains how to create a separate node for Zeppelin.

+ A separate Node is technically needed because Azure does not allow you to open ports on the Cluster Nodes.
+ It is also a good practice to have dedicated Node for each responsbilities (Notebook and Cluster).

First, choose a server type (for example a Centos 7 image).

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-13.png)](/_images/notebook/microsoft/azure/microsoft-azure-13.png)

Set the needed parameters:

+ Your SSH public key.

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-14.png)](/_images/notebook/microsoft/azure/microsoft-azure-14.png)

+ The Virtual Network (the same as the one used for the HDInsight cluster). 

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-15.png)](/_images/notebook/microsoft/azure/microsoft-azure-15.png)

Double check that everything is nicely setup.

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-16.png)](/_images/notebook/microsoft/azure/microsoft-azure-16.png)

For the network WEB access to Zeppelin, open port `80` for HTTP.

[![MicrosoftAzure-1](/_images/notebook/microsoft/azure/microsoft-azure-17.png)](/_images/notebook/microsoft/azure/microsoft-azure-17.png)

### Configure Zeppelin Node

From a shell session, use the SSH command to connect to the Zeppelin node by providing the username and IP address .

If you used a password for the user account, you will be prompted to enter the password.

If you used an SSH key that is secured with a passphrase, you will be prompted to enter the passphrase. Otherwise, SSH will attempt to automatically authenticate by using one of the local private keys on your client.

Once logged on, the first action is to Act as `root` with `sudo su`.

Then install and start Docker. If you use a Centos 7 image, this can be achieved with:

```
sudo yum install -y docker
sudo service docker start
```

If you use a Ubuntu image, you will install and start Docker with:

```
sudo apt install docker.io
sudo service docker start
```

We the expect you to:

+ Get the image with `docker pull datalayer/zeppelin`.

+ Git clone `https://github.com/datalayer/datalayer-docker`. The `start.sh` script located in the `zeppelin` folder will allow you to start the `Datalayer Zeppelin` server.

For more details, follow the [Zeppelin Docker documentation](../docker/zeppelin) to install and configure the needed Zeppelin Docker image. Check especially the `Spark in YARN mode` section as the Docker container will have to connect to the external HDInsight cluster.

Before launching Zeppelin, there are 2 important additional steps to connect to the correct cluster:

1. Copy the complete `/etc/hadoop/conf` folder from the HDInsight cluster Head Node to the Zeppelin Node. You will scp them on your laptop from the HDInsight cluster, to then scp them from your laptop to the Zeppelin Node

2. Edit `/etc/hosts` and add the entries present in the `/etc/hosts` of the HDInsight cluster Head Node (connect via SSH to see the host file).

Typical entries in `/etc/hosts` are e.g.:

```
100.117.108.74 PkrVMxrkvxp812q.PkrSrvxrkvxp812q.b2.internal.cloudapp.net PkrVMxrkvxp812q
10.0.0.17	10.0.0.17	headnodehost	# SlaveNodeManager
```

### Run Zeppelin Docker Image

These are the steps to fit Azure requirements:

Go the `datalayer-docker` repository you have cloned, go to the `zeppelin` folder and start on the HTTP port 80 with:

```
DOCKER_WEB_PORT=80 ./start.sh`
```

Type `CTRL-C` and stop the running Zeppelin process with:

```
datalayer-zeppelin-stop
```

Edit `/opt/datalayer/etc/conf/datalayer/datalayer-site.xml` and set:

```
  <property>
    <name>datalayer.spark.master.mode</name>
    <value>yarn</value>
  </property>
  <property>
    <name>datalayer.hadoop.conf.dir</name>
    <value>/etc/hadoop/conf</value>
  </property>
```

Finally take note of the public IP address of your Zeppelin Node and type it in your browser. The Zeppelin welcome page should show up.

Choose the `Sign Up` menu to create your profile. Once your profile is created, you can read the [documentation](./) to know more about the offered functionalities.

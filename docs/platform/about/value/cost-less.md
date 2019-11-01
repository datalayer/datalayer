---
title: Cost Less
redirect_from:
- "/docs/kuber-cost-hibernation"
---

# Cost Less

Early starters can install Datalayer on a single node (laptop or server). If you want to more power in the cloud, [Kuber](/about/inside/kuber.md) offers this powerfull feature called `Resource Control`.

You can pause your cluster resouces to avoid costs. You can retrieve all the configuration and content you have created before pausing the cluster and spare until 75% of your cloud costs with a correct allocation of resources.

![Scale Workers](/_images/gallery/g2/scale-workers.png "Scale Workers")

You are free to use cloud normal instances or cheaper Spot requests instances. Once you decide to pause, simply set the number of workers to 0. You can even stop the master and start it again when you need it as Kuber has assigned a fixed IP address from the available EIP (Elastic IP) pool.

Bump back the number of worker to the number you want, and by magic, the HDFS file system will reappear just like you left it a few days ago, but this time with brand new virtual machines. For you, as a user, you don't see the difference.

![AWS AutoScaling](/_images/value/aws-autoscaling.png "AWS AutoScaling")

# Future Plans

Datalayer will introduce `Cost Compensation` to build a Community of workers backed by beautiful Notebooks, Spark and HDFS.

+ The more cloud resource your share, the more quota you will have to run your data processing. 
+ And last but not least, we favor good analysts: the more `Stars` you get, the more quota you will have.

![Cost Compensation](/_images/value/cost-compensation.svg "Cost Compensation")

Datalayer will also enable the usage of low cost cluster resources such as Spot Instances that can span multiple `Virtual Private Clouds`.

[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Docker HDFS

See some examples.

+ [big-data-europe/docker-hadoop](./examples/bdd).
+ [ifilonenko/hadoop-kerberos](./examples/keberos).

## Docker HDFS flokkr/docker-hadoop

```bash
# https://github.com/flokkr/docker-hadoop
```

## Docker HDFS uhopper/hadoop-docker

```bash
# https://bitbucket.org/uhopper/hadoop-docker
```

## Docker HDFS jcrist/hadoop-test-cluster

```bash
# https://github.com/jcrist/hadoop-test-cluster
pip install git+https://github.com/jcrist/hadoop-test-cluster.git
htcluster --help
htcluster startup --image base
docker ps -a
htcluster startup --image base --mount .:workdir
htcluster login # testuser / testpass
htcluster exec -- myscript.sh some other args
htcluster shutdown
docker rm -f master worker edge
```

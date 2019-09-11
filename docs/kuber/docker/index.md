---
title: Docker
---

# Docker

> Docker is a computer program that performs operating-system-level virtualization, also known as "containerization". Docker is used to run software packages called "containers".

## Install

Get Docker from the [Docker Community](https://www.docker.com/docker-community) website.

Get also [Docker Compose](https://docs.docker.com/compose/install).

Setup e.g. on Ubuntu.

```bash
# Install on Ubuntu as a service.
sudo mkdir /etc/docker
sudo cat << EOF > /etc/docker/daemon.json
{
  "exec-opts": ["native.cgroupdriver=cgroupfs"]
}
EOF
cat << EOF_D > install-docker.sh
sudo apt -y remove docker docker-engine docker.io
sudo apt update
sudo apt -y install \
    linux-image-extra-$(uname -r) \
    linux-image-extra-virtual
sudo apt -y install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt update
sudo apt -y install docker-ce
systemctl daemon-reload
systemctl restart docker
EOF_D
sudo chmod +x install-docker.sh && ./install-docker.sh
sudo systemctl status docker
sudo journalctl -fu docker
sudo journalctl -lxeu docker
```

Configure with environment variables.

+ DOCKER_BACKGROUND_PROCESS = Run as background process (default is `true`)
+ DOCKER_SPARK_MASTER = MASTER for Spark (default is `local[*]`).
+ DOCKER_NOTEBOOK_DIR = Folder where the notes reside (default is `/notebook`).
+ DOCKER_WEB_PORT = The HTTP port (default is `8666`).
+ DOCKER_HADOOP_CONF_DIR = The folder for the Hadoop configuration file on the host (default is `/etc/hadoop/conf`).

```bash
DOCKER_WEB_PORT=8667 ./start.sh
```

## Hello World

```bash
docker run --name nginx --rm -d -it -p 8098:80 nginx:stable-alpine
echo http://localhost:8098
docker ps
docker exec -it nginx /bin/sh
docker attach nginx # Detach with CTRL+P+Q
docker inspect nginx
docker stop nginx
```

```bash
docker run --name echoserver --rm -d -it -p 8081:80 gcr.io/google_containers/echoserver:1.10
echo http://localhost:8081
docker exec -it echoserver /bin/sh
docker attach echoserver # Detach with CTRL+P+Q
docker stop echoserver
```

```bash
docker run --name simple --rm -d -it -p 9876:9876 datalayer/simple:0.0.1
echo http://localhost:9876/info
echo http://localhost:9876/env
docker exec -it simple ps -ef
docker exec -it simple /bin/bash
docker attach simple # Detach with CTRL+P+Q
docker stop simple
docker rm simple
```

```bash
docker run --name centos --rm centos:centos7 /bin/echo 'Hello world'
docker run --name centos --rm -it --rm centos:centos7 /bin/bash
docker run --name centos --rm centos:centos7 yum update
docker run --name centos --rm -it --dns=192.168.101.119 centos:centos7 /bin/bash
docker run --name centos --rm --mac-address=a8:20:66:40:97:3d --net=bridge --bip=192.168.101.54/24 centos:centos7 yum update
```

<!--

# -v /sys/fs/cgroup:/sys/fs/cgroup
# --dns-search datalayer.io.local

-->

## Networking

```bash
# Get Host IP on MacOs - https://biancatamayo.me/blog/2017/11/03/docker-add-host-ip/
docker run -it --rm busybox ping docker.for.mac.localhost
```

```bash
docker inspect --format '{{ .NetworkSettings.IPAddress }}' container_name_or_id
```

## Volumes

```bash
docker volume ls
docker volume inspect <foo>
docker volume prune # !!! removes all currently not used volumes...
```

Backup and Restore.

https://stackoverflow.com/questions/26331651/how-can-i-backup-a-docker-container-with-its-data-volumes
https://github.com/discordianfish/docker-backup
https://github.com/docker-infra/docker-lloyd

Volume Plugins.

https://github.com/amccurry/pack

## Local Registry

```bash
# docker run -p 5000:5000 registry
docker run -d -p 5000:5000 --restart=always --name registry registry:2
curl -X GET http://localhost:5000/v2/_catalog
# Put in your local registry an imaage, e.g. simple:0.0.1
docker pull localhost:5000/datalayer/simple:0.0.1
docker container stop registry && docker container rm -v registry
```

## Squash

```
docker save datalayer/simple:0.0.1 -o simple-image.tar
docker history datalayer/simple:0.0.1
docker inspect datalayer/simple:0.0.1 | grep -A 6 Layers
```

## Prune

```bash
# Delete all containers.
# docker rm -f $(docker ps -a -q)
dla docker-prune
```

## Compose

[Docker Compose Docs](https://docs.docker.com/compose).

About [name resolution](https://forums.docker.com/t/resolve-containers-from-host-by-network-alias-or-container-name-or-host/23861/5).

+ https://stackoverflow.com/questions/37242217/access-docker-container-from-host-using-containers-name/45071126#45071126
+ https://github.com/mageddo/dns-proxy-server/tree/master/examples

## Swarm

[Docker Swarm Overview](https://docs.docker.com/engine/swarm).

[Docker Swarm Service](https://docs.docker.com/engine/swarm/swarm-tutorial/deploy-service/).

[Docker Swarm Stack Deploy](https://docs.docker.com/engine/swarm/stack-deploy).

```bash
docker swarm init.
docker service create --name registry --publish published=5000,target=5000 registry:2
docker service ls
curl http://localhost:5000/v2/
mkdir stackdemo
cd stackdemo
cat <<EOF > app.py
from flask import Flask
from redis import Redis

app = Flask(__name__)
redis = Redis(host='redis', port=6379)
app.py
@app.route('/')
def hello():
    count = redis.incr('hits')
    return 'Hello World! I have been seen {} times.\n'.format(count)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
EOF
cat <<EOF > requirements.txt
flask
redis
EOF
cat <<EOF > Dockerfile
FROM python:3.4-alpine
ADD . /code
WORKDIR /code
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
EOF
cat <<EOF > docker-compose.yml
version: '3'
services:
  web:
    image: 127.0.0.1:5000/stackdemo
    build: .
    ports:
      - "8000:8000"
  redis:
    image: redis:alpine
EOF
docker-compose up -d
docker-compose ps
for i in {0..20}; do curl http://localhost:8000; sleep 1s; done
docker-compose down --volumes
docker-compose push
docker swarm init
docker stack deploy --compose-file docker-compose.yml stackdemo
docker stack services stackdemo
for i in {0..20}; do curl http://localhost:8000; sleep 1s; done
curl http://address-of-other-node:8000
docker stack rm stackdemo
docker service rm registry
docker swarm leave --force
```

## Visualizer

+ https://github.com/dockersamples/docker-swarm-visualizer

## Compose on Kubernetes

+ https://github.com/docker/compose-on-kubernetes

## Orchestration

[Run Swarm and Kubernetes interchangeably](https://www.docker.com/products/orchestration).

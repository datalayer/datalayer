[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

[![Docker Pulls](https://img.shields.io/docker/pulls/datalayer/whoami.svg)](https://hub.docker.com/r/datalayer/whoami)

Tiny Go webserver that prints os information and HTTP request to output

```bash
make build
docker run -d -P --rm --name whoami datalayer/whoami:${DLAVERSION}
docker inspect --format '{{ .NetworkSettings.Ports }}' whoami
# map[80/tcp:[{0.0.0.0 32769}]]
curl http://0.0.0.0:32769
# Hostname :  6e0030e67d6a
# IP :  127.0.0.1
# IP :  ::1
# IP :  172.17.0.27
# IP :  fe80::42:acff:fe11:1b
# GET / HTTP/1.1
# Host: 0.0.0.0:32769
# User-Agent: curl/7.35.0
# Accept: */*
docker stop whoami
```

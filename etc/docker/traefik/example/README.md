[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Docker Traefik Example

From the [quickstart](https://github.com/containous/traefik/tree/master/examples/quickstart).

```bash
docker-compose -f traefik.yml up -d
open http://localhost:8080
curl -H Host:whoami.docker.localhost http://127.0.0.1
docker-compose -f traefik.yml up -d --scale whoami=2
open http://localhost:8080
for i in {0..20}; do curl -H Host:whoami.docker.localhost http://127.0.0.1; sleep 1s; done
docker-compose -f traefik.yml down
open http://localhost:8089/dashboard/
````

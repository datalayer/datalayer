[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Docker Simple Compose

Example from https://docs.docker.com/compose/gettingstarted

```bash
# Optional: Build.
docker build -t datalayer/simple-compose:0.0.3 .
```

```bash
# Start.
echo http://0.0.0.0:5000 && \
  docker-compose up -d && \
  docker-compose logs -f
```

```bash
# Stop.
docker-compose down
```

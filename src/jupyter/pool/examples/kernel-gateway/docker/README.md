[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Jupyter Kernel Gateway with a Notebook

```bash
docker-compose build && \
  docker-compose up -d
docker exec -it nb2kg-notebook jupyter notebook list
# get token...
open http://localhost:9888/lab?token=...
docker-compose down
```

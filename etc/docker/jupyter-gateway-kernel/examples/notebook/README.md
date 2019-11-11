[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Jupyter Kernel Gateway wit a Notebook

```bash
docker-compose build
docker-compose up -d
docker exec -it nb2kg-notebook jupyter notebook list
# get token...
open http://localhost:9888/lab?token=...
docker-compose down
```

export JPY_PSQL_PASSWORD=jupyterhub
sudo -u postgres psql -c "CREATE DATABASE jupyterhub;"
sudo -u postgres psql -c "CREATE USER jupyterhub WITH ENCRYPTED PASSWORD '$JPY_PSQL_PASSWORD';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE jupyterhub TO jupyterhub;"
jupyterhub --upgrade-db
sudo -u postgres psql -d jupyterhub -c "select * from pg_catalog.pg_tables where schemaname = 'public';"

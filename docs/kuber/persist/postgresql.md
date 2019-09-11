---
title: Postgresql
---

# Postgresql

```bash
sudo apt install postgresql postgresql-contrib
# It happened to me and it turned out that I removed erroneously the postgres user from "ssl-cert" group, set it back with
sudo gpasswd -a postgres ssl-cert
# Fixed ownership and mode
# sudo chown postgres:postgres  /etc/ssl/private/ssl-cert-snakeoil.key
# sudo chmod 0600 /etc/ssl/private/ssl-cert-snakeoil.key
update-rc.d postgresql enable
sudo service postgresql start
sudo systemctl status postgresql
tail -f /var/log/postgresql
```

```bash
# su - postgres
sudo -i -u postgres
psql
\q
createuser --interactive
sudo -u postgres createuser --interactive
sudo -u postgres psql postgres
\password datalayer
\q
sudo -u postgres createdb datalayer
```

```bash
psql -d datalayer
\list
\conninfo
CREATE TABLE COMPANY(
   ID INT PRIMARY KEY     NOT NULL,
   NAME           TEXT    NOT NULL,
   AGE            INT     NOT NULL,
   ADDRESS        CHAR(50),
   SALARY         REAL
);
\d
\d company
```

## JDBC

```
jdbc:postgresql://localhost:5432/datalayer
```

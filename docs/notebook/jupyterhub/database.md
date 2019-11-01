---
title: JupyterHub Database
---

# JupyterHub Database

[The Hub’s Database](https://jupyterhub.readthedocs.io/en/stable/reference/database.html).

## SQLite

```bash
cd $DLAHOME/srv/jupyterhub
sqlite3 ./jupyterhub.sqlite
```

```sql
SQLite version 3.22.0 2018-01-22 18:45:57
Enter ".help" for usage hints.
sqlite> .schema
CREATE TABLE alembic_version (
	version_num VARCHAR(32) NOT NULL, 
	CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);
CREATE TABLE oauth_clients (
	id INTEGER NOT NULL, 
	identifier VARCHAR(255), 
	secret VARCHAR(255), 
	redirect_uri VARCHAR(1023), 
	PRIMARY KEY (id), 
	UNIQUE (identifier)
);
CREATE TABLE groups (
	id INTEGER NOT NULL, 
	name VARCHAR(255), 
	PRIMARY KEY (id), 
	UNIQUE (name)
);
CREATE TABLE servers (
	id INTEGER NOT NULL, 
	proto VARCHAR(15), 
	ip VARCHAR(255), 
	port INTEGER, 
	base_url VARCHAR(255), 
	cookie_name VARCHAR(255), 
	PRIMARY KEY (id)
);
CREATE TABLE users (
	id INTEGER NOT NULL, 
	name VARCHAR(255), 
	admin BOOLEAN, 
	last_activity DATETIME, 
	cookie_id VARCHAR(255) NOT NULL, 
	state TEXT, 
	encrypted_auth_state BLOB, 
	PRIMARY KEY (id), 
	UNIQUE (name), 
	CHECK (admin IN (0, 1)), 
	UNIQUE (cookie_id)
);
CREATE TABLE services (
	id INTEGER NOT NULL, 
	name VARCHAR(255), 
	admin BOOLEAN, 
	_server_id INTEGER, 
	pid INTEGER, 
	PRIMARY KEY (id), 
	UNIQUE (name), 
	CHECK (admin IN (0, 1)), 
	FOREIGN KEY(_server_id) REFERENCES servers (id) ON DELETE SET NULL
);
CREATE TABLE spawners (
	id INTEGER NOT NULL, 
	user_id INTEGER, 
	server_id INTEGER, 
	state TEXT, 
	name VARCHAR(255), 
	last_activity DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE, 
	FOREIGN KEY(server_id) REFERENCES servers (id) ON DELETE SET NULL
);
CREATE TABLE oauth_access_tokens (
	id INTEGER NOT NULL, 
	client_id VARCHAR(255), 
	grant_type VARCHAR(18) NOT NULL, 
	expires_at INTEGER, 
	refresh_token VARCHAR(255), 
	refresh_expires_at INTEGER, 
	user_id INTEGER, 
	hashed VARCHAR(255), 
	prefix VARCHAR(16), 
	PRIMARY KEY (id), 
	CONSTRAINT granttype CHECK (grant_type IN ('authorization_code', 'implicit', 'password', 'client_credentials', 'refresh_token')), 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE, 
	UNIQUE (hashed)
);
CREATE INDEX ix_oauth_access_tokens_prefix ON oauth_access_tokens (prefix);
CREATE TABLE oauth_codes (
	id INTEGER NOT NULL, 
	client_id VARCHAR(255), 
	code VARCHAR(36), 
	expires_at INTEGER, 
	redirect_uri VARCHAR(1023), 
	user_id INTEGER, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE TABLE user_group_map (
	user_id INTEGER NOT NULL, 
	group_id INTEGER NOT NULL, 
	PRIMARY KEY (user_id, group_id), 
	FOREIGN KEY(user_id) REFERENCES users (id), 
	FOREIGN KEY(group_id) REFERENCES groups (id)
);
CREATE TABLE api_tokens (
	id INTEGER NOT NULL, 
	hashed VARCHAR(255), 
	prefix VARCHAR(16), 
	service_id INTEGER, 
	user_id INTEGER, 
	PRIMARY KEY (id), 
	UNIQUE (hashed), 
	FOREIGN KEY(service_id) REFERENCES services (id) ON DELETE CASCADE, 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE INDEX ix_api_tokens_prefix ON api_tokens (prefix);
sqlite> select * from USERS;
```

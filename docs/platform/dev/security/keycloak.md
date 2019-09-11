---
title: Keycloak
---

# Keycloak

## Customize

You can customize Keycloak login page with a `Description` like e.g.

```html
<h1>DATALAYER</h1>
```

or...

```html
<img src="https://docs.datalayer.io/logo/datalayer-white.png" width="200"/>`
```

## Access

In case of issue to access the Keycloak adminstration pages without SSL, you can enforce less restrictions via the database.

```bash
docker exec -it <datalayer_keycloak-db...> bash
mysql -u keycloak -p
use keycloak
update REALM set ssl_required = 'NONE' where id = 'master';
```

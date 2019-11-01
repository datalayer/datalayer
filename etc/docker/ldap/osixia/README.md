[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Docker LDAP osixia/docker-openldap

[OpenLDAP Docker image](https://github.com/osixia/docker-openldap).

```bash
docker run \
  -p 389:389 \
  -p 636:636 \
  --name openldap \
  --hostname openldap \
  --env LDAP_TLS_VERIFY_CLIENT=try \
  --detach \
  osixia/openldap:1.2.3
docker exec \
  openldap ldapsearch -x -H ldap://localhost -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w admin
ldapsearch -x -H ldap://localhost -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w admin
# ldapadd -H ldap://localhost -c -D "cn=admin,cn=config" -w config -f ./example.ldif
ldapadd -H ldap://localhost -c -D "cn=admin,dc=example,dc=org" -w admin -f ./example.ldif
docker rm -f openldap
```

```bash
docker run \
  -p 389:389 \
  -p 689:689 \
  --name openldap \
  --hostname openldap \
  --env LDAP_ORGANISATION="Datalayer"  \
  --env LDAP_DOMAIN="datalayer.io" \
  --env LDAP_ADMIN_PASSWORD="pass" \
  --env LDAP_TLS_VERIFY_CLIENT=try \
  --detach \
  osixia/openldap:1.2.3
```

## TLS

By default, TLS is already configured and enabled, certificate is created using container hostname.

```bash
docker exec openldap ldapsearch -x -H ldaps://localhost -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w admin
```

It can be set by docker run --hostname option eg: ldap.example.org).

```bash
docker run --hostname ldap.my-company.com --detach osixia/openldap:1.2.3
```

See also.

+ https://github.com/osixia/docker-openldap/issues/199
+ https://github.com/osixia/docker-openldap/issues/105

## Build

```bash
docker build --build-arg LDAP_OPENLDAP_GID=1234 --build-arg LDAP_OPENLDAP_UID=2345 -t my_ldap_image .
docker run --name openldap -d my_ldap_image
# this should output uid=2345(openldap) gid=1234(openldap) groups=1234(openldap)
docker exec openldap id openldap
```

## PHP LDAP Admin

[PHP LDAP Admin Docker image](https://github.com/osixia/docker-phpLDAPadmin).

```bash
# Linux
docker run \
  --name phpldapadmin \
  --hostname phpldapadmin \
  --link openldap:ldap-host \
  --env PHPLDAPADMIN_LDAP_HOSTS=ldap-host \
  --detach \
  osixia/phpldapadmin:0.7.2
```

```bash
# MacOS https://github.com/osixia/docker-phpLDAPadmin/issues/16
docker run \
  --name phpldapadmin \
  -p 6443:443 \
  --hostname phpldapadmin \
  --link openldap:ldap-host \
  --env PHPLDAPADMIN_LDAP_HOSTS=ldap-host \
  --detach \
  osixia/phpldapadmin:0.7.2
```

```bash
PHPLDAP_IP=$(docker inspect -f "{{ .NetworkSettings.IPAddress }}" phpldapadmin)
echo """
open https://0.0.0.0:6443
login DN: cn=admin,dc=example,dc=org
password: admin
"""
```

```bash
docker logs phpldapadmin -f
```

```bash
docker stop phpldapadmin openldap
docker rm phpldapadmin openldap
```

## Docker Compose

+ https://github.com/osixia/docker-openldap/blob/stable/example/docker-compose.yml
+ https://github.com/osixia/docker-openldap/issues/60
+ https://github.com/EugenMayer/docker-rancher-extra-catalogs/tree/master/tests/openldap
+ https://github.com/italia/daf-recipes/tree/master/jupyterhub

## Backup

[OpenLDAP Backup](https://github.com/osixia/docker-openldap-backup).

```bash
docker run \
  --env LDAP_BACKUP_CONFIG_CRON_EXP="0 5 * * *" \
  --env LDAP_BACKUP_TTL=15 \
  --volume /data/openldap/backup:/data/backup \
  --detach 
  osixia/openldap-backup:1.2.3 \
  --loglevel debug
```

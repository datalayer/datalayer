[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Lab LDAP

```bash
# Start OpenLDAP Server with SSL.
cd $DLAHOME/lab/ldap && \
  docker run \
    -p 636:636 \
    --name ldap \
    --hostname openldap \
    --env LDAP_TLS_VERIFY_CLIENT=try \
    --detach \
    osixia/openldap:1.2.3
```

```bash
LDAPTLS_REQCERT=never ldapadd -H ldaps://localhost -c -D "cn=admin,dc=example,dc=org" -w admin -f $DLAHOME/lab/ldap/ldif/example-1.ldif
LDAPTLS_REQCERT=never ldapadd -H ldaps://localhost -c -D "cn=admin,dc=example,dc=org" -w admin -f $DLAHOME/lab/ldap/ldif/example-2.ldif
LDAPTLS_REQCERT=never ldapsearch -x -H ldaps://localhost -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w admin
docker exec ldap ldapsearch -x -H ldaps://localhost -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w admin
```

```bash
docker rm -f ldap
```

## Example

```bash
ldapwhoami -h localhost -p 10389 -D \"uid=admin,ou=system\" -w secret
ldapmodify -h localhost -p 10389 -D \"uid=admin,ou=system\" -w secret -a -f apache-ds-tutorial.ldif
ldapsearch -h localhost -p 10389 -D \"uid=admin,ou=system\" -w secret -b \"o=sevenSeas\" -s sub \"(givenName=William)\" cn
ldapsearch -h localhost -p 10389 -b \"o=sevenSeas\" -D \"uid=admin,ou=system\" -w secret \"(objectClass=*)\"
ldapsearch -h localhost -p 10389 -b \"o=sevenSeas\" -D \"uid=admin,ou=system\" -w secret -s sub \"(cn=James Hook)\"

ldapwhoami -h localhost -p 10389 -D \"cn=Horatio Nelson,ou=people,o=sevenSeas\" -w pass
ldapmodify -h localhost -p 10389 -D \"cn=Horatio Nelson,ou=people,o=sevenSeas\" -w pass -a -f captain-hook.ldif
ldapmodify -h localhost -p 10389 -D \"cn=Horatio Nelson,ou=people,o=sevenSeas\" -w pass -a -f captain-hook.ldif
ldapdelete -h localhost -p 10389 -D \"cn=Horatio Nelson,ou=people,o=sevenSeas\" -w pass -f captain-hook-delete.ldif
```

## Schema

- https://guillaumemaka.com/2013/07/17/openldap-create-a-custom-ldap-schema.html
- http://www.yolinux.com/TUTORIALS/LinuxTutorialLDAP-DefineObjectsAndAttributes.html

```bash
# https://www.surekhatech.com/blog/how-to-add-custom-attribute-entry-for-ldap
cat <<EOF > schema.ldif
dn: cn=schema
changetype: modify
add: attributeTypes
attributeTypes: ( 2.25.128424792425578037463837247958458780603.1
       NAME 'dateOfBirth'
       EQUALITY caseIgnoreMatch
       SUBSTR caseIgnoreSubstringsMatch
       SYNTAX 1.3.6.1.4.1.1466.115.121.1.15 )
attributeTypes: ( 2.25.128424792425578037463837247958458780603.2
       NAME 'gender'
       EQUALITY caseIgnoreMatch
       SUBSTR caseIgnoreSubstringsMatch
       SYNTAX 1.3.6.1.4.1.1466.115.121.1.15{1024} )
-
add: objectClasses
objectClasses: ( 2.25.128424792425578037463837247958458780603.3
   NAME 'samplePerson'
   DESC 'samplePerson'
   SUP inetOrgPerson
   STRUCTURAL
   MAY  (dateOfBirth $ gender)
)
EOF
ldapadd -x -D $DLA_LDAP_BIND -w $DLA_LDAP_BIND_PWD -H ldap:// -f ./schema.ldif
```

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

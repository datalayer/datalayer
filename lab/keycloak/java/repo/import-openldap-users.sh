#!/usr/bin/env bash

ldapadd -x -D "cn=admin,dc=datalayer,dc=io" -w admin -H ldap:// -f ldap/ldap-mycompany-com.ldif

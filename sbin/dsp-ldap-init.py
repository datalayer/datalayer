#!/usr/bin/env python3

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

import ldap3, os
from ldap3 import Server, Connection, ALL, MODIFY_REPLACE, HASHED_SALTED_SHA
from ldap3.utils.hashed import hashed

print('Connecting to LDAP server {0}'.format(os.environ['DLA_LDAP_HOST']))
server = Server(
    os.environ['DLA_LDAP_HOST'], 
    get_info=ALL,
    )
conn = Connection(
    server, 
    os.environ['DLA_LDAP_BIND'], 
    os.environ['DLA_LDAP_BIND_PWD'], 
    auto_bind=True
    )

dn = 'ou=users,dc=datalayer,dc=io'
print('Adding dn {0}'.format(dn))
server.schema.object_classes['organizationalUnit']
conn.add(dn, 'organizationalUnit')

server.schema.object_classes['inetOrgPerson']

hashed_password = hashed(HASHED_SALTED_SHA, os.environ['DLA_PWD'])

def add_user(user):
    print('Adding user {0}'.format(user))
    conn.add(user, 'inetOrgPerson', {'sn': 'datalayer', 'mail': 'info@datalayer.io'})
    conn.modify(user, {'userPassword': [(MODIFY_REPLACE, [hashed_password])]})

add_user('cn=datalayer,ou=users,dc=datalayer,dc=io')
add_user('cn=admin,ou=users,dc=datalayer,dc=io')

[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# LDAP Examples

```bash
# Start OpenLDAP Server with SSL.
cd $DLAHOME/lab/apps/ldap && \
  docker run \
  -p 636:636 \
  --name ldap \
  --hostname openldap \
  --env LDAP_TLS_VERIFY_CLIENT=try \
  --detach \
  osixia/openldap:1.2.3 && \
  sleep 3s && \
  docker exec \
    ldap ldapsearch -x -H ldaps://localhost -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w admin
LDAPTLS_REQCERT=never ldapsearch -x -H ldaps://localhost -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w admin
LDAPTLS_REQCERT=never ldapadd -H ldaps://localhost -c -D "cn=admin,dc=example,dc=org" -w admin -f ./example-1.ldif
LDAPTLS_REQCERT=never ldapadd -H ldaps://localhost -c -D "cn=admin,dc=example,dc=org" -w admin -f ./example-2.ldif
```

```python
# ldap - issues with python3
# conda install -y python-ldap
pip install python-ldap
python <<EOF
import sys
from ldif import LDIFWriter
dn = 'cn=Michael Stroeder, ou=Test'
entry = {'objectClass':['top','person'],'cn':['Michael Stroeder'],'sn':['Stroeder']}
ldif_writer = LDIFWriter(sys.stdout)
ldif_writer.unparse(dn, entry)
EOF
python <<EOF
from ldif import LDIFWriter
writer = LDIFWriter(open('/tmp/data.ldif', 'wb'))
writer.unparse('mail=alice@example.org', {
    'cn': ['Alice Alison'],
    'mail': ['alice@example.org'],
    'objectclass': ['top', 'person'],
})
EOF
```

```python
# ldif3
pip install ldif3
python <<EOF
from ldif3 import LDIFWriter
writer = LDIFWriter(open('/tmp/data.ldif', 'wb'))
writer.unparse('mail=alice@example.com', {
    'cn': ['Alice Alison'],
    'mail': ['alice@example.com'],
    'objectclass': ['top', 'person'],
})
EOF
more /tmp/data.ldif
python <<EOF
from ldif3 import LDIFParser
from pprint import pprint
parser = LDIFParser(open('/tmp/data.ldif', 'rb'))
for dn, entry in parser.parse():
    print('got entry record: %s' % dn)
    pprint(entry)
EOF
```

```bash
export DATALAYER_LDAP_HOST=localhost
export DATALAYER_LDAP_BIND="cn=admin,dc=example,dc=org"
export DATALAYER_LDAP_BIND_PWD=admin
export DATALAYER_PWD=admin
```

```python
pip install ldap3
python <<EOF
import ldap3, os
from ldap3 import Server, Connection, ALL, MODIFY_REPLACE, HASHED_SALTED_SHA
from ldap3.utils.hashed import hashed

print('Connecting to LDAP server {0}'.format(os.environ['DATALAYER_LDAP_HOST']))
server = Server(
    os.environ['DATALAYER_LDAP_HOST'],
    port = 636,
    use_ssl = True,
    get_info=ALL,
    )
conn = Connection(
    server, 
    os.environ['DATALAYER_LDAP_BIND'],
    os.environ['DATALAYER_LDAP_BIND_PWD'],
    auto_bind=True,
    )

dn = 'ou=Users,dc=example,dc=org'
print('Adding dn {0}'.format(dn))
server.schema.object_classes['organizationalUnit']
conn.add(dn, 'organizationalUnit')

server.schema.object_classes['inetOrgPerson']

hashed_password = hashed(HASHED_SALTED_SHA, os.environ['DATALAYER_PWD'])

def add_user(user):
    print('Adding user {0}'.format(user))
    conn.add(user, 'inetOrgPerson', {'sn': 'datalayer', 'mail': 'info@datalayer.io'})
    conn.modify(user, {'userPassword': [(MODIFY_REPLACE, [hashed_password])]})

add_user('cn=datalayer,ou=Users,dc=example,dc=org')
add_user('cn=admin,ou=Users,dc=example,dc=org')
EOF
```

```bash
docker rm -f ldap
```

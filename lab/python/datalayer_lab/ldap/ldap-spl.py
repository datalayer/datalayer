import ldap3
from ldap3 import Server, Connection, ALL, ALL_ATTRIBUTES, MODIFY_REPLACE, HASHED_SALTED_SHA
from ldap3.utils.hashed import hashed

ldap_server = Server(
    'localhost', 
    port = 636,
    use_ssl = True,
    get_info = ALL,
    )

ldap_conn = Connection(
    ldap_server, 
    'cn=admin,dc=datalayer,dc=io', 
    'admin', 
    auto_bind = True,
    )

username = 'eric'
user = 'uid={},ou=users,dc=datalayer,dc=io'.format(username)
ldap_conn.modify(user, {'pager': [(MODIFY_REPLACE, ['a pager'])]})

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.


from .ldap import get_ldap_users

def test_get_ldap_users():
    users = get_ldap_users()
    assert users.size == 30

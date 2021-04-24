# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

"""See also [RFC 4519](https://tools.ietf.org/html/rfc4519) for LDAP attributes.
"""

import os
import logging

import ldap3
from ldap3 import (
    ALL, ALL_ATTRIBUTES, HASHED_SALTED_SHA, 
    MODIFY_REPLACE, ALL_ATTRIBUTES, ALL_OPERATIONAL_ATTRIBUTES
    )
from ldap3.utils.hashed import hashed

import pandas as pd

from .ldap_utils import get_conn


logger = logging.getLogger("__name__")


def init_ldap_users():
    (server, conn) = get_conn()
    dn = 'ou=users,dc=datalayer,dc=io'
    logger.info('Adding dn {0}'.format(dn))
    server.schema.object_classes['organizationalUnit']
    conn.add(dn, 'organizationalUnit')
    server.schema.object_classes['inetOrgPerson']
    # add_user(conn, 'admin', os.environ['DSP_PWD'], 'admin', 'info@datalayer.io')
    # add_user(conn, 'datalayer,', os.environ['DSP_PWD'], 'datalayer', 'info@datalayer.io')
    add_ldap_user(conn, 'charlie', '123', 'Charlie', 'Brown', 'charlie@datalayer.io')
    df = get_ldap_users()
    logger.info('Listing LDAP Users')
    for _, row in df.iterrows():
        logger.info('- uid: {}'.format(row['uid']))


def add_ldap_user(conn, uid, password, common_name, surname, mail):
    logger.info('Adding user {}'.format(uid))
    dn = 'uid={},ou=users,dc=datalayer,dc=io'.format(uid)
    hashed_password = hashed(HASHED_SALTED_SHA, password)
    conn.add(
        dn,
        ['inetOrgPerson', 'top', 'inetOrgPerson', 'organizationalPerson', 'person'],
        {
            'cn': common_name,
            'sn': surname,
            'mail': mail,
        }
    )
    conn.modify(dn, {'userPassword': [(MODIFY_REPLACE, [hashed_password])]})


def get_ldap_users(flt=None):
    (_, conn) = get_conn()
    users = 'ou=users,dc=datalayer,dc=io'
    u = conn.search(
        users, 
        '(objectclass=inetOrgPerson)',
        attributes = [ALL_ATTRIBUTES, ALL_OPERATIONAL_ATTRIBUTES],
        get_operational_attributes = True,
        )
    df = pd.DataFrame(columns=[
        'uid', 
        'cn', 
        'sn', 
        'mail', 
        'createTimestamp', 
        'password', 
        ])
    # logger.info('uid,common_name,surname,mail,create_timestamp,pwd')
    for entry in conn.entries:
        # logger.info(entry.entry_to_ldif())
        df = df.append({
            'uid': entry.uid.values[0],
            'cn': entry.cn.values[0],
            'sn': entry.sn.values[0],
            'mail': entry.mail.values[0],
            'createTimestamp': entry.createTimestamp.value.strftime('%Y-%m-%d %H:%M:%S'),
            'password': ldap3.utils.conv.to_unicode(entry.userPassword.value),
            }, ignore_index=True)
    if flt:
        return df[df['uid'].str.contains(flt)]
    else:
        return df

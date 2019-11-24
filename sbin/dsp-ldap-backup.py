#!/usr/bin/env python3

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

import ldap3, os
from ldap3 import Server, Connection, ALL, MODIFY_REPLACE, HASHED_SALTED_SHA, ALL_ATTRIBUTES, ALL_OPERATIONAL_ATTRIBUTES
from ldap3.utils.hashed import hashed

# print('Connecting to LDAP server {0}'.format(os.environ['DLA_LDAP_HOST']))
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
user = 'ou=users,dc=datalayer,dc=io'
u = conn.search(
    user, 
    '(objectclass=inetOrgPerson)',
    attributes = [ALL_ATTRIBUTES, ALL_OPERATIONAL_ATTRIBUTES],
    get_operational_attributes=True,
    )
print('uid,common_name,surname,mail,create_timestamp')
for entry in conn.entries:
#    print(entry)
#    print('    {}'.format(entry.uid))
#    print('    {}'.format(ldap3.utils.conv.to_unicode(entry.userPassword.value)))
#    print('{},{}'.format(entry.uid, entry.createTimestamp.strftime("%Y/%m/%d, %H:%M:%S")))
    print('{},{},{},{},{}'.format(
        entry.uid, 
        entry.cn, 
        entry.sn, 
        entry.mail, 
        entry.createTimestamp.value.strftime('%Y-%m-%d %H:%M:%S'))
    )

# https://stackoverflow.com/questions/37646962/querying-ldap-by-date
def convert_datetime_to_generalized_time(dt):
    """Convert datetime object to generalized time format."""
    dt = dt.timetuple()
    gtime = str(dt.tm_year) + ''.join('0' * (2 - len(str(item))) + str(item)
                                      for item in (dt.tm_mon, dt.tm_mday, dt.tm_hour, dt.tm_min, dt.tm_sec))
    return gtime + 'Z'

import datetime

def get_ldap_date_range_query(dt):
    start_date = dt.replace(hour=0, minute=0, second=0)
    end_date = dt.replace(hour=23, minute=59, second=59)
    return "(&(createTimestamp>=%s)(createTimestamp<=%s))" % (convert_datetime_to_generalized_time(start_date),
                                                              convert_datetime_to_generalized_time(end_date))

# print(get_ldap_date_range_query(datetime.datetime.now() - datetime.timedelta(days=1)))

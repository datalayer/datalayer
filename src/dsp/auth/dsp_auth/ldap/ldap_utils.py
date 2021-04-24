import os
import logging
import datetime

from ldap3 import Server, Connection, ALL


logger = logging.getLogger("__name__")


def get_conn():
    logger.debug('Connecting to LDAP server {0}'.format(os.environ['DSP_LDAP_HOST']))
    server = Server(
        'ldap://{}:{}'.format(
            os.environ['DSP_LDAP_HOST'],
            os.environ['DSP_LDAP_PORT'],
            ),
        get_info=ALL,
        )
    conn = Connection(
        server, 
        os.environ['DSP_LDAP_BIND'], 
        os.environ['DSP_LDAP_BIND_PWD'], 
        auto_bind=True
        )
    return (server, conn)


# https://stackoverflow.com/questions/37646962/querying-ldap-by-date
def convert_datetime_to_generalized_time(dt):
    """Convert datetime object to generalized time format."""
    dt = dt.timetuple()
    gtime = str(dt.tm_year) + ''.join('0' * (2 - len(str(item))) + str(item)
                                      for item in (dt.tm_mon, dt.tm_mday, dt.tm_hour, dt.tm_min, dt.tm_sec))
    return gtime + 'Z'


def get_ldap_date_range_query(dt):
    start_date = dt.replace(hour=0, minute=0, second=0)
    end_date = dt.replace(hour=23, minute=59, second=59)
    return "(&(createTimestamp>=%s)(createTimestamp<=%s))" % (convert_datetime_to_generalized_time(start_date),
                                                              convert_datetime_to_generalized_time(end_date))

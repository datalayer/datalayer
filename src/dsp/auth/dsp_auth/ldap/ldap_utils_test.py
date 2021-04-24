import datetime

from .ldap_utils import get_ldap_date_range_query


def test_get_ldap_date_range_query():
    print(get_ldap_date_range_query(datetime.datetime.now() - datetime.timedelta(days=1)))

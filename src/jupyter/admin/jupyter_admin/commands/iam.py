import logging

from datalayer_iam.store.ldap import init_ldap_users, get_ldap_users
from datalayer_iam.comm.mailer import send_mail


logger = logging.getLogger("__name__")


def execute_iam(args):
    if args.iam_command[0] == 'export-users':
        users = get_ldap_users(args.filter)
        f = './users.csv'
        users.to_csv(f, index=False)
        print('Users export in file: {}'.format(f))
    if args.iam_command[0] == 'init-users':
        init_ldap_users()
    if args.iam_command[0] == 'list-users':
        users = get_ldap_users(args.filter)
        if args.full:
            for index, row in users.iterrows():
                print(f'{index}: {row}')
        else:
            print(users)
    if args.iam_command[0] == 'mail-users':
        users = get_ldap_users(args.filter)
        text_file = './mail.txt'
        html_file = './mail.html'
        print('Using text from {} and html from {}'.format(text_file, html_file))
        with open(text_file) as fp:
            text = fp.read()
        with open(html_file) as fp:
            html = fp.read()
        send_mail(
            'eric@datalayere.io',
            'eric@datalayer.io',
            text,
            html,
            )

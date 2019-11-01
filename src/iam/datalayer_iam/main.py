import os, json, logging, requests, re, uuid, smtplib

from flask import Flask, g, send_from_directory, jsonify, request, redirect
from flask_oidc import OpenIDConnect
from flask_cors import CORS

from email.mime.text import MIMEText

from oauth2client.client import OAuth2Credentials

import ldap3
from ldap3 import Server, Connection, ALL, ALL_ATTRIBUTES, MODIFY_REPLACE, HASHED_SALTED_SHA
from ldap3.utils.hashed import hashed

logging.basicConfig(level=logging.DEBUG)

ROOT_FOLDER='./..'
OIDC_CLIENT_SECRETS = os.getenv('HOME') + '/.datalayer/oidc.json'
OIDC_CLIENT_SECRETS_TEMPLATE = os.getenv('HOME') + '/.datalayer/oidc.json.template'

global oidc_conf
oidc_conf = None
csr = open(OIDC_CLIENT_SECRETS_TEMPLATE, 'r')
oidc_conf = json.load(csr)
oidc_conf['web']['client_secret'] = os.getenv('DLA_KEYCLOAK_REALM_CLIENT_SECRET')
oidc_conf['web']['auth_uri'] = oidc_conf['web']['auth_uri'].replace('DLA_KEYCLOAK_SCHEME_HOST', os.getenv('DLA_KEYCLOAK_SCHEME_HOST'))
oidc_conf['web']['issuer'] = oidc_conf['web']['issuer'].replace('DLA_KEYCLOAK_SCHEME_HOST', os.getenv('DLA_KEYCLOAK_SCHEME_HOST'))
oidc_conf['web']['token_introspection_uri'] = oidc_conf['web']['token_introspection_uri'].replace('DLA_KEYCLOAK_SCHEME_HOST', os.getenv('DLA_KEYCLOAK_SCHEME_HOST'))
oidc_conf['web']['token_uri'] = oidc_conf['web']['token_uri'].replace('DLA_KEYCLOAK_SCHEME_HOST', os.getenv('DLA_KEYCLOAK_SCHEME_HOST'))
oidc_conf['web']['userinfo_uri'] = oidc_conf['web']['userinfo_uri'].replace('DLA_KEYCLOAK_SCHEME_HOST', os.getenv('DLA_KEYCLOAK_SCHEME_HOST'))
with open(OIDC_CLIENT_SECRETS, 'w') as csw:
    json.dump(oidc_conf, csw, indent=4, sort_keys=True)

PORT = 9700
MAIL_REGEXP=r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
USERNAME_REGEXP="^[a-zA-Z0-9_]+$"

reserved_usernames = {
    'admin': 1,
    'about': 1,
    'api': 1,
    'apis': 1,    
    'auth': 1,
    'blog': 1,
    'business': 1,
    'corporate': 1,
    'data': 1,
    'dashboard': 1, 
    'datalab': 1, 
    'datalayer': 1, 
    'discover': 1,
    'doc': 1,
    'docs': 1,
    'hdfs': 1,
    'iam': 1,
    'info': 1,
    'ipfs': 1,
    'kernel': 1,
    'kernels': 1,
    'jupyter': 1,
    'jupyterhub': 1,
    'jupyterlab': 1,
    'kuber': 1,
    'lab': 1,
    'labs': 1,
    'ldap': 1,
    'library': 1,
    'info': 1,
    'note': 1,
    'notebook': 1,
    'notes': 1,
    'privacy': 1,
    'releases': 1,
    'releasenotes': 1,
    'sign': 1,
    'signin': 1,
    'signup': 1,
    'solr': 1,
    'tos': 1,
    'support': 1,
    'system': 1,
    'version': 1,
    }

smtp_host = os.getenv('DLA_SMTP_HOST')
smtp_port = os.getenv('DLA_SMTP_PORT')
smtp_username = os.getenv('DLA_SMTP_USERNAME')
smtp_password = os.getenv('DLA_SMTP_PASSWORD')
ldap_host = os.getenv('DLA_LDAP_HOST')
ldap_bind = os.getenv('DLA_LDAP_BIND')
ldap_bind_pwd = os.getenv('DLA_LDAP_BIND_PWD')

app = Flask(__name__, static_folder = ROOT_FOLDER)

app.logger.setLevel(logging.DEBUG)

app.config.update({
    'SECRET_KEY': 'SomethingNotEntirelySecret',
    'TESTING': True,
    'DEBUG': True,
    'OIDC_CLIENT_SECRETS': OIDC_CLIENT_SECRETS,
    'OIDC_ID_TOKEN_COOKIE_SECURE': False,
    'OIDC_REQUIRE_VERIFIED_EMAIL': False,
    'OIDC_USER_INFO_ENABLED': True,
    'OIDC_OPENID_REALM': 'datalayer',
    'OIDC_SCOPES': [
        'openid', 
        'email', 
        'profile',
        ],
    'OIDC_INTROSPECTION_AUTH_METHOD': 'client_secret_post',
    'OVERWRITE_REDIRECT_URI': os.getenv('DLA_IAM_AUTH_CALLBACK'),
})

# CORS(app, resources={r"/*": {"origins": "*"}}, send_wildcard=True)
CORS(app, supports_credentials = True)

oidc = OpenIDConnect(app)

ldap_server = Server(
    ldap_host, 
    port = 636,
    use_ssl = True,
    get_info = ALL,
    )

@app.route('/iam')
@app.route('/iam/')
def index():
    return """<h1>Datalayer IAM</h1>
<img src="/res/iam.svg" width="200" />"""

@app.route('/res/<path:path>', defaults = {'folder': 'res'})
def res(folder, path):
    return send_from_directory(ROOT_FOLDER + '/' + folder, path)

@app.route('/iam/auth', methods=['GET'])
@oidc.require_login
def auth():
    return redirect(os.getenv('DLA_IAM_UI_REDIRECT'))

# @app.route('/iam/oidc_callback')
# @oidc.custom_callback
# def callback(data):
#     loggin.info('Hello. You submitted %s' % data)
#     return redirect(os.getenv('DLA_IAM_UI_REDIRECT'))
    
@app.route('/iam/profile', methods=['POST'])
@oidc.require_login
def profile_update():
    if oidc.user_loggedin:
        body = request.get_json()
        first_name = body['first_name']
        family_name = body['family_name']
        username = oidc.user_getfield('preferred_username')
        logging.info('Updating profile for username {}'.format(username))
        user = 'uid={},ou=users,dc=datalayer,dc=io'.format(username)
        ldap_conn = Connection(
            ldap_server, 
            ldap_bind,
            ldap_bind_pwd, 
            auto_bind = True,
            )
        res = ldap_conn.modify(user, { 
            'cn': [(MODIFY_REPLACE, [first_name])],
            'sn': [(MODIFY_REPLACE, [family_name])],
        })
        return jsonify({ 'success': res, 'username': username })
    else:
        return jsonify({ 'success': False })

@app.route('/iam/join', methods=['POST'])
def join():
    errors = []
    body = request.get_json()
    logging.info(body)
    username = str(body['username']).lower()
    first_name = body['first_name']
    family_name = body['family_name']
    email = body['email']
    password = body['password']
    password_confirm = body['password_confirm']
    if (len(username) < 3):
        errors.append('Username must be of minimal length 3')
    if (len(username) > 16):
        errors.append('Username must be of maximal length 16')
    if not re.match(USERNAME_REGEXP, username):
        errors.append('Username should only contain alphanumeric or underscore')
    if not re.match(MAIL_REGEXP, email):
        errors.append('Provide a valid email address')
    if (len(password) < 6):
        errors.append('Password must be of minimal length 6')
    if (len(password) > 20):
        errors.append('Password must be of maximal length 20')
    if password != password_confirm:
        errors.append('Password do not match')
    if username in reserved_usernames:
        errors.append('Username `{}` is reserved'.format(username))
    ldap_conn = Connection(
        ldap_server, 
        ldap_bind, 
        ldap_bind_pwd, 
        auto_bind = True,
        )
    user = 'uid={},ou=users,dc=datalayer,dc=io'.format(username)
    if len(username) > 0 and ldap_conn.search(user, '(objectclass=inetOrgPerson)'):
        errors.append('Username `{}` is not available'.format(username))
    else:
        users = 'ou=users,dc=datalayer,dc=io'
        if len(username) > 0 and ldap_conn.search(users, '(&(objectclass=inetOrgPerson)(mail={}))'.format(email)):
            errors.append('Account is not available'.format(username))
    if len(errors) > 0:
        return jsonify({
            'success': False,
            "errors": errors,
        }
    )
    ldap_conn.add(user, 
        ['inetOrgPerson', 'organizationalPerson', 'person', 'top'], 
        {
            'uid': username,
            'cn': first_name,
            'sn': family_name,
            'mail': email,
        }
    )
    token = str(uuid.uuid4())
    hashed_password = hashed(HASHED_SALTED_SHA, password)
    res = ldap_conn.modify(user, { 'userPassword': [(MODIFY_REPLACE, '_t_' + token + '_' + hashed_password)] })
    if not res:
        return jsonify({ 'success': False })
    smtp_server = smtplib.SMTP(  
        host = smtp_host,
        port = int(smtp_port)
    )
    smtp_server.starttls()
    smtp_server.login(smtp_username, smtp_password)
#    hostname = 'https://' + os.getenv('DLAHOST')
    hostname = "https://datalayer.io"
    text = """Thanks for signing up for Datalayer!

Please click the link below to confirm activation of your Datalayer account:

{}/iam/join/confirm?t={}&u={}

Datalayer is currently an early-release service.  We appreciate your
feedback, questions and suggestions.  As appropriate, we encourage you 
to use the Datalayer issue tracker or email our support team.

Issue Tracker: https://github.com/datalayer/datalayer/issues
Email Support: support@datalayer.io

You may find the following resources helpful as you familiarize yourself with Datalayer.

User Guide: https://docs.datalayer.io/use

Happy Data Analysis!

Sincerely, The Datalayer Team.
""".format(hostname, token, username)
    logging.info('Sending mail to {} with content {}:'.format(email, text))
    msg = MIMEText(text)
    msg['Subject'] = '[Datalayer] A warm welcome from Datalayer'
    msg['From'] = 'Datalayer <info@datalayer.io>'
    msg['To'] = email
    smtp_server.send_message(msg)
    smtp_server.quit()
    return jsonify({ 'success': True })

@app.route('/iam/join/confirm', methods=['GET'])
def signup_confirm():
    username = request.args.get('u')
    logging.info('username: %s' % username)
    token = request.args.get('t')
    logging.info('token: %s' % token)
    user = 'uid={},ou=users,dc=datalayer,dc=io'.format(username)
    ldap_conn = Connection(
        ldap_server, 
        ldap_bind, 
        ldap_bind_pwd, 
        auto_bind = True,
        )
    exists = ldap_conn.search(
        user, 
        '(objectclass=inetOrgPerson)',
        attributes = ALL_ATTRIBUTES,
        )
    if not exists:
        logging.info('Can not find %s username in LDAP.' % username)
        return redirect(os.getenv('DLA_IAM_JOIN_ERROR'))
    st = ldap3.utils.conv.to_unicode(ldap_conn.entries[0].userPassword.value)
    logging.info('Retrieved from LDAP %s.' % username)
    if not st.startswith('_t_'):
        logging.info('Temporary credential does not start with _t_ for username %s.' % username)
        return redirect(os.getenv('DLA_IAM_JOIN_ERROR'))
    if token not in st:
        logging.info('No token found in temporary credential for username %s.' % username)
        return redirect(os.getenv('DLA_IAM_JOIN_ERROR'))
    password = st.replace(token, '')[4:]
    logging.info('SSHA %s.' % password)
    ldap_conn.modify(user, { 'userPassword': [(MODIFY_REPLACE, [password])] })
    logging.info('Welcome to %s' % username)
    return redirect(os.getenv('DLA_IAM_JOIN_SUCCESS'))

@app.route('/iam/forgotpassword', methods=['POST'])
def forgot_password():
    errors = []
    body = request.get_json()
    username = body['username']
    password = body['password']
    password_confirm = body['password_confirm']
    if (len(username) < 3):
        errors.append('Username must be of minimal length 3')
    if (len(password) < 5):
        errors.append('Password must be of minimal length 5')
    if password != password_confirm:
        errors.append('Password do not match')
    if len(errors) > 0:
        return jsonify({
            'success': False,
            "errors": errors,
        })
    ldap_conn = Connection(
        ldap_server, 
        ldap_bind, 
        ldap_bind_pwd, 
        auto_bind = True,
        )
    user = 'uid={},ou=users,dc=datalayer,dc=io'.format(username)
    ldap_user = ldap_conn.search(
        user, 
        '(objectclass=inetOrgPerson)',
        attributes = ALL_ATTRIBUTES,
        )
    if not ldap_user:
#        errors.append('Username `{}` is not available'.format(username))
        return jsonify({ 'success': True })
    user_att = ldap_conn.entries[0]
    logging.info(user_att)
    email = user_att.mail.value
    logging.info(email)
    token = str(uuid.uuid4())
    hashed_password = hashed(HASHED_SALTED_SHA, password)
    res = ldap_conn.modify(user, { 'description': [(MODIFY_REPLACE, ['_t_' + token + '_' + hashed_password])] })
    if not res:
        errors.append('Something went wrong. Please contact support@datalayer.io')
        return jsonify({ 
            'success': res,
            'errors': errors,
            })
    smtp_server = smtplib.SMTP(
        host = smtp_host,
        port = int(smtp_port)
    )
    smtp_server.starttls()
    smtp_server.login(smtp_username, smtp_password)
#    hostname = 'https://' + os.getenv('DLAHOST')
    hostname = "https://datalayer.io"
    text = """Thanks for using for Datalayer!

Someone has requested to change the password of your Datalayer account.

If you have not created this request, just FORGET this mail.

Please click the link below if you have made this request:

{}/iam/forgotpassword/confirm?t={}&u={}

Datalayer is currently an early-release service.  We appreciate your
feedback, questions and suggestions.  As appropriate, we encourage you 
to use the Datalayer issue tracker or email our support team.

Issue Tracker: https://github.com/datalayer/datalayer/issues
Email Support: support@datalayer.io

You may find the following resources helpful as you familiarize yourself with Datalayer.

User Guide: https://docs.datalayer.io/use

Happy Data Analysis!

Sincerely, The Datalayer Team.
""".format(hostname, token, username)
    logging.info('Sending mail to {} with content {}:'.format(email, text))
    msg = MIMEText(text)
    msg['Subject'] = '[Datalayer] Password Reset Request'
    msg['From'] = 'Datalayer <info@datalayer.io>'
    msg['To'] = email
    smtp_server.send_message(msg)
    smtp_server.quit()
    return jsonify({ 'success': True })

@app.route('/iam/forgotpassword/confirm', methods=['GET'])
def forgot_password_confirm():
    username = request.args.get('u')
    logging.info('username: %s' % username)
    token = request.args.get('t')
    logging.info('token: %s' % token)
    user = 'uid={},ou=users,dc=datalayer,dc=io'.format(username)
    ldap_conn = Connection(
        ldap_server, 
        ldap_bind, 
        ldap_bind_pwd, 
        auto_bind = True,
        )
    exists = ldap_conn.search(
        user, 
        '(objectclass=inetOrgPerson)',
        attributes = ALL_ATTRIBUTES,
        )
    if not exists:
        logging.info('Can not find %s username in LDAP.' % username)
        return redirect(os.getenv('DLA_IAM_PASSWORD_ERROR'))
    st = ldap3.utils.conv.to_unicode(ldap_conn.entries[0].description.value)
    if not st.startswith('_t_'):
        logging.info('Temporary credential does not start with _t_ for username %s.' % username)
        return redirect(os.getenv('DLA_IAM_PASSWORD_ERROR'))
    if token not in st:
        logging.info('No token found in temporary credential for username %s.' % username)
        return redirect(os.getenv('DLA_IAM_PASSWORD_ERROR'))
    password = st.replace(token, '')[4:]
    ldap_conn.modify(user, { 'userPassword': [(MODIFY_REPLACE, [password])] })
    logging.info('Password changes for %s' % username)
    return redirect(os.getenv('DLA_IAM_PASSWORD_SUCCESS'))

@app.route('/iam/me', methods=['GET'])
def me():
    if oidc.user_loggedin:
#        userid = info.get('sub')
        return jsonify({
            'success': True,
            'username': oidc.user_getfield('preferred_username'),
            'name': oidc.user_getfield('name'),
            'given_name': oidc.user_getfield('given_name'),
            'family_name': oidc.user_getfield('family_name'),
            'email': oidc.user_getfield('email'),
        })
    else:
        return jsonify({ 'success': False })

@app.route('/iam/twitter/callback', methods=['GET'])
def twitter_callback():
    redirect_url = request.args.get('redirect')
    oauth_token = request.args.get('oauth_token')
    oauth_verifier = request.args.get('oauth_verifier')
    return redirect(redirect_url + '?oauth_token=' + oauth_token + '&oauth_verifier=' + oauth_verifier)

@app.route('/iam/logout')
def logout():
    """Performs local logout by removing the session cookie."""
    oidc.logout()
    return jsonify({ 'success': True })

if __name__ == '__main__':
    logging.info('Server listening on port {} - Browse http://localhost:{}'.format(PORT, PORT))
    app.run(
        host='0.0.0.0', 
        port = PORT,
        threaded = True,
        processes = 1,
        )

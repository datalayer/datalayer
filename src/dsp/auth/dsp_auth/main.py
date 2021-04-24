import os
import json
import logging
import re
import traceback
import datetime

from flask import Flask, request, g, send_from_directory, jsonify, redirect
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token, get_jwt_identity, get_current_user
)
from flask_cors import CORS

from dsp_auth.user.user import (
    User, get_user, create_account_and_notify_user, update_profile,
    confirm_user_join, user_new_password, user_new_password_confirm, authenticate_user
)

from dsp_auth.user.usernames import RESERVED_USERNAMES


log_levels = {
    'info': logging.INFO,
    'debug': logging.DEBUG,
    'warning': logging.WARNING,
    'error': logging.ERROR,
}

logging.basicConfig(
    level=log_levels['info'],
    format='%(asctime)s %(levelname)s: %(message)s',
    force=True
    )

logger = logging.getLogger("__name__")


PORT = 9700

ROOT_FOLDER='./..'


PASSWORD_MIN_LENGTH = 6
PASSWORD_MAX_LENGTH = 20
USERNAME_MIN_LENGTH = 2
USERNAME_MAX_LENGTH = 16

MAIL_REGEXP = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"

USERNAME_REGEXP= "^[a-zA-Z0-9_]+$"


app = Flask(__name__, static_folder = ROOT_FOLDER)
app.config.update({
    'JWT_SECRET_KEY': os.environ['DSP_JWT_SECRET'],
    'SECRET_KEY': 'SomethingNotEntirelySecret',
    'TESTING': True,
    'DEBUG': True,
})
CORS(
    app, 
    supports_credentials = True,
#    resources={r"/*": {"origins": "*"}},
#    send_wildcard=True,
    )
jwt = JWTManager(app)


""" Flask JWT """

@jwt.user_identity_loader
def user_identity_lookup(user: User) -> dict:
    """This function that will be called whenever create_access_token
    is used. It will take whatever object is passed into the
    create_access_token method, and lets us define what the identity
    of the access token should be.
    """
    return user.__dict__


@jwt.user_lookup_loader
def user_loader_callback(_jwt_header, identity: dict) -> User:
    """This function is called whenever a protected endpoint is accessed,
    and must return an object based on the tokens identity.
    This is called after the token is verified, so you can use
    get_jwt_claims() in here if desired. Note that this needs to
    return None if the user could not be loaded for any reason,
    such as not being found in the underlying data store
    """
    return User(
        username = identity.get('username', ''),
        email = identity.get('email', ''),
        firstName = identity.get('firstName', ''),
        lastName = identity.get('lastName', ''),
        roles = identity.get('roles', [])
        )


""" Anonymous API Endpoints """

@app.route("/api/auth/login", methods=["POST"])
def login():
    if not request.json:
        return jsonify({ 'success': False, 'message': 'No data has been sent' })
    username = request.json.get('username').lower()
    password = request.json.get('password')
    if not username or not password:
        return jsonify({
            'success': False,   
            'message': 'Fill in the Login Form properly'
            })
    logger.info(f"Login requested for {username}.")
    user = authenticate_user(username, password)
    if not user:
        return jsonify({
            'success': False,
            'message': 'Login Failure: Please check your credentials'
            })
    logger.info(f"Login success for {username}.")
    user = User(
        username = username,
        email = user.get('email_s', ''),
        firstName = user.get('first_name_t', ''),
        lastName = user.get('last_name_t', ''),
        roles = ['user']
        )
    logger.info(f'Retrieved user {user.__dict__}')
    expires = datetime.timedelta(days=1)
    token = create_access_token(identity = user, expires_delta=expires)
    return jsonify({
        'success': True,
        'message': 'Login Success',
        'token': token,
        'user': user.__dict__,
        })


@app.route('/api/auth/join', methods=['POST'])
def join():
    if not request.json:
        return jsonify({ 
            'success': False,
            'message': 'No data has been sent',
        })
    body = request.get_json()
    errors = []
    logger.info(body)
    username = str(body['username']).lower()
    first_name = body['firstName']
    last_name = body['lastName']
    email = body['email']
    password = body['password']
    password_confirm = body['passwordConfirm']
    if username in RESERVED_USERNAMES:
        errors.append(f'Username `{username}` is reserved')
    if (len(username) > 0) and (get_user(username) != None):
        errors.append(f'Username `{username}` is not available')
#   if len(email) > 0 and len(get_users_by_email(email)) > 0:
#       errors.append('Email {} is not available'.format(email))
    if (len(username) < USERNAME_MIN_LENGTH):
        errors.append(f'Username must be of minimal length {USERNAME_MIN_LENGTH}')
    if (len(username) > USERNAME_MAX_LENGTH):
        errors.append(f'Username must be of maximal length {USERNAME_MAX_LENGTH}')
    if not re.match(USERNAME_REGEXP, username):
        errors.append('Username should only contain alphanumeric or underscore')
    if not re.match(MAIL_REGEXP, email):
        errors.append('Provide a valid email address')
    if (len(password) < PASSWORD_MIN_LENGTH):
        errors.append(f'Password must be of minimal length {PASSWORD_MIN_LENGTH}')
    if (len(password) > PASSWORD_MAX_LENGTH):
        errors.append(f'Password must be of maximal length {PASSWORD_MAX_LENGTH}')
    if password != password_confirm:
        errors.append('Password do not match')
    if len(errors) > 0:
        return jsonify({
            'success': False,
            'message': 'Check the information you have provided',
            "errors": errors,
        }
    )
    logger.info(')))' + username)
    result = create_account_and_notify_user(username, first_name, last_name, email, password)
    return jsonify(result)


@app.route('/api/auth/join/confirm', methods=['GET'])
def join_confirm():
    username = request.args.get('u')
    token = request.args.get('t')
    logger.info(f'Registration confirmation request for username: {username} with token: {token}')
    redirect_url = confirm_user_join(username, token)
    logger.info(f'Redirecting to {redirect_url}')
    return redirect(redirect_url)


@app.route('/api/auth/new/password', methods=['POST'])
def new_password():
    errors = []
    body = request.get_json()
    username = body['username'].lower()
    password = body['password']
    password_confirm = body['passwordConfirm']
    if (len(password) < PASSWORD_MIN_LENGTH):
        errors.append(f'Password must be of minimal length {PASSWORD_MIN_LENGTH}')
    if (len(password) > PASSWORD_MAX_LENGTH):
        errors.append(f'Password must be of maximal length {PASSWORD_MAX_LENGTH}')
    if password != password_confirm:
        errors.append('Password do not match')
    if len(errors) > 0:
        return jsonify({
            'success': False,
            'message': 'Correct the information you have provided',
            'errors': errors,
        })
    resp = user_new_password(username, password)
    logger.info(f'Forgot Password response: {resp}')
    return jsonify(resp)


@app.route('/api/auth/new/password/confirm', methods=['GET'])
def new_password_confirm():
    username = request.args.get('u')
    token = request.args.get('t')
    logger.info(f'Forgot Password Confirmation requested for username {username} and token {token}')
    red = user_new_password_confirm(username, token)
    logger.info(f'Forgot Password Confirmation redirecting to {red}')
    return redirect(red)


@app.route('/api/auth/logout')
def logout():
    """Performs local logout."""
    return jsonify({ 'success': True, 'message': 'Successfully logged out' }), 200


""" Authenticated API Endpoints """

@app.route("/api/auth/user/<username>", methods=["GET"])
@jwt_required()
def user_by_username(username):
    return jsonify(get_user(username))


@app.route('/api/auth/auth', methods=['GET'])
@jwt_required()
def auth_get():
    logger.info(f'Identity: {get_jwt_identity()}')
    return redirect(os.getenv('DSP_AUTH_UI_REDIRECT'))


@app.route('/api/auth/profile', methods=['GET'])
@jwt_required()
def profile_get():
    identity = get_jwt_identity()
    logger.debug(f'Server identity: {identity}')
    username = identity.get('username', '').lower()
    user = get_user(username)
    logger.debug(f'Got user: {user}')
    if not user:
        return jsonify({ 'success': False })
    user = User(
        username = username,
        email = user.get('email_s', ''),
        firstName = user.get('first_name_t', ''),
        lastName = user.get('last_name_t', ''),
        roles = ['user']
        )
    return jsonify({
        'success': True,
        'message': 'This is me',
        'identity': user.__dict__,
    })


@app.route('/api/auth/profile', methods=['POST'])
@jwt_required()
def profile_post():
    body = request.get_json()
    identity = get_jwt_identity()
    username = identity.get('username', '').lower()
    first_name = body['firstName']
    last_name = body['lastName']
    result = update_profile(username, first_name, last_name)
    return jsonify(result)


""" Callback Endpoints. """

@app.route('/api/auth/twitter/callback', methods=['GET'])
def twitter_callback():
    redirect_url = request.args.get('redirect')
    oauth_token = request.args.get('oauth_token')
    oauth_verifier = request.args.get('oauth_verifier')
    return redirect(redirect_url + '?oauth_token=' + oauth_token + '&oauth_verifier=' + oauth_verifier)


""" Public Catch All Routes. """

@app.route('/api/auth/version', methods=["GET"])
def index():
    return """<html>
  <head>
    <title>Datalayer DSP DEV Auth :: Reproducible Data Papers and Courses</title>
    <link rel="shortcut icon" href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAC7SURBVFiF7ZU9CgIxEIXfTHbPopfYc+pJ9AALtmJnZSOIoJWFoCTzLHazxh/Ebpt5EPIxM8XXTCKTxYyMCYwJFhOYCo4JFiMuu317PZwaqEBUIar4YMmskL73DytGjgu4gAt4PDJdzkkzMBloBhqBgcu69XW+1I+rNSQESNDuaMEhdP/Fj/7oW+ACLuACHk/3F5BAfuMLBjm8/ZnxNvNtHmY4b7Ztut0bqStoVSHfWj9Z6mr8LXABF3CBB3nvkDfEVN6PAAAAAElFTkSuQmCC" type="image/x-icon">
  </head>
  <body>
    <h1>Datalayer DSP Auth</h1>
    <img src="/api/auth/res/auth.svg" width="200" />
  </body>
</html>
"""


@app.route('/api/auth/res/<path:path>', defaults = {'folder': 'res'})
def ressource(folder, path):
    return send_from_directory(ROOT_FOLDER + '/' + folder, path)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return send_from_directory(ROOT_FOLDER + '/dist' , 'index.html')


""" Catch All Exceptions. """

@app.errorhandler(Exception)
def all_exception_handler(e):
    logger.info('-------------------------')
#    traceback.print_exc()
#    logger.info(traceback.extract_stack(e))
    logger.exception(e)
    logger.info('-------------------------')
#    return 'Server Error', 500
    return jsonify({ 
        'success': False, 
        'message': 'Server Error', 
        'exception': e
        })


""" Main Block. """

if __name__ == "__main__":
    logger.info('Server listening on port {0} - Browse http://localhost:{0}'.format(PORT))
    app.run(
        debug = True,
        host = "0.0.0.0", 
        port = PORT,
        threaded = True,
        processes = 1,
    )

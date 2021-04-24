import os
import json
import logging
import re

from flask import Flask, request, g, send_from_directory, jsonify, redirect
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token, get_jwt_identity, get_current_user
)
from flask_cors import CORS


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


PORT = 9600
ROOT_FOLDER='./..'


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


"""JWT."""


class User:
    def __init__(self, id, display_name):
        self.id = id
        self.display_name = display_name


# This function that will be called whenever create_access_token
# is used. It will take whatever object is passed into the
# create_access_token method, and lets us define what the identity
# of the access token should be.
@jwt.user_identity_loader
def user_identity_lookup(user):
    return { 
        "id": user.id,
        "display_name": user.display_name
        }


# This function is called whenever a protected endpoint is accessed,
# and must return an object based on the tokens identity.
# This is called after the token is verified, so you can use
# get_jwt_claims() in here if desired. Note that this needs to
# return None if the user could not be loaded for any reason,
# such as not being found in the underlying data store
@jwt.user_lookup_loader
def user_loader_callback(identity):
    return User(
        id = identity['id'],
        display_name = identity['display_name']
    )


"""Authenticated API Endpoints"""



@app.route('/api/studio/auth', methods=['GET'])
@jwt_required()
def auth():
    logger.info(f'Identity: {get_jwt_identity()}')
    return redirect(os.getenv('DSP_AUTH_UI_REDIRECT'))


@app.route('/api/studio/me', methods=['GET'])
@jwt_required()
def me():
    if get_jwt_identity():
        return jsonify({
            'success': True,
            'identity': get_jwt_identity(),
        })
    else:
        return jsonify({ 'success': False })


"""Public Catch All Routes."""


@app.route('/api/studio/version', methods=["GET"])
def index():
    return """<h1>Datalayer Studio</h1>
<img src="/api/studio/res/studio.svg" width="200" />"""


@app.route('/api/studio/res/<path:path>', defaults = {'folder': 'res'})
def ressource(folder, path):
    return send_from_directory(ROOT_FOLDER + '/' + folder, path)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return send_from_directory(ROOT_FOLDER + '/dist' , 'index.html')


"""Main Block."""


if __name__ == "__main__":
    logger.info('Server listening on port {0} - Browse http://localhost:{0}'.format(PORT))
    app.run(
        debug = True, 
        host = "0.0.0.0", 
        port = PORT,
        threaded = True,
        processes = 1,
    )

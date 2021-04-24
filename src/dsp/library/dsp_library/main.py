import os
import base64
import json
import logging
import re
import traceback
import uuid
import datetime

from flask import Flask, request, g, send_from_directory, jsonify, redirect
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token, 
    get_jwt_identity, get_current_user
)
from flask_cors import CORS

import ulid as ulid_gen

from dsp_library.tell.tell import ( index_tell, update_tell, 
    get_tell, get_published_tell, get_tells, get_published_tells, publish_tell
)
from dsp_library.tell.defaults import INIT_TELL_SOURCE_MATPLOTLIB, OUTPUTSHOT_NONE_PLACEHOLDER_URL
from dsp_library.s3.s3 import put_output
from dsp_library.twitter.twitter import index_tweet

from dsp_auth.user.user import User, get_user

from dsp_utils import now_string


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


PORT = 9800

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


""" Flask JWT """

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

@app.route("/api/library/tell/published/<username>/<ulid>", methods=["GET"])
def tell_get_published(username, ulid):
    tell = get_published_tell(username, ulid)
    if not tell:
        return jsonify({ 
            'success': False,
            'message': 'No Tell found'
        })
    return jsonify({
        'success': True,
        'message': 'Tell has been successfully fetched',
        'tell': tell
        })


@app.route("/api/library/tells/published", methods=["GET"])
def tells_get_published():
    tells = get_published_tells()
    return jsonify({
        'success': True,
        'message': 'Tells have been successfully fetched',
        'tells': [tell for tell in tells]
        })


@app.route('/api/library/twitter/search', methods=['GET'])
def tweets_get():
#    q = request.args.get('q')
#    results = search_tweets(q)
#    j = list(map(lambda r: r, results))
    return jsonify({
        'success': True,
#        'results': j,
        })


""" Authenticated API Endpoints """

@app.route("/api/library/tell/<username>/<ulid>", methods=["GET"])
@jwt_required()
def tell_get(username, ulid):
    tell = get_tell(username, ulid)
    if not tell:
        return jsonify({ 
            'success': False,
            'message': 'No Tell found'
        })
    return jsonify({
        'success': True,
        'message': 'Tell has been successfully fetched',
        'tell': tell
        })


@app.route("/api/library/tells/<username>", methods=["GET"])
@jwt_required()
def tells_get(username):
    tells = get_tells(username)
    return jsonify({
        'success': True,
        'message': 'Tells have been successfully fetched',
        'tells': [tell for tell in tells]
        })


@app.route("/api/library/tell", methods=["POST"])
@jwt_required()
def tell_post():
    if not request.json:
        return jsonify({ 
            'success': False, 
            'message': 'No data has been received'
            })
    ulid = request.json.get('ulid', None)
    title = request.json.get('title', None)
    username = request.json.get('username', None)
    description = request.json.get('description', None)
    if not title or not description or not username:
        return jsonify({ 
            'success': False,
            'message': 'Fill in the Tell form properly'
            })
    if not ulid:
        ulid = __new_ulid()
        tell = {
            'id': username + '_tell_' + ulid,
            'ulid_s': ulid,
            'username_s': username,
            'title_t': title,
            'description_t': description,
            'source_t': INIT_TELL_SOURCE_MATPLOTLIB,
            'outputshot_url_s': OUTPUTSHOT_NONE_PLACEHOLDER_URL,
            'creation_ts_dt': now_string()
            }
        index_tell(tell)
    else:
        source = request.json.get('source', '')
        outputshot_url_s = request.json.get('outputshotUrl', '')
        tell = {
            'id': username + '_tell_' + ulid,
            'title_t': { "set": title },
            'description_t': { "set": description },
            'source_t': { "set": source },
            'outputshot_url_s': { "set": outputshot_url_s },
            }
        update_tell(tell)
    tell_updated = get_tell(username, ulid)
    return jsonify({
        'success': True,
        'message': 'Tell has been successfully posted',
        'tell': tell_updated
        })


@app.route("/api/library/tell/publish", methods=["POST"])
@jwt_required()
def tell_publish():
    if not request.json:
        return jsonify({ 
            'success': False, 
            'message': 'No data has been received'
            })
    ulid = request.json.get('ulid', None)
    title = request.json.get('title', None)
    username = request.json.get('username', None)
    description = request.json.get('description', None)
    if not title or not description or not username:
        return jsonify({ 
            'success': False,
            'message': 'Fill in the tell form properly'
            })
    source = request.json.get('source', '')
    outputshot_url_s = request.json.get('outputshotUrl', '')
    outputshot_data_s = request.json.get('outputshotData', '')
    parts = outputshot_data_s.split(',')
    if len(parts) == 2:
        if parts[0] == 'data:image/png;base64':
            decoded = base64.b64decode(parts[1])
            outputshot_url_s = put_output(username, 'tell', __new_ulid(), decoded)
            logger.info(f'Output available at {outputshot_url_s}')
    tell = {
        'id': username + '_tell_' + ulid,
        'title_t': { "set": title },
        'description_t': { "set": description },
        'source_t': { "set": source },
        'outputshot_url_s': { "set": outputshot_url_s },
        }
    publish_tell(tell)
    tell_updated = get_tell(username, ulid)
    return jsonify({
        'success': True,
        'message': 'Tell has been successfully posted',
        'tell': tell_updated
        })


@app.route('/api/library/twitter', methods=['POST'])
@jwt_required()
def tweet_post():
    post = request.get_json()
    post['tweet_date'] = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
    post['id'] = str(uuid.uuid4())
    index_tweet(post)
    return jsonify({
        'success': True,
        })

""" Public Catch All Routes. """

@app.route('/api/library/version', methods=["GET"])
def index():
    return """<html>
  <head>
    <title>Datalayer DSP DEV Library :: Reproducible Data Papers and Courses</title>
    <link rel="shortcut icon" href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAC7SURBVFiF7ZU9CgIxEIXfTHbPopfYc+pJ9AALtmJnZSOIoJWFoCTzLHazxh/Ebpt5EPIxM8XXTCKTxYyMCYwJFhOYCo4JFiMuu317PZwaqEBUIar4YMmskL73DytGjgu4gAt4PDJdzkkzMBloBhqBgcu69XW+1I+rNSQESNDuaMEhdP/Fj/7oW+ACLuACHk/3F5BAfuMLBjm8/ZnxNvNtHmY4b7Ztut0bqStoVSHfWj9Z6mr8LXABF3CBB3nvkDfEVN6PAAAAAElFTkSuQmCC" type="image/x-icon">
  </head>
  <body>
    <h1>Datalayer DSP Library</h1>
    <img src="/api/library/res/library.svg" width="200" />
  </body>
</html>
"""


@app.route('/api/library/res/<path:path>', defaults = {'folder': 'res'})
def ressource(folder, path):
    return send_from_directory(ROOT_FOLDER + '/' + folder, path)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return send_from_directory(ROOT_FOLDER, 'index.html')


"""  Catch All Exceptions. """

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


""" Privates. """

def __new_ulid():
    return str(ulid_gen.new())

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

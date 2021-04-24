import os, json, logging, requests, re, uuid, smtplib

from flask import Flask, g, send_from_directory, jsonify, request, redirect
from flask_oidc import OpenIDConnect
from flask_cors import CORS

ROOT_FOLDER='./..'
PORT = 9900

app = Flask(__name__, static_folder = ROOT_FOLDER)

app.logger.setLevel(logging.DEBUG)

@app.route('/api/minihub')
@app.route('/api/minihub/')
def index():
    return """<h1>Datalayer MiniHub</h1>
<img src="/api/res/minihub.svg" width="200" />"""

@app.route('/api/res/<path:path>', defaults = {'folder': 'res'})
def res(folder, path):
    return send_from_directory(ROOT_FOLDER + '/' + folder, path)

if __name__ == '__main__':
    logging.info('Server listening on port {} - Browse http://localhost:{}'.format(PORT, PORT))
    app.run(
        host='0.0.0.0', 
        port = PORT,
        threaded = True,
        processes = 1,
        )

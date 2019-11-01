import os, json, logging
from flask import Flask, send_from_directory

logging.basicConfig(level=logging.DEBUG)

ROOT_FOLDER='./../build'
PORT = 9600

app = Flask(__name__, static_folder = ROOT_FOLDER)

@app.route('/studio')
@app.route('/studio/')
def studio():
    return """<h1>Datalayer Studio</h1>
<img src="/res/studio.svg" width="200" />"""

@app.route('/res/<path:path>', defaults = {'folder': 'res'})
def res(folder, path):
    return send_from_directory(ROOT_FOLDER + '/' + folder, path)

@app.route('/minikube')
def minikube():
    return app.send_static_file('minikube.html')

@app.route('/cloud')
def cloud():
    return app.send_static_file('cloud.html')

@app.route('/', defaults = {'path': ''})
@app.route('/<path:path>')
def index(path):
    return app.send_static_file(os.getenv('DLA_STUDIO_INDEX_PAGE'))

if __name__ == '__main__':
    logging.info('Server listening on port {} - Browse http://localhost:{}'.format(PORT, PORT))
    app.run(
        host='0.0.0.0',
        port = PORT,
        threaded = True,
        processes = 1,
        )

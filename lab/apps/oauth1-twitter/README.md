[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# OAuth1 Twitter Lab

Authenticate and interact with Twitter via a `react.js` UI and a `python` Tornado Web Server.

Ensure you have a working [Miniconda](https://conda.io/miniconda.html).

Review the provided `jupyterhub_config.py` and ensure your environment is correctly configured:

+ Create a twitter app on https://developer.twitter.com/en/apps, take note of the `consumer key` and the `consumer secret key`, and configure the callback URL to `http://localhost:8888/twitter/auth`.
+ When you create a user, you have to ensure it exists on your local Linux system).

```bash
cd $DLAHOME/lab/apps/oauth1-twitter
# Prepare a conda env.
conda deactivate && conda remove -y --name oauth1-twitter --all
conda config --add channels conda-forge
conda create -y --name oauth1-twitter tornado yarn pycurl
conda activate oauth1-twitter
# Install the javascript libraries and build the UI.
yarn install && yarn build
# Export your Twitter apps credentials.
export DLA_TWITTER_CONSUMER_KEY=<your-twitter-consumer-key>
export DLA_TWITTER_CONSUMER_SECRET=<your-twitter-consumer-secret>
# Run the server.
yarn watch
# Open the application in your favorite browser.
open http://localhost:8888
```

![Form](https://raw.githubusercontent.com/datalayer/datalayer/master/lab/apps/oauth1-twitter/docs/img/twitter-form.png "Form")

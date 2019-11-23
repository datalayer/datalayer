[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Lab Auth with Twitter

Authenticate and interact with Twitter via a `React.js` UI and a `Python` Tornado Web Server.

## Environment

Ensure you have a working [Miniconda](https://conda.io/miniconda.html).

```bash
# Prepare a conda env.
conda deactivate && \
  conda remove -y --name oauth_twitter --all && \
  conda create -y --name oauth_twitter tornado yarn pycurl && \
  conda activate oauth_twitter
```

## Build

```bash
# Install the javascript libraries and build the UI.
cd $DLAHOME/lab/auth-twitter/twitter-1 && \
  yarn install && \
  yarn build
```

## Twitter Apps

Create a Twitter Application on https://developer.twitter.com/en/apps.

Set the callback URL to `http://localhost:8888/twitter/auth` and take note of the `consumer key` and the `consumer secret key`.

## Start

```bash
# Export your Twitter apps credentials and run the server.
DLA_TWITTER_CONSUMER_KEY=<your-twitter-consumer-key> && \
  DLA_TWITTER_CONSUMER_SECRET=<your-twitter-consumer-secret> && \
  yarn watch
# Open the application in your favorite browser.
open http://localhost:8888
```

![Form](https://raw.githubusercontent.com/datalayer/datalayer/master/lab/auth-twitter/twitter-1/docs/img/form.png "Form")

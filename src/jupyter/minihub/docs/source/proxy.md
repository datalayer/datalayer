---
title: JupyterHub Proxy
---

# JupyterHub Proxy

Configurable HTTP Proxy [GitHub](https://github.com/jupyterhub/configurable-http-proxy) repository.

- https://github.com/jupyterhub/jupyterhub/blob/master/jupyterhub/proxy.py
  - class Proxy(LoggingConfigurable)
  - class ConfigurableHTTPProxy(Proxy)

![Configurable HTTP Proxy](https://raw.githubusercontent.com/datalayer-contrib/jupyterhub-proxy-http/datalayer/doc/_static/chp.png)

## API

[Swagger API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyterhub/configurable-http-proxy/master/doc/rest-api.yml#/default).

https://jhubdocs.readthedocs.io/en/latest/configurable-http-proxy/README.html

## Cookie Secret

The cookie secret should be 32 random bytes, encoded as hex, and is typically stored in a `jupyterhub_cookie_secret` file. 

```bash
# Generate the jupyterhub_cookie_secret.
openssl rand -hex 32 > /srv/jupyterhub/jupyterhub_cookie_secret
# If you would like to avoid the need for files, the value can be loaded in the Hub process from the JPY_COOKIE_SECRET environment variable, which is a hex-encoded string. For security reasons, this environment variable should only be visible to the Hub. If you set it dynamically, all users will be logged out each time the Hub starts.
export JPY_COOKIE_SECRET=`openssl rand -hex 32`
```

```bash
# In most deployments of JupyterHub, you should point this to a secure location
# on the file system, such as /srv/jupyterhub/jupyterhub_cookie_secret.
# The location of the jupyterhub_cookie_secret file 
# can be specified in the jupyterhub_config.py file as follows.
c.JupyterHub.cookie_secret_file = '/srv/jupyterhub/jupyterhub_cookie_secret'
```

```bash
c.JupyterHub.cookie_secret = bytes.fromhex('VERY LONG SECRET HEX STRING')
```

## Proxy Authentication Token

The Hub authenticates its requests to the Proxy using a secret token that the Hub and Proxy agree upon.

The value of this string should be a random string.

Default if token is not set. If you don’t set the Proxy authentication token, the Hub will generate a random key itself, which means that any time you restart the Hub you must also restart the Proxy. If the proxy is a subprocess of the Hub, this should happen automatically (this is the default configuration).

```bash
# Generate and store token in the configuration file
openssl rand -hex 32 > /srv/jupyterhub/jupyterhub_config_secret
c.JupyterHub.cookie_secret_file = '/srv/jupyterhub/cookie_secret'
# Or you can set the value in the configuration file, jupyterhub_config.py:
c.JupyterHub.proxy_auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'
# Generating and storing as an environment variable
# You can pass this value of the proxy authentication token to the Hub and Proxy using the CONFIGPROXY_AUTH_TOKEN environment variable. This environment variable needs to be visible to the Hub and Proxy.
export CONFIGPROXY_AUTH_TOKEN='openssl rand -hex 32'
```

## Docker

- https://hub.docker.com/r/jupyterhub/configurable-http-proxy

## Separated Proxy

[Separated Proxy](https://jupyterhub.readthedocs.io/en/latest/reference/separate-proxy.html).

## Custom Proxy

Writing a [custom Proxy](https://jupyterhub.readthedocs.io/en/latest/reference/proxy.html) implementation.

## Traefik Proxy

Traefik Proxy [GitHub](https://github.com/jupyterhub/traefik-proxy) repository.

https://blog.jupyter.org/introducing-traefikproxy-a-new-jupyterhub-proxy-based-on-traefik-4839e972faf6

```bash
# jupyterhub_config.py: Force the proxy to only listen to connections to 127.0.0.1
c.JupyterHub.ip = '127.0.0.1'
```

## Istio Proxy

- https://github.com/splunk/jupyterhub-istio-proxy
- https://medium.com/swlh/running-jupyterhub-with-istio-service-mesh-on-kubernetes-a-troubleshooting-journey-707039f36a7b
- https://github.com/jupyterhub/zero-to-jupyterhub-k8s/issues/697

## Reverse Proxy

Read more on using a [Reverse Proxy](https://jupyterhub.readthedocs.io/en/latest/reference/config-proxy.html).

**For `nginx`**

```bash
# vi /etc/nginx/sites-enabled/default 
# top-level http config for websocket headers
# If Upgrade is defined, Connection = upgrade
# If Upgrade is empty, Connection = close
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
server {
    listen 80;
    ssl off;
    server_name hub.datalayer.io.local;
    location /api-browser {
        proxy_pass http://127.0.0.1:10000/services/api-browser;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # websocket headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        # websocket headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
    # Managing requests to verify letsencrypt host
    location ~ /.well-known {
        allow all;
    }
}
```

**For `apache2`**

```bash
apt install apache2
a2enmod ssl rewrite proxy proxy_http proxy_wstunnel
service apache2 start
```

```bash
# vi /etc/apache2/sites-enabled/000-default.conf
<VirtualHost hub.datalayer.io.local:80>
  ServerName hub.datalayer.io.local
  # Use RewriteEngine to handle websocket connection upgrades
  RewriteEngine On
  RewriteCond %{HTTP:Connection} Upgrade [NC]
  RewriteCond %{HTTP:Upgrade} websocket [NC]
  RewriteRule /(.*) ws://127.0.0.1:8000/$1 [P,L]
  # preserve Host header to avoid cross-origin problems
  ProxyPreserveHost on
  # proxy to api-browser
  ProxyPass        /api-browser http://127.0.0.1:10000/services/api-browser
  ProxyPassReverse /api-browser http://127.0.0.1:10000/services/api-browser
  # proxy to JupyterHub
  ProxyPass        / http://127.0.0.1:8000/
  ProxyPassReverse / http://127.0.0.1:8000/
</VirtualHost>
```

```bash
# vi /etc/apache2/sites-enabled/000-default.conf
# SSL redirect HTTP to HTTPS
Listen 80
<VirtualHost hub.datalayer.io.local:80>
  ServerName hub.datalayer.io.local
  Redirect / https://hub.datalayer.io.local/
</VirtualHost>

Listen 443
<VirtualHost hub.datalayer.io.local:443>
  ServerName hub.datalayer.io.local
  # configure SSL
  SSLEngine on
  SSLCertificateFile /etc/letsencrypt/live/hub.datalayer.io.local/fullchain.pem
  SSLCertificateKeyFile /etc/letsencrypt/live/hub.datalayer.io.local/privkey.pem
  SSLProtocol All -SSLv2 -SSLv3
  SSLOpenSSLConfCmd DHParameters /etc/ssl/certs/dhparam.pem
  SSLCipherSuite EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH
  # Use RewriteEngine to handle websocket connection upgrades
  RewriteEngine On
  RewriteCond %{HTTP:Connection} Upgrade [NC]
  RewriteCond %{HTTP:Upgrade} websocket [NC]
  RewriteRule /(.*) ws://127.0.0.1:8000/$1 [P,L]
  <Location "/">
    # preserve Host header to avoid cross-origin problems
    ProxyPreserveHost on
    # proxy to JupyterHub
    ProxyPass         http://127.0.0.1:8000/
    ProxyPassReverse  http://127.0.0.1:8000/
  </Location>
</VirtualHost>
```

```bash
# /etc/apache2/sites-enabled/000-default.conf 
NameVirtualHost datalayer.io
<VirtualHost datalayer.io>
   ServerName datalayer.io
#   ProxyPass / http://127.0.0.1:2000/
#   ProxyPassReverse / http://127.0.0.1:2000/
#   ProxyPreserveHost On
   RewriteEngine on
   RewriteCond %{SERVER_NAME} =datalayer.io
   RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>
```

```bash
# /etc/apache2/sites-enabled/000-default-le-ssl.conf 
<IfModule mod_ssl.c>
<VirtualHost datalayer.io:443>
   ServerName datalayer.io
   # Use RewriteEngine to handle websocket connection upgrades
   RewriteEngine On
   RewriteCond %{HTTP:Connection} Upgrade [NC]
   RewriteCond %{HTTP:Upgrade} websocket [NC]
   RewriteRule /(.*) ws://127.0.0.1:8000/$1 [P,L]
   ProxyPass / http://127.0.0.1:8000/
   ProxyPassReverse / http://127.0.0.1:8000/
   ProxyPreserveHost On
   SSLCertificateFile /etc/letsencrypt/live/datalayer.io/fullchain.pem
   SSLCertificateKeyFile /etc/letsencrypt/live/datalayer.io/privkey.pem
   Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>
</IfModule>
```

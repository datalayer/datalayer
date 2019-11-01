---
title: SSL
---

# SSL

## Let's Encrypt

Read https://www.linode.com/docs/security/ssl/install-lets-encrypt-to-create-ssl-certificates/#download-and-install-let-s-encrypt.

```bash
sudo add-apt-repository ppa:certbot/certbot
sudo apt update
sudo apt install python-certbot-apache
sudo certbot --apache --renew-by-default -d datalayer.io
```

```bash
# sudo certbot certonly --apache -d datalayer.io
# sudo certbot renew --apache
sudo certbot certonly -d datalayer.io
sudo certbot renew
```

```bash
# Update the content of the cron file as follows.
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

0 */12 * * * root certbot -q renew --apache
```

```bash
# Need python2
git clone https://github.com/letsencrypt/letsencrypt
cd letsencrypt
./letsencrypt-auto certonly --standalone -d datalayer.io
# key: /etc/letsencrypt/live/test.datalayer.io/privkey.pem
# cert: /etc/letsencrypt/live/test.datalayer.io/fullchain.pem
```

## Self-Signed Certificate

```
keytool -keystore datalayer.jks -alias datalayer -genkey -keyalg RSA -sigalg SHA256withRSA -validity 365
```

```
keytool -keystore keystore -alias doc-api -genkey -keyalg RSA
keytool -keystore keystore -alias doc-api -genkey -keyalg RSA -sigalg SHA256withRSA
keytool -keystore keystore -alias doc-api -genkey -keyalg RSA -sigalg SHA256withRSA -ext 'SAN=dns:doc.datalayer.io,dns:*.datalayer.io'
```

## CA Signed Certificate

```
keytool -certreq -alias datalayer -keystore datalayer.jks -file datalayer.csr
```

## Load Certificate

```
keytool -keystore datalayer.jks -import -alias datalayer -file certificate.crt -trustcacerts
```

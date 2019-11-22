[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datlayer Lab Box

This folder contains source code and documentation to use Box as storage backend.

```bash
# https://github.com/box/box-python-sdk
pip install --upgrade boxsdk[jwt]
```

```bash
# openssl genrsa -aes256 -passout pass.txt -out private_key.pem 2048
openssl genrsa -aes256 -out private_key.pem 2048
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

Create an app on https://developer.box.com

```bash
python box.py
```

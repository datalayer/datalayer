"""Python hashlib generator. It supports salted:

- md5
- sha1
- sha224
- sha256
- sha384
- sha512

pySSHA-slapd is a simple SSHA string encoder e checker that's quite easy to use:

````
python3 ssha.py -p slapdsecret
{SSHA}omu7YHgg6_uqOIN_epZtfJtGo0ruwdSr 
````

Usage
````
usage: ssha.py [-h] -p P [-s S] [-salt_size SALT_SIZE] [-c C] [-enc ENC] [-b]
               [-prefixed] [-d D]

Usage: python ssha.py -p Password[-c SSHA hash to check]

optional arguments:
  -h, --help            show this help message and exit
  -p P                  Password to encode
  -s S                  Salt, 4 bytes in hex format, example "fooo": -s
                        666f6f6f
  -salt_size SALT_SIZE  salt lenght
  -c C                  {SSHA} hash to check
  -enc ENC              Encoder to use, example: sha1 sha224 sha256 sha384
                        sha512
  -b                    if {SSHA} hash is in base64 format
  -prefixed             if suffixed or prefixed salt
  -d D                  Debug level from 1 to 5

````

Dependencies
------------
Python3 and hashlib

Usage examples
--------------

You can adopt a specified salt for hashing, in hex format:
````
python3 ssha.py -p slapdsecret -s 74be2629
{SSHA}w5CJCwNQk44NjTYzcMZNKbE6Bu90viYp 
````

Verify if a password is valid comparing it with a SSHA hash:
````
python3 ssha.py -c {SHA1}pPUGnEBCmIa+fJy6ZTS87eEg+ylVYDqcrs6oHA== -p slapdsecret 
````

Same as previous but ssha hash is in base64 format (like ldapsearch output):
````
python3 ssha.py -c e1NIQTF9dzVDSkN3TlFrNDROalRZemNNWk5LYkU2QnU5MHZpWXA= -b -p slapdsecret -salt_size 4
````

Same as the previous but with maximum debug level
````
python3 ssha.py -c e1NIQTF9dzVDSkN3TlFrNDROalRZemNNWk5LYkU2QnU5MHZpWXA= -b -p slapdsecret -d 3 -salt_size 4

[sshaSplit debug]
	ssha_password: {SSHA}w5CJCwNQk44NjTYzcMZNKbE6Bu90viYp 
	salt: 74be2629 
	payload: 0b0350938e0d8d363370c64d29b13a06ef

[checkPassword debug]
 	ssha_password:    {SSHA}w5CJCwNQk44NjTYzcMZNKbE6Bu90viYp
	created_password: {SSHA}w5CJCwNQk44NjTYzcMZNKbE6Bu90viYp
	salt: 74be2629
	password: slapdsecret

{SSHA} Check is valid: True
````

select your preferred encoder
````
python3 ssha.py -p slapdsecret -s 74be2629 -enc sha512
{SHA512}4gm2Ep0Nklb8pkss9zIs+t6/BGaGn2QYphl3UeAYuBBNW/hj8glu4jUb7JPb4LVWdCv+g0WoyYUB9VWVajQpjHS+Jik= 
````

without salt
````
python3 ssha.py -p ciao -d 3 -salt_size 0  -enc sha512
````

OpenLDAP use a 8byte lenght salt, you can also change this value with **-salt_size** option.

Resources
---------
- https://tools.ietf.org/html/rfc3174
- https://github.com/openldap/openldap/blob/master/libraries/liblutil/sha1.c
- https://github.com/openldap/openldap/blob/master/contrib/slapd-modules/passwd/sha2/README

TODO

- handle also SHA withous salt: SSHA512 and SHA512
- better {HASHTYPE} formatting: remove al that hardcoding!
"""
import binascii
import hashlib
import os
import sys
from base64 import b64encode as encode
from base64 import b64decode as decode

CHARSET='utf-8'
# easy patch for sha1 to sha
hashlib.sha = hashlib.sha1


def getEncoder(encoder_name):
    return getattr(hashlib, encoder_name.lower().replace('ss', 's'))


def sshaSplit(ssha_password, encoder, salt_size=16, suffixed=True, debug=0):
    """
    suffixed ssha: word+salt
    TODO: provide option to have prefixed too: salt+word
    """
    if debug > 3: print('sshaSplit')
    #salt_size = int(getEncoder(encoder)().block_size / 8)
    if salt_size:
        if suffixed:
            payload = decode(ssha_password)[:-salt_size]
            salt = decode(ssha_password)[-salt_size:]
        else:
            salt = decode(ssha_password)[:salt_size]
            payload = decode(ssha_password)[salt_size:]
        hash_type = '{S'+encoder.upper()+'}'
    else:
        salt = ''
        payload = decode(ssha_password)
        hash_type = '{'+encoder.upper()+'}'
    if debug:
        if salt: hex_salt = binascii.hexlify(salt).decode(CHARSET)
        else: hex_salt = ''
        hex_digest = binascii.hexlify(payload).decode(CHARSET)
        print(('\n[sshaSplit debug]\n\t'
               'ssha_password: {}{} \n'
               '\ttype: {} \n'
               '\tsalt lenght: {} \n'
               '\tsalt: {} \n'
               '\tpayload: {}\n').format(hash_type,
                                         ssha_password,
                                         'suffixed' if suffixed else 'prefixed',
                                         salt_size,
                                         hex_salt,
                                         hex_digest))
    return {'salt': salt, 'payload': payload,
            'ssha': ssha_password, 'salt_size': salt_size}


def sshaEncoder(encoder, password, salt=None, salt_size=16, suffixed=True, debug=0):
    if debug > 3: print('sshaEncoder')
    if salt: salt = binascii.unhexlify(salt)
    else: salt = os.urandom(salt_size)
    enc_password = bytes(password, encoding=CHARSET)
    encoder_func = getEncoder(encoder)
    if suffixed:
        h = encoder_func(enc_password + salt)
    else:
        h = encoder_func(salt + enc_password)
    if debug > 1:
        hex_salt = binascii.hexlify(salt)
        hex_digest = h.hexdigest()
        print('[sshaEncode debug]\n \tsalt: {} \n\tpayload: {}\n'
              '\tpassword: {}\n'.format(str(hex_salt, CHARSET), hex_digest, password))
    return {'salt': salt, 'digest': h.digest(), 'password': password}


def hashPassword(encoder, password, salt=None, salt_size=16, suffixed=True, debug=0):
    if debug > 3: print('hashPassword')
    sshaenc = sshaEncoder(encoder, password, salt, salt_size, suffixed, debug)
    if salt_size:
        if suffixed:
            b64digest = encode(sshaenc['digest']+sshaenc['salt'])
        else:
            b64digest = encode(sshaenc['salt']+sshaenc['digest'])
    else:
        b64digest = encode(sshaenc['digest'])
    hash_type = ''.join(("{", "S" if salt else "", encoder.upper(), "}"))
    byte_res = b"".join([bytes(i, encoding=CHARSET) for i in (hash_type, str(b64digest, CHARSET))])
    return str(byte_res, CHARSET)


def checkPassword(password, ssha_password, salt_size, suffixed, debug=0):
    assert ssha_password.startswith('{')
    ssha_p_splitted = ssha_password.split('}')
    encoder = ssha_p_splitted[0][1:]
    cleaned_ssha_password = ssha_p_splitted[1]
    # extract payload and salt
    sshasplit = sshaSplit(cleaned_ssha_password, encoder.lower(),
                          salt_size, suffixed, debug)
    payload, salt = sshasplit['payload'], sshasplit['salt']
    encoded_salt = binascii.hexlify(salt) if salt else None
    ssha_hash = hashPassword(encoder, password,
                             encoded_salt,
                             salt_size, suffixed, debug)
    if debug > 1:
        print('[checkPassword debug]\n \tssha_password:    {}\n\t'
              'created_password: {}'.format(ssha_password, ssha_hash))
    if debug > 2 and salt_size:
        print('\tsalt: {}\n\tpassword: {}'.format(str(binascii.hexlify(salt),
                                                  CHARSET), password))
    if ssha_hash.split('}')[-1] == ssha_password.split('}')[-1]:
        return True


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Usage:\n'
                                                 'python ssha.py '
                                                 '-p Password'
                                                 '[-c SSHA hash to check]',
                                     epilog="python3 ssha.py -c "
                                            "{SHA1}pPUGnEBCmIa+fJy6ZTS87eEg+ylVYDqcrs6oHA== "
                                            "-p slapdsecret")
    parser.add_argument('-p', required=True, help="Password to encode")
    parser.add_argument('-s', required=False,
                        help="Salt, 4 bytes in hex format,"
                             " example \"fooo\": -s 666f6f6f")
    parser.add_argument('-salt_size', required=False, type=int, default=8,
                        help="salt lenght")
    parser.add_argument('-c', required=False, help="{SSHA} hash to check")
    parser.add_argument('-enc', required=False, default='sha1',
                        help="Encoder to use, example:\nsha1\nsha224\nsha256\nsha384\nsha512")
    parser.add_argument('-b', required=False, action='store_true',
                        help="if {SSHA} hash is in base64 format")
    parser.add_argument('-prefixed', required=False, action="store_false",
                        help="if suffixed or prefixed salt")
    parser.add_argument('-d', required=False, type=int, default=0,
                        help="Debug level from 1 to 5")

    args = parser.parse_args()
    password = args.p
    if args.c:
        if args.b: shahash = str(decode(args.c), CHARSET)
        else: shahash = args.c
        try:
            is_valid = checkPassword(password, shahash, args.salt_size,
                                     args.prefixed, args.d) == True
            print('\n{{SSHA}} Check is valid: {}\n'.format(is_valid))
        except Exception as e:
            print(e)
            print(('\n[ERROR] Hash check currently not supported, still '
                   'needed a correct padding scheme. Please contribute.'))
    else:
        hash_password = hashPassword(args.enc, password, args.s,
                                     args.salt_size, args.prefixed, args.d)
        print(hash_password,'\n')

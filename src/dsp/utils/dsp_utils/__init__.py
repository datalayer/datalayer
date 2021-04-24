import os
import hashlib
import binascii
from datetime import datetime

HASH_VERSION = '{DSP_V1}'

def now():
    return datetime.now()

def now_string():
    now = datetime.now()
    return now.strftime("%Y-%m-%d %H:%M:%S")

def hash_password(password):
    """Hash a password for storing."""
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),   
                                salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return HASH_VERSION + (salt + pwdhash).decode('ascii')
 
def verify_password(stored_password, provided_password):
    """Verify a stored password against one provided by user"""
    stored_password = stored_password.replace(HASH_VERSION, '')
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512', 
                                  provided_password.encode('utf-8'), 
                                  salt.encode('ascii'), 
                                  100000)
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    return pwdhash == stored_password

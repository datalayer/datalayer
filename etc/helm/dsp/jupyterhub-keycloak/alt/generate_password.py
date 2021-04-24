import os, sys, yaml
import hashlib, hmac

usage = "python generate_username.py <YOUR_USER_ID>"

if len(sys.argv) < 2:
    raise Exception("""
    Please provide your username:
    {0}""".format(usage))
elif len(sys.argv) > 2:
    raise Exception("""
    Too many input arguments:
    {0}""".format(usage))
username = sys.argv[1]
try:
    filename = os.path.abspath(
            os.path.join(
                os.getcwd(),
                './../../..',
                'infra',
                'eks',
                'hub.yaml'
                )
            )
except(FileNotFoundError):
    print("File not found, please adhere to AAP organisation file structure")
    exit(1)
    
with open(filename) as stream:
    hub_config = yaml.safe_load(stream)

secret_key_hex = hub_config['auth']['hmac']['secretKey']
secret_key = bytearray.fromhex(secret_key_hex)
password = hmac.new(secret_key, username.encode('utf-8'), hashlib.sha512).hexdigest()

print(password)

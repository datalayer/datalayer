import json

from boxsdk import Client, JWTAuth
from boxsdk.object.collaboration import CollaborationRole

def cache_tokens(access_token, refresh_token):
    """Cache to avoid multiple token requests, typically once per day.
    """
    print("Access Token: {} - Refresh Token: {}".format(access_token, refresh_token))

def box_example():
    with open('./_secret/box_config.json') as f:
        data = json.load(f)
    rsa_private_key_file_sys_path = data['boxAppSettings']['appAuth']['privateKey']
    with open(rsa_private_key_file_sys_path) as f:
        rsa_private_key_data = f.read()
    # Must pass exactly one of either `rsa_private_key_file_sys_path` or `rsa_private_key_data`.
    auth = JWTAuth(
        client_id = data['boxAppSettings']['clientID'],
        client_secret = data['boxAppSettings']['clientSecret'],
        enterprise_id = data['enterpriseID'],
        rsa_private_key_passphrase = data['boxAppSettings']['appAuth']['passphrase'],
        rsa_private_key_data = rsa_private_key_data,
        jwt_key_id = data['boxAppSettings']['appAuth']['publicKeyID'],
        store_tokens = cache_tokens
    )
    client = Client(auth)
    me = client.user(user_id='me').get()
    print('Logged in as user: {}'.format(me))
    print('Logged in as user: {}'.format(me['login']))
    print('Logged in as user: {}'.format(client.user().get()))
    root_folder = client.folder('0')
    """
    print('Cleaning root folder.')
    [i.delete() for i in root_folder.get_items(limit=10)]
    print('Uploading file to root folder.')
    test_file = root_folder.upload(file_path=('./file.txt'))
    items = root_folder.get_items(limit=100, offset=0)
    for item in items:
        print("  " + item.name)
    user = client.user('eric@datalayer.io')
    collaboration = root_folder.add_collaborator(user, CollaborationRole.EDITOR)
    print('Uploading file to test folder.')
    """
#    test_folder = root_folder.create_subfolder('dla_test2')
    test_folder = client.folder(folder_id='92332902768')
    print(test_folder)
    items = test_folder.get_items(limit=100, offset=0)
    for item in items:
        print("  " + item.name)
    print('Cleaning test folder.')
    [i.delete() for i in test_folder.get_items(limit=10)]
    print('Uploading file to test folder.')
    test_file_2 = test_folder.upload(
        file_path='./file.txt',
        upload_using_accelerator=True)
    print('Listing items.')
    """
    items = test_folder.get_items(limit=100, offset=0)
    for item in items:
        print("  " + item.name)
    print('Delete uploaded file.')
    test_file.delete()
    print('Listing items.')
    items = root_folder.get_items(limit=100, offset=0)
    for item in items:
        print("   " + item.name)
    """

if __name__ == '__main__':
    box_example()

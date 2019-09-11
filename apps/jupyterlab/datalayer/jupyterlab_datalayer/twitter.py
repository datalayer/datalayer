import logging, os, sys, json, datetime, uuid, traceback
import tornado.httpserver, tornado.ioloop, tornado.options, tornado.web, tornado.gen, tornado.auth
from tornado.options import define, options
from notebook.base.handlers import APIHandler
from datalayer_library.library import index_tweet

image_preamble = 'data:image/png;base64,'

class BaseHandler(APIHandler):
#    @tornado.gen.coroutine
    def get_current_user(self):
        twitter_user = self.get_secure_cookie("twitter_user")
        if twitter_user:
            return tornado.escape.json_decode(twitter_user)
        return None

class TwitterHandler(APIHandler):
    """
    Twitter Parent Handler.
    """
    @property
    def twitter(self):
        return self.settings['twitter']

class MainHandler(BaseHandler, tornado.auth.TwitterMixin):
    @tornado.gen.coroutine
    def get(self):
        self.render('index.html')

class TwitterAuthHandler(BaseHandler, tornado.auth.TwitterMixin):
    @tornado.gen.coroutine
    def get(self):
        if self.get_argument("oauth_token", None):
            user = yield self.get_authenticated_user()
            twitter_user = {'name': user['name'], 'screen_name': user['screen_name'], 'username': user['screen_name']}
            self.set_secure_cookie("twitter_user", tornado.escape.json_encode(twitter_user))
            self.set_secure_cookie("twitter_access_token", tornado.escape.json_encode(user['access_token']))
            self.redirect("/")
        else:
            callback_uri = os.getenv('DLA_TWITTER_OAUTH_CALLBACK_URL')
            redirect = os.getenv('DLA_TWITTER_OAUTH_REDIRECT') + self.settings['base_url'] + 'twitter/auth/popup'
            u = callback_uri + '?redirect=' + redirect
            logging.info('Twitter Callback URI: {}'.format(u))
            yield self.authorize_redirect(callback_uri = u)

class TwitterAuthPopupHandler(tornado.web.RequestHandler, tornado.auth.TwitterMixin):
    @tornado.gen.coroutine
    def get(self):
        if self.get_argument("oauth_token", None):
            user = yield self.get_authenticated_user()
            """
            User: {
                'id': 71967907, 'id_str': '71967907', 'name': 'Bybler', 'screen_name': 'bybler', '
                location': '', 'description': '', 'url': None, 'entities': {'description': {'urls': []}}, 
                'protected': False, 'followers_count': 0, 'friends_count': 0, 'listed_count': 0, 'created_at': 'Sun Sep 06 04:43:22 +0000 2009', 
                'favourites_count': 0, 'utc_offset': None, 'time_zone': None, 'geo_enabled': False, 'verified': False, 'statuses_count': 1, 
                'lang': 'en', 'status': {'created_at': 'Wed Mar 20 15:55:24 +0000 2019', 'id': 1108396631240658944, 
                'id_str': '1108396631240658944', 'text': 'test', 'truncated': False, 'entities': {'hashtags': [], 'symbols': [], 'user_mentions': [], 'urls': []}, 
                'source': '<a href="https://datalayer.io" rel="nofollow">Datalayer Dev</a>', 'in_reply_to_status_id': None, 
                'in_reply_to_status_id_str': None, 'in_reply_to_user_id': None, 'in_reply_to_user_id_str': None, 
                'in_reply_to_screen_name': None, 'geo': None, 'coordinates': None, 'place': None, 'contributors': None, 
                'is_quote_status': False, 'retweet_count': 0, 'favorite_count': 0, 'favorited': False, 'retweeted': False, 'lang': 'en'}, '
                contributors_enabled': False, 'is_translator': False, 'is_translation_enabled': False, 'profile_background_color': 'C0DEED', 
                'profile_background_image_url': 'http://abs.twimg.com/images/themes/theme1/bg.png', 
                'profile_background_image_url_https': 'https://abs.twimg.com/images/themes/theme1/bg.png', 
                'profile_background_tile': False, 'profile_image_url': 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png', 
                'profile_image_url_https': 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png', 'profile_link_color': '1DA1F2', 
                'profile_sidebar_border_color': 'C0DEED', 'profile_sidebar_fill_color': 'DDEEF6', 'profile_text_color': '333333', 
                'profile_use_background_image': True, 'has_extended_profile': False, 'default_profile': True, 'default_profile_image': True, 
                'following': False, 'follow_request_sent': False, 'notifications': False, 'translator_type': 'none', 'suspended': False, 
                'needs_phone_verification': False, 'username': 'bybler', 'access_token': {'key': '...', 'secret': '...', 
                'user_id': '71967907', 'screen_name': 'bybler'}
            }
            """
            logging.info('User: {}'.format(user))
            twitter_user = {'name': user['name'], 'screen_name': user['screen_name'], 'username': user['screen_name']}
            self.set_secure_cookie("twitter_user", tornado.escape.json_encode(twitter_user))
            self.set_secure_cookie("twitter_access_token", tornado.escape.json_encode(user['access_token']))
            self.write("""
                <!doctype html>
                <html lang="en">
                    <head>
                        <title>Closing...</title>
                        <script type="text/javascript">
                            window.opener.postMessage({twitterAuth: true}, '*');
                            window.close();
                        </script>
                    </head>
                    <body>
                    </body>
                </html>
            """)
        else:
            callback_uri = os.getenv('DLA_TWITTER_OAUTH_CALLBACK_URL')
            redirect = os.getenv('DLA_TWITTER_OAUTH_REDIRECT') + self.settings['base_url'] + 'twitter/auth/popup'
            u = callback_uri + '?redirect=' + redirect
            logging.info('Twitter Callback URI: {}'.format(u))
            yield self.authorize_redirect(callback_uri = u)

class TwitterSignoutHandler(BaseHandler, tornado.auth.TwitterMixin):
    @tornado.gen.coroutine
    def post(self):
        self.clear_cookie("twitter_user")
        self.clear_cookie("twitter_access_token")
        self.write(json.dumps("""{ 'success': 'true' }""", indent=1, sort_keys=True))

class TwitterInfoHandler(BaseHandler, tornado.auth.TwitterMixin):
    def post(self):
        current_user = self.get_current_user()
        logging.info('Current user: {}'.format(current_user))
        if current_user:
            self.write(json.dumps(current_user, indent=1, sort_keys=True))
        else:
            self.write({'name': '', 'screen_name': '', 'username': ''})
        
class TwitterPostHandler(BaseHandler, tornado.auth.TwitterMixin):
#    @tornado.web.authenticated
    @tornado.gen.coroutine
    def post(self):
        if not self.current_user:
            self.write(json.dumps({'name': '', 'screen_name': '', 'username': ''}))
            return
        try:
            status = tornado.escape.json_decode(self.request.body)
            access_token = tornado.escape.json_decode(self.get_secure_cookie('twitter_access_token'))
            id_img = ''
            if len(status['capture']) > 0:
                from twitter import Twitter, OAuth
                auth = OAuth(
                    token = access_token['key'],
                    token_secret = access_token['secret'],
                    consumer_key = os.environ['DLA_TWITTER_CONSUMER_KEY'],
                    consumer_secret = os.environ['DLA_TWITTER_CONSUMER_SECRET'],
                    )
                t_up = Twitter(domain='upload.twitter.com', auth=auth)
                """
                {
                    'media_id': 1113364575259381760, 'media_id_string': '1113364575259381760', 'size': 15803, 
                    'expires_after_secs': 86400, 'image': {'image_type': 'image/png', 'w': 323, 'h': 262}
                }
                """
                upload_res = t_up.media.upload(
                    media_data = status['capture'].replace(image_preamble, '')
                    )
                id_img = upload_res['media_id_string']
            """
            t = Twitter(auth=auth)
            t.statuses.update(
                status = status['status'],
                media_ids = ",".join([id_img])
                )
            """
            """
            Created Status: {
                'created_at': 'Tue Apr 02 14:00:41 +0000 2019', 'id': 1113078802538729472, 'id_str': '1113078802538729472', 'text': 'test4 #datalayerio', 
                'truncated': False, 'entities': {'hashtags': [{'text': 'datalayerio', 'indices': [6, 18]}], 'symbols': [], 'user_mentions': [], 
                'urls': []}, 'source': '<a href="https://datalayer.io" rel="nofollow">Datalayer Dev</a>', 'in_reply_to_status_id': None, 
                'in_reply_to_status_id_str': None, 'in_reply_to_user_id': None, 'in_reply_to_user_id_str': None, 'in_reply_to_screen_name': None, 
                'user': {'id': 71967907, 'id_str': '71967907', 'name': 'Bybler', 'screen_name': 'bybler', 'location': '', 'description': '', 
                'url': None, 'entities': {'description': {'urls': []}}, 'protected': False, 'followers_count': 0, 'friends_count': 0, 'listed_count': 0, 
                'created_at': 'Sun Sep 06 04:43:22 +0000 2009', 'favourites_count': 0, 'utc_offset': None, 'time_zone': None, 'geo_enabled': False, 
                'verified': False, 'statuses_count': 2, 'lang': 'en', 'contributors_enabled': False, 'is_translator': False, 'is_translation_enabled': False, 
                'profile_background_color': 'C0DEED', 'profile_background_image_url': 'http://abs.twimg.com/images/themes/theme1/bg.png', 
                'profile_background_image_url_https': 'https://abs.twimg.com/images/themes/theme1/bg.png', 'profile_background_tile': False, 
                'profile_image_url': 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png', 
                'profile_image_url_https': 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png', 
                'profile_link_color': '1DA1F2', 'profile_sidebar_border_color': 'C0DEED', 'profile_sidebar_fill_color': 'DDEEF6', 
                'profile_text_color': '333333', 'profile_use_background_image': True, 'has_extended_profile': False, 'default_profile': True, 
                'default_profile_image': True, 'following': False, 'follow_request_sent': False, 'notifications': False, 'translator_type': 'none'}, 
                'geo': None, 'coordinates': None, 'place': None, 'contributors': None, 'is_quote_status': False, 'retweet_count': 0, 'favorite_count': 0, 
                'favorited': False, 'retweeted': False, 'lang': 'en'
            }
            """
            created_status = yield self.twitter_request(
                "/statuses/update",
                post_args = {
                    'status': status['status'] + ' #datalayerio',
                    'media_ids': ','.join([id_img])
                    },
                access_token = access_token
                )
            logging.info('Created Status: {}'.format(created_status))
            if not created_status:
                print('Call to Twitter failed...')
                logging.error('Call to Twitter failed...')
                self.write(json.dumps({ 'success': False, 'message': 'Call to Twitter failed...' }, indent=1, sort_keys=True))
            else:
                self.index_post(status, created_status)
                self.write(
                    json.dumps({
                        'success': True,
                        'status': created_status,
                        }, 
                    indent = 1,
                    sort_keys = True,
                    )
                )
        except Exception as e:
            print(e)
            logging.error(e)
            traceback.print_exc(file=sys.stdout)
            self.write(json.dumps({ 'success': False, 'message': str(e) }, indent=1, sort_keys=True))

    def index_post(self, status, created_status):
        logging.info('Created Status: {}'.format(created_status))
        tweet_capture_url = ''
        tweet_capture_width = 0.0
        tweet_capture_height = 0.0
        """
        {'media': [
            {
                'id': 1113365773165236224, 'id_str': '1113365773165236224', 'indices': [18, 41], 
                'media_url': 'http://pbs.twimg.com/media/D3N4RZaXkAAQeii.png', 
                'media_url_https': 'https://pbs.twimg.com/media/D3N4RZaXkAAQeii.png', 
                'url': 'https://t.co/dRxIsDKfxh', 'display_url': 'pic.twitter.com/dRxIsDKfxh', 
                'expanded_url': 'https://twitter.com/bybler/status/1113365775363055616/photo/1', 
                'type': 'photo', 
                'sizes': {
                    'small': {'w': 179, 'h': 291, 'resize': 'fit'},
                    'medium': {'w': 179, 'h': 291, 'resize': 'fit'},
                    'large': {'w': 179, 'h': 291, 'resize': 'fit'},
                    'thumb': {'w': 150, 'h': 150, 'resize': 'crop'}
                    }
                }
            ]}
        """
        ee = created_status.get('extended_entities')
        logging.info('ee: {}'.format(ee))
        if ee and ee['media'] and (len(ee['media']) > 0):
            media0 = ee['media'][0]
            tweet_capture_url = media0['media_url_https']
            tweet_capture_width = media0['sizes']['large']['w']
            tweet_capture_height = media0['sizes']['large']['h']
        oid = self.settings['openid_user_info']
        print('oid: {}'.format(oid))
        logging.info('oid: {}'.format(oid))
        post = {
            'id': str(uuid.uuid4()),
            'user_username': oid['preferred_username'],
            'user_first_name': oid['given_name'],
            'user_family_name': oid['family_name'],
            'user_display_name': oid['name'],
            'tweet_id': created_status['id'],
#            'tweet_text': created_status['text'],
            'tweet_text': status['status'],
            'tweet_user_screen_name': created_status['user']['screen_name'],
            'tweet_user_picto_url': created_status['user']['profile_image_url_https'],            
            'tweet_capture': status['capture'].replace(image_preamble, ''),
            'tweet_capture_url': tweet_capture_url,
            'tweet_capture_width': status['captureWidth'],
#            'tweet_capture_width': tweet_capture_width,
            'tweet_capture_height': status['captureHeight'],
#            'tweet_capture_height': tweet_capture_height,
            'date': datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
        }
        logging.info('post: {}'.format(post))
        index_tweet(post)

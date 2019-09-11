package twitter

import (
	"fmt"
	"log"

	"github.com/datalayer/datalayer/apps/kuber/config"
	"github.com/mrjones/oauth"
)

var OAuthConsumer *oauth.Consumer

type TwitterSession struct {
	Client
	OAuthTokens map[string]*oauth.RequestToken
	Clients     map[string]Client
}

func NewTwitterSession(consumerKey, consumerSecret string) *TwitterSession {
	if OAuthConsumer == nil {
		OAuthConsumer = oauth.NewConsumer(
			config.KuberConfigSecret.TwitterConsumerKey,
			config.KuberConfigSecret.TwitterConsumerSecret,
			oauth.ServiceProvider{
				RequestTokenUrl:   OAUTH_REQUEST_TOKEN,
				AuthorizeTokenUrl: OAUTH_AUTH_TOKEN,
				AccessTokenUrl:    OAUTH_ACCESS_TOKEN,
			},
		)
		OAuthConsumer.Debug(false)
	}
	tws := new(TwitterSession)
	tws.OAuthTokens = make(map[string]*oauth.RequestToken)
	tws.Clients = make(map[string]Client)
	return tws
}

func (s *TwitterSession) GetAuthURL(tokenUrl string) string {
	token, requestUrl, err := OAuthConsumer.GetRequestTokenAndUrl(tokenUrl)
	if err != nil {
		log.Println(err)
	}
	// Make sure to save the token, we'll need it for AuthorizeToken()
	s.OAuthTokens[token.Token] = token
	return requestUrl
}

func (s *TwitterSession) CompleteAuth(tokenKey, verificationCode string) (Client, *oauth.AccessToken, error) {
	accessToken, err := OAuthConsumer.AuthorizeToken(s.OAuthTokens[tokenKey], verificationCode)
	if err != nil {
		log.Println(err)
	}
	httpConn, err1 := OAuthConsumer.MakeHttpClient(accessToken)
	if err1 != nil {
		log.Println(err1)
	}
	s.HttpConn = httpConn
	c := Client{
		HttpConn: httpConn,
	}
	s.Clients[accessToken.Token] = c
	fmt.Println("Access Token: ", accessToken)
	return c, accessToken, err
}

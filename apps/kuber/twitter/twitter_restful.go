package twitter

import (
	"encoding/gob"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/datalayer/datalayer/apps/kuber/config"
	"github.com/emicklei/go-restful"
	"github.com/gorilla/sessions"
)

type TwitterUser struct {
	Username           string `json:"username"`
	Oauth_token        string `json:"oauth_token"`
	Oauth_verifier     string `json:"oauth_verifier"`
	Oauth_access_token string `json:"oauth_access_token"`
	IsAuth             bool   `json:"isAuth"`
}

type TwitterResource struct {
}

var SessionName = "kuber-twitter"
var SessionKey = "twitter-state"

var Store = sessions.NewCookieStore([]byte("datalayer-session-secret"))

var twitterSession *TwitterSession

func (t TwitterResource) WebService() *restful.WebService {
	gob.Register(TwitterUser{})
	twitterSession = NewTwitterSession(config.KuberConfigSecret.TwitterConsumerKey, config.KuberConfigSecret.TwitterConsumerSecret)
	Store.Options = &sessions.Options{
		Path:     "/",      // to match all requests
		MaxAge:   3600 * 1, // 1 hour
		HttpOnly: false,
	}
	ws := new(restful.WebService)
	ws.Path("/kuber/api/v1/twitter").
		Consumes(restful.MIME_JSON).
		Produces(restful.MIME_JSON)
	ws.Route(ws.GET("/").To(t.RedirecToTwitter))
	ws.Route(ws.GET("/callback").To(t.GetTwitterToken))
	ws.Route(ws.POST("/me").To(t.GetMe))
	/*
		ws.Route(ws.GET("/follow").To(t.GetFollower))
		ws.Route(ws.GET("/followids").To(t.GetFollowerIDs))
		ws.Route(ws.GET("/time").To(t.GetTimeLine))
	*/
	return ws
}

func (t TwitterResource) RedirecToTwitter(request *restful.Request, response *restful.Response) {

	var conf = config.KuberConfig
	fmt.Println(conf)

	fmt.Println("Enter redirect to Twitter...")

	redirecttUrl := conf.TwitterRedirect
	if redirecttUrl == "" {
		scheme := "https"
		host := request.Request.Host
		if strings.HasPrefix(host, "localhost") {
			scheme = "http"
		}
		redirecttUrl = scheme + "://" + host + "/kuber/api/v1/twitter/callback"
	}
	fmt.Println("Callback URL=", redirecttUrl)

	requestUrl := twitterSession.GetAuthURL(redirecttUrl)
	fmt.Println("Request URL: " + requestUrl)

	http.Redirect(response.ResponseWriter, request.Request, requestUrl, http.StatusTemporaryRedirect)

	fmt.Println("Leaving Twitter Redirect...")

}

func (t TwitterResource) GetTwitterToken(request *restful.Request, response *restful.Response) {

	fmt.Println("Enter Twitter Callback...")

	var twitterUser TwitterUser

	values := request.Request.URL.Query()
	fmt.Printf("%v\n", values)
	tokenKey := values.Get("oauth_token")
	verificationCode := values.Get("oauth_verifier")

	session, _ := Store.Get(request.Request, SessionName)
	value := session.Values[SessionKey]
	/*
		if value == nil {
			json.Unmarshal([]byte(`
					{"username": "", "isAuth": false},
				`), &twitterUser)
		} else {
	*/
	fmt.Println(tokenKey)
	fmt.Println(verificationCode)

	twitterUser, _ = value.(TwitterUser)
	fmt.Println(twitterUser)
	_, accessToken, _ := twitterSession.CompleteAuth(tokenKey, verificationCode)
	/*
		c, accessToken, _ := twitterSession.CompleteAuth(tokenKey, verificationCode)
		u, _, _ := c.VerifyCredentials()
		fmt.Println("User: ", u)
	*/
	twitterUser.Oauth_token = tokenKey
	twitterUser.Oauth_verifier = verificationCode
	twitterUser.IsAuth = true

	//	}

	fmt.Println(twitterUser)
	session.Values[SessionKey] = twitterUser
	session.Save(request.Request, response.ResponseWriter)

	Save(tokenKey, verificationCode)

	redirectURL := fmt.Sprintf(config.KuberConfig.LibraryRest+"/#/auth/twitter/callback?token=%s&code=%s&access=%s", tokenKey, verificationCode, accessToken.Token)
	http.Redirect(response.ResponseWriter, request.Request, redirectURL, http.StatusTemporaryRedirect)

	fmt.Println("Leaving Twitter Callback...")

}

func (t TwitterResource) GetMe(request *restful.Request, response *restful.Response) {
	tw := new(TwitterUser)
	_ = request.ReadEntity(&tw)
	fmt.Println("Requested Twitter User: ", tw)
	c := twitterSession.Clients[tw.Oauth_access_token]
	me, _, _ := c.VerifyCredentials()
	fmt.Println("Me:", me)
	response.WriteEntity(me)
}

/*
func (t TwitterResource) GetTimeLine(request *restful.Request, response *restful.Response) {
	GetTimeLine(response.ResponseWriter, request.Request)
}

func (t TwitterResource) GetFollower(request *restful.Request, response *restful.Response) {
	GetFollower(response.ResponseWriter, request.Request)
}

func (t TwitterResource) GetFollowerIDs(request *restful.Request, response *restful.Response) {
	GetFollowerIDs(response.ResponseWriter, request.Request)
}
*/
func isAuth(w http.ResponseWriter, r *http.Request) bool {
	session, _ := Store.Get(r, SessionName)
	value := session.Values[SessionKey]
	fmt.Println(value)
	var twitterUser TwitterUser
	if value == nil {
		json.Unmarshal([]byte(`
			{"username": "", "isAuth": false},
		`), &twitterUser)
	} else {
		twitterUser, _ = value.(TwitterUser)
	}
	fmt.Println(twitterUser)
	session.Values[SessionKey] = twitterUser
	err := session.Save(r, w)
	if err != nil {
		log.Println(err)
	}
	return twitterUser.IsAuth
}

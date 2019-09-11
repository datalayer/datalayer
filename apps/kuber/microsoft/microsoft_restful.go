package microsoft

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"

	"github.com/datalayer/datalayer/apps/kuber/config"
	"github.com/datalayer/datalayer/apps/kuber/log"
	"github.com/emicklei/go-restful"
)

type MicrosoftResource struct {
	states map[int]int
}

func (m MicrosoftResource) WebService() *restful.WebService {
	m.states = make(map[int]int)
	ws := new(restful.WebService)
	ws.Path("/kuber/api/v1/microsoft")
	ws.Route(ws.GET("").To(m.Authorize))
	ws.Route(ws.GET("/callback").To(m.Callback))
	return ws
}

/*

@see https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-protocols-oauth-code

https://login.microsoftonline.com/{tenant}/oauth2/authorize?
client_id=6731de76-14a6-49ae-97bc-6eba6914391e
&response_type=code
&redirect_uri=http%3A%2F%2Flocalhost%2Fmyapp%2F
&response_mode=query
&resource=https%3A%2F%2Fservice.contoso.com%2F
&state=12345
*/
func (m MicrosoftResource) Authorize(request *restful.Request, response *restful.Response) {
	fmt.Println("Enter Microsoft Redirect...")
	values := request.Request.URL.Query()
	fmt.Printf("%v\n", values)
	redirectUrl := getRedirectUrl(request)
	fmt.Println("Callback URL=", redirectUrl)
	values.Add("redirect_uri", redirectUrl)
	//	state := rand.New(time.Now().UnixNano()).Intn(int(MaxUint >> 1))
	//	m.states[state] = state
	u := "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?" + values.Encode()
	fmt.Println("Redirect to:", u)
	http.Redirect(response.ResponseWriter, request.Request, u, http.StatusTemporaryRedirect)
	fmt.Println("Exit Microsoft Redirect...")
}

/*
POST /{tenant}/oauth2/token HTTP/1.1
Host: https://login.microsoftonline.com
Content-Type: application/x-www-form-urlencoded
grant_type=authorization_code
&client_id=2d4d11a2-f814-46a7-890a-274a72a7309e
&code=AwABAAAAvPM1KaPlrEqdFSBzjqfTGBCmLdgfSTLEMPGYuNHSUYBrqqf_ZT_p5uEAEJJ_nZ3UmphWygRNy2C3jJ239gV_DBnZ2syeg95Ki-374WHUP-i3yIhv5i-7KU2CEoPXwURQp6IVYMw-DjAOzn7C3JCu5wpngXmbZKtJdWmiBzHpcO2aICJPu1KvJrDLDP20chJBXzVYJtkfjviLNNW7l7Y3ydcHDsBRKZc3GuMQanmcghXPyoDg41g8XbwPudVh7uCmUponBQpIhbuffFP_tbV8SNzsPoFz9CLpBCZagJVXeqWoYMPe2dSsPiLO9Alf_YIe5zpi-zY4C3aLw5g9at35eZTfNd0gBRpR5ojkMIcZZ6IgAA
&redirect_uri=https%3A%2F%2Flocalhost%2Fmyapp%2F
&resource=https%3A%2F%2Fservice.contoso.com%2F
&client_secret=p@ssw0rd
//NOTE: client_secret only required for web apps
Response:
{
	"access_token": " eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik5HVEZ2ZEstZnl0aEV1THdqcHdBSk9NOW4tQSJ9.eyJhdWQiOiJodHRwczovL3NlcnZpY2UuY29udG9zby5jb20vIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvN2ZlODE0NDctZGE1Ny00Mzg1LWJlY2ItNmRlNTdmMjE0NzdlLyIsImlhdCI6MTM4ODQ0MDg2MywibmJmIjoxMzg4NDQwODYzLCJleHAiOjEzODg0NDQ3NjMsInZlciI6IjEuMCIsInRpZCI6IjdmZTgxNDQ3LWRhNTctNDM4NS1iZWNiLTZkZTU3ZjIxNDc3ZSIsIm9pZCI6IjY4Mzg5YWUyLTYyZmEtNGIxOC05MWZlLTUzZGQxMDlkNzRmNSIsInVwbiI6ImZyYW5rbUBjb250b3NvLmNvbSIsInVuaXF1ZV9uYW1lIjoiZnJhbmttQGNvbnRvc28uY29tIiwic3ViIjoiZGVOcUlqOUlPRTlQV0pXYkhzZnRYdDJFYWJQVmwwQ2o4UUFtZWZSTFY5OCIsImZhbWlseV9uYW1lIjoiTWlsbGVyIiwiZ2l2ZW5fbmFtZSI6IkZyYW5rIiwiYXBwaWQiOiIyZDRkMTFhMi1mODE0LTQ2YTctODkwYS0yNzRhNzJhNzMwOWUiLCJhcHBpZGFjciI6IjAiLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJhY3IiOiIxIn0.JZw8jC0gptZxVC-7l5sFkdnJgP3_tRjeQEPgUn28XctVe3QqmheLZw7QVZDPCyGycDWBaqy7FLpSekET_BftDkewRhyHk9FW_KeEz0ch2c3i08NGNDbr6XYGVayNuSesYk5Aw_p3ICRlUV1bqEwk-Jkzs9EEkQg4hbefqJS6yS1HoV_2EsEhpd_wCQpxK89WPs3hLYZETRJtG5kvCCEOvSHXmDE6eTHGTnEgsIk--UlPe275Dvou4gEAwLofhLDQbMSjnlV5VLsjimNBVcSRFShoxmQwBJR_b2011Y5IuD6St5zPnzruBbZYkGNurQK63TJPWmRd3mbJsGM0mf3CUQ",
	"token_type": "Bearer",
	"expires_in": "3600",
	"expires_on": "1388444763",
	"resource": "https://service.contoso.com/",
	"refresh_token": "AwABAAAAvPM1KaPlrEqdFSBzjqfTGAMxZGUTdM0t4B4rTfgV29ghDOHRc2B-C_hHeJaJICqjZ3mY2b_YNqmf9SoAylD1PycGCB90xzZeEDg6oBzOIPfYsbDWNf621pKo2Q3GGTHYlmNfwoc-OlrxK69hkha2CF12azM_NYhgO668yfcUl4VBbiSHZyd1NVZG5QTIOcbObu3qnLutbpadZGAxqjIbMkQ2bQS09fTrjMBtDE3D6kSMIodpCecoANon9b0LATkpitimVCrl-NyfN3oyG4ZCWu18M9-vEou4Sq-1oMDzExgAf61noxzkNiaTecM-Ve5cq6wHqYQjfV9DOz4lbceuYCAA",
	"scope": "https%3A%2F%2Fgraph.microsoft.com%2Fmail.read",
	"id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhdWQiOiIyZDRkMTFhMi1mODE0LTQ2YTctODkwYS0yNzRhNzJhNzMwOWUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83ZmU4MTQ0Ny1kYTU3LTQzODUtYmVjYi02ZGU1N2YyMTQ3N2UvIiwiaWF0IjoxMzg4NDQwODYzLCJuYmYiOjEzODg0NDA4NjMsImV4cCI6MTM4ODQ0NDc2MywidmVyIjoiMS4wIiwidGlkIjoiN2ZlODE0NDctZGE1Ny00Mzg1LWJlY2ItNmRlNTdmMjE0NzdlIiwib2lkIjoiNjgzODlhZTItNjJmYS00YjE4LTkxZmUtNTNkZDEwOWQ3NGY1IiwidXBuIjoiZnJhbmttQGNvbnRvc28uY29tIiwidW5pcXVlX25hbWUiOiJmcmFua21AY29udG9zby5jb20iLCJzdWIiOiJKV3ZZZENXUGhobHBTMVpzZjd5WVV4U2hVd3RVbTV5elBtd18talgzZkhZIiwiZmFtaWx5X25hbWUiOiJNaWxsZXIiLCJnaXZlbl9uYW1lIjoiRnJhbmsifQ."
}
*/
func (m MicrosoftResource) Callback(request *restful.Request, response *restful.Response) {

	fmt.Println("Enter Microsoft Callback...")

	codes, ok := request.Request.URL.Query()["code"]

	if !ok || len(codes) < 1 {
		log.Error("Issue while getting code from Microsoft.")
	} else {

		code := codes[0]

		hc := http.Client{}

		redirecttUrl := getRedirectUrl(request)

		form := url.Values{}
		form.Add("code", code)
		form.Add("grant_type", "authorization_code")
		form.Add("client_id", config.KuberConfigSecret.MicrosoftApplicationId)
		form.Add("client_secret", config.KuberConfigSecret.MicrosoftSecret)
		form.Add("scope", config.KuberConfigSecret.MicrosoftScope)
		form.Add("redirect_uri", redirecttUrl)
		log.Info("Form: %v", form)

		req, _ := http.NewRequest("POST", "https://login.microsoftonline.com/common/oauth2/v2.0/token", strings.NewReader(form.Encode()))
		req.Header.Add("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8")
		resp, err := hc.Do(req)

		if err != nil {
			log.Error("Unable to decode into struct, %v", err)
		}
		defer resp.Body.Close()

		responseData, err := ioutil.ReadAll(resp.Body)
		fmt.Println(string(responseData))

		var data struct {
			AccessToken string `json:"access_token"`
		}
		err = json.Unmarshal([]byte(responseData), &data)
		if err != nil {
			log.Error("Unable to decode into struct, %v", err)
		}
		fmt.Println(data)

		u := config.KuberConfig.LibraryRest

		if u == "" {
			scheme := "https"
			host := request.Request.Host
			if strings.HasPrefix(host, "localhost") {
				scheme = "http"
			}
			u = scheme + "://" + host + "/#/auth/microsoft/callback" + "?access_token=" + data.AccessToken
		} else {
			u = u + "/#/auth/microsoft/callback" + "?access_token=" + data.AccessToken
		}

		fmt.Println("Redirecting after Microsoft callback to:", u)

		http.Redirect(response.ResponseWriter, request.Request, u, http.StatusTemporaryRedirect)

		fmt.Println("Exit Microsoft Callback...")

	}

}

func getRedirectUrl(request *restful.Request) string {
	redirectUrl := config.KuberConfig.MicrosoftRedirect
	if redirectUrl == "" {
		scheme := "https"
		host := request.Request.Host
		if strings.HasPrefix(host, "localhost") {
			scheme = "http"
		}
		redirectUrl = scheme + "://" + host + "/kuber/api/v1/microsoft/callback"
	}
	return redirectUrl
}

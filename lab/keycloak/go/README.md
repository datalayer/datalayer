[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Keycloak with Go

+ [keycloak-gatekeeper](https://github.com/keycloak/keycloak-gatekeeper).
+ [keycloak-adaptor-for-golang-application](https://stackoverflow.com/questions/48855122/keycloak-adaptor-for-golang-application)

```bash
docker run -d -p 8080:8080 -e KEYCLOAK_USER=keycloak -e KEYCLOAK_PASSWORD=keycloak --name keycloak jboss/keycloak:4.4.0.Final
open http://localhost:8080
```

1. Create a realm named `demo`.
2. Turn off the requirement of ssl for this realm (realmsettings -> login -> require ssl).
3. Create a client named `demo-client`.
4. Create a user named `demo` with password demo (users -> add user). Make sure to activate and impersonate this user.
5. Configure the demo-client to be confidential and use http://localhost:8080/demo/callback as a valid redirect URI.

The resulting keycloak.json (obtained from the installation tab) looks like this:

```json
{
    "realm": "demo",
    "auth-server-url": "http://localhost:8080/auth",
    "ssl-required": "none",
    "resource": "demo-client",
    "credentials": {
        "secret": "..."
    },
    "confidential-port": 0
}
```

```go
package main

import (
    "context"
    "encoding/json"
    "log"
    "net/http"
    "strings"

    oidc "github.com/coreos/go-oidc"
    "golang.org/x/oauth2"
)

func main() {
    configURL := "http://localhost:8080/auth/realms/demo"
    ctx := context.Background()
    provider, err := oidc.NewProvider(ctx, configURL)
    if err != nil {
        panic(err)
    }

    clientID := "demo-client"
    clientSecret := "cbfd6e04-a51c-4982-a25b-7aaba4f30c81"

    redirectURL := "http://localhost:8080/demo/callback"
    // Configure an OpenID Connect aware OAuth2 client.
    oauth2Config := oauth2.Config{
        ClientID:     clientID,
        ClientSecret: clientSecret,
        RedirectURL:  redirectURL,
        // Discovery returns the OAuth2 endpoints.
        Endpoint: provider.Endpoint(),
        // "openid" is a required scope for OpenID Connect flows.
        Scopes: []string{oidc.ScopeOpenID, "profile", "email"},
    }
    state := "somestate"

    oidcConfig := &oidc.Config{
        ClientID: clientID,
    }
    verifier := provider.Verifier(oidcConfig)

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        rawAccessToken := r.Header.Get("Authorization")
        if rawAccessToken == "" {
            http.Redirect(w, r, oauth2Config.AuthCodeURL(state), http.StatusFound)
            return
        }

        parts := strings.Split(rawAccessToken, " ")
        if len(parts) != 2 {
            w.WriteHeader(400)
            return
        }
        _, err := verifier.Verify(ctx, parts[1])

        if err != nil {
            http.Redirect(w, r, oauth2Config.AuthCodeURL(state), http.StatusFound)
            return
        }

        w.Write([]byte("hello world"))
    })

    http.HandleFunc("/demo/callback", func(w http.ResponseWriter, r *http.Request) {
        if r.URL.Query().Get("state") != state {
            http.Error(w, "state did not match", http.StatusBadRequest)
            return
        }

        oauth2Token, err := oauth2Config.Exchange(ctx, r.URL.Query().Get("code"))
        if err != nil {
            http.Error(w, "Failed to exchange token: "+err.Error(), http.StatusInternalServerError)
            return
        }
        rawIDToken, ok := oauth2Token.Extra("id_token").(string)
        if !ok {
            http.Error(w, "No id_token field in oauth2 token.", http.StatusInternalServerError)
            return
        }
        idToken, err := verifier.Verify(ctx, rawIDToken)
        if err != nil {
            http.Error(w, "Failed to verify ID Token: "+err.Error(), http.StatusInternalServerError)
            return
        }

        resp := struct {
            OAuth2Token   *oauth2.Token
            IDTokenClaims *json.RawMessage // ID Token payload is just JSON.
        }{oauth2Token, new(json.RawMessage)}

        if err := idToken.Claims(&resp.IDTokenClaims); err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        data, err := json.MarshalIndent(resp, "", "    ")
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        w.Write(data)
    })

    log.Fatal(http.ListenAndServe("localhost:8080", nil))
}
```

In order to test this setup you can open a webbrowser and navitage to http://localhost:8080. The request should reach your go server, which tries to authenticate you. Since you did not send a token, the go server will redirecty you to keycloak to authenticate. You should see the login screen of keycloak. Login with the demo user you have created for this realm (demo/demo). If you have configured your keycloak correctly, it will authenticate you and redirect you to your go server callback.

The end result should be a json like this

```json
{
    "OAuth2Token": {
        "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJsc1hHR2VxSmx3UUZweWVYR0x6b2plZXBYSEhXUngtTHVJTVVLdDBmNmlnIn0.eyJqdGkiOiI5ZjAxNjM2OC1lYmEwLTRiZjMtYTU5Ni1kOGU1MzdmNTNlZGYiLCJleHAiOjE1MzIxNzM2NTIsIm5iZiI6MCwiaWF0IjoxNTMyMTczMzUyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvZGVtbyIsImF1ZCI6ImRlbW8tY2xpZW50Iiwic3ViIjoiMzgzMzhjOGItYWQ3Zi00NjlmLTgzOTgtMTc5ODk1ODFiYTEyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGVtby1jbGllbnQiLCJhdXRoX3RpbWUiOjE1MzIxNzMzNTIsInNlc3Npb25fc3RhdGUiOiJjZTg2NWFkZC02N2I4LTQ5MDUtOGYwMy05YzE2MDNjMWJhMGQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6ImRlbW8iLCJlbWFpbCI6ImRlbW9AZGVtby5jb20ifQ.KERz8rBddxM9Qho3kgigX-fClWqbKY-3JcWT3JOQDoLa-prkorfa40BWlyf9ULVgjzT2d8FLJpqQIQYvucKU7Q7vFBVIjTGucUZaE7b6JGMea5H34A1i-MNm7L2CzDJ2GnBONhNwLKoftTSl0prbzwkzcVrps-JAZ6L2gssSa5hBBGJYBKAUfm1OIb57Jq0vzro3vLghZ4Ay7iNunwfcHUrxiFJfUjaU6PQwzrA5pnItOPuavJFUgso7-3JLtn3X9GQuyyZKrkDo6-gzU0JZmkQQzAXXgt43NxooryImuacwSB5xbIKY6qFkedldoOPehld1-oLv0Yy_FIwEad3uLw",
        "token_type": "bearer",
        "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJsc1hHR2VxSmx3UUZweWVYR0x6b2plZXBYSEhXUngtTHVJTVVLdDBmNmlnIn0.eyJqdGkiOiI0MjdmMTlhYy1jMTkzLTQ2YmQtYWFhNi0wY2Q1OTI5NmEwMGQiLCJleHAiOjE1MzIxNzUxNTIsIm5iZiI6MCwiaWF0IjoxNTMyMTczMzUyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvZGVtbyIsImF1ZCI6ImRlbW8tY2xpZW50Iiwic3ViIjoiMzgzMzhjOGItYWQ3Zi00NjlmLTgzOTgtMTc5ODk1ODFiYTEyIiwidHlwIjoiUmVmcmVzaCIsImF6cCI6ImRlbW8tY2xpZW50IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiY2U4NjVhZGQtNjdiOC00OTA1LThmMDMtOWMxNjAzYzFiYTBkIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.FvvDW6ZSH8mlRR2zgaN1zesX14SmkCs9RrIVU4Jn1-SHVdKEA6YKur0-RUAFTObQDMLVhFFJ05AjGVGWpBrgVDcAwW2pI9saM-OHlyTJ3VfFoylgfzakVOIpbIDnHO12UaJrkOI9NWPAJdbBOzBHfsDhKbxhjg4ZX8SwlKr42rV4WWuSRcNu4_YDVO19SiXSCKXVldZ1_2S-qPvViq7VZfaoRLHuYyDvma_ByMsmib9JUkevJ8dxsYxVQ5FWaAfFanh1a1f8HxNRI-Cl180oPn1_Tqq_SYwxzBCw7Q_ENkMirwRS1a4cX9yMVEDW2uvKz2D-OiNAUK8d_ONuPEkTGQ",
        "expiry": "2018-07-21T13:47:28.986686385+02:00"
    },
    "IDTokenClaims": {
        "jti": "f4d56526-37d9-4d32-b99d-81090e92d3a7",
        "exp": 1532173652,
        "nbf": 0,
        "iat": 1532173352,
        "iss": "http://localhost:8080/auth/realms/demo",
        "aud": "demo-client",
        "sub": "38338c8b-ad7f-469f-8398-17989581ba12",
        "typ": "ID",
        "azp": "demo-client",
        "auth_time": 1532173352,
        "session_state": "ce865add-67b8-4905-8f03-9c1603c1ba0d",
        "acr": "1",
        "email_verified": true,
        "preferred_username": "demo",
        "email": "demo@demo.com"
    }
}
```

You can copy your access token and use curl to verify if the server is able to accept your tokens:

```bash
# use your complete access token here
export TOKEN="eyJhbG..."
curl -H "Authorization: Bearer $TOKEN" localhost:8080
# output hello world
```

You can try it again after the token has expired - or temper with the token.

In case you do it, you should get a redirect to your keycloak server again.

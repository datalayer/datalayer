import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './../views/layout/Layout'
import OAuthGoogleCallback from './../views/auth/OAuthGoogleCallback'
import OAuthMicrosoftCallback from './../views/auth/OAuthMicrosoftCallback'
import OAuthTwitterCallback from './../views/auth/OAuthTwitterCallback'
import Page500 from './../views/error/Page500'

export default class Routes extends React.Component<any, any> {

  render() {
    return (
      <div>
        <Switch>
          <Route path="/auth/google/callback" name="Google OAuth Callback" component={OAuthGoogleCallback}/>
          <Route path="/auth/microsoft/callback" name="Microsoft OAuth Callback" component={OAuthMicrosoftCallback}/>
          <Route path="/auth/twitter/callback" name="Twitter OAuth Callback" component={OAuthTwitterCallback}/>
          <Route path="/500" name="Page 500" component={Page500}/>
          <Route name="Layout" component={Layout}/>
        </Switch>
      </div>
    )
  }

}

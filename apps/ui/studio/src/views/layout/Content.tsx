import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import ContentAuthenticated from './ContentAuthenticated'
import Landing from '../Landing'
import Search from '../search/Search'
import ProfileConfirm from '../sign/ProfileConfirm'
import Signup from '../sign/Signup'
import Explore from '../explore/Explore'
import SignupMail from '../sign/SignupMail'
import SignupSuccess from '../sign/SignupSuccess'
import SignupError from '../sign/SignupError'
import ForgotPassword from '../sign/ForgotPassword'
import ForgotPasswordMail from '../sign/ForgotPasswordMail'
import ForgotPasswordSuccess from '../sign/ForgotPasswordSuccess'
import ForgotPasswordError from '../sign/ForgotPasswordError'
import TellMeMore from './../info/TellMeMore'
import Osa from './../info/Osa'
import About from './../info/About'
import ToS from './../info/ToS'
import Privacy from './../info/Privacy'
import UserGuide from './../info/UserGuide'
import Blog from './../info/Blog'
import Gdpr from './../info/Gdpr'
import User from '../user/User'
import Version from './../info/Version'
import ReleaseNotes from './../info/ReleaseNotes'
import './Content.scss'

export default class Content extends React.Component<any, any> {

  public constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div className="dla-container">
        <Switch>
          <Route exact path="/" name="Landing" component={Landing}/>
          <Route exact path="/search" name="Search" component={Search}/>
          <Route exact path="/search/:q" name="Search" component={Search}/>
          <Route exact path="/version" name="Version" component={Version}/>
          <Route exact path="/explore" name="Explore" component={Explore}/>
          <Route exact path="/osa" name="Osa" component={Osa}/>
          <Route exact path="/about" name="About" component={About}/>
          <Route exact path="/tos" name="Terms of Service" component={ToS}/>
          <Route exact path="/docs" name="Documentation" component={UserGuide}/>
          <Route exact path="/blog" name="Blog" component={Blog}/>
          <Route exact path="/privacy" name="Privacy Policy" component={Privacy}/>
          <Route exact path="/gdpr" name="GDPR" component={Gdpr}/>
          <Route exact path="/tellmemore" name="What Is This" component={TellMeMore}/>
          <Route exact path="/releasenotes" name="Release Notes" component={ReleaseNotes}/>
          <Route exact path="/profile/confirm" name="Signup" component={ProfileConfirm} />
          <Route exact path="/join" name="Signup" component={Signup} />
          <Route exact path="/join/mail" name="Signup Mail" component={SignupMail} />
          <Route exact path="/join/success" name="Signup Success" component={SignupSuccess} />
          <Route exact path="/join/welcome" name="Signup Success" component={SignupSuccess} />
          <Route exact path="/join/error" name="Signup Error" component={SignupError} />
          <Route exact path="/forgotpassword" name="Forgot Password" component={ForgotPassword} />
          <Route exact path="/forgotpassword/mail" name="Forgot Password Mail" component={ForgotPasswordMail} />
          <Route exact path="/forgotpassword/success" name="Forgot Password Confirm" component={ForgotPasswordSuccess} />
          <Route exact path="/forgotpassword/welcome" name="Forgot Password Confirm" component={ForgotPasswordSuccess} />
          <Route exact path="/forgotpassword/error" name="Forgot Password Error" component={ForgotPasswordError} />
          <Route path="/@:user" name="User" component={User}/>
          <Route name="Content Authenticated" component={ContentAuthenticated}/>
        </Switch>
      </div>
    )
  }

}

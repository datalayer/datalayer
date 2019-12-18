import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Home from '../home/Home'
import Notebook from './../notebook/Notebook'
import Library from './../library/Library'
import Explorer from './../explorer/Explorer'
import Kuber from './../kuber/Kuber'
import IamApi from '../../api/iam/IamApi'
import Page404 from '../error/Page404'
import LoadableDla from './../../widget/LoadableDla'
import { DatalayerStore } from './../../store/DatalayerStore'
import { IConfig, emptyConfig } from './../../api/config/ConfigApi'
import { mapStateToPropsAuth, mapDispatchToPropsAuth } from './../../actions/AuthActions'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from './../../actions/ConfigActions'

const Profile = LoadableDla( { loader: () => import('./../sign/Profile') })
// Profile.preload()

@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
@connect(mapStateToPropsAuth, mapDispatchToPropsAuth)
export default class Layout extends React.Component<any, any> {
  private config: IConfig = emptyConfig
  private readonly iamApi: IamApi

  state = {
    isIamAuthenticated: DatalayerStore.state().isIamAuthenticated,
    isGoogleAuthenticated: DatalayerStore.state().isGoogleAuthenticated,
    isMicrosoftAuthenticated: DatalayerStore.state().isMicrosoftAuthenticated,
    isTwitterAuthenticated: DatalayerStore.state().isTwitterAuthenticated
  }

  public constructor(props) {
    super(props)
    this.iamApi = window["IamApi"]
  }

  public render() {
    const { isGoogleAuthenticated, isMicrosoftAuthenticated, isTwitterAuthenticated, isIamAuthenticated } = this.state
    if (isGoogleAuthenticated || isMicrosoftAuthenticated || isTwitterAuthenticated || isIamAuthenticated) {
      return (
        <div>
          <Switch>
            <Route exact path="/home" name="Home" component={Home}/>
            <Route exact path="/profile" name="Profile" component={Profile}/>
            <Route exact path="/notebook" name="Notebook" component={Notebook}/>
            <Route exact path="/library" name="Library" component={Library}/>
            <Route exact path="/explorer" name="Explorer" component={Explorer}/>
            <Route exact path="/kuber" name="Kuber" component={Kuber}/>
            <Route name="Page 404" component={Page404}/>
          </Switch>
        </div>
      )
    }
    else {
{/*
      // TODO(ECH) Use https://www.npmjs.com/package/react-countdown-now
      this.iamApi.getMe().then(res => {
        if (res.success && res.result.success) {
          this.props.dispatchIsIamAuthenticatedAction(res.result)
        }
      })
*/}
        return <div></div>
      }
  }

  public componentWillReceiveProps(nextProps) {
    const { isIamAuthenticated } = nextProps
    if (this.state.isIamAuthenticated != isIamAuthenticated) {
      this.setState({
        isIamAuthenticated: isIamAuthenticated
      })
    }
  }

}

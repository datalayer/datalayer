import * as React from 'react'
import * as queryString from 'query-string'
import * as isEqual from 'lodash.isequal'
import { connect } from 'react-redux'
import { GoogleProfileStorageKey } from './../../api/google/GoogleApi'
import { IConfig, emptyConfig } from './../../api/config/ConfigApi'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from './../../actions/ConfigActions'
import { mapStateToPropsAuth, mapDispatchToPropsAuth } from './../../actions/AuthActions'

@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
@connect(mapStateToPropsAuth, mapDispatchToPropsAuth)
export default class OAuthGoogleCallback extends React.Component<any, any> {
  private config: IConfig = emptyConfig
//  private zeppelinApi: ZeppelinApi

  public constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div id="preloader">
      <div className="sk-cube-grid">
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube3"></div>
        <div className="sk-cube sk-cube4"></div>
        <div className="sk-cube sk-cube5"></div>
        <div className="sk-cube sk-cube6"></div>
        <div className="sk-cube sk-cube7"></div>
        <div className="sk-cube sk-cube8"></div>
        <div className="sk-cube sk-cube9"></div>
      </div>
      <div style={{"textAlign": "center"}}>
        <h1>Datalayer</h1>
        <h1>Checking your Google Profile...</h1>
        <div>https://datalayer.io &copy; 2019</div>
      </div>
    </div>
    )
  }

  public componentDidMount() {
//    this.zeppelinApi = window["ZeppelinApi"]
  }

  public componentWillReceiveProps(nextProps) {    
    const { config } = nextProps
    if (config && ! isEqual(config, this.config)) {
      this.config = config
      this.checkGoogleProfile()
    }
  }

  private checkGoogleProfile() {
    const callback = queryString.parse(this.props.location.search)
    console.log("Google OAuth Callback", callback)
    if (callback) {
      localStorage.setItem(GoogleProfileStorageKey, JSON.stringify(callback))
    }
  }

}

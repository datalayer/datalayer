import * as React from 'react'
import { connect } from 'react-redux'
import { RestClient, Result } from '../../util/rest/RestClient'
import { IConfig, emptyConfig } from './../../api/config/ConfigApi'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from './../../actions/ConfigActions'
import { mapStateToPropsAuth, mapDispatchToPropsAuth } from './../../actions/AuthActions'
import { MeStorageKey } from '../iam/IamApi'
import * as isEqual from 'lodash.isequal'

export const GoogleProfileStorageKey = 'google_profile'

@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
@connect(mapStateToPropsAuth, mapDispatchToPropsAuth)
export default class GoogleApi extends React.Component<any, any> {
  private config: IConfig = emptyConfig
 
  public constructor(props: any) {
    super(props)
    this.toGoogle.bind(this)
    window["GoogleApi"] = this
  }

  public render() {
    const { isToGoogle } = this.props
    if (isToGoogle) {
      this.toGoogle()
      return <div></div>
    }
    return <div>{ this.props.children }</div>
  }

  public componentWillReceiveProps(nextProps: any) {
    const { config } = nextProps
    if (config && ! isEqual(config, this.config)) {
      this.config = config
    }
  }

  public toGoogle() {
    console.log("Start Login with Google...")
    window.location.href = this.config.kuberRest + "/kuber/api/v1/google?"
       + "client_id=" + this.config.googleClientId
       + "&access_type=offline"
       + "&include_granted_scopes=true"
       + "&response_type=code"
       + "&scope=" + this.config.googleScope
  }

  // ----------------------------------------------------------------------------

  public async getMe(): Promise<Result<any>> {
    let me = localStorage.getItem(GoogleProfileStorageKey)
    if (me == null) {
      me = '{}'
    }
    let profile = JSON.parse(me)
    let peopleClient = new RestClient({
      name: 'GooglePersonApi',
      url:  'https://content-people.googleapis.com',
      path: '/v1/people/me',
      username: '',
      password: ''
    })
    let p = {
      access_token: profile.access_token,
      key: this.config.googleApiKey,
      personFields: 'emailAddresses,names,photos,coverPhotos'
    }
    let uri = peopleClient.buildRequestUriWithParams('', p)
    return this.wrapResult<any, any>(
      r => r,
      async () => fetch(uri, {
        method: 'GET',
        headers: new Headers({ 
          "Content-Type": "application/json"
        })
      })
      .then(response => response.json() as any)
    )
  }

  public async getContacts(maxResults: number): Promise<Result<any>> {
    let me = localStorage.getItem(GoogleProfileStorageKey)
    if (me == null) {
      me = '{}'
    }
    let profile = JSON.parse(me)
    let peopleClient = new RestClient({
      name: 'GooglePersonApi',
      url:  'https://content-people.googleapis.com',
      path: '/v1/people/me',
      username: '',
      password: ''
    })
    let p = {
      access_token: profile.access_token,
      key: this.config.googleApiKey,
      pageSize: maxResults,
      personFields: 'names,emailAddresses,photos,coverPhotos'
    }
    let uri = peopleClient.buildRequestUriWithParams('/connections', p)
    return this.wrapResult<any, any>(
      r => r,
      async () => fetch(uri, {
        method: 'GET',
        headers: new Headers({ 
          "Content-Type": "application/json"
        })
      })
      .then(response => response.json() as any)
    )
  }

  public logout() {
    localStorage.removeItem(GoogleProfileStorageKey)
    localStorage.removeItem(MeStorageKey)
    this.props.dispatchLogoutAction()
  }

  // ----------------------------------------------------------------------------

  private async wrapResult<TRaw, TOut>(selector: (input: TRaw) => TOut, action: () => Promise<TRaw>): Promise<Result<TOut>> {
    let result: Result<TOut> = new Result<TOut>()
    try {
      let raw = await action()
      let selection = selector(raw)
      result.success = raw !== undefined && selection !== undefined
      result.result = selection
    } catch (error) {
      result.success = false
    }
    return result
  } 

}

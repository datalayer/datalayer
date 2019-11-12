import * as React from 'react'
import * as isEqual from 'lodash.isequal'
import { connect } from 'react-redux'
import { IConfig, emptyConfig } from './../../api/config/ConfigApi'
import { RestClient, Result, jsonOpt } from './../../util/rest/RestClient'
import { mapStateToPropsAuth, mapDispatchToPropsAuth } from './../../actions/AuthActions'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from './../../actions/ConfigActions'

export const MeStorageKey = 'me'

export const IamProfileStorageKey = 'iam_profile'

export interface IIamApi {
  signup(signup: any): Promise<Result<any>>
  forgotPassword(forgotPassword: any): Promise<Result<any>>
  updateProfile(profile: any): Promise<Result<any>>
  getMe(): Promise<Result<any>>
  logout(): void
}

@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
@connect(mapStateToPropsAuth, mapDispatchToPropsAuth)
export default class IamApi extends React.Component<any, any>  implements IIamApi {
  private config: IConfig = emptyConfig
  private restClient: RestClient

  public constructor(props) {    
    super(props)
    window['IamApi'] = this
    this.getMe().then(res => {
      console.log('IAM Response', res)
      if (res.success && res.result.success) {
        this.props.dispatchIsIamAuthenticatedAction(res.result)
      }
    })
  }

  public render() {
    const { isToIam } = this.props
    if (isToIam) {
      this.redirectToIamAuth()
      return <div>{ this.props.children }</div>
    }
    return <div>{ this.props.children }</div>
  }

  public componentWillReceiveProps(nextProps) {
    const { config } = nextProps
    if (config && ! isEqual(config, this.config)) {
      this.config = config
      this.restClient = new RestClient({
        name: 'IamApi',
        url: this.config.iamRest,
        path: '/iam',
        username: '',
        password: ''
      })
      this.getMe().then(res => {
        console.log('IAM Response', res)
        if (res.success && res.result.success) {
          this.props.dispatchIsIamAuthenticatedAction(res.result)
        }
      })
    }
  }

  private redirectToIamAuth() {
    console.log("Start Login with IAM...")
    window.location.href = this.config.iamRest + "/iam/auth"
  }

  // ----------------------------------------------------------------------------

  public async signup(signup): Promise<Result<any>> {
    return this.wrapResult<any, any>(
      r => r,
      async () => this.restClient.post<any>(signup, {}, jsonOpt, "/join")
    )
  }

  public async updateProfile(profile): Promise<Result<any>> {
    return this.wrapResult<any, any>(
      r => r,
      async () => this.restClient.post<any>(profile, {}, jsonOpt, "/profile")
    )
  }

  public async forgotPassword(forgotPassword): Promise<Result<any>> {
    return this.wrapResult<any, any>(
      r => r,
      async () => this.restClient.post<any>(forgotPassword, {}, jsonOpt, "/forgotpassword")
    )
  }

  public async getMe(): Promise<Result<any>> {
    return this.wrapResult<any, any>(
      r => r,
      async () => this.restClient.get<any>({}, jsonOpt, "/me")
    )
  }

  public async logout() {
    localStorage.removeItem(IamProfileStorageKey)
    this.wrapResult<any, any>(
      r => r,
      async () => this.restClient.get<any>({}, jsonOpt, "/logout")
    )
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

import * as React from 'react'
import * as isEqual from 'lodash.isequal'
import { connect } from 'react-redux'
import { IConfig, emptyConfig } from './../../api/config/ConfigApi'
import { RestClient, Result, jsonOpt } from './../../util/rest/RestClient'
import { mapStateToPropsAuth, mapDispatchToPropsAuth } from './../../actions/AuthActions'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from './../../actions/ConfigActions'

export interface ILibraryApi {
  index(post: any): Promise<Result<any>>
  search(query: string): Promise<Result<any>>
  logout(): void
}

@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
@connect(mapStateToPropsAuth, mapDispatchToPropsAuth)
export default class LibraryApi extends React.Component<any, any>  implements ILibraryApi {
  private config: IConfig = emptyConfig
  private restClient: RestClient

  public constructor(props) {    
    super(props)
    window['LibraryApi'] = this
  }

  public render() {
    return <div>{ this.props.children }</div>
  }

  public componentWillReceiveProps(nextProps) {
    const { config } = nextProps
    if (config && ! isEqual(config, this.config)) {
      this.config = config
      this.restClient = new RestClient({
        name: 'LibraryApi',
        url: this.config.libraryRest,
        path: '/library',
        username: '',
        password: ''
      })
    }
  }

  // ----------------------------------------------------------------------------

  public async index(post): Promise<Result<any>> {
    return this.wrapResult<any, any>(
      r => r,
      async () => this.restClient.post<any>(post, {}, jsonOpt, "/index")
    )
  }

  public async search(query): Promise<Result<any>> {
    return this.wrapResult<any, any>(
      r => r,
      async () => this.restClient.get<any>({q: query}, jsonOpt, "/search")
    )
  }

  public async logout() {
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

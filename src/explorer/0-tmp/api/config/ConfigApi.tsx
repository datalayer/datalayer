import * as React from 'react'
import { connect } from 'react-redux'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from './../../actions/ConfigActions'
import * as queryString from 'query-string'
import { RestClient } from './../../util/rest/RestClient'

export const KuberApiRestStorageKey = 'kuber_rest'

export type IConfig = {
	hdfs: string
	libraryRest: string
	iamRest: string
	jupyterhubUi: string
	kuberRest: string
	kuberWs: string
	googleApiKey: string
	googleClientId: string
	googleRedirect: string
	googleScope: string
	microsoftApplicationId: string
	microsoftRedirect: string
	microsoftScope: string
	zeppelinRest: string
	zeppelinWs: string
	twitterRedirect: string
}

export const emptyConfig: IConfig = {
  hdfs: '',
  libraryRest: '',
  iamRest: '',
	jupyterhubUi: '',
  kuberRest: '',
  kuberWs: '',
	googleApiKey: '',
	googleClientId: '',
	googleRedirect: '',
	googleScope: '',
  microsoftApplicationId: '',
  microsoftRedirect: '',
  microsoftScope: '',
  zeppelinRest: '',
  zeppelinWs: '',
  twitterRedirect: ''
}

@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
export default class ConfigApi extends React.Component<any, any> {

  state = {
    kuberRest: '',
    config: emptyConfig
  }
  
  public constructor(props: any) {
    super(props)
    this.currentBaseUrl = this.currentBaseUrl.bind(this)
    window['ConfigApi'] = this
  }

  public render() {
    return <div>{ this.props.children }</div>
  }

  public componentDidMount() {

    const params = queryString.parse(location.search)
    console.log('URL Params', params)

    let kuberRest: any

    if (params.kuberRest) {
      kuberRest = { 'kuberRest': params.kuberRest }
    } else {
      let stored_kuber = localStorage.getItem(KuberApiRestStorageKey)    
      if (stored_kuber) {
        try {
          kuberRest = JSON.parse(stored_kuber)
        }
        catch(e) {
          kuberRest = { 'kuberRest': this.currentBaseUrl() }
        }
      }
      else {
        kuberRest = { 'kuberRest': this.currentBaseUrl() }
      }
    }
    localStorage.setItem(KuberApiRestStorageKey, JSON.stringify(kuberRest))
    console.log("Kuber Rest", KuberApiRestStorageKey, kuberRest)
    
    let restClient = new RestClient({
      name: 'Config',
      url: kuberRest.kuberRest,
      path: '/kuber/api/v1',
      username: '',
      password: ''
    })
    
    restClient.get<IConfig>({}, {}, "/config")
    .then(config => { 
      console.log('Config', config)
      let currentBaseUrl = this.currentBaseUrl()
      config.kuberRest = kuberRest.kuberRest
      if (config.libraryRest == '') {
        config.libraryRest = currentBaseUrl
      }
      if (config.iamRest == '') {
        config.iamRest = currentBaseUrl
      }
      if (config.jupyterhubUi == '') {
        config.jupyterhubUi = currentBaseUrl
      }
      if (config.kuberRest == '') {
        config.kuberRest = currentBaseUrl
      }
      if (config.kuberWs == '') {
        let ks = currentBaseUrl.replace('http', 'ws')
        config.kuberWs = ks.replace('https', 'wss')
      }
      if (config.googleRedirect == '') {
        config.googleRedirect =  config.kuberRest + "/kuber/auth/google/redirect"
      }
      if (config.microsoftRedirect == '') {
        config.microsoftRedirect = config.kuberRest + "/kuber/auth/microsoft/redirect"
      }
      if (config.twitterRedirect == '') {
        config.twitterRedirect = config.kuberRest + "/kuber/api/v1/twitter/maketoken"
      }
      console.log('Updated Config', config)
      this.setState({
        kuberRest: kuberRest,
        config: config
      })
      this.props.dispatchNewConfigAction(config)
//      this.props.dispatchGoToAction()
    })

  }

  public getConfig() {
    return this.state.config
  }

  private currentBaseUrl() {
    return window.location.protocol 
    + '//'
    + window.location.hostname
    + ( window.location.port  == '' 
      ? '' 
      : ':' + window.location.port  )
  }

}

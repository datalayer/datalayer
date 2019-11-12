import * as React from 'react'
import { connect } from 'react-redux'
import * as isEqual from 'lodash.isequal'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from '../../actions/ConfigActions'
import { DatalayerStore } from '../../store/DatalayerStore'
import Spinner from '../../widget/Spinner'
import '../../styles/Styles.scss'

@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
export default class Notebook extends React.Component<any, any> {
  state = {
    config: DatalayerStore.state().config,
    loading: true
  }

  public constructor(props) {
    super(props)
  }

  public render() {
    const { config, loading } = this.state
    return (
      <div style={{marginTop: 5}}>
        { loading ?
          <div className={'jupyterlabHeight'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner size={150}/>
          </div>
          : null
        }
        <iframe 
          src={config.jupyterhubUi + '/jupyterhub'} 
          className={"jupyterlabHeight"} 
          style={{width: "100%", borderWidth:"0px"}}
          onLoad={this.hideSpinner}
          >
        </iframe> 
      </div>
    )
  }

  public componentWillReceiveProps(nextProps) {
    const { config } = nextProps
    if (config && ! isEqual(config, this.state.config)) {
      this.setState({config: config})
    }
  }

  private hideSpinner = (): void => {
    this.setState({
      loading: false
    })
  }
  
}

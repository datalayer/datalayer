import * as React from 'react'
import { connect } from 'react-redux'
import * as isEqual from 'lodash.isequal'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from '../../actions/ConfigActions'
import { DatalayerStore } from '../../store/DatalayerStore'
import '../../styles/Styles.scss'

@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
export default class Explorer extends React.Component<any, any> {
  state = {
    config: DatalayerStore.state().config
  }

  public constructor(props) {
    super(props)
  }

  public render() {
    const {config} = this.state
    return (
      <div>
        <div className='ms-font-su'>Explorer</div>
        <img src="/img/explorer/explorer.svg" height="100"/>
      </div>
    )
  }

  public componentWillReceiveProps(nextProps) {
    const { config } = nextProps
    if (config && ! isEqual(config, this.state.config)) {
      this.setState({config: config})
    }
  }
  
}

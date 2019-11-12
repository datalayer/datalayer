import * as React from 'react'
import { connect } from 'react-redux'
import * as isEqual from 'lodash.isequal'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot'
import history from '../../history/History'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from '../../actions/ConfigActions'
import { DatalayerStore } from '../../store/DatalayerStore'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import Notebook from '../notebook/Notebook'
import UserGuide from '../info/UserGuide'
import twitter from './../info/twitter.gif'
import './../../styles/Styles.scss'

@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
export default class Home extends React.Component<any, any> {
  state = {
    config: DatalayerStore.state().config,
    showJupyterlabPanel: false
  }

  public constructor(props) {
    super(props)
  }

  public render() {
    const {config, showJupyterlabPanel} = this.state
    return (
      <div>
      {
        (showJupyterlabPanel) ?
          <Panel
            isOpen={ this.state.showJupyterlabPanel }
            type={ PanelType.smallFluid }
            onDismiss={ () => this.setState({showJupyterlabPanel: false}) }
          >
            <Notebook />
          </Panel>
        :
//          <div className={ "iframeHomeHeight" } style={{ display: "flex", justifyContent: "center" , alignItems: 'center' }}>
          <div>
            <Pivot>
              <PivotItem
                headerText="Notebook"
                headerButtonProps={{
                  'data-order': 1,
                  'data-title': 'Notebook'
                }}
              >
                <div className={`ms-Grid ms-fadeIn500`}>
                  <div className="ms-Grid-row">
                    <div className={`ms-Grid-col ms-sm12 ms-md12 ms-lg12 text-center`}>
                      <a href="#" onClick={e => { e.preventDefault(); history.push('/notebook') }}>
                        <img src="/img/jupyter/jupyter.svg" height="100"/>  
                      </a>
                      <div className="ms-font-xl">
                        <a href="#" onClick={e => { e.preventDefault(); history.push('/notebook') }}>
                          <div className="ms-font-xxl">Launch your Notebook</div>
                        </a>
                      </div>
                    </div>
                  </div>
{/*
                  <div className="ms-Grid-row">
                    <div className={`ms-Grid-col ms-sm6 ms-md6 ms-lg6 text-center`}>
                      <a href="#" onClick={e => { e.preventDefault(); this.setState({showJupyterlabPanel: true}) }}>
                        <img src="/img/jupyter/jupyter.svg" height="100"/>
                      </a>
                    </div>
                    <div className={`ms-Grid-col ms-sm6 ms-md6 ms-lg6 text-center`}>
                      <div className="ms-font-xl">JupyterLab Fullscreen</div>
                    </div>
                  </div>
*/}
              </div>
            </PivotItem>
            <PivotItem headerText="User  Guide">
              <UserGuide/> 
            </PivotItem>
          </Pivot>
        </div>
      }
{/*
            <div className={`ms-Grid ms-fadeIn500`}>
              <div className="ms-Grid-row">
                <div className={`ms-Grid-col ms-sm12 ms-md12 ms-lg12 text-center`}>
                  <a href="#" onClick={e => { e.preventDefault(); history.push('/notebook');} }><img src="/img/jupyter/jupyter.svg" height="100"/></a>
                </div>
                <div className={`ms-Grid-col ms-sm3 ms-md3 ms-lg3 text-center`}>
                  <a href="#" onClick={e => { e.preventDefault(); history.push('/dla/library');} }><img src="/img/library/library.svg" height="100"/></a>
                </div>
                <div className={`ms-Grid-col ms-sm3 ms-md3 ms-lg3 text-center`}>
                  <a href="#" onClick={e => { e.preventDefault(); history.push('/dla/explorer');} }><img src="/img/explorer/explorer.svg" height="100"/></a>
                </div>
                <div className={`ms-Grid-col ms-sm3 ms-md3 ms-lg3 text-center`}>
                  <a href="#" onClick={e => { e.preventDefault(); history.push('/dla/kuber');} }><img src="/img/kuber/kuber.svg" height="100"/></a>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className={`ms-Grid-col ms-sm12 ms-md12 ms-lg12 text-center`}>
                  <div className="ms-font-xl">JupyterLab</div>
                </div>
                <div className={`ms-Grid-col ms-sm3 ms-md3 ms-lg3 text-center`}>
                  <div className="ms-font-xl">Library</div>
                </div>
                <div className={`ms-Grid-col ms-sm3 ms-md3 ms-lg3 text-center`}>
                  <div className="ms-font-xl">Explorer</div>
                </div>
                <div className={`ms-Grid-col ms-sm3 ms-md3 ms-lg3 text-center`}>
                  <div className="ms-font-xl">Kuber</div>
                </div>
              </div>
          </div>
*/}
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

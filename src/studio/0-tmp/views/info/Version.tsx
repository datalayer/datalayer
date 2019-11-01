import * as React from 'react'
import history from '../../history/History'
import '../../styles/Styles.scss'

export default class Version extends React.Component<any, any> {

  public constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div className={`${"homeHeight"}`} style={{overflowY: 'auto'}}>
        <div className="ms-fadeIn500">
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 text-center">
                <div>
                  <p className="ms-font-su">DATALAYER</p>
                  <p className="ms-font-xxl">Version: 0.0.2</p>
                  <p className="ms-font-xxl">Code Name: #OMalley</p>
                  <p className="ms-font-xl"><a href="#" onClick={ e => { e.preventDefault(); history.push('/release-notes'); } }>Release Notes</a></p>                  
                  <img src="/img/datalayer/datalayer-square-name.png" style={{ width: '300px' }}/>
                  <p className="ms-font-xl">&copy; 2019 https://datalayer.io</p>
                </div>
{/*
                <div>
                    <div><a href="#" onClick={e => {e.preventDefault(); history.push('/dla0/check')}}>Check</a></div>
                    <div><a href="#" onClick={e => {e.preventDefault(); history.push('/dla0/tmp')}}>Spl</a></div>
                    <div><a href="#" onClick={e => {e.preventDefault(); history.push('/dla0/restClient')}}>Rest Client</a></div>
                    <div><a href="#" onClick={e => {e.preventDefault(); history.push('/dla0/vega')}}>Vega</a></div>
                    <div><a href="#" onClick={e => {e.preventDefault(); history.push('/dla0/d3')}}>D3</a></div>
                    <div><a href="#" onClick={e => {e.preventDefault(); history.push('/dla0/k8s')}}>K8S</a></div>
                    <div><a href="#" onClick={e => {e.preventDefault(); history.push('/dla0/tmp')}}>Temp</a></div>
                </div>
*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

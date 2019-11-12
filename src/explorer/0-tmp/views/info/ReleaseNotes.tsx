import * as React from 'react'
import './../../styles/Styles.scss'

export default class ReleaseNotes extends React.Component<any, any> {

  public constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div className={`${"homeHeight"}`} style={{overflowY: 'scroll'}}>
        <div className="ms-scaleDownIn100">
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                <div className="ms-font-su">Release Notes</div>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                <img src="/img/releases/0.0.2-omalley.png" style={{ maxHeight: 150 }} />
                <p className="ms-font-xl"><a href="https://docs.datalayer.io/releases/notes/0.0.2.html" target="_blank">Version 0.0.2</a> #OMalley.</p>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
               <img src="/img/releases/0.0.1-basic.jpg" style={{ maxHeight: 150 }} />
               <p className="ms-font-xl"><a href="https://docs.datalayer.io/releases/notes/0.0.1.html" target="_blank">Version 0.0.1</a> #Basic.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

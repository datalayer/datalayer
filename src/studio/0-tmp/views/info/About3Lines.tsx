import * as React from 'react'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import './../../styles/Styles.scss'

export default class About3Lines extends React.Component<any, any> {

  public constructor(props) {
    super(props)
  }

  public render() {
    return (
        <div className="ms-Grid">
          <div className="ms-Grid-row" style={{paddingBottom: 20}}>
            <div className="ms-Grid-col ms-sm1 ms-md1 ms-lg1" style={{padding: 0}}>
              <Icon iconName="TeamFavorite" className="dla-IconLanding" />
            </div>
            <div className="ms-Grid-col ms-sm1 ms-md1 ms-lg1" style={{padding: 0}}>
            </div>
            <div className="ms-Grid-col ms-sm10 ms-md10 ms-lg10" style={{padding: 0}}>
              Develop algorithms and models with <strong>python notebooks</strong>.
            </div>
          </div>
          <div className="ms-Grid-row" style={{paddingBottom: 20}}>
            <div className="ms-Grid-col ms-sm1 ms-md1 ms-lg1" style={{padding: 0}}>
              <Icon iconName="PasteAsCode" className="dla-IconLanding"/> 
            </div>
            <div className="ms-Grid-col ms-sm1 ms-md1 ms-lg1" style={{padding: 0}}>
            </div>
            <div className="ms-Grid-col ms-sm10 ms-md10 ms-lg10" style={{padding: 0}}>
              Build <strong>dashboards</strong> based on notebooks.
            </div>
          </div>
          <div className="ms-Grid-row" style={{paddingBottom: 20}}>
            <div className="ms-Grid-col ms-sm1 ms-md1 ms-lg1" style={{padding: 0}}>
              <Icon iconName="LineChart" className="dla-IconLanding" />
            </div>
            <div className="ms-Grid-col ms-sm1 ms-md1 ms-lg1" style={{padding: 0}}>
            </div>
            <div className="ms-Grid-col ms-sm10 ms-md10 ms-lg10" style={{padding: 0}}>
              Convert notebooks and dashboards into <strong>data papers and stories</strong> on social medias.
          </div>
          </div>
        </div>
    )
  }

}

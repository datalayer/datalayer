import * as React from 'react'
import { SocialIcon } from 'react-social-icons'
// import FabricIcon from '../../widget/FabricIcon'
import history from '../../history/History'
import './Footer.scss'

export default class Footer extends React.Component<any, any> {

  public constructor(props) {
    super(props)
  }

  public render() {
    return (
        <div className="ms-Grid" style={{paddingTop: 20}}>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-textAlignCenter">
              <img src="/img/datalayer/datalayer-square_black.png" style={{width: 32}}/>
              <div>share awesome data stories</div>
            </div>
          </div>
        </div>
    )
  }

}

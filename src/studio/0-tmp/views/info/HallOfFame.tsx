import * as React from 'react'
import './../../styles/Styles.scss'

export default class HallOfFame extends React.Component<any, any> {

  public constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div className="ms-fadeIn500">
        <div className={`${"homeHeight"}`} style={{overflowY: 'auto'}}>
          <div className="ms-fadeIn500">
            <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 text-center">
                <div className="ms-font-su">Datalayer Hall of Fame</div>
              </div>
            </div>
            <div className="ms-Grid-row">
              <hr/>
            </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 text-center">
                  <div>
                    <span>
                      <ul className={ "featureList" } style={{listStyle: "none"}}>
                        <li>
                          <img src="/img/hall-of-fame/eric-charles.png" width="100"/>
                          <div className="ms-font-xl">Eric Charles</div>
                        </li>
                        <li>
                          <img src="/img/hall-of-fame/ingrid-bayart.jpg" width="100"/>
                          <div className="ms-font-xl">Ingrid Bayart</div>
                        </li>
                        <li>
                          <img src="/img/hall-of-fame/picto.png" width="100"/>
                          <div className="ms-font-xl">Edmond Charles</div>
                        </li>
                        <li>
                          <img src="/img/hall-of-fame/picto.png" width="100"/>
                          <div className="ms-font-xl">Eléonore Charles</div>
                        </li>
                      </ul>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

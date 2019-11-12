import * as React from 'react'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import LoadableDla from './../../widget/LoadableDla'

const DATALAYER_PROFILE_PHOTO = '/img/datalayer/datalayer-square_white.png'
// const EXPLORER_PROFILE_PHOTO = '/img/explorer/explorer_white.svg'

const TellMeMore = LoadableDla( { loader: () => import('./TellMeMore') })
TellMeMore.preload()

export default class Features extends React.Component<any, any> {

  state = {
    showTellMeMorePanel: false
  }

  public constructor(props) {
    super(props)
  }

  public render() {
    return (
      <>
        <div className={ "flavors" } style={{ margin: '0px' }}>
          <div className={ "flavor" }>
            <img src={ DATALAYER_PROFILE_PHOTO } width='72' alt='Datalayer Logo' />
{/*
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                <br/>
                <Persona
                  imageUrl = { profilePhoto }
                  hidePersonaDetails = { true }
                  presence = { PersonaPresence.none }
                  size = { PersonaSize.large }
                  className = "text-center"
                />
              </div>
            </div>
*/}
            <span className={ "flavorTitle" }>Built to Share Knowledge</span>
            <span className={ "flavorDescription" }>Academics ❤️ Datalayer</span>
            <a href='#' className={ "button" } onClick={ (e) => {e.preventDefault(); this.setState({showTellMeMorePanel: true})} }>Learn more</a>
          </div>
        <div className={ "flavor" }>
          <span className={ "flavorTitle" }>Collaborate on Datasets</span>
          <span className={ "flavorDescription" }>Use the best datasets, algorithms, models and more in teams.</span>
{/*
          <a href='' onClick={ (e) => {e.preventDefault(); this.setState({showTellMeMorePanel: true})} }>Learn more</a> 
*/}
        </div>
        <div className={ "flavor" }>
          <span className={ "flavorTitle" }>Publish your Findings</span>
          <span className={ "flavorDescription" }>Publish your analysis, models and more as simple, beautiful papers that can be embedded anywhere.</span>
{/*
          <a href='' onClick={ (e) => {e.preventDefault(); this.setState({showTellMeMorePanel: true})} }>Learn more</a> 
*/}
        </div>
        <div className={ "flavor" }>
          <span className={ "flavorTitle" }>Tell Stories with Data</span>
          <span className={ "flavorDescription" }>Turn your analysis into compelling stories and make them understandable.</span>
{/*
          <a href='' onClick={ (e) => {e.preventDefault(); this.setState({showTellMeMorePanel: true})} }>Learn more</a> 
*/}
        </div>
      </div>
      <Panel
          isOpen={this.state.showTellMeMorePanel}
          type={PanelType.smallFluid}
          onDismiss={() => this.setState({showTellMeMorePanel: false})}
          headerText=""
          closeButtonAriaLabel="Close"
          id="dla-discover-panel"
        >
        <TellMeMore />
      </Panel>
    </>
    )
  }

}

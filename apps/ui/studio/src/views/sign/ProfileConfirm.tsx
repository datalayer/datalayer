import * as React from 'react'
import { connect } from 'react-redux'
import { mapStateToPropsAuth, mapDispatchToPropsAuth } from './../../actions/AuthActions'
import { DatalayerStore } from './../../store/DatalayerStore'
import { IConfig } from './../../api/config/ConfigApi'
import { css } from 'office-ui-fabric-react/lib/Utilities'
import IamApi from './../../api/iam/IamApi'
import HighlightsWidget from '../info/Highlights'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from './../../actions/ConfigActions'
import './../../styles/Styles.scss'

const DATALAYER_PROFILE_PHOTO = '/img/datalayer/datalayer-square_white.png'

@connect(mapStateToPropsAuth, mapDispatchToPropsAuth)
@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
export default class ProfileConfirm extends React.Component<any, any> {
  private readonly iamApi: IamApi
  private config: IConfig = DatalayerStore.state().config

  state = {
    isIamAuthenticated: DatalayerStore.state().isIamAuthenticated,
    profileDisplayName: DatalayerStore.state().profileDisplayName,
    profilePhoto: window.URL.createObjectURL(DatalayerStore.state().profilePhotoBlob)
  }

  public constructor(props) {
    super(props)
    this.iamApi = window["IamApi"]
  }

  public render() {
    return (
      <div>
        <div className='hero heroPaddingBottom100'>
          <h1 className={ "title" }>DATALAYER</h1>
          <span className={ "tagline" }>Your profile has been updated</span>
          <div>
            <div className="ms-Grid" style={{ padding: 0 }}>
              <div className="ms-Grid-row">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 text-center">
                    <a href="#" className={ css("button", "primaryButton") } onClick={ (e) => this.onIamAuthenticateClick(e) }>Login</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={ "flavors" } style={{ margin: '0px' }}>
          <div className={ "flavor" }>
            <img src={ DATALAYER_PROFILE_PHOTO } width='72' alt='Datalayer Logo' />
            <span className={ "flavorTitle" }>Built to Share Knowledge</span>
            <span className={ "flavorDescription" }>Academics ❤️ Datalayer</span>
          </div>
          <div className={ "flavor" }>
            <span className={ "flavorTitle" }>Collaborate on Dataset</span>
            <span className={ "flavorDescription" }>Use the best datasets, algorithms, models and more in teams.</span>
          </div>
          <div className={ "flavor" }>
            <span className={ "flavorTitle" }>Share your Findings</span>
            <span className={ "flavorDescription" }>Publish your analysis as simple, beautiful papers that can be embedded anywhere.</span>
          </div>
          <div className={ "flavor" }>
            <span className={ "flavorTitle" }>Create Stories</span>
            <span className={ "flavorDescription" }>Turn your data analysis into compelling stories.</span>
          </div>
        </div>
        <div className={ css("product", "productDatalayerLight") } style={{margin: '0px'}}>
          <div>
            <span className={ "productTitle" }>Collaborate</span>
            <span className={ "productDescription" }>Share your Big Data analysis with peers in a visual way.</span>
          </div>
          <img className={ "productImage" } src={ '/img/info/collaborate.svg' } width='496' height='300' alt='' />
        </div>
        <div className={ css("product", "productDatalayerDark") } style={{margin: '0px'}}>
          <div>
            <span className={ "productTitle" }>Enterprise ready</span>
            <span className={ "productDescription" }>Integrate with External Security Providers.</span>
          </div>
          <img className={ "productImage" } src={ '/img/pipes/pipes.svg' } width='496' height='300' alt='' />
        </div>
        <HighlightsWidget showAll="false" />
      </div>
    )
  }

  public componentWillReceiveProps(nextProps) {
    const { isIamAuthenticated } = nextProps
    if (this.state.isIamAuthenticated && !isIamAuthenticated) {
      this.setState({
        isIamAuthenticated: false,
        profileDisplayName: '',
        profilePhoto: DATALAYER_PROFILE_PHOTO
      })
    }
    else if (!this.state.isIamAuthenticated && isIamAuthenticated) {
      this.setState({
        isIamAuthenticated: true,
        profileDisplayName: DatalayerStore.state().profileDisplayName,
        profilePhoto: DATALAYER_PROFILE_PHOTO
      })
    }
  }

  private onIamAuthenticateClick = (e) =>  {
    e.preventDefault()
    this.props.dispatchToIamAction()
  }

}

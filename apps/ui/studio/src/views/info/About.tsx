import * as React from 'react'
import { connect } from 'react-redux'
import { css } from 'office-ui-fabric-react/lib/Utilities'
import { ActionButton } from 'office-ui-fabric-react/lib/Button'
import history from './../../history/History'
import SignupForm from './../sign/SignupForm'
import About3Lines from './About3Lines'
import { mapStateToPropsAuth, mapDispatchToPropsAuth } from './../../actions/AuthActions'
import { DatalayerStore } from './../../store/DatalayerStore'
import { IConfig } from './../../api/config/ConfigApi'
import GoogleApi from './../../api/google/GoogleApi'
import MicrosoftApi from './../../api/microsoft/MicrosoftApi'
import TwitterApi from './../../api/twitter/TwitterApi'
import IamApi from './../../api/iam/IamApi'
import LibraryApi from './../../api/library/LibraryApi'
import LoadableDla from './../../widget/LoadableDla'
// import Cards from './Cards'
import SearchBoxDla from './../search/SearchBoxDla'
import Features from './../info/Features'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from './../../actions/ConfigActions'
import './../../styles/Styles.scss'

const DATALAYER_PROFILE_PHOTO = '/img/datalayer/datalayer-square_white.png'
const FeaturesBand = LoadableDla( { loader: () => import('./../info/FeaturesBand') })
FeaturesBand.preload()

@connect(mapStateToPropsAuth, mapDispatchToPropsAuth)
@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
export default class About extends React.Component<any, any> {
  private config: IConfig = DatalayerStore.state().config
  private readonly googleApi: GoogleApi
  private readonly microsoftApi: MicrosoftApi
  private readonly twitterApi: TwitterApi
  private readonly iamApi: IamApi
  private readonly libraryApi: LibraryApi

  state = {
    isGoogleAuthenticated: DatalayerStore.state().isGoogleAuthenticated,
    isMicrosoftAuthenticated: DatalayerStore.state().isMicrosoftAuthenticated,
    isTwitterAuthenticated: DatalayerStore.state().isTwitterAuthenticated,
    isIamAuthenticated: DatalayerStore.state().isIamAuthenticated,
    profileDisplayName: DatalayerStore.state().profileDisplayName,
    profilePhoto: window.URL.createObjectURL(DatalayerStore.state().profilePhotoBlob),
  }

  public constructor(props) {
    super(props)
    this.googleApi = window["GoogleApi"]
    this.microsoftApi = window["MicrosoftApi"]
    this.twitterApi = window["TwitterApi"]
    this.iamApi = window["IamApi"]
  }

  public render() {
    const { profileDisplayName, isIamAuthenticated } = this.state
    return (
      <div className="dla-landing" style={{paddingTop: 20}}>
        {isIamAuthenticated ?
        <>
        <div className={ "heroAbout2" } style={{ margin: '0px' }}>
          <div className="ms-Grid" style={{ padding: 0, width: '100%' }}>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 text-center" style={{ paddingTop: '20px' }}>
                  <h1 className={ "title" }>DATALAYER</h1>
                  <span className={ "tagline" }>Create and Share Data Papers in Teams</span>
                  <div className="ms-Grid" style={{padding: 0}}>
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 text-center">
                        <div style={{marginTop: 40}}/>
                        <a href="#" className={ css("button", "primaryButton") } onClick={ (e) => {e.preventDefault(); history.push('/home')} }>Home</a>
                        <div style={{marginTop: 20}}/>
                        <div style={{marginTop: 20}}/>
                        <div className="dla-color-white">
                          <ActionButton
                            iconProps={{ 
                              iconName: 'Contact',
                              styles: {
                                root: { color: 'white' }
                              }
                            }}
                            disabled={false}
                            checked={true}
                            onClick={ e => { e.preventDefault(); history.push('/profile') } }
                            >
                            Welcome { profileDisplayName }
                          </ActionButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        :
        <>
          <div className={ "heroAbout2" } style={{ margin: '0px' }}>
            <div className="ms-Grid" style={{ padding: 0, width: '100%' }}>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2" style={{padding: 0}}>
                </div>
                <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4" style={{padding: 0}}>
                  <h2 className={ "title" } style={{marginBottom: 20}}>DATALAYER</h2>
                  <div className={ "tagline" } style={{marginBottom: 10, textAlign: 'left', fontWeight: 'normal'}}>Distributed Open Science</div>
                  <SearchBoxDla />
                  <div className={ "tagline" } style={{color: 'white', paddingTop: 20, textAlign: 'left'}} >
                    <About3Lines />
                  </div>
                </div>
                <div className="ms-Grid-col ms-sm1 ms-md1 ms-lg1" style={{padding: 0}}>
                </div>
                <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4" style={{padding: 0}}>
                  <div style={{
                    marginTop: 55,
                    marginBottom: 20,
                    backgroundColor: 'white',
                    borderRadius: 4, 
                    padding: 10,
                    boxShadow: '0 10px 5px 0 rgba(0,0,0,.15)'
                    }}>
                    <SignupForm/>
                  </div>
                </div>
                <div className="ms-Grid-col ms-sm1 ms-md1 ms-lg1" style={{padding: 0}}>
                </div>
              </div>
              </div>
          </div>
        </>
        }
        <Features/>
{/*
        <Cards />
*/}
        <FeaturesBand/>
      </div>
    )
  }

  public componentDidMount() {
    window.scroll({top: 0, left: 0, behavior: 'auto' })
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
    const { isMicrosoftAuthenticated } = nextProps
    if (this.state.isMicrosoftAuthenticated && !isMicrosoftAuthenticated) {
      this.microsoftApi.logout()
      this.setState({
        isMicrosoftAuthenticated: false,
        profileDisplayName: '',
        profilePhoto: DATALAYER_PROFILE_PHOTO
      })
    }
    else if (!this.state.isMicrosoftAuthenticated && isMicrosoftAuthenticated) {
      let blobPhoto = DatalayerStore.state().profilePhotoBlob
      let profilePhoto = window.URL.createObjectURL(blobPhoto)
      this.setState({
        isMicrosoftAuthenticated: true,
        profileDisplayName: DatalayerStore.state().profileDisplayName,
        profilePhoto: profilePhoto
      })
    }
    const { isTwitterAuthenticated } = nextProps
    if (this.state.isTwitterAuthenticated && !isTwitterAuthenticated) {
      this.twitterApi.logout()
      this.setState({
        isTwitterAuthenticated: false,
        profileDisplayName: '',
        profilePhoto: DATALAYER_PROFILE_PHOTO
      })
    }
    else if (!this.state.isTwitterAuthenticated && isTwitterAuthenticated) {
      let blobPhoto = DatalayerStore.state().profilePhotoBlob
      let profilePhoto = window.URL.createObjectURL(blobPhoto)
      this.setState({
        isTwitterAuthenticated: true,
        profileDisplayName: DatalayerStore.state().profileDisplayName,
        profilePhoto: profilePhoto
      })
    }
    const { isGoogleAuthenticated } = nextProps
    if (this.state.isGoogleAuthenticated && !isGoogleAuthenticated) {
      this.googleApi.logout()
      this.setState({
        isGoogleAuthenticated: false,
        profileDisplayName: '',
        profilePhoto: DATALAYER_PROFILE_PHOTO
      })
    }
    else if (!this.state.isGoogleAuthenticated && isGoogleAuthenticated) {
      let blobPhoto = DatalayerStore.state().profilePhotoBlob
      let profilePhoto = window.URL.createObjectURL(blobPhoto)
      this.setState({
        isGoogleAuthenticated: true,
        profileDisplayName: DatalayerStore.state().profileDisplayName,
        profilePhoto: profilePhoto
      })
    }
  }
/*
  private onGoogleAuthenticateClick = (e) =>  {
    e.preventDefault()
    this.props.dispatchToGoogleAction()
  }

  private onMicrosoftAuthenticateClick = (e) =>  {
    e.preventDefault()
    this.props.dispatchToMicrosoftAction()
  }

  private onTwitterAuthenticateClick = (e) =>  {
    e.preventDefault()
    this.props.dispatchToTwitterAction()
  }

  private onIamAuthenticateClick = (e) =>  {
    e.preventDefault()
    this.props.dispatchToIamAction()
  }

  private home = (e) =>  {
    e.preventDefault()
    history.push("/home")
  }

  private onLogoutClick = (e) =>  {
    e.preventDefault()
    this.iamApi.logout()
      .then(res => {
        this.props.dispatchLogoutAction()
      })
  }
*/
}

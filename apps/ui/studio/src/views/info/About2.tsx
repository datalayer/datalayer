import * as React from 'react'
import { connect } from 'react-redux'
import { VerticalDivider, IVerticalDividerClassNames } from 'office-ui-fabric-react/lib/Divider'
import { getDividerClassNames } from 'office-ui-fabric-react/lib/components/Divider/VerticalDivider.classNames'
import { mergeStyleSets, ITheme } from 'office-ui-fabric-react/lib/Styling'
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { mapStateToPropsAuth, mapDispatchToPropsAuth } from './../../actions/AuthActions'
import { DatalayerStore } from './../../store/DatalayerStore'
import { IConfig } from './../../api/config/ConfigApi'
import About3Lines from './../info/About3Lines'
import GoogleApi from './../../api/google/GoogleApi'
import MicrosoftApi from './../../api/microsoft/MicrosoftApi'
import TwitterApi from './../../api/twitter/TwitterApi'
import IamApi from './../../api/iam/IamApi'
import LibraryApi from './../../api/library/LibraryApi'
import LoadableDla from './../../widget/LoadableDla'
import Cards from './../cards/Cards'
import SearchBoxDla from './../search/SearchBoxDla'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from './../../actions/ConfigActions'
import './../../styles/Styles.scss'

const DATALAYER_PROFILE_PHOTO = '/img/datalayer/datalayer-square_white.png'
const FeaturesBand = LoadableDla( { loader: () => import('./../info/FeaturesBand') })
FeaturesBand.preload()

const getVerticalDividerClassNames = memoizeFunction(
  (theme: ITheme): IVerticalDividerClassNames => {
    return mergeStyleSets(getDividerClassNames(theme), {
      divider: {
        height: 28
      }
    })
  }
)

@connect(mapStateToPropsAuth, mapDispatchToPropsAuth)
@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
export default class Landing extends React.Component<any, any> {
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
    tabId: 1
  }

  public constructor(props) {
    super(props)
    this.googleApi = window["GoogleApi"]
    this.microsoftApi = window["MicrosoftApi"]
    this.twitterApi = window["TwitterApi"]
    this.iamApi = window["IamApi"]
  }

  public render() {
    const { tabId, profileDisplayName, isIamAuthenticated } = this.state
    return (
      <div className="dla-landing">
        <div style={{
          paddingLeft: 20,
          display: 'flex',
          flexDirection: 'row',
          }}>
          <Pivot>
            <PivotItem
              headerText="Editorial"
              headerButtonProps={{
                'data-order': 1,
                'data-title': 'Editorial'
              }}
            />
          </Pivot>
          <VerticalDivider getClassNames={getVerticalDividerClassNames} />
          <Pivot selectedKey={null}>
{/*
            <PivotItem headerText="Supply Chain" itemKey="1">
              Supply Chain
            </PivotItem>
            <PivotItem headerText="Regression" itemKey="2">
              Regression
            </PivotItem>
*/}
          </Pivot>
        </div>
        {isIamAuthenticated ?
            <>
            </>
        :
        <div className={ "hero" } style={{ margin: 0 }}>
          <div className="ms-Grid" style={{ padding: 0, width: '100%' }}>
            <>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2">
                </div>
                <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg8">
                  <div style={{marginBottom: 20}}/>
                  <h2 className={ "title" }>Datalayer</h2>
                  <div className={ "tagline" } style={{marginBottom: 10, textAlign: 'left', fontWeight: 'normal'}}>A distributed open science platform.</div>
                  <div className={ "tagline" } style={{marginBottom: 10, textAlign: 'left', fontWeight: 'normal', maxWidth: 1000}}>Designed for academics and data geeks to analyse with real datasets and code.</div>
                  <SearchBoxDla />
                  <div className={ "tagline" } style={{color: 'white', paddingTop: 20, textAlign: 'left', maxWidth: '100%'}} >
                    <About3Lines />
                  </div>
                </div>
                <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2">
                </div>
              </div>
              <div className="ms-Grid-row">
              </div>
            </>
          </div>
        </div>
        }
        <Cards />
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

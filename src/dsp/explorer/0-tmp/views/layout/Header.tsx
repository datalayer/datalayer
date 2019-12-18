import * as React from 'react'
import { connect } from 'react-redux'
import Headroom from 'react-headroom'
// import { Separator } from 'office-ui-fabric-react/lib/Separator'
import { VerticalDivider, IVerticalDividerClassNames } from 'office-ui-fabric-react/lib/Divider'
import { getDividerClassNames } from 'office-ui-fabric-react/lib/components/Divider/VerticalDivider.classNames'
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { mergeStyleSets, ITheme } from 'office-ui-fabric-react/lib/Styling'
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox'
import { DatalayerStore } from './../../store/DatalayerStore'
import history from '../../history/History'
import IamApi from './../../api/iam/IamApi'
import { mapStateToPropsAuth, mapDispatchToPropsAuth } from './../../actions/AuthActions'
import './Header.scss'

export interface HeaderState {
  dropdownOpen: boolean,
  isIamAuthenticated: boolean,
  profileDisplayName: string,
  profilePhoto: string
  leftItemsAnon: any[],
  rightItemsAnon: any[]
  leftItemsAuth: any[],
  rightItemsAuth: any[],
  q: string
}

const getVerticalDividerClassNames = memoizeFunction(
  (theme: ITheme): IVerticalDividerClassNames => {
    return mergeStyleSets(getDividerClassNames(theme), {
      divider: {
        height: 28
      }
    })
  }
)

export const overflowItems = [
  {
    key: 'about',
    name: 'About',
    onClick: () => history.push('/about'),
    iconProps: {
      iconName: 'Info'
    }
  }
]

@connect(mapStateToPropsAuth, mapDispatchToPropsAuth)
export default class Header extends React.Component<any, HeaderState> {
  private readonly iamApi: IamApi

  state = {
    dropdownOpen: false,
    isIamAuthenticated: DatalayerStore.state().isIamAuthenticated,
    profileDisplayName: DatalayerStore.state().profileDisplayName,
    profilePhoto: window.URL.createObjectURL(DatalayerStore.state().profilePhotoBlob),
    leftItemsAnon: [
    ],
    rightItemsAnon: [
      {
        key: 'login',
        name: 'Log in',
        title: 'Log in',
        iconOnly: false,
        iconProps: {
          iconName: 'Permissions'
        },
        onClick: () => this.props.dispatchToIamAction()
      },
/*
      {
        key: 'signup',
        name: 'Create a free account',
        title: 'Create a free account',
        iconOnly: false,
        iconProps: {
          iconName: 'FollowUser'
        },
        onClick: () => history.push(`/join`)
      },
*/
      {
        key: 'forgotpassword',
        name: 'Forgot password',
        title: 'Forgot password',
        iconOnly: false,
//          iconProps: {
//            iconName: 'StatusCircleQuestionMark'
//          },
        onClick: () => history.push(`/forgotpassword`)
      }
    ],
    leftItemsAuth: [      
    ],
    rightItemsAuth: [      
    ],
    q: ''
    }

  public constructor(props) {
    super(props)
    this.iamApi = window["IamApi"]
    this.state.q = this.props.match.params.q
  }

  public render() {
    const { q, isIamAuthenticated, leftItemsAnon, rightItemsAnon,  leftItemsAuth, rightItemsAuth } = this.state
    let showSidebarToogler = this.showSidebarToogler()
    if (!showSidebarToogler) {
      document.body.classList.toggle('sidebar-hidden', true)
    }
    let showAsideToogler = this.showAsideToogler()
    if (!showAsideToogler) {
      document.body.classList.toggle('aside-menu-hidden', true)
    }
    return (
      <div>
        <Headroom>
          <div className="dla-navbar">
            <div style={{display: 'flex', justifyContent: 'space-between', color: 'rgb(51, 51, 51, 1)'}}>
              <a onClick={e => this.goHome(e)} className="dla-logo"/>
              <div onClick={e => this.goHome(e)} style={{cursor: 'pointer', width: 120}}>
                <div style={{fontWeight: 'bold', paddingTop: '3px'}}>
                  DATALAYER
                </div>
                <div style={{fontSize: 'small'}}>
                  Share Data Stories
                </div>
              </div>
            </div>
            <div className="searchbox" style={{width: '100%', marginLeft: 10, paddingTop: '4px'}}>
              <SearchBox placeholder="Search data stories"
                value={q}
//                onChange={ (q) => this.setState({q: q}) }
                onSearch={ (q) => { this.setState({q: q}); history.push('/search/' + q); } }
                underlined={false}
                onKeyDown={(e) => {
                  if(e.key === 'Enter') {
                    history.push('/search/' + q)
                  }
                }}
                styles = {{
                  root: { 
                    borderRadius: 24,
                    height: 35,
                    marginTop: 6,
                    backgroundColor: '#eee',
                    border: '1px solid transparent',
                  },
                }}
                />
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              { !isIamAuthenticated &&
                <>
                  <DefaultButton 
                    onClick={(e) => { e.preventDefault(); history.push('/explore') }}
                    styles={{
                      root: {
                        borderRadius: 4,
                        width: 70,
                        height: 30,
                        marginTop: 6,
                        marginLeft: 10,
                        marginRight: 10,
                        fontSize: 14,
                        fontWeight: 'bold',
                        backgroundColor: 'white',
                        borderColor: '#d1d1d1',
                      }}
                    }
                    >
                    Explore
                  </DefaultButton>
                  <VerticalDivider getClassNames={getVerticalDividerClassNames} />
                  <CommandBar
                    items = { leftItemsAnon }
                    farItems = { rightItemsAnon }
                    overflowItems={ overflowItems }
                  />
{/*
                  <Separator 
                    vertical={true} 
                    styles={{
                      root: {
                        marginTop: 10,
                        marginBottom: 10,
                      }
                    }}
                    />
*/}
{/*
                    <a href="#" 
                      className={ css("button-sign") }
                      onClick={(e) => { e.preventDefault(); history.push('/join')}}
                      style={{
                        backgroundColor: 'rgb(3, 131, 135)',
                        height: 20,
                        marginTop: 4,
                        marginLeft: 10,
                        marginRight: 50,
                        fontSize: 14,
                        fontWeight: 'bold'
                      }}
                    >
                    Join free
                  </a>
*/}
                  <PrimaryButton 
                    onClick={(e) => { e.preventDefault(); history.push('/join') }}
                    styles={{
                      root: {
                        borderRadius: 4,
                        width: 100,
                        height: 30,
                        marginTop: 6,
                        marginLeft: 10,
                        marginRight: 10,
                        fontSize: 14,
                        fontWeight: 'bold'
                      }}
                    }
                    >
                    Join free
                  </PrimaryButton>
                </>
              }
              { isIamAuthenticated &&
              <>
                <CommandBar
                    items = { leftItemsAuth }
                    farItems = { rightItemsAuth }
                    overflowItems={ overflowItems }
                  />
              </>
              }
              </div>
            </div>
        </Headroom>
      </div>
    )
  }

  public componentWillReceiveProps(nextProps) {
    const q = nextProps.match.params.q
    if ((q != undefined) && (q != this.state.q)) {
      this.setState({
        q: q
      })
    }
    const { isIamAuthenticated } = nextProps
    if (this.state.isIamAuthenticated && !isIamAuthenticated) {
      this.setState({
        isIamAuthenticated: false,
        leftItemsAnon: [
        ],
        rightItemsAnon: [          
          {
            buttonStyles: {
              backgroundColor: 'white'
            },
            key: 'login',
            name: 'Log in',
            title: 'Log in',
            iconOnly: false,
            iconProps: {
              iconName: 'Permissions'
            },
            onClick: () => this.props.dispatchToIamAction()
          },
/*
          {
            buttonStyles: {
              backgroundColor: 'white'
            },
            key: 'signup',
            name: 'Create a free account',
            title: 'Create a free account',
            iconOnly: false,
            iconProps: {
              iconName: 'FollowUser'
            },
            onClick: () => history.push(`/join`)
          },
*/
          {
            buttonStyles: {
              backgroundColor: 'white'
            },
            key: 'forgotpassword',
            name: 'Forgot password',
            title: 'Forgot password',
            iconOnly: false,
//            iconProps: {
//              iconName: 'StatusCircleQuestionMark'
//            },
            onClick: () => history.push(`/forgotpassword`)
          }
        ],
        leftItemsAuth: [          
        ],
        rightItemsAuth: [          
        ]
      })
    }
    else if (!this.state.isIamAuthenticated && isIamAuthenticated) {
      this.setState({
        isIamAuthenticated: true,
        leftItemsAnon: [          
        ],
        rightItemsAnon: [          
        ],
        leftItemsAuth: [
        ],
        rightItemsAuth: [
          {
            buttonStyles: {
              backgroundColor: 'white'
            },
            key: 'home',
            name: 'Home',
            title: 'Home',
            iconOnly: false,
            iconProps: {
              iconName: 'Home'
            },
            onClick: () => history.push(`/home`)
          },
          {
            key: 'notebook',
            name: 'Notebook',
            iconOnly: false,
            iconProps: {
              iconName: 'ClassNotebookLogo32'
            },
            title: 'Notebook',
            onClick: () => history.push(`/notebook`)
          },
          {
            key: 'profile',
            name: 'Profile',
            iconOnly: false,
            iconProps: {
              iconName: 'Accounts'
            },
            title: 'Profile',
            onClick: () => history.push(`/profile`)
          },
          {
            key: 'signout',
            name: 'Sign Out',
            iconOnly: true,
            iconProps: {
              iconName: 'SignOut'
            },
            title: 'Sign Out',
            onClick: () => this.signout()
          }
        ],
      })
    }
  }

  private goHome(e) {
    e.preventDefault()
    this.setState({
      q: ''
      })
    history.push('/')
  }

  private showSidebarToogler() {
    return this.props.location.pathname != '/' && this.props.location.pathname != '/profile/confirm'
  }

  private showAsideToogler() {
    return this.props.location.pathname != '/' && this.props.location.pathname != '/profile/confirm'
  }

  private signout = (): void => {
    this.iamApi.logout()
      .then(res => {
        this.props.dispatchLogoutAction()
        history.push('/')
      })
  }
/*
  private toggle = (e): void =>s {
    e.preventDefault()
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  private toggleSidebar(e) {
    e.preventDefault()
    document.body.classList.toggle('sidebar-hidden')
  }

  private toggleAside(e) {
    e.preventDefault()
    document.body.classList.toggle('aside-menu-hidden')
  }
*/
}

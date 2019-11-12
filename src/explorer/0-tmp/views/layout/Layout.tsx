import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Fabric } from 'office-ui-fabric-react/lib/Fabric'
import Header from './Header'
import SideBar from './SideBar'
import Content from './Content'
import Footer from './Footer'
import FooterSmall from './FooterSmall'
import './Layout.scss'

export default class Layout extends React.Component<any, any> {

  public constructor(props) {
    super(props)
  }

  public render() {
    let showHeader = this.showHeader()
    let showFooterSmall = this.showFooterSmall()
    let showFooter = this.showFooter()
    let showSidebar = this.showSidebar()
    return (
      <Fabric className="dla-app">
        { showHeader ? 
          <div className="dla-header">
          <Switch>
            <Route path="/search/:q" name="Header" component={Header}/>
            <Route path="/" name="Header" component={Header} />
          </Switch>
          </div> : null
        }
        <div className="dla-body">
          <div className="content">
            <Route path="/" component={Content} />
          </div>
          { showSidebar ? 
            <div className="sidebar">
              <Route path="/" component={SideBar} />
            </div> : null
          } 
        </div>
        { showFooterSmall ? <Route path="/" component={FooterSmall} /> : null }
        { showFooter ? 
          <div className="dla-footer">
            <Route path="/" component={Footer} />
          </div> : null
        }
      </Fabric>
    )
  }

  private showHeader() {
    if (
        this.props.location.pathname == '/join' ||
        this.props.location.pathname == '/forgotpassword'
      ) {
        return false
      }
    return true
  }

  private showFooterSmall() {
    if (
        this.props.location.pathname == '/' ||
        this.props.location.pathname.startsWith('/search')
      ) {
        return true
      }
    return false
  }

  private showFooter() {
    if (
        this.props.location.pathname == '/' ||
        this.props.location.pathname == '/join' ||
        this.props.location.pathname == '/forgotpassword' ||
        this.props.location.pathname.startsWith('/search')
      ) {
        return false
      }
    return true
  }

  private showSidebar() {
//    return this.props.location.pathname != '/'
    return false
  }
/*
  private getPadding() {
    if (
//      this.props.location.pathname.indexOf("/osa") > -1 ||
      this.props.location.pathname == '/' ||
      this.props.location.pathname == '/profile/confirm' ||
      this.props.location.pathname == '/notebook' ||
      this.props.location.pathname == '/docs' ||
      this.props.location.pathname == '/help' || 
      this.props.location.pathname == '/osa'
    ) {
      return '0px'
    }
    return '30px'
  }
*/
}

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
      <div className="dla-footer-container">
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3 ms-textAlignLeft">
              <div className="dla-footer-div">
                <a href='#' onClick={e => {e.preventDefault(); history.push('/docs')}}>Documentation</a>
              </div>
            </div>
            <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3 ms-textAlignLeft">
              <div className="dla-footer-div">
                <a href='#' onClick={ e => { e.preventDefault(); history.push('/osa'); } }>Open Source</a>
              </div>
            </div>
            <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3 ms-textAlignLeft">
              <div className="dla-footer-div">
                <a href='#' onClick={ e => { e.preventDefault(); history.push('/tos'); } }>Terms of Service</a>
              </div>
              <div className="dla-footer-div">
                <a href='#' onClick={ e => { e.preventDefault(); history.push('/privacy'); } }>Privacy Policy</a>
              </div>
              <div className="dla-footer-div">
                <a href='#' onClick={ e => { e.preventDefault(); history.push('/gdpr'); } }>GDPR</a>
              </div>
            </div>
            <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3 ms-textAlignLeft">
              <div className="dla-footer-div">
{/*
                <a href='#' onClick={e => {e.preventDefault(); history.push('/blog')}}>Blog</a>
*/}
                <a href='https://blog.datalayer.io' target="_blank">Blog</a>
              </div>
              <div className="dla-footer-div" style={{fontWeight: 'normal'}}>
                <SocialIcon url="https://twitter.com/datalayerio" style={{ height: 25, width: 25, marginRight: 10 }} />
                <SocialIcon url="https://linkedin.com/company/datalayer" style={{ height: 25, width: 25, marginRight: 10 }} />
                <SocialIcon url="https://github.com/datalayer" style={{ height: 25, width: 25 }} />
              </div>
              <div className="dla-footer-div" style={{fontWeight: 'normal'}}>
                <span style={{marginRight: 10}}>Made with ️️❤️ by <a href='#' onClick={ e => { e.preventDefault(); history.push('/'); } }>Datalayer</a> &copy; 2019</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

import * as React from 'react'
import { connect } from 'react-redux'
import { css } from 'office-ui-fabric-react/lib/Utilities'
import history from './../../history/History'
import iris from './iris.png'
import twitter from './twitter.gif'
import { mapStateToPropsAuth, mapDispatchToPropsAuth } from './../../actions/AuthActions'
import './../../styles/Styles.scss'

@connect(mapStateToPropsAuth, mapDispatchToPropsAuth)
export default class TellMeMore extends React.Component<any, any> {

  public constructor(props) {
    super(props)
  }

  public render() {

    return (
      <>
        <div className={ css("product", "productDatalayerLight") } style={{margin: '0px'}}>
            <div>
              <div className={ "productTitle" }>Get your Notebook</div>
              <div className={ "productDescription" }>
                Get your own private JupyterLab Notebook to analyse Datasets with Python.
                You will get ease of use in a managed online service. We have curated and developed extensions such as Twitter, Google Drive, GIT... for your analysis experience to be `efficient` and `fun`.
              </div>
              <div><br/></div>
              <div className={ "ms-font-xl" }>
                <a href="" onClick={e => {e.preventDefault(); history.push('/join')}}>Create a free Account</a> or <a href="" onClick={e => {e.preventDefault(); this.props.dispatchToIamAction()}}>Log in</a> to get started.
              </div>
            </div>
            <img className={ "productImage" } src={ iris } style={{width: 500}} />
        </div>
        <div className={ css("product", "productDatalayerDark") } style={{margin: '0px'}}>
          <div>
            <div className={ "productTitle" }>Publish on Social Networks directly from the Notebook</div>
            <div className={ "productDescription" }>
              Connect and share with the world screenshots of you analysis.
              Datalayer extends JupyterLab to provide unique user experience and integrate with Twitter.
            </div>
            <div><br/></div>
            <div className={ "ms-font-xl" }>
              See what our Users <a href="" onClick={e => {e.preventDefault(); history.push('/search')}}>have already published</a>.
            </div>
          </div>
          <img className={ "productImage" } src={ twitter } style={{width: 500}} />
        </div>
      </>
     )
  }

}

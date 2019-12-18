import * as React from 'react'
import { css } from 'office-ui-fabric-react/lib/Utilities'
import collaborate from './collaborate.svg'
import pipes from './pipes.svg'
import Highlights from './Highlights'
import './../../styles/Styles.scss'

export default class FeaturesBand extends React.Component<any, any> {

  public constructor(props) {
    super(props)
  }

  public render() {
    return (
      <>
        <div className={ css("product", "productDatalayerLight") } style={{margin: '0px'}}>
          <div>
            <span className={ "productTitle" }>Collaborate</span>
            <span className={ "productDescription" }>Share your Big Data analysis with peers in a visual way.</span>
          </div>
          <img className={ "productImage" } src={ collaborate } width='496' height='300' alt='' />
        </div>
        <div className={ css("product", "productDatalayerDark") } style={{margin: '0px'}}>
          <div>
            <span className={ "productTitle" }>Enterprise ready</span>
            <span className={ "productDescription" }>Integrate with External Security Providers.</span>
          </div>
          <img className={ "productImage" } src={ pipes } width='496' height='300' alt='' />
        </div>
       <Highlights showAll="false" />
      </>
     )
  }

}

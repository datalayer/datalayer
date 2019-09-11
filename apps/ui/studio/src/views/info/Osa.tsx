import * as React from 'react'
import Highlights from './Highlights'
import './../../styles/Styles.scss'

export default class Osa extends React.Component<any, any> {

  public constructor(props) {
    super(props)
  }

  public render() {
    return (
//    <div className={`${"homeHeight"}`} style={{overflowY: 'scroll'}}>
      <div>
        <Highlights showAll="true" />
      </div>
    )
  }

  public componentDidMount() {
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
  }

}

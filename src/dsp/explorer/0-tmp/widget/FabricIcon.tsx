import * as React from 'react'

export default class FabricIcon extends React.Component<any, any> {

  public render() {
    return <span style={{marginTop: '10px'}}><i className={"ms-Icon ms-Icon--" + this.props.name}></i></span>
  }
}

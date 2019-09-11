import * as React from 'react'

export default class HtmlDisplay extends React.Component<any, any> {

  constructor(props) {
    super(props)
  }

  public render() {
    const { data } = this.props
    let html = {
      __html: data
    }
    return (
      <div dangerouslySetInnerHTML={html}/>
    )
  }

}

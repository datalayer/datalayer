import * as React from 'react'

export default class Html extends React.Component<any, any> {

  constructor(props) {
    super(props)
  }

  public render() {
    const { data } = this.props
    let html = {
      __html: data
    }
    return (
      <div>
        <div dangerouslySetInnerHTML={html}/>
      </div>
    )
  }

}

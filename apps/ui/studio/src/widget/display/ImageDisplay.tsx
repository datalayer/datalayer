import * as React from 'react'

export default class ImageDisplay extends React.Component<any, any> {

  constructor(props) {
    super(props)
  }

  public render() {
    const { data } = this.props
    return (
      <div>
        <img src={`data:image/png;base64,${data as string}`} style={{ maxWidth: '100%'}}/>
      </div>
    )
  }

}

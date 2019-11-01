import * as React from 'react'
// import * as ReactDOM from 'react-dom'
// import JSONTree from 'react-json-tree'

export default class ReactjsDisplay extends React.Component<any, any> {

  constructor(props) {
    super(props)
  }

  public render() {
//    const { data } = this.props
    return (
      <div id="root"></div>
    )
  }

  componentDidUpdate() {
//    ReactDOM.render(this.props.data as JSONTree, document.getElementById('root'))
  }

}

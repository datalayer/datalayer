import * as React from 'react'
import * as MathJax from "react-mathjax"

export default class HtmlDisplay extends React.Component<any, any> {

  constructor(props) {
    super(props)
  }

  public render() {
    const { data } = this.props
    return (
      <div>
        <MathJax.Context>
          <div>
            <MathJax.Node>{data}</MathJax.Node>
          </div>
        </MathJax.Context>        
      </div>
    )
  }

}

import * as React from 'react'
import JSONTree from 'react-json-tree'
import { jsonTreeMonokaiTheme } from './theme'

export default class JsonView extends React.Component<any, any> {

  public constructor(props) {
    super(props)
  }

  public render() {
    const { data } = this.props
    return (
      <div style={{ padding: "10px", backgroundColor: "rgb(39,40,34)" }}>
        <JSONTree
          data={data}
          theme={jsonTreeMonokaiTheme}
          invertTheme={false}
          hideRoot={true}
          // sortObjectKeys={true}
          shouldExpandNode={(keyName, data, level) => true}        
          />
      </div>
    )
  }

}

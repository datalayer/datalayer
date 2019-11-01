import * as React from 'react'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'

export default class MockContent extends React.Component<any, any> {

  state = {
    showMessageBar: true
  }

  public render() {
    const { showMessageBar } = this.state
    return (
      <div>
        {
          (showMessageBar) &&
          <MessageBar
            onDismiss={ () => this.setState({showMessageBar: false}) }
            messageBarType={ MessageBarType.warning }
          >
            Warning - This page contains mock content to get early feedback. Send comments or questions to our Twitter account <a href="https://twitter.com/datalayerio" target="_blank">@datalayerio</a>.
          </MessageBar>
        }
      </div>
    )
  }

}

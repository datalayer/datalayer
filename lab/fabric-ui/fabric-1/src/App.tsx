import * as React from 'react'
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip'

export interface IBasicColorPickerExampleState {
  color: string;
}

const styles = {
  header: {
    backgroundColor: '#ddd',
    padding: 18,
  }
}

export default class App extends React.Component<any, IBasicColorPickerExampleState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      color: '#ffffff'
    }
    this.updateColor = this.updateColor.bind(this);
  }

  public render() {
    return (
      <div>        
        <header style={ styles.header }>
          <h3>React.js Sample with Fabric UI</h3>
        </header>
        <div style={{ display: 'flex' }}>
          <ColorPicker color={this.state.color} onColorChanged={this.updateColor} />
          <div style={{ backgroundColor: this.state.color, width: 100, height: 100, margin: 16, border: '1px solid #c8c6c4' }} />
        </div>
        <div>
          <TooltipHost content="This is the tooltip" id="myID" calloutProps={{ gapSpace: 0 }} closeDelay={500}>
            <DefaultButton aria-describedby="myID">Interact with my tooltip</DefaultButton>
          </TooltipHost>
        </div>
      </div>
    )
  }

  private updateColor = (color: string): void => {
    this.setState({
      color: color
    })
  }

}

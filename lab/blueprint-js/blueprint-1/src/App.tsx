import * as React from 'react'
import { Button, Menu, MenuItem, MenuDivider, Popover, Position } from "@blueprintjs/core";
import {
  Alignment,
  Classes,
  H5,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Switch,
} from "@blueprintjs/core";
import { Example, handleBooleanChange, IExampleProps } from "@blueprintjs/docs-theme";

const menu = (
    <Menu>
        <MenuItem text="New" />
        <MenuItem text="Open" />
        <MenuItem text="Save" />
        <MenuDivider />
        <MenuItem text="Settings..." />
    </Menu>
)

export interface INavbarExampleState {
  alignRight: boolean;
}

const styles = {
  header: {
    backgroundColor: '#ddd',
    padding: 18,
  }
}

export default class App extends React.Component<IExampleProps, INavbarExampleState> {
  public state: INavbarExampleState = {
    alignRight: false,
  }; 
  public constructor(props: any) {
    super(props);
  }

  public render() {
    const { alignRight } = this.state;
    const options = (
        <>
            <H5>Props</H5>
            <Switch checked={alignRight} label="Align right" onChange={this.handleAlignRightChange} />
        </>
    );
    return (
      <div>        
        <header style={ styles.header }>
          <h3>React.js Sample with Typescript</h3>
        </header>
        <Example options={options} {...this.props}>
            <Navbar>
                <NavbarGroup align={alignRight ? Alignment.RIGHT : Alignment.LEFT}>
                    <NavbarHeading>Blueprint</NavbarHeading>
                    <NavbarDivider />
                    <Button className={Classes.MINIMAL} icon="home" text="Home" />
                    <Button className={Classes.MINIMAL} icon="document" text="Files" />
                </NavbarGroup>
            </Navbar>
        </Example>
        <div style={{ display: 'flex' }}>
          <Menu>
            <MenuItem text="Submenu">
                <MenuItem text="Child one" />
                <MenuItem text="Child two" />
                <MenuItem text="Child three" />
            </MenuItem>
          </Menu>
          <Popover content={menu} position={Position.BOTTOM}>
            <Button text="Actions" />
          </Popover>
        </div>
      </div>
    )
  }

  private handleAlignRightChange = handleBooleanChange(alignRight => this.setState({ alignRight }));


}

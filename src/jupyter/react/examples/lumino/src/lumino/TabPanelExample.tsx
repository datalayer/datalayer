
import React from "react";
import { 
  TabPanelReact, 
  LuminoAdapter
} from "@jupyter-react/lumino-adapter/lib";

import "./../../style/example.scss";

class TabPanelExample extends React.Component<{}, any> {

  render() {
    return (
      <div className="Example">
        <h1>Tab Panel</h1>
        <TabPanelReact 
          sizes={[0.2, 0.4, 0.4]}
          options={{
          }}
          style={{
            width: "500px",
            height: "100px",
            border: "solid 1px black"
          }}>
          <LuminoAdapter title={{label: "Tab1"}}>
            <p>Hello</p>
          </LuminoAdapter>
          <LuminoAdapter title={{label: "Tab2"}}>
            <h1>Again</h1>
          </LuminoAdapter>
        </TabPanelReact>
      </div>
    );
  }

}

export default TabPanelExample;


import React from "react";

import { BoxPanelReact } from "@jupyter-react/lumino-adapter/lib";
import { SplitPanelReact } from "@jupyter-react/lumino-adapter/lib";
import { LuminoAdapter } from "@jupyter-react/lumino-adapter/lib";
import { childStyle } from "@jupyter-react/lumino-adapter/lib";

import "./../../style/example.scss";

class SplitPanelExample extends React.Component<{}, any> {

  render() {
    return (
      <div className="Example">
        <h1>Split Panel</h1>
        <SplitPanelReact 
          sizes={[0.2, 0.4, 0.4]}
          options={{
            orientation: "horizontal"
          }}
          style={{
            width: "500px",
            height: "200px",
            border: "solid 1px black"
          }}>
            <LuminoAdapter>
              <div className=""
                style={{
                  backgroundColor: "red",
                  ...childStyle
                }}>
                <p>Hello</p>
              </div>
            </LuminoAdapter>
            <LuminoAdapter>
              <h1>Middle</h1>
            </LuminoAdapter>
            <BoxPanelReact options={{direction: "top-to-bottom"}}>
              <LuminoAdapter>
                <h1>Hello2</h1>
              </LuminoAdapter>
              <LuminoAdapter>
                <h1>Again</h1>
              </LuminoAdapter>
            </BoxPanelReact>
          </SplitPanelReact>
      </div>
    );
  }
}

export default SplitPanelExample;

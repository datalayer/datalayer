
import React from "react";

import { BoxPanelReact } from "@jupyter-react/lumino-adapter/lib";

import MultipleDocksExample from "./MultipleDocksExample";

import "./../../style/example.scss";

export default class BoxPanelExample extends React.Component<{}, any> {

  render() {
    return (
      <div className="Example">
        <h1>Box Panel</h1>
        <BoxPanelReact options={{direction: "top-to-bottom"}}>
          <MultipleDocksExample/>
        </BoxPanelReact>
      </div>
    );
  }
}

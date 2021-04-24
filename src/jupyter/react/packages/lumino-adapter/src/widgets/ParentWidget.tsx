
import React from "react";

import { Widget } from "@lumino/widgets";

export const ParentWidgetContext = React.createContext<any>(null);

export interface IParentWidget {
  receiveChild: (child: Widget) => void;
}

export const childStyle: React.CSSProperties = {
  position: "absolute",
  left: "0px",
  right: "0px",
  top: "0px",
  bottom: "0px"
};

export function setHostStyle(node: HTMLElement) {
  node.style.position = "absolute";
  node.style.left = "0px";
  node.style.right = "0px";
  node.style.top = "0px";
  node.style.bottom = "0px";
}

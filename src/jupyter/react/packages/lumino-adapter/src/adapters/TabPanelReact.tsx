
import { TabPanel } from "@lumino/widgets";

import BaseLuminoReact from "../widgets/BaseLuminoReact";

import "@lumino/widgets/style/tabpanel.css";

interface TabPanelReactProps {
  sizes?: number[];
}

export default class TabPanelReact extends BaseLuminoReact<TabPanel, TabPanel.IOptions, TabPanelReactProps> {
  constructor(props) {
    super(props);
    this.containerWidget = new TabPanel(props.options || {});
    this.optionKeys = ["tabPlacement", "tabsMovable"];
  }
}

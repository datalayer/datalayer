
import { BoxPanel } from "@lumino/widgets";

import BaseLuminoReact from "../widgets/BaseLuminoReact";

interface BoxPanelReactProps {
}

export default class BoxPanelReact extends BaseLuminoReact<BoxPanel, BoxPanel.IOptions, BoxPanelReactProps> {
  constructor(props) {
    super(props);
    this.containerWidget = new BoxPanel(props.options || {});
    this.optionKeys = ["alignment", "layout", "direction", "spacing"];
  }
}

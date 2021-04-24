
import { CustomPanel } from "./custompanel";

import BaseLuminoReact from "../widgets/BaseLuminoReact";

interface CustomPanelReactProps {
}

export default class CustomPanelReact extends BaseLuminoReact<CustomPanel, CustomPanel.IOptions, CustomPanelReactProps> {
  constructor(props) {
    super(props);
    this.containerWidget = new CustomPanel(props.options || {});
    this.optionKeys = ["alignment", "layout", "direction", "spacing"];
  }
}

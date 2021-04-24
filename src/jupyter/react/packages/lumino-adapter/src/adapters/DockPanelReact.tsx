
import { DockPanel } from "@lumino/widgets";

import BaseLuminoReact from "../widgets/BaseLuminoReact";

import "@lumino/widgets/style/dockpanel.css";

interface DockPanelReactProps {
  sizes?: number[];
}

export default class DockPanelReact extends BaseLuminoReact<DockPanel, DockPanel.IOptions, DockPanelReactProps> {

  constructor(props) {
    super(props);
    this.containerWidget = new DockPanel(props.options || {});
    // TODO: Typecheck this.
    // NOTE: "renderer" is not included because it's a read-only property.
    this.optionKeys = ["spacing"];
  }

  attach() {
    super.attach();
  }

}

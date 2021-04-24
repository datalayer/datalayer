
import { SplitPanel } from "@lumino/widgets";

import BaseLuminoReact from "../widgets/BaseLuminoReact";

import "@lumino/widgets/style/splitpanel.css";

interface SplitPanelReactProps {
  sizes?: number[];
}

export default class SplitPanelReact extends BaseLuminoReact<SplitPanel, SplitPanel.IOptions, SplitPanelReactProps> {

  constructor(props) {
    super(props);
    this.containerWidget = new SplitPanel(props.options || {});
    // TODO: Typecheck this.
    // NOTE: "renderer" is not included because it's a read-only property.
    this.optionKeys = ["alignment", "layout", "orientation", "spacing"];
  }

  attach() {
    super.attach();
    if (this.props.sizes) this.containerWidget.setRelativeSizes(this.props.sizes);
  }

}

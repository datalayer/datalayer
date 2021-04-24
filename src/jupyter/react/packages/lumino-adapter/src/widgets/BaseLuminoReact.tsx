
import React from "react";
import { Widget } from "@lumino/widgets";
import { childStyle, setHostStyle, IParentWidget, ParentWidgetContext } from "./ParentWidget";

interface BaseLuminoReactProps<T, O> {
  className?: string;
  style?: React.CSSProperties;
  options?: Partial<O>;
}

interface AddWidget {
  addWidget(widget: Widget);
}

export default class BaseLuminoReact<T extends Widget & AddWidget, O, P> extends React.PureComponent<BaseLuminoReactProps<T, O> & P, {}> {
  protected containerWidget: T;
  private elem: HTMLDivElement | null;
  private parentWidget: IParentWidget;
  protected optionKeys: (keyof O)[];

  public constructor(props) {
    super(props);
    this.containerWidget = props.containerWidget;
    this.optionKeys = props.optionsKeys;
    this.elem = props.elem;
    this.parentWidget = props.parentWidget;
  }

  public render() {
    return (
      <div className={this.props.className || ""}
        style={{
          position: "relative",
          ...(this.props.style || {})
        }}>
        <div ref={(c) => this.elem = c} style={childStyle} />
        <ParentWidgetContext.Consumer>
          {(value) => {
            this.parentWidget = value;
            return null;
          }}
        </ParentWidgetContext.Consumer>
        <ParentWidgetContext.Provider value={this}>
          {this.props.children}
        </ParentWidgetContext.Provider>
      </div>
    );
  }
  public componentDidMount() {
    this.attach();
  }

  public componentDidUpdate(prevProps: BaseLuminoReactProps<T, O>) {
    // TODO: use ts-transformer-keys : keys<....IOptions>();
    for (let k of this.optionKeys) {
      if ((prevProps.options || {})[k as any] !== (this.props.options || {})[k as any]) {
        if (this.props.options) {
          this.containerWidget[k as any] = this.props.options[k as any];
        }
      }
    }
    this.attach();
  }

  protected attach() {
    // If we have a parent, attach to it and render using portals.
    if (this.parentWidget) {
      this.parentWidget.receiveChild(this.containerWidget);
    } else {
      // Otherwise, attach to our own React DOM node.
      setHostStyle(this.containerWidget.node);
      if (!this.containerWidget.isAttached) {
        if (this.elem) {
          Widget.attach(this.containerWidget, this.elem);
        }
      }
    }
  }

  protected receiveChild(child: Widget) {
    this.containerWidget.addWidget(child);
  }

}

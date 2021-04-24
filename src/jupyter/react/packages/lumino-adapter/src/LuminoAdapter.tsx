
import React from 'react';
import { createPortal } from 'react-dom';
import { Widget, Title } from '@lumino/widgets';
import { ParentWidgetContext, IParentWidget } from './widgets/ParentWidget';

import '@lumino/widgets/style/widget.css';

export interface ILuminoAdapterProps {
  title?: Partial<Title.IOptions<Widget>>;
}

export interface ILuminoAdapterState {
  height: string;
}

export default class LuminoAdapter<P> extends React.PureComponent<ILuminoAdapterProps & P, ILuminoAdapterState> {
  protected widget: Widget;
  protected parentWidget: IParentWidget;

  public constructor(props: any) {
    super(props);
    this.widget = new Widget();
    this.widget.id = 'lumino-adapter-id';
    this.setTitleKeys(this.widget, {}, props);
    this.parentWidget = props.parentWidget;
    this.state = { height: '150px' };
  }

  public render() {
    const portal = createPortal(
      <div>
        <div>
          <ParentWidgetContext.Consumer>
            {(value) => {
              this.parentWidget = value;
              return null; 
            }}
          </ParentWidgetContext.Consumer>
        </div>
        { this.props.children }
      </div>
      ,
      this.widget.node
    );
    this.widget.node.style.height = this.state.height;
    if (this.parentWidget) {
      (this.parentWidget as any).containerWidget.node.style.height = this.state.height;
    }
    return <div style={{ height: this.state.height }}>{portal}</div>
  }

  public componentDidMount() {
    if (!this.parentWidget) {
      throw new Error('LuminoAdapter must be wrapped in a container component (BoxPanel, SplitPanel, etc.)');
    }
    this.parentWidget.receiveChild(this.widget);
  }

  public componentDidUpdate(prevProps: ILuminoAdapterProps & P) {
    this.setTitleKeys(this.widget, prevProps, this.props);
  }

  private setTitleKeys(widget: Widget, prevProps: ILuminoAdapterProps, props: ILuminoAdapterProps & P) {
    let titleKeys: (keyof Title.IOptions<Widget>)[] = [
      'caption',
      'className',
      'closable',
      'dataset',
      'icon',
      'iconClass',
      'iconLabel',
      'label',
      'mnemonic'
    ];
    for (let k of titleKeys) {
      if ((prevProps.title || {})[k as any] !== (props.title || {})[k as any]) {
        if (props.title) {
          widget.title[k as any] = props.title[k as any];
        }
      }
    }
  }

}

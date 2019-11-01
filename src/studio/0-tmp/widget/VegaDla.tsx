import * as React from 'react'
import * as vega from 'vega'
import { capitalize, isDefined } from '../util/ExplorerUtil'

export interface VegaProps {
  className: string,
  style: any,
  spec: any,
  logLevel: number,
  width: number,
  height: number,
  background: string,
  padding: any,
  renderer: string,
  enableHover: boolean,
  data: any,
  onNewView: (view) => {},
  onParseError: (ex) => {}
}

export default class VegaDla extends React.Component<any, any> {

  element: HTMLDivElement
//  element: any
  view: any

  public static defaultProps: Partial<VegaProps> = {
    className: '',
    renderer: 'svg',
    enableHover: true,
    onNewView: (view) => {return {}},
    onParseError: (ex) => {return {}}
   }
  
  public constructor(props) {
    super(props)
  }

  public render() {
    return <div
        ref={(el) => { if (el != null) this.element = el }}
        className={this.props.className}
        style={this.props.style}
      />
  }

  public componentDidMount() {
    this.createView(this.props.spec)
  }

  public componentDidUpdate(prevProps) {
/*
    if (this.props.spec !== prevProps.spec) {
      this.clearView()
      this.createView(this.props.spec)
    } else if (this.view) {
      const props = this.props
      const spec = this.props.spec
      let changed = false;

      // Update view properties
      [
        'width',
        'height',
        'renderer',
        'logLevel',
        'background',
      ]
        .filter(field => props[field] !== prevProps[field])
        .forEach((field) => {
          this.view[field](props[field])
          changed = true
        })

      if (!this.isSamePadding) {
        this.view.padding(props.padding || spec.padding)
        changed = true
      }
      // Update data
      if (spec.data && props.data) {
        spec.data.forEach((d) => {
          const oldData = prevProps.data[d.name];
          const newData = props.data[d.name];
          if (!this.isSameData(oldData, newData)) {
            this.updateData(d.name, newData);
            changed = true
          }
        })
      }
      if (props.enableHover !== prevProps.enableHover) {
        changed = true
      }
      if (changed) {
        if (props.enableHover) {
          this.view.hover()
        }
        this.view.run()
      }
    }
*/
  }

  public componentWillUnmount() {
    this.clearView()
  }

  private createView(spec) {
    if (spec) {
      const props = this.props
      // Parse the vega spec and create the view.
      try {
        if (props.data) {
          spec.data = props.data
        }
        const runtime = vega.parse(spec)
        const view = new vega.View(runtime).initialize(this.element)
        // Attach listeners onto the signals.
        if (spec.signals) {
          spec.signals.forEach((signal) => {
            view.addSignalListener(signal.name, (...args) => {
              const listener = this.props[this.listenerName(signal.name)]
              if (listener) {
                listener.apply(this, args)
              }
            })
          })
        }
        // Store the vega.View object to be used on later updates.
        this.view = view;
        [
          'width',
          'height',
          'padding',
          'renderer',
          'logLevel',
          'background',
        ].filter(field => isDefined(props[field]))
          .forEach((field) => { view[field](props[field]) })
/*
        if (spec.data && props.data) {
          spec.data
            .filter(d => props.data[d.name])
            .forEach((d) => {
              this.updateData(d.name, props.data[d.name])
            })
        }
*/
        if (props.enableHover) {
          view.hover()
        }
        view.run()
        props.onNewView(view)
      } catch (ex) {
        console.error(ex)
        this.clearView()
        props.onParseError(ex)
      }
    } else {
      this.clearView()
    }
  }

  private clearView() {
    if (this.view) {
      this.view.finalize()
      this.view = null
    }
//    this.element.childNodes=[]
  }

  private listenerName(signalName) {
    return `onSignal${capitalize(signalName)}`
  }
/*
  private updateData(name, value) {
    if (value) {
      if (isFunction(value)) {
        value(this.view.data(name))
      } else {
        this.view.change(
          name,
          vega.changeset()
            .remove(() => true)
            .insert(value)
        )
      }
    }
  }

  private isSamePadding(a, b) {
    if (isDefined(a) && isDefined(b)) {
      return a.top === b.top
        && a.left === b.left
        && a.right === b.right
        && a.bottom === b.bottom;
    }
    return a === b
  }

  private isSameData(a, b) {
    return a === b && !isFunction(a)
  }

  private isSameSpec(a, b) {
    return a === b
      || JSON.stringify(a) === JSON.stringify(b)
  }
*/
}

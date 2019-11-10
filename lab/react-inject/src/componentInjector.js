import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import InjectedComponentsContext from "./context";
// import invariant from 'invariant';

export default ({ key }) => WrappedComponent => {
  class WithComponents extends React.Component {
    static WrappedComponent = WrappedComponent;

    static displayName = `WithComponents(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      "Component"})`;

    static contextType = InjectedComponentsContext;

    state = { otherComponents: [] };

    compo = React.createRef();

    componentDidMount() {
      this.prepareComponents();
    }

    prepareComponents = () => {
      const { plugins } = this.context;

      const pluginsComponents = Object.keys(plugins).reduce((acc, current) => {
        const componentsToInject = plugins[current].injectedComponents;

        if (componentsToInject) {
          acc.push(componentsToInject);
        }

        return acc;
      }, []);

      pluginsComponents.forEach(componentsToInject => {
        componentsToInject.bind(this)();
      });
    };

    getComponents = areaName => {
      return this.state.otherComponents.filter(
        compo => compo.area === areaName
      );
    };

    setComponents = (...args) => {
      const [target, components] = args;

      if (target === key) {
        return this.setState(prevState => ({
          otherComponents: [...prevState.otherComponents, ...components]
        }));
      }
    };

    render() {
      const props = {
        ...this.props,
        ...this.state,
        setComponents: this.setComponents,
        getComponents: this.getComponents
      };

      return <WrappedComponent ref={this.compo} {...props} />;
    }
  }

  return hoistNonReactStatics(WithComponents, WrappedComponent);
};

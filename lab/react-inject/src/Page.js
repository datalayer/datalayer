import React from "react";

import InjectedComponentsContext from "./context";

import componentInjector from "./componentInjector";

class Page extends React.Component {
  static contextType = InjectedComponentsContext;

  getBottomRightComponents = () => {
    return this.props.getComponents("BottomRight").map(comp => {
      const Compo = comp.mainComponent;

      return <Compo key={comp.key} componentName="Page" />;
    });
  };

  render() {
    return (
      <div>
        Page
        {this.getBottomRightComponents()}
      </div>
    );
  }
}

Page.contextType = InjectedComponentsContext;

export default componentInjector({ key: "page" })(Page);

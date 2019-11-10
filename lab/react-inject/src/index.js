import React from "react";
import ReactDOM from "react-dom";

import Page from "./Page";
import "./styles.css";

import InjectedComponentsContext from "./context";
import injectedComponents from "./injectedComponents";

class App extends React.Component {
  render() {
    return (
      <InjectedComponentsContext.Provider
        value={{ plugins: { somePlugin: { injectedComponents } } }}
      >
        <Page />
      </InjectedComponentsContext.Provider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

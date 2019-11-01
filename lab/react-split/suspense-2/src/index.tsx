import * as React from "react";
import { render } from "react-dom";
import { ToggleCat } from "./ToggleCat";

export const App = () => {
  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
      <ToggleCat />
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);

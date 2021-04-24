import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { W1Css }  from "dspWidgets/W1";
import { Hello1 }  from "dspWidgets/Examples";
import App from "./App";
import About from "./About";

const DlaRoutes = () => (
  <BrowserRouter>
    <W1Css/>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/hello" element={<Hello1/>} />
      <Route path="/test" element={<About/>} />
    </Routes>
  </BrowserRouter>
)

render(
  <DlaRoutes />
  ,
  document.getElementById("root")
);

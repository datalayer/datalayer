import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import DlaPricing from "./pricing/DlaPricing";
import DlaPreFooter from "./prefooter/DlaPreFooter";
import DlaFooter from "./footer/DlaFooter";

import "./assets/scss/material-kit-pro-react.scss?v=1.8.0";
import "./assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
{/*
    <Switch>
*/}
      <Route path="/" component={DlaPricing} />
      <Route path="/" component={DlaPreFooter} />
      <Route path="/" component={DlaFooter} />
{/*
    </Switch>
*/}
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export {default as HelloOne} from './example/HelloOne';
export {default as HelloTwo} from './example/HelloTwo';

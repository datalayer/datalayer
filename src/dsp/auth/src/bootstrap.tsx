import React, { Suspense } from "react";
import { render } from "react-dom";
import lazy from "./utils/Lazy";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import AuthContextProvider from "./auth/AuthContextProvider";
// import { injectableStore } from './redux/injectableStore';
import store from './state/store';
import { setAuthServer, setJupyterpoolBaseUrl, setJupyterpoolWsUrl, setLibraryServer } from './config/AuthConfig';
// import { W1Css }  from "dspWidgets/W1";
// import CompositeAppWithStore from "./components/examples/CompositeAppWithStore"
// import { DlaFeatures1, DlaOverview1 } from "dspWidgets/Widgets";
// import AuthProfileExample from "./components/examples/AuthProfileExample";
import Header from "./components/Header";
import AuthLayoutLanding from "./layout/AuthLayoutLanding";
// import AuthLayoutParallax from "./layout/AuthLayoutParallax";

import './../style/index.css';  

let configData = Object.create({});
const htmlConfig = document.getElementById('datalayer-config-data');
if (htmlConfig) {
  configData = JSON.parse(htmlConfig.textContent || '') as {
    [key: string]: string;
  }
  if (configData['authServer']) {
    setAuthServer(configData['authServer']);
  }
  if (configData['jupyterpoolBaseUrl']) {
    setJupyterpoolBaseUrl(configData['jupyterpoolBaseUrl']);
  }
  if (configData['jupyterpoolWsUrl']) {
    setJupyterpoolWsUrl(configData['jupyterpoolWsUrl']);
  }
  if (configData['libraryServer']) {
    setLibraryServer(configData['libraryServer']);
  }
}

const AuthLayoutParallax = lazy(() => import("./layout/AuthLayoutParallax"));

const AuthIndex = () => (
  <SnackbarProvider>
    <Provider store={store}>
      <BrowserRouter>
        <AuthContextProvider>
{/*
          <W1Css />
*/}
          <Header/>
{/*
          <CompositeAppWithStore injectableStore={injectableStore}/>
*/}
          <Routes>
            <Route path="/" element={<AuthLayoutLanding/>} />
{/*
            <Route path="/about" htmlConfigement={<DlaOverview1/>} />
            <Route path="/features" htmlConfigement={<DlaFeatures1/>} />
            <Route path="/profile/example" htmlConfigement={<AuthProfileExample/>} />
*/}
            <Route path="/*" element={<Suspense fallback=""><AuthLayoutParallax/></Suspense>} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </Provider>
  </SnackbarProvider>
);

render(
  <AuthIndex />,
  document.getElementById("root")
);

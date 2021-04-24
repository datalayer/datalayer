import React, { Suspense } from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { injectableStore, withInjectableStore } from './redux/injectableStore';
import HostApp from './components/HostApp';
import Landing from './components/Landing';
import { Hello3 } from "dspWidgets/Examples";
import { W1Css } from "dspWidgets/W1";
import { Section1 } from "dspWidgets/Examples";
import { DlaHeader, DlaFooter, DlaProfile }  from "dspWidgets/Widgets";
import { AuthFeaturesExample } from "dspAuth/Auth";
import LandingHeader from "./components/LandingHeader"
// import AuthContextProvider from "dspAuth/AuthContext";
// import { LoginForm } from "dspAuth/Auth";
import LoginForm from "dspAuth/LoginForm";
// const LoginForm = React.lazy(() => import("dspAuth/Auth").then(module => ({ default: module.LoginForm })));
/// const LoginForm = React.lazy(() => import("dspAuth/Auth"));
// import AuthContextProvider from "./auth/AuthContext";
import remoteRoutes from "dspAuth/routes";

const routes = [...remoteRoutes];

let configData = Object.create({authServer: ''});
const el = document.getElementById('datalayer-config-data');
if (el) {
  configData = JSON.parse(el.textContent || '') as {
    [key: string]: string;
  }
}

const ProfileExample = () => <>
  <DlaProfile/>
  <AuthFeaturesExample/>
</>

const LandingHome = () => {
  return (
    <SnackbarProvider>
      <Provider store={injectableStore}>
        <BrowserRouter>
          <W1Css/>
{/*
          <AuthContextProvider>
*/}
          <Routes>
              <Route path="/" element={<Section1/>} />
              <Route path="/test" element={<Suspense fallback="Loading...">{ withInjectableStore(HostApp, injectableStore) }</Suspense>}/>
              <Route path="/api/landing" element={<Hello3/>} />
              <Route path="/api/landing/about" element={<Section1/>} />
              <Route path="/api/landing/app" element={<Landing/>} />
              <Route path="/api/landing/example" element={<ProfileExample/>} />
              <Route path="/api/landing/sections" element={<Section1/>} />
              <Route path="/api/landing/header" element={<LandingHeader/>} />
              <Route path="/api/landing/header2" element={<DlaHeader/>} />
              <Route path="/api/auth" element={<ProfileExample/>} />
              <Route path="/api/auth/login" element={<LoginForm/>} />
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component/>}
                />
              ))}
              <Route path="*" element={ <DlaFooter/>} />
            </Routes>
{/*
          </AuthContextProvider>
*/}
        </BrowserRouter>
      </Provider>
    </SnackbarProvider>
  );
}

render(
  <LandingHome/>,
  document.getElementById('root')
);

import React from "react";
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { injectableStore } from './redux/injectableStore';
import StudioAppExample from './examples/StudioAppExample';
import { Hello3 } from "dspWidgets/Examples";
import { Sections } from "dspWidgets/Examples";
import { DlaHeader, DlaFooter, DlaProfile }  from "dspWidgets/Widgets";
import { W1Css } from "dspWidgets/W1";
import { AuthFeaturesExample } from "dspAuth/Auth";

const ProfileExample = () => <>
  <DlaProfile/>
  <AuthFeaturesExample/>
</>

const Index = () => (
  <BrowserRouter>
    <W1Css/>
    <Routes>
      <Route path="/*/*" element={<DlaHeader/>} />
      <Route path="/api/studio" element={<Hello3/>} />
      <Route path="/api/studio/app" element={<StudioAppExample/>} />
      <Route path="/api/studio/example" element={<ProfileExample/>} />
      <Route path="/api/studio/sections" element={<Sections/>} />
      <Route path="/about" element={<Sections/>} />
      <Route path="*" element={ <DlaFooter/>} />
    </Routes>
  </BrowserRouter>
);

render(
  <Provider store={injectableStore}>
    <Index />
  </Provider>,
  document.getElementById('root')
);

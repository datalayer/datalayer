import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { authContext } from "../auth/AuthContext";
import AuthProfileExample from "../components/examples/AuthProfileExample";
import { DlaFeatures1, DlaOverview1, DlaFooterFixed1 } from "dspWidgets/Widgets";

const AnonymousRoutes = () => (
  <Routes>
    <Route path="/about" element={<DlaOverview1/>} />
    <Route path="/features" element={<DlaFeatures1/>} />
    <Route path="/profile/example" element={<AuthProfileExample/>} />
  </Routes>
)

const AuthenticatedRoutes = () => (
  <Routes>
  </Routes>
)

const AuthLayoutFullScreen = () => {
  const { user } = useContext(authContext);
  return (
    <div>
      <AnonymousRoutes />
      {user && <AuthenticatedRoutes />}
      <DlaFooterFixed1/>
   </div>
  );
}

export default AuthLayoutFullScreen;

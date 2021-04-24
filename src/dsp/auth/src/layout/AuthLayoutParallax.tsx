import React, { useContext, Suspense } from "react";
import lazy from "./../utils/Lazy";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { Routes, Route } from "react-router-dom";
import TellView from "../components/tell/TellView";
import Home from "../components/Home";
import TellCards from "../components/community/TellCards";
import LoginForm from "../components/auth/LoginForm";
import Logout from "../components/auth/Logout";
import JoinForm from "../components/auth/JoinForm";
import JoinWelcome from "../components/auth/JoinWelcome";
import JoinError from "../components/auth/JoinError";
import NewPasswordForm from "../components/auth/NewPasswordForm";
import NewPasswordWelcome from "../components/auth/NewPasswordWelcome";
import NewPasswordError from "../components/auth/NewPasswordError";
import Profile from "../components/profile/Profile";
import VerticalSeparator1 from "../components/helpers/VerticalSeparator1";
import { authContext } from "../auth/AuthContext";
import { background } from "./AuthBackgrounds";
import { Parallax } from "dspWidgets/W1";
import { defaultLayoutStyle, DlaProduct1, DlaContact1, DlaFooter1, DlaTeam1 } from "dspWidgets/Widgets";

const useStyles = makeStyles( defaultLayoutStyle as any, {index: 999, classNamePrefix: 'AuthLayoutParallax'});

const Tell = lazy(() => import("../components/tell/Tell"));

const AnonymousRoutes = () => (
  <Routes>
    <Route path="/community" element={<TellCards/>} />
    <Route path="/:username/tell/:ulid/view" element={<TellView/>} />
    <Route path="/contact" element={<DlaContact1/>} />
    <Route path="/login" element={<LoginForm/>} />
    <Route path="/logout" element={<Logout/>} />
    <Route path="/product" element={<DlaProduct1/>} />
    <Route path="/team" element={<DlaTeam1/>} />
    <Route path="/join" element={<JoinForm/>} />
    <Route path="/join/welcome" element={<JoinWelcome/>} />
    <Route path="/join/error" element={<JoinError/>} />
    <Route path="/new/password" element={<NewPasswordForm/>} />
    <Route path="/new/password/welcome" element={<NewPasswordWelcome/>} />
    <Route path="/new/password/error" element={<NewPasswordError/>} />
  </Routes>
)

const AuthenticatedRoutes = () => (
  <Routes>
    <Route path="/home" element={<Home/>} />
    <Route path="/profile" element={<Profile/>} />
    <Route path="/:username/tell/:ulid" element={<Suspense fallback=""><Tell/></Suspense>} />
  </Routes>
)

const AuthLayoutParallax = () => {
  const { user } = useContext(authContext);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles({});
  return (
    <>
      <div className={classes.minContent}>
        <Parallax
          image={background}
          filter="dark"
          className={classes.parallaxSmall}
          />
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container} style={{ paddingTop: 20, paddingBottom: 40 }}>
            <AnonymousRoutes />
            {user && <AuthenticatedRoutes />}
            <VerticalSeparator1/>
          </div>
        </div>
      </div>
      <DlaFooter1/>
    </>
    );
}

export default AuthLayoutParallax;

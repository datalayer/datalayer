import React from "react";
import { useDispatch } from "react-redux";
import useAuthHook from "./AuthHook";
import { getStoredUser, getStoredToken } from "./AuthStorage";
import authContext from './AuthContext';
import { authActions } from '../state/auth'

const { Provider } = authContext;

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token, setAuthStatus, setUnauthStatus, apiRequest } = useAuthHook(getStoredUser(), getStoredToken());
  const dispatch = useDispatch();
  if (user) {
    dispatch(authActions.login.started(user));
  }
  return (
    <Provider value={{ user, token, setAuthStatus, setUnauthStatus, apiRequest }}>
      {children}
    </Provider>
  );
}

export default AuthContextProvider;

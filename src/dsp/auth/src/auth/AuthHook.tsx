import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { User, ANONYMOUS_USER, ANONYMOUS_TOKEN, NULL_USER } from "../model/AuthModel";
import { setStoredUser, setStoredToken } from "./AuthStorage";
import { authActions } from '../state/auth'

export type ApiRequest = {
  url: string;
  method: string;
  body?: {};
}

const useAuthHook = (initialUser: User | null, initialToken: string) => {
  const [state, setState] = useState({user: initialUser, token: initialToken });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setAuthStatus = (user: User, token: string) => {
    user.firstName
      ? user.displayName = user.firstName + ' ' + user.lastName
      : user.displayName = user.lastName
    setStoredUser(user);
    setStoredToken(token);
    setState({user: user, token: token});
    dispatch(authActions.login.started(user));
  };
  const setUnauthStatus = () => {
    setStoredUser(ANONYMOUS_USER);
    setStoredToken(ANONYMOUS_TOKEN);
    setState({user: ANONYMOUS_USER, token: ANONYMOUS_TOKEN });
    dispatch(authActions.logout.started(NULL_USER));
  };
  /**
   * API Request handler
   * 
   * @param url - api endpoint
   * @param method - http method
   * @param body - body parameters of request
   */
  const apiRequest =  (req: ApiRequest): Promise<any> => {
    return fetch(req.url, {
      method: req.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`
      },
      body: req.body ? JSON.stringify(req.body) : undefined
    })
    .then(resp => {
      if(resp.status != 200) {
        if (resp.status === 401) {
          setUnauthStatus();
          console.log('401 received, navigating to login page...')
          navigate('/login');
        }
        else {
          throw new Error(resp.status.toString());
        }
      }
      return resp.json()
    })
    .catch(function(error) {
      throw error;
    });
  }
  return {
    user: state.user,
    token: state.token,
    setAuthStatus: setAuthStatus,
    setUnauthStatus: setUnauthStatus,
    apiRequest: apiRequest
  }
}

export default useAuthHook;

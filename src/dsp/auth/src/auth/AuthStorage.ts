import jwt_decode from "jwt-decode";

import { User, ANONYMOUS_USER, ANONYMOUS_TOKEN } from "../model/AuthModel";

const USER_KEY = 'DLA_AUTH_USER';

const TOKEN_KEY = 'DLA_AUTH_TOKEN';

/** 
 * Return user auth from local storage value.
 */
export const getStoredUser = (): User | null => {
  const user = window.localStorage.getItem(USER_KEY);
  if (user) {
    return JSON.parse(user);
  }
  return ANONYMOUS_USER;
}

export const setStoredUser = (user: User | null) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/** 
 * Return token from local storage value.
 */
export const getStoredToken = (): string => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    return token;
  }
  return '';
}

export const setStoredToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
  if (token != ANONYMOUS_TOKEN) {
    jwt_decode<any>(token);
  }
}

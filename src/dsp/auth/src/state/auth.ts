/* State */

import { User, NULL_USER } from '../model/AuthModel'

export type IAuthState = {
  user: User;
}

export const authInitialState: IAuthState = {
  user: NULL_USER
}

/* Selectors */

import { useSelector } from "react-redux";
import { IAppState } from ".";

export const selectUser = () =>
  useSelector((state: IAppState) => state.auth.user);

/* Actions */

import actionCreatorFactory from 'typescript-fsa';

export enum ActionType {
  LOGIN = 'auth/LOGIN',
  LOGOUT = 'auth/LOGOUT'
}

const actionCreator = actionCreatorFactory('dspAuth');

export const authActions = {
  login: actionCreator.async<User, User>(
    ActionType.LOGIN
  ),
  logout: actionCreator.async<User, User>(
    ActionType.LOGOUT
  )
}

/* Epics */

import { map, tap, ignoreElements } from 'rxjs/operators';
import { combineEpics, Epic } from 'redux-observable';
import { AnyAction, Action, Success } from 'typescript-fsa';
import { ofAction } from '@datalayer/typescript-fsa-redux-observable';

const loginEpic: Epic<
  AnyAction,
  Action<Success<User, User>>,
  IAppState
> = action$ =>
  action$.pipe(
    ofAction(authActions.login.started),
    map(action => {
      return authActions.login.done({
        params: action.payload,
        result: action.payload
      })
    }
    )
  );

const logoutEpic: Epic<
  AnyAction,
  Action<Success<User, User>>,
  IAppState
> = action$ =>
  action$.pipe(
    ofAction(authActions.logout.started),
    map(action => {
      return authActions.logout.done({
        params: action.payload,
        result: action.payload
      })
    }
    )
  );

const loggingEpic: Epic<
  AnyAction,
  AnyAction,
  IAppState
> = action$ =>
  action$
    .pipe(
      ofAction(
        authActions.login.started,
        authActions.login.failed,
        authActions.login.done,
        authActions.logout.started,
        authActions.logout.failed,
        authActions.logout.done,
      ),
      tap(action => console.log(action.type, action.payload)),
      ignoreElements()
    );

export const authEpics = combineEpics(
  loginEpic,
  logoutEpic,
//  loggingEpic,
);

/* Reducers */

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export const authReducer = reducerWithInitialState(authInitialState)
  .case(authActions.login.done, (state: IAuthState, payload: Success<User, User>) => ({
      ...state,
      user: payload.result
  }))
  .case(authActions.logout.done, (state: IAuthState, payload: Success<User, User>) => ({
      ...state,
      user: payload.result
  }));

export default { authActions, authEpics, authReducer };

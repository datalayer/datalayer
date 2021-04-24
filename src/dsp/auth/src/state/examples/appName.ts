/* State */

export type IAppNameState = {
  appName: string;
}

export const appNameInitialState: IAppNameState = {
  appName: 'RemoteApp Name'
}

/* Selectors */

/* Actions */

import actionCreatorFactory from 'typescript-fsa';

export enum ActionType {
  CHANGE_APP_NAME = 'appName/CHANGE_APP_NAME'
}

const actionCreator = actionCreatorFactory('dspAuth');

export const appNameActions = {
  change: actionCreator.async<string, string>(
    ActionType.CHANGE_APP_NAME
  )
}

/* Epics */

import { map, tap, ignoreElements } from 'rxjs/operators';
import { combineEpics, Epic } from 'redux-observable';
import { AnyAction, Action, Success } from 'typescript-fsa';
import { ofAction } from '@datalayer/typescript-fsa-redux-observable';
import { IAppState } from './../index';

const chageAppNameEpic: Epic<
  AnyAction,
  Action<Success<string, string>>,
  IAppState
> = action$ =>
  action$.pipe(
    ofAction(appNameActions.change.started),
    map(action => {
      return appNameActions.change.done({
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
      ofAction(appNameActions.change.started),
      tap(action => console.log(action.type)),
      ignoreElements()
    );

export const appNameEpics = combineEpics(
  chageAppNameEpic,
  loggingEpic,
);

/* Reducers */

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export const appNameReducer = reducerWithInitialState(appNameInitialState)
  .case(appNameActions.change.done, (state: IAppNameState, payload: Success<string, string>) => {
    return {
      ...state,
      appName: payload.result
  }
});

export default { appNameReducer, appNameActions, appNameEpics };

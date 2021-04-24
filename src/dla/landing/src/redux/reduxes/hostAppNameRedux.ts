/* State */

export type IAppNameState = {
  appName: string;
}

export const appNameInitialState: IAppNameState = {
  appName: 'HostApp Name'
}

/* Selectors */

/* Actions */

import actionCreatorFactory from 'typescript-fsa';

export enum ActionType {
  CHANGE_APP_NAME = 'appName/CHANGE_APP_NAME'
}

const actionCreator = actionCreatorFactory('dlaLanding');

export const hostAppNameActions = {
  change: actionCreator.async<string, string>(
    ActionType.CHANGE_APP_NAME
  )
}

/* Epics */

import { map, tap, ignoreElements } from 'rxjs/operators';
import { combineEpics, Epic } from 'redux-observable';
import { AnyAction, Action, Success } from 'typescript-fsa';
import { ofAction } from '@datalayer/typescript-fsa-redux-observable';

const changeHostAppNameEpic: Epic<
  AnyAction,
  Action<Success<string, string>>,
  IAppNameState
> = action$ =>
  action$.pipe(
    ofAction(hostAppNameActions.change.started),
    map(action => {
      return hostAppNameActions.change.done({
        params: (action as any).payload,
        result: (action as any).payload
      })
    }
    )
  );

const loggingEpic: Epic<
  AnyAction,
  AnyAction,
  IAppNameState
> = action$ =>
  action$
    .pipe(
      ofAction(hostAppNameActions.change.started),
      tap(action => console.log(action.type)),
      ignoreElements()
    );

export const hostAppNameEpics = combineEpics(
  changeHostAppNameEpic,
  loggingEpic,
);

/* Reducers */

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export const hostAppNameReducer = reducerWithInitialState(appNameInitialState)
  .case(hostAppNameActions.change.done, (state: IAppNameState, payload: Success<string, string>) => {
    return {
      ...state,
      appName: payload.result
  }
});

export const hostReducers = {
  appName: hostAppNameReducer
}

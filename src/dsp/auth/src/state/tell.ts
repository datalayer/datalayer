/* State */

import { Tell, NULL_TELL } from './../model/TellModel'

export type ITellState = {
  tell: Tell;
}

export const tellInitialState: ITellState = {
  tell: NULL_TELL
}

/* Selectors */

import { useSelector } from "react-redux";
import { IAppState } from ".";

export const selectTell = () =>
  useSelector((state: IAppState) => state.tell.tell);

/* Actions */

import actionCreatorFactory from 'typescript-fsa';

export enum ActionType {
  CREATE = 'tell/CREATE',
  UPDATE = 'tell/UPDATE'
}

const actionCreator = actionCreatorFactory('dspAuth');

export const tellActions = {
  create: actionCreator.async<Tell, Tell>(
    ActionType.CREATE
  ),
  update: actionCreator.async<Partial<Tell>, Partial<Tell>>(
    ActionType.UPDATE
  )
}

/* Epics */

import { map, tap, ignoreElements } from 'rxjs/operators';
import { combineEpics, Epic } from 'redux-observable';
import { AnyAction, Action, Success } from 'typescript-fsa';
import { ofAction } from '@datalayer/typescript-fsa-redux-observable';

const createEpic: Epic<
  AnyAction,
  Action<Success<Tell, Tell>>,
  IAppState
> = action$ =>
  action$.pipe(
    ofAction(tellActions.create.started),
    map(action => {
      return tellActions.create.done({
        params: action.payload,
        result: action.payload
      })
    }
    )
  );

const updateEpic: Epic<
  AnyAction,
  Action<Success<Partial<Tell>, Partial<Tell>>>,
  IAppState
> = action$ =>
  action$.pipe(
    ofAction(tellActions.update.started),
    map(action => {
      return tellActions.update.done({
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
        tellActions.create.started,
        tellActions.create.failed,
        tellActions.create.done,
        tellActions.update.started,
        tellActions.update.failed,
        tellActions.update.done,
      ),
      tap(action => console.log(action.type, action.payload)),
      ignoreElements()
    );

export const tellEpics = combineEpics(
  createEpic,
  updateEpic,
//  loggingEpic,
);

/* Reducers */

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export const tellReducer = reducerWithInitialState(tellInitialState)
  .case(tellActions.create.done, (state: ITellState, payload: Success<Tell, Tell>) => { 
    return ({
      ...state,
      tell: payload.result
   })
  })
  .case(tellActions.update.done, (state: ITellState, payload: Success<Partial<Tell>, Partial<Tell>>) => ({
      ...state,
      tell: {
        ...state.tell,
        ...payload.result
      }
  }));

export default { tellActions, tellEpics, tellReducer };

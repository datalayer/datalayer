import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { authEpics, authInitialState, authReducer, IAuthState } from "./auth";
import { tellEpics, tellInitialState, tellReducer, ITellState } from "./tell";
import { appNameReducer, IAppNameState, appNameInitialState, appNameEpics } from './examples/appName';
import { counterReducer, ICounterState, counterEpics, counterInitialState } from './examples/counter';

/* State */

export type IAppState = {
  auth: IAuthState;
  tell: ITellState;
  appName: IAppNameState;
  counter: ICounterState;
}

export const initialState: IAppState = {
  auth: authInitialState,
  tell: tellInitialState,
  appName: appNameInitialState,
  counter: counterInitialState,
}

/* Actions */
/*
export type ActionUnion<
  A extends { [actionCreator: string]: (...args: any[]) => any; }
> = Exclude<ReturnType<A[keyof A]>, (...args: any[]) => Promise<void>>;

export type AuthAction = ActionUnion<typeof authActions>;
export type AppNameAction = ActionUnion<typeof appNameActions>;
export type CounterAction = ActionUnion<typeof counterActions>;

export type AppAction = AuthAction | AppNameAction | CounterAction | Counter2Action;
*/
/* Epics */

export const epics = combineEpics(
  authEpics,
  tellEpics,
  appNameEpics,
  counterEpics,
)

/* Reducers */

export const reducers = combineReducers<IAppState>({
  auth: authReducer,
  tell: tellReducer,
  appName: appNameReducer,
  counter: counterReducer,
})

import React, { useEffect } from 'react';
import { Provider} from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { AnyAction } from 'typescript-fsa';
import { appNameReducer, appNameEpics } from './examples/appName';
import { counterReducer, counterEpics } from './examples/counter';
import { authEpics, authReducer } from './auth';
import { tellEpics, tellReducer } from './tell';
import { reducers as hostReducers, epics } from './index';

function createReducer(asyncReducers) {
  return combineReducers({
    ...hostReducers,
    ...asyncReducers
  });
}

function createInjectableStore() {
  const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, any, any>();
  const store = createStore(
    createReducer({}),
    applyMiddleware(epicMiddleware),
  );
  (store as any).asyncReducers = {};
  (store as any).injectReducer = (key, asyncReducer) => {
    (store as any).asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer((store as any).asyncReducers));
  }
  (store as any).injectEpic = epic => {
    epicMiddleware.run(epic);
  }
  epicMiddleware.run(epics);
  return store;
}

export const injectableStore = createInjectableStore();

export const AUTH_SCOPE = 'AUTH';
export const TELL_SCOPE = 'TELL';
export const APP_NAME_SCOPE = 'APP_NAME';
export const COUNTER_SCOPE = 'COUNTER';
export const COUNTER_SCOPE_2 = 'COUNTER_2';

export const withInjectableStore = (Component, injectableStore) => {
  useEffect(() => {
    injectableStore.injectReducer(AUTH_SCOPE, authReducer);
    injectableStore.injectEpic(authEpics);
    injectableStore.injectReducer(TELL_SCOPE, tellReducer);
    injectableStore.injectEpic(tellEpics);
    injectableStore.injectReducer(APP_NAME_SCOPE, appNameReducer);
    injectableStore.injectEpic(appNameEpics);
    injectableStore.injectReducer(COUNTER_SCOPE, counterReducer);
    injectableStore.injectEpic(counterEpics);
  }, []);
  return <Provider store={injectableStore}>
      <Component injectableStore={injectableStore} />
    </Provider>
}

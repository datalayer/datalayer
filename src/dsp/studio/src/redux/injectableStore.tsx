import React, { useEffect } from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider} from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { AnyAction } from 'typescript-fsa';
import { hostReducers, hostAppNameReducer, hostAppNameEpics } from './reduxes/hostAppNameRedux';

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
    applyMiddleware(epicMiddleware)
  );
  (store as any).asyncReducers = {};
  (store as any).injectReducer = (key, asyncReducer) => {
    (store as any).asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer((store as any).asyncReducers));
  }
  (store as any).injectEpic = epic => {
    epicMiddleware.run(epic);
  }
  return store;
}

export const injectableStore = createInjectableStore();

export const HOST_APP_NAME_SCOPE = 'HOST_APP_NAME';

export const withInjectableStore = (Component, injectableStore) => {
  useEffect(() => {
    injectableStore.injectReducer(HOST_APP_NAME_SCOPE, hostAppNameReducer);
    injectableStore.injectEpic(hostAppNameEpics);
  }, []);
  return <Provider store={injectableStore}>
      <Component injectableStore={injectableStore} />
    </Provider>
}

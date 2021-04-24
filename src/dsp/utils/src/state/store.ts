import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { epics, reducers } from ".";

export interface IAction {
  payload: {
    userId: string
  }
}

export interface IPost {
  id: string
}

export interface IState {
  user: {
    selectedUserId: string
  },
  post: {
    selectedUserId: string,
    isLoading: boolean,
    posts: Array<IPost>
  }
}

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(
    reducers,
    compose(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(epics);
  return store;
}

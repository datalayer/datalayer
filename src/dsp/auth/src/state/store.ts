import { applyMiddleware, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { AnyAction } from "typescript-fsa";
import { epics, reducers } from "./index";

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, any, any>();
const store = createStore(
  reducers,
  applyMiddleware(epicMiddleware)
);
epicMiddleware.run(epics);

export default store;

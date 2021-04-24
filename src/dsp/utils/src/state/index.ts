import { combineEpics } from "redux-observable";
import { combineReducers } from "redux";

import user, { fetchUserListEpic } from "./user";
import post, { fetchPostListEpic } from "./post";

export const epics = combineEpics(fetchUserListEpic, fetchPostListEpic);

export const reducers = combineReducers({ user, post });

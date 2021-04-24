import { ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { switchMap, map, delay } from "rxjs/operators";

import { IAction } from "./store"

export const FETCH_POST_LIST = "post/FETCH_POST_LIST";
export const FETCH_POST_LIST_SUCCESS = "post/FETCH_POST_LIST_SUCCESS";

export const fetchPostList = (userId: number) => ({
  type: FETCH_POST_LIST,
  payload: { userId }
});

export const fetchPostListEpic = (action$, state$) =>
  action$.pipe(
    ofType(FETCH_POST_LIST),
    // to simulate a slow connection
    delay(1000),
    switchMap((action: IAction) => {
      const { userId } = action.payload;
      return ajax
        .getJSON(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .pipe(
          map(posts => ({
            type: FETCH_POST_LIST_SUCCESS,
            payload: { posts }
          }))
        );
    })
  );

export default function postReudcer(state = [], action) {
  switch (action.type) {
    case FETCH_POST_LIST:
      return { ...state, isLoading: true };
    case FETCH_POST_LIST_SUCCESS:
      return { ...state, ...action.payload, isLoading: false };
    default:
      return state;
  }

}

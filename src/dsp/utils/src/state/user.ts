import { ofType } from "redux-observable";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { switchMap, map, catchError } from "rxjs/operators";

const initialState = [
  {
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: ""
      }
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    }
  }
];

export type UserState = typeof initialState;

export const SELECT_USER = "user/SELECT_USER";
export const FETCH_USER = "user/FETCH_USER";
export const FETCH_USER_SUCCESS = "user/FETCH_USER_SUCCESS";
export const FETCH_USER_ERROR = "user/FETCH_USER_ERROR";

export const selectUser = selectedUserId => ({
  type: SELECT_USER,
  payload: { selectedUserId }
});
export const fetchUserList = () => ({ type: FETCH_USER });

export const fetchUserListEpic = action$ =>
  action$.pipe(
    ofType(FETCH_USER),
    switchMap(() =>
      ajax.getJSON(`https://jsonplaceholder.typicode.com/users`).pipe(
        map(payload => ({ type: FETCH_USER_SUCCESS, payload })),
        catchError(error => of({ type: FETCH_USER_ERROR, payload: { error } }))
      )
    )
  );

export default function userReducer(
  state: UserState = initialState,
  action: any
) {
  switch (action.type) {
    case SELECT_USER:
      return { ...state, selectedUserId: action.payload.selectedUserId };
    case FETCH_USER_SUCCESS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
}

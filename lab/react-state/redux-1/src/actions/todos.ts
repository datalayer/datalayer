import { Dispatch } from 'redux';
import axios from 'axios';
import { ActionTypes } from './actionTypes';
import { Todo } from '../reducers/index';

export interface FetchTodosAction {
  type: ActionTypes.fetchTodos;
  payload: Todo[];
}

export interface DeleteTodoAction {
  type: ActionTypes.deleteTodo;
  payload: number;
}

const url = 'https://jsonplaceholder.typicode.com/todos';

function delay(s: number) {
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}

export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    dispatch<FetchTodosAction>({
      type: ActionTypes.fetchTodos,
      payload: []
    });
    const response = await axios.get<Todo[]>(url); // shows that we're expecting an array of Todos implementing the Todo interface
    const s = Math.floor(Math.random() * 6) + 1  
    await delay(s);
    dispatch<FetchTodosAction>({
      type: ActionTypes.fetchTodos,
      payload: response.data
    });
  };
};

export const deleteTodo = (id: number): DeleteTodoAction => {
  return {
    type: ActionTypes.deleteTodo,
    payload: id
  };
};

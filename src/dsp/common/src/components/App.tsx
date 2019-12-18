import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, deleteTodo } from '../actions';
import { Todo, StoreState } from '../reducers';

export const App: React.FC = () => {

  // Create some local state with useState that will tell us if our fetch result is still loading.
  const [fetching, setFetching] = useState(false);

  // Redux hook that grabs a piece of the store (like mapStateToProps).
  const todos = useSelector((state: StoreState) => state.todos);

  // Redux hook to get dispatch function. this is the alternative to using connect() with no second argument
  // which gives dispatch passed into this component automatically as a prop.
  const dispatch = useDispatch();

  // React hook that is called whenever todos.length is changed
  useEffect(() => {
    if (todos.length) {
      setFetching(false);
    }
  }, [todos.length]);

  // Create an array of buttons that dispatch the deleteTodo action onClick.
  const curTodos = todos.map((todo: Todo) => (
    <button
      key={todo.id}
      style={{ border: '1px solid black' }}
      onClick={() => dispatch(deleteTodo(todo.id))}>
      {todo.title}
    </button>
  ));

  // The first button below dispatches the fetchTodos action and makes the LOADING text display while it's fetching.
  return (
    <div>
      <button
        onClick={() => {
          dispatch(fetchTodos());
          setFetching(true);
        }}>
        fetch data !
      </button>
      {fetching ? 'LOADING' : null}
      {curTodos}
    </div>
  );
};

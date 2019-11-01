import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {App} from './App';
import { reducers } from './../reducers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createStore(reducers, applyMiddleware(thunk));
  ReactDOM.render(
    <Provider store={store}>
      {' '}
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

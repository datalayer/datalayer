import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import ButtonSubmit from './buttons'

export const Greeter = (name: string) => `Hello ${name}`;

ReactDOM.render(
  <>
    <App />
    <ButtonSubmit />
  </>
  , 
  document.getElementById('app')
)

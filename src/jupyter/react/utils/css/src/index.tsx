import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

export const Greeter = (name: string) => `Hello ${name}`;

ReactDOM.render(
  <>
    <App />
  </>
  , 
  document.getElementById('app')
);

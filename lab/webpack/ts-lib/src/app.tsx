import * as React from 'react';
import j2 from './app2';

export default class App extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h1>It Works!</h1>
        <p>This React project just works including <span>module</span> local styles.</p>
        <p>Enjoy!</p>
        <p>{j2}</p>
      </div>
    )
  }
}

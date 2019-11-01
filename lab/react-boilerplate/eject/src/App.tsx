import * as React from 'react'

import './App.scss'

import { initializeIcons } from '@uifabric/icons'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'

import logo from './logo.svg'

initializeIcons()

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <DefaultButton
              text='Office UI Button'
              primary={ true }
              href='#'
            />
        </header>
      </div>
    )
  }
}
export default App;

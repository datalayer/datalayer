import * as React from 'react'
import { render } from 'react-dom'
import App from './App'
import Logo from './Logo'

window.addEventListener('DOMContentLoaded', () => {
    render(
      <div>
        <Logo/>
        <App/>
      </div>
      ,
      document.getElementById('app'));
})

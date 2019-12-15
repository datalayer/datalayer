import * as React from 'react'
import { render } from 'react-dom'
import App from './App'

import './../style/style.less'

window.addEventListener('DOMContentLoaded', () => {
    render(
      <div>
        <App id='app'/>
      </div>
      ,
      document.getElementById('app'));
})

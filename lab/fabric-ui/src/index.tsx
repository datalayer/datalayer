import * as React from 'react'
import { render } from 'react-dom'
import App from './App'
import { initializeIcons } from '@uifabric/icons';

import './../style/style.less'

window.addEventListener('DOMContentLoaded', () => {
    initializeIcons()
    render(
      <div>
        <App/>
      </div>
      ,
      document.getElementById('app'));
})

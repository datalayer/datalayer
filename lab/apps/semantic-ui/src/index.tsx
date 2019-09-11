import * as React from 'react'
import { render } from 'react-dom'
import App from './App'

import 'semantic-ui-less/semantic.less'
import './../style/style.less'
import './../style/semantic-extend.less'

window.addEventListener('DOMContentLoaded', () => {
    render(
      <div>
        <App/>
      </div>
      ,
      document.getElementById('app'));
})

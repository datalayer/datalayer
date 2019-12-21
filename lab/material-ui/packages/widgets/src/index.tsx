import * as React from 'react'
import { render } from 'react-dom'
import Example1 from './Example1'
import Welcome from './Welcome'

import './style.less'

window.addEventListener('DOMContentLoaded', () => {
    render(
      <div>
        <Welcome />
        <Example1 />
      </div>
      ,
      document.getElementById('root'));
})

export {default as Example1} from './Example1';
export {default as Welcome} from './Welcome';

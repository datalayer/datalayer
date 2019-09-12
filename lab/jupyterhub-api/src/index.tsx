import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Api from './api'

var div: HTMLElement = document.createElement('div')
window.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(div)
  ReactDOM.render(
  <div>
    <Api />
  </div>
  ,
  div
  )
})

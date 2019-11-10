import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import {createStore, combineReducers} from 'redux'
import {reducer as toastrReducer} from 'react-redux-toastr'
import {Provider}  from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import Twitter from './twitter'

import './../style/style.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const reducers = {
  toastr: toastrReducer // <- Mounted at toastr.
}

const reducer = combineReducers(reducers)
const store = createStore(reducer)

var div: HTMLElement = document.createElement('div')
window.addEventListener('DOMContentLoaded', () => {
  initializeIcons()
  document.body.appendChild(div)
  ReactDOM.render(
  <div>
    <Provider store={store}>
      <div>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-left"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar/>
        <Twitter />
      </div>
    </Provider>
  </div>
  ,
  div
  )
})

import * as redux from 'redux'
import { Store, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import routerHistory from './../history/History'
import { DatalayerState, initialState } from './../state/DatalayerState'
import { reducers } from './../reducers/Reducers'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rm = routerMiddleware(routerHistory)

export class DatalayerStore {

  private static _datalayerStore: Store<DatalayerState.State> = redux.createStore(
    reducers,
    initialState as DatalayerState.State,
//    applyMiddleware(middleware)
    compose(applyMiddleware(thunk, rm))
  )

  public static datalayerStore: Store<DatalayerState.State> = DatalayerStore._datalayerStore

  public static state(): DatalayerState.State {
    return this.datalayerStore.getState()
  }

}

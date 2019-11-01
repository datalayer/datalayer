import { CounterType } from './../actions/CounterActions'
import { DatalayerState, initialState } from '../state/DatalayerState'

export function counterReducer(state: DatalayerState.Counter = initialState.counter, action: CounterType): DatalayerState.Counter {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      const { value } = action
      return { value: state.value + value }
    case 'RESET_COUNTER_REQUEST':
      return { value: 0 }
    case 'LOAD_COUNT_SUCCESS':
      console.log("this is Load Count Success action", action)
      return { value: action.response.value }
    default:
      return state
  }
}

export function isSavingCounterReducer(state: boolean = initialState.isSavingCounter, action: CounterType): boolean {
  switch (action.type) {
    case 'SAVE_COUNT_REQUEST':
      return true
    case 'SAVE_COUNT_SUCCESS':
    case 'SAVE_COUNT_ERROR':
      return false
    default:
      return state
  }
}

export function isLoadingCounterReducer(state: boolean = initialState.isLoadingCounter, action: CounterType): boolean {
  switch (action.type) {
    case 'LOAD_COUNT_REQUEST':
      return true
    case 'LOAD_COUNT_SUCCESS':
    case 'LOAD_COUNT_ERROR':
      return false
    default:
      return state
  }
}

export function errorCounterReducer(state: string = initialState.errorCounter, action: CounterType): string {
  switch (action.type) {
    case 'LOAD_COUNT_REQUEST':
    case 'SAVE_COUNT_REQUEST':
      return ''
    case 'LOAD_COUNT_ERROR':
    case 'SAVE_COUNT_ERROR':
      return action.error.toString()
    default:
      return state
  }

}

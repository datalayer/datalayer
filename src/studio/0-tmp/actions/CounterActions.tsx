import { Dispatch } from 'redux'
import { DatalayerState } from '../state/DatalayerState'
import { RequestType, ResponseType, ErrorType, EmptyRequest, ValueRequest} from './IActions'
import { CounterApi } from '../api/counter/CounterApi'

export type CounterType = 
   { type: 'INCREMENT_COUNTER', value: number }
|  { type: 'RESET_COUNTER_REQUEST' }
|  { type: 'RESET_COUNTER_SUCCESS' }
|  { type: 'RESET_COUNTER_ERROR' }
|  ({ type: 'SAVE_COUNT_REQUEST' } & ValueRequest)
|  ({ type: 'SAVE_COUNT_SUCCESS' } & ValueRequest & ResponseType<{}>)
|  ({ type: 'SAVE_COUNT_ERROR'   } & ValueRequest & ErrorType)
|  ({ type: 'LOAD_COUNT_REQUEST' } & EmptyRequest)
|  ({ type: 'LOAD_COUNT_SUCCESS' } & EmptyRequest & ResponseType<{ value: number }>)
|  ({ type: 'LOAD_COUNT_ERROR'   } & EmptyRequest & ErrorType)

export const incrementCounterAction = (value: number): CounterType => ({
  type: 'INCREMENT_COUNTER',
  value
})

type CounterPromise<Request, Response> = (request: Request) => Promise<Response>

export type CounterAsyncCommand<Request, Response> = {
  request: (request?: Request) => CounterType & RequestType<Request>
  success: (response: Response, request?: Request)  => CounterType & RequestType<Request> & ResponseType<Response>
  error: (error: Error, request?: Request) => CounterType & RequestType<Request> & ErrorType
}

function counterAsyncDispatchFactory<Rq, Rs>(counterAsyncCommand: CounterAsyncCommand<Rq, Rs>, counterPromise: CounterPromise<Rq, Rs>) {
  return (request: Rq) => (dispatch: Dispatch<DatalayerState.State>) => {
    dispatch(counterAsyncCommand.request(request))
    counterPromise(request)
      .then((response: Rs) => dispatch(counterAsyncCommand.success(response, request)))
      .catch((error: Error) => dispatch(counterAsyncCommand.error(error, request)))      
  }
}

const _resetCounterAsyncCommand: CounterAsyncCommand<null, { value: number }> =  {
  request: (request) => ({ type: 'RESET_COUNTER_REQUEST', request: null }),
  success: (response, request) => ({ type: 'RESET_COUNTER_SUCCESS', request: null, response }),
  error: (error, request) => ({ type: 'RESET_COUNTER_ERROR', request: null, error }),
}
const resetCounterAsyncDispatch = counterAsyncDispatchFactory(_resetCounterAsyncCommand, CounterApi.resetCounterPromise)

const _saveCounterAsyncCommand: CounterAsyncCommand<{ value: number }, {}> = {
  request: (request: {value: number}) => ({ type: 'SAVE_COUNT_REQUEST', request}),
  success: (response: {}, request: {value: number}) => ({ type: 'SAVE_COUNT_SUCCESS', request, response }),
  error: (error, request: {value: number}) => ({ type: 'SAVE_COUNT_ERROR', request, error }),
}
const saveCounterAsyncDispatch = counterAsyncDispatchFactory(_saveCounterAsyncCommand, CounterApi.saveCounterPromise)

const _loadCounterAsyncCommand: CounterAsyncCommand<null, { value: number }> = {
  request: (request) => ({ type: 'LOAD_COUNT_REQUEST', request: null }),
  success: (response, request) => ({ type: 'LOAD_COUNT_SUCCESS', request: null, response }),
  error: (error, request) => ({ type: 'LOAD_COUNT_ERROR', request: null, error }),
}
const loadCounterAsyncDispatch = counterAsyncDispatchFactory(_loadCounterAsyncCommand, CounterApi.loadCounterPromise)

export type CounterDispatchers = {
  dispatchIncrementAction: (value: number) => void
  dispatchResetAction: () => void
  dispatchSaveAction: (value: number) => void
  dispatchLoadAction: () => void
}

export const mapDispatchToPropsCounter = (dispatch: Dispatch<DatalayerState.State>): CounterDispatchers => ({
  dispatchIncrementAction: (value: number) => dispatch(incrementCounterAction(value)),
  dispatchResetAction: () => dispatch(resetCounterAsyncDispatch(null)),
  dispatchSaveAction: (value: number) => dispatch(saveCounterAsyncDispatch({ value })),
  dispatchLoadAction: () => dispatch(loadCounterAsyncDispatch(null))
})

export type CounterProps = {
  counter: { value: number }
  isSavingCounter: boolean
  isLoadingCounter: boolean
  errorCounter: string
}

export const mapStateToPropsCounter = (state: DatalayerState.State): CounterProps => ({
  counter: state.counter,
  isSavingCounter: state.isSavingCounter,
  isLoadingCounter: state.isLoadingCounter,
  errorCounter: state.errorCounter,
})

import { Dispatch } from 'redux'
import { DatalayerState } from '../state/DatalayerState'

export type KuberAction = {
  type: string
  message?: any
}

export const kuberMessageSentAction = (message: any): KuberAction => ({
  type: 'KUBER_MESSAGE_SENT',
  message: message
})
export const kuberMessageReceivedAction = (message: any): KuberAction => ({
  type: 'KUBER_MESSAGE_RECEIVED',
  message: message
})

export type KuberProps = {
  kuberLogin: {},
  kuberMessageSent: any,
  kuberMessageReceived: any,
}

export const mapStateToPropsKuber = (state: DatalayerState.State): KuberProps => ({
  kuberLogin: state.kuberLogin,
  kuberMessageSent: state.kuberMessageSent,
  kuberMessageReceived: state.kuberMessageReceived,
})

export type KuberDispatchers = {
  dispatchDatalayerMessageSentAction: (any: any) => void
  dispatchDatalayerMessageReceivedAction: (any: any) => void
}

export const mapDispatchToPropsKuber = (dispatch: Dispatch<DatalayerState.State>): KuberDispatchers => ({
  dispatchDatalayerMessageSentAction: (message: any) => {
    dispatch(kuberMessageSentAction(message))
  },
  dispatchDatalayerMessageReceivedAction: (message: any) => {
    dispatch(kuberMessageReceivedAction(message))
  }
})

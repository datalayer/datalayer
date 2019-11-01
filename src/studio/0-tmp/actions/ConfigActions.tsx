import { Dispatch } from 'redux'
import { DatalayerState } from '../state/DatalayerState'
import { IConfig } from '../api/config/ConfigApi'

export type ConfigAction = {
  type: string,
  config?: IConfig
}

export const newConfigAction = (config: IConfig): ConfigAction => ({
  type: 'NEW_CONFIG',
  config: config
})

export type ConfigDispatchers = {
  dispatchNewConfigAction: (config: IConfig) => void
}

export type ConfigProps = {
  config: IConfig
}

export const mapDispatchToPropsConfig = (dispatch: Dispatch<DatalayerState.State>): ConfigDispatchers => ({
  dispatchNewConfigAction: (config: IConfig) => {
    dispatch(newConfigAction(config))
  }
})

export const mapStateToPropsConfig = (state: DatalayerState.State): ConfigProps => ({
  config: state.config
})

import { ConfigAction } from './../actions/ConfigActions'
import { initialState } from '../state/DatalayerState'
import { IConfig } from '../api/config/ConfigApi'

export const newConfigReducer = (state: IConfig = initialState.config, action: ConfigAction): IConfig => {
  switch (action.type) {
    case 'NEW_CONFIG':
      return action.config as IConfig
     default:
      return state
  }
}

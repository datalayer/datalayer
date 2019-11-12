import { initialState } from '../state/DatalayerState'

export const meReducer = (state: {} = initialState.me, action: any): {} => {
  return state
}

export const profilePhotoReducer = (state: string = initialState.profilePhoto, action: any): string => {
  return state
}

export const profilePrincipalReducer = (state: string = initialState.profilePrincipal, action: any): string => {
  return state
}

export const profileDisplayNameReducer = (state: string = initialState.profileDisplayName, action: any): string => {
  return state
}

export const profilePhotoBlobReducer = (state: Blob = initialState.profilePhotoBlob, action: any): Blob => {
  return state
}

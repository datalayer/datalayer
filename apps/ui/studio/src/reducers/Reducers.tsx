import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { Reducer, routerReducer } from 'react-router-redux'
import { DatalayerState } from '../state/DatalayerState'
import { meReducer, profilePhotoReducer, profilePrincipalReducer, profileDisplayNameReducer, profilePhotoBlobReducer } from './ProfileReducer'
import { newConfigReducer } from './ConfigReducer'
import { kuberLogin, kuberMessageSentReducer, kuberMessageReceivedReducer, kuberStatusReducer } from './KuberReducer'
import { counterReducer, isSavingCounterReducer, isLoadingCounterReducer, errorCounterReducer } from './CounterReducer'
import { 
  isGoogleAuthenticatedReducer, isToGoogleReducer, googleTokenReducer, 
  isMicrosoftAuthenticatedReducer, isToMicrosoftReducer, microsoftTokenReducer, 
  isTwitterAuthenticatedReducer, isToTwitterReducer, twitterTokenReducer,
  isIamAuthenticatedReducer, isToIamReducer, iamTokenReducer
 } from './AuthReducer'

export const reducers: Reducer<DatalayerState.State> = combineReducers<DatalayerState.State>({
  config: newConfigReducer,  
  counter: counterReducer,
  isSavingCounter: isSavingCounterReducer,
  isLoadingCounter: isLoadingCounterReducer,
  errorCounter: errorCounterReducer,
  kuberLogin: kuberLogin,
  kuberMessageSent: kuberMessageSentReducer,
  kuberMessageReceived: kuberMessageReceivedReducer,
  isGoogleAuthenticated: isGoogleAuthenticatedReducer,
  isToGoogle: isToGoogleReducer,
  googleToken: googleTokenReducer,
  isMicrosoftAuthenticated: isMicrosoftAuthenticatedReducer,
  isToMicrosoft: isToMicrosoftReducer,
  microsoftToken: microsoftTokenReducer,
  isTwitterAuthenticated: isTwitterAuthenticatedReducer,
  isToTwitter: isToTwitterReducer,
  twitterToken: twitterTokenReducer,
  isIamAuthenticated: isIamAuthenticatedReducer,
  isToIam: isToIamReducer,
  iamToken: iamTokenReducer,
  toastr: toastrReducer,
  routing: routerReducer,
  me: meReducer,
  profilePhoto: profilePhotoReducer,
  profilePrincipal: profilePrincipalReducer,
  profileDisplayName: profileDisplayNameReducer,
  profilePhotoBlob: profilePhotoBlobReducer, 
  kuberStatus: kuberStatusReducer
})

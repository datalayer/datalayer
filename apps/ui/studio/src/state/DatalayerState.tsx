import { IConfig, emptyConfig } from '../api/config/ConfigApi'

export namespace DatalayerState {
  export type Counter = { 
    value: number 
  }
  export type State = {
    counter: Counter,
    isSavingCounter: boolean,
    isLoadingCounter: boolean,
    errorCounter: string,
    isToGoogle: boolean,
    isGoogleAuthenticated: boolean,
    googleToken: any,
    isToMicrosoft: boolean,
    isMicrosoftAuthenticated: boolean,
    microsoftToken: any,
    isToTwitter: boolean,
    isTwitterAuthenticated: boolean,
    twitterToken: any,
    isToIam: boolean,
    isIamAuthenticated: boolean,
    iamToken: any,
    me: any,
    profilePrincipal: string,
    profileDisplayName: string,
    profilePhoto: string,
    profilePhotoBlob: Blob,
    config: IConfig,
    kuberLogin: any,
    kuberMessageSent: any,
    kuberMessageReceived: any,
    kuberStatus: any
  }
}

const initialCounter: DatalayerState.Counter = {
  value: 0
}

export const initialState: DatalayerState.State = {
  counter: initialCounter,
  isSavingCounter: false,
  isLoadingCounter: false,
  errorCounter: '',
  isToGoogle: false,
  isGoogleAuthenticated: false,
  googleToken: {},
  isToMicrosoft: false,
  isMicrosoftAuthenticated: false,
  microsoftToken: {},
  isToTwitter: false,
  isTwitterAuthenticated: false,
  twitterToken: {},
  isToIam: false,
  isIamAuthenticated: false,
  iamToken: {},
  me: {},
  profilePrincipal: '',
  profileDisplayName: '',
  profilePhoto: '/img/datalayer/datalayer-square.png',
  profilePhotoBlob: new Blob(),
  config: emptyConfig,
  kuberLogin: {},
  kuberMessageSent: {},
  kuberMessageReceived: {},
  kuberStatus: {}
}

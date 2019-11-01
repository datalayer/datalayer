import { AuthAction } from './../actions/AuthActions'
import { initialState } from '../state/DatalayerState'
import { DatalayerStore } from '../store/DatalayerStore';

export const isToIamReducer = (state: boolean = initialState.isToIam, action: AuthAction): boolean => {
  switch (action.type) {
    case 'TO_IAM':
      return true
    default:
      return state
  }
}

export const isIamAuthenticatedReducer = (state: boolean = initialState.isIamAuthenticated, action: AuthAction): boolean => {
  switch (action.type) {
    case 'IS_IAM_AUTHENTICATED':
      DatalayerStore.state().me = action.iamUser
      DatalayerStore.state().profileDisplayName = action.iamUser.name
      return true
    case 'LOGOUT':
      DatalayerStore.state().me = {}
      DatalayerStore.state().profileDisplayName = ''
      return false
    default:
      return state
  }
}

export const iamTokenReducer = (state: any = initialState.iamToken, action: AuthAction): any => {
  switch (action.type) {
    case 'IAM_TOKEN':
      return action.iamToken
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}

export const isToGoogleReducer = (state: boolean = initialState.isToGoogle, action: AuthAction): boolean => {
  switch (action.type) {
    case 'TO_GOOGLE':
      return true
    default:
      return state
  }
}

export const isGoogleAuthenticatedReducer = (state: boolean = initialState.isGoogleAuthenticated, action: AuthAction): boolean => {
  switch (action.type) {
    case 'IS_GOOGLE_AUTHENTICATED':
      return true
    case 'LOGOUT':
      return false
    default:
      return state
  }
}

export const googleTokenReducer = (state: any = initialState.googleToken, action: AuthAction): any => {
  switch (action.type) {
    case 'GOOGLE_TOKEN':
      return action.googleToken
    case 'LOGOUT':
      return {}
    default:
      return state
  }

}

export const isToMicrosoftReducer = (state: boolean = initialState.isToMicrosoft, action: AuthAction): boolean => {
  switch (action.type) {
    case 'TO_MICROSOFT':
      return true
    default:
      return state
  }
}

export const isMicrosoftAuthenticatedReducer = (state: boolean = initialState.isMicrosoftAuthenticated, action: AuthAction): boolean => {
  switch (action.type) {
    case 'IS_MICROSOFT_AUTHENTICATED':
      return true
    case 'LOGOUT':
      return false
    default:
      return state
  }
}

export const microsoftTokenReducer = (state: any = initialState.microsoftToken, action: AuthAction): any => {
  switch (action.type) {
    case 'MICROSOFT_TOKEN':
      return action.microsoftToken
    case 'LOGOUT':
      return {}
    default:
      return state
  }

}

export const isToTwitterReducer = (state: boolean = initialState.isToTwitter, action: AuthAction): boolean => {
  switch (action.type) {
    case 'TO_TWITTER':
      return true
    default:
      return state
  }
}

export const isTwitterAuthenticatedReducer = (state: boolean = initialState.isTwitterAuthenticated, action: AuthAction): boolean => {
  switch (action.type) {
    case 'IS_TWITTER_AUTHENTICATED':
      return true
    case 'LOGOUT':
      return false
    default:
      return state
  }
}

export const twitterTokenReducer = (state: any = initialState.twitterToken, action: AuthAction): any => {
  switch (action.type) {
    case 'TWITTER_TOKEN':
      return action.twitterToken
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}

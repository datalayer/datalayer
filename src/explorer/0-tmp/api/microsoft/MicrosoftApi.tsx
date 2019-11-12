import * as React from 'react'
import * as isEqual from 'lodash.isequal'
import async from 'async'
import { connect } from 'react-redux'
import { IConfig, emptyConfig } from './../../api/config/ConfigApi'
import { Client } from '@microsoft/microsoft-graph-client'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from './../../actions/ConfigActions'
import { mapStateToPropsAuth, mapDispatchToPropsAuth } from './../../actions/AuthActions'
import { MeStorageKey } from '../iam/IamApi'

export const MicrosoftProfileStorageKey = 'microsoft_profile'

@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
@connect(mapStateToPropsAuth, mapDispatchToPropsAuth)
export default class MicrosoftApi extends React.Component<any, any> {
  private config: IConfig = emptyConfig
  private client: Client

  public constructor(props) {
    super(props)
    this.toMicrosoft = this.toMicrosoft.bind(this)
    this.handleError = this.handleError.bind(this)
    window["MicrosoftApi"] = this
  }

  public render() {
    const { isToMicrosoft } = this.props
    if (isToMicrosoft) {
      this.toMicrosoft()
      return <div>{ this.props.children }</div>
    }
    return <div>{ this.props.children }</div>
  }

  public componentWillReceiveProps(nextProps) {
    const { config } = nextProps
    if (config && ! isEqual(config, this.config)) {
      this.config = config
    }
  }

  public toMicrosoft() {
    console.log("Start Login with Microsoft...")
    window.location.href = this.config.kuberRest + "/kuber/api/v1/microsoft?"
       + "client_id=" + this.config.microsoftApplicationId
       + "&tenant=common"
       + "&response_type=code"
       + "&response_mode=query"
//       + "&redirect_uri=" + this.config.microsoftRedirect
       + "&scope=" + this.config.microsoftScope
  }

  public logout() {
    localStorage.removeItem(MicrosoftProfileStorageKey)
    localStorage.removeItem(MeStorageKey)
    this.props.dispatchLogoutAction()
  }

  public getMe(callback) {
    let client = this.getClient()
    if (client) {
      client 
      .api('/me')
      .select('displayName,givenName,surname,emailAddresses,userPrincipalName')
      .get((err, res) => {
        if (!err) {
          callback(null, res)
        }
        else this.handleError(err)
      })
    }
  }

  public getMyPicto(callback) {
    let client = this.getClient()
    if (client) {
      client 
      .api('/me/photo/$value')
      .responseType('blob')
			.get((err, res, rawResponse) => {
        if (!err) {
          callback(null, rawResponse.xhr.response)
        }
        else this.handleError(err)
      })
    }
  }

  public getContacts(callback) {
    let client = this.getClient()
    if (client) {
      client 
      .api('/me/contacts')
			.get((err, res) => {
        if (err) {
          this.handleError(err);
        }
        callback(err, (res) ? res.value : [])
      })
    }
  }

  public getPeople(callback) {
    let client = this.getClient()
    if (client) {
      client 
      .api('/me/people')
      .version('beta')
      .filter(`personType eq 'Person'`)
      .select('displayName,givenName,surname,emailAddresses,userPrincipalName')
      .top(20)
      .get((err, res) => {
        if (err) {
          this.handleError(err)
        }
        callback(err, (res) ? res.value : [])
      })
    }
  }

  public getProfilePics(personas, callback) {
    let client = this.getClient()
    if (client) {
      const pic = (p, done) => {
        client 
          .api(`users/${p.props.id}/photo/$value`)
          .header('Cache-Control', 'no-cache')      
          .responseType('blob')
          .get((err, res, rawResponse) => {
            if (err) {
              done(err);
            }
            else {
              p.imageUrl = window.URL.createObjectURL(rawResponse.xhr.response)
              p.initialsColor = null
              done()
            }
          })
      }
      async.each(personas, pic, (err) => {
        callback(err);
      })
    }
  }

  public searchForPeople(searchText, callback) {
    let client = this.getClient()
    if (client) {
      client
        .api('/users')
        .filter(`startswith(displayName,'${searchText}')`)
        .select('displayName,givenName,surname,mail,userPrincipalName,id')
        .top(20)
        .get((err, res) => {
          if (err) {
            this.handleError(err)
          }
          callback(err, (res) ? res.value : [])
        })
    }
  }

  public sendMail(recipients, subject, content, callback) {
    let client = this.getClient()
    if (client) {
      const email = {
        Subject: subject,
        Body: {
          ContentType: 'HTML',
          Content: content
        },
        ToRecipients: recipients
        }
      client
        .api('/me/sendMail')
        .post({
          'message': email,
          'saveToSentItems': true
        }, (err, res, rawResponse) => {
          if (err) {
            this.handleError(err);
          }
          callback(err, rawResponse.req._data.message.ToRecipients);
        })
    }
  }

  public getFiles(nextLink, callback) {
    let client = this.getClient()
    if (client) {
      let request
      if (nextLink) {
        request = this.client.api(nextLink)
      }
      else {
        request = 
          client
          .api('/me/drive/root/children') 
          .select('name,createdBy,createdDateTime,lastModifiedBy,lastModifiedDateTime,webUrl,file')
          .top(100) // default result set is 200
      }
      request.get((err, res) => {
        if (err) {
          this.handleError(err)
        }
        callback(err, res)
      })
    }
  }
  
  private handleError(err) {
    // Just redirect to the login function when the token is expired.
    // Production should implement more robust token management.
    if (err.statusCode === 401 && err.message === 'Access token has expired.') {
      this.props.dispatchToMicrosoftAction()
    }
  }

  private getClient() {
    let me = localStorage.getItem(MicrosoftProfileStorageKey)
    if (me == null) {
      me = '{}'
    }
    let profile = JSON.parse(me)
    console.log('Microsoft Profile', profile)
    if (profile) {
      if (!this.client) {
        // Initialize the Microsoft Graph Client.
        this.client = Client.init({
          debugLogging: true,
          authProvider: (done) => {
            let access_token = profile.access_token
            done(null, access_token)
          }
        })
      }
    }
    return this.client
  }
  
}

import * as React from 'react'
// import { Timeline } from 'react-twitter-widgets'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { LayoutGroup } from '@uifabric/experiments/lib/LayoutGroup'
import { Form, FormConditionalSubmitButton, FormTextInput, Validators } from '@uifabric/experiments/lib/Form'
import { autobind } from 'office-ui-fabric-react/lib/Utilities'
import { toastr } from 'react-redux-toastr'

export default class Twitter extends React.Component<any, any> {

  state = {
    twitterInfo: {
      name: '',
      screen_name: '',
      username: ''
    }
  }

  public constructor(props) {
    super(props)
    this.twitterInfo = this.twitterInfo.bind(this)
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    eventer(messageEvent, e  => {
//      console.log('Message received from child', e.data);
      if (e.data.twitterAuth) {
        this.twitterInfo()
      }
    }, false)
  }

  public render() {
    const { twitterInfo } = this.state
    return <div>
      <h1>Twitter</h1>
      {
        twitterInfo.name.length  == 0 && 
        <div>
          <DefaultButton
            text='Authenticate on Twitter'
            onClick={ (e) => { e.preventDefault(); window.location.href = '/twitter/auth'} }
          />
          <br/>
          <DefaultButton
            text='Authenticate on Twitter (with Popup)'
            onClick={ (e) => { e.preventDefault(); window.open("/twitter/auth/popup", "Twitter Auth", "width=550,height=650");} }
          />
        </div>
      }
      {
        twitterInfo.name.length  > 0 && 
        <div>
          <DefaultButton
            text='Sign Out'
            onClick={ (e) => { e.preventDefault(); window.location.href = '/twitter/signout'} }
          />
          <Form 
            onSubmit={ this.submit } 
            showErrorsWhenPristine={ true }
          >
            <LayoutGroup layoutGap={ 20 } direction='vertical' justify='fill'>
              <FormTextInput 
                textFieldProps={{
                  label: 'Tweet',
                  placeholder: 'Type a cool Tweet',
                  ariaLabel: 'Type a cool Tweet',
                  iconProps: { iconName: 'SocialListeningLogo' },
                  multiline: true,
                  rows: 4
                }}
                validators={[
                  Validators.minLength(2, (length: number) => 'A tweet must be longer than 2 characters.'),
                  Validators.maxLength(140, (length: number) => 'A tweet must be shorter than 140 characters.')
                ]}
                inputKey='status'                
              />
              <FormConditionalSubmitButton>Post</FormConditionalSubmitButton>
            </LayoutGroup>
          </Form>
{/*
          <div style={{ maxWidth: "500px" }}>
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: twitterInfo.screen_name
              }}
              options={{
                username: twitterInfo.username,
                height: '400'
              }}
              onLoad={() => console.log(`Timeline for @${twitterInfo.screen_name} is loaded!`)}
            />
          </div>
*/}
        </div>
      }
    </div>
  }

  public componentDidMount() {
    this.twitterInfo()
  }

  private async twitterInfo() {
    const res = await fetch('./twitter/info', {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    res.json().then(info => {
      console.log(info)
      this.setState({ twitterInfo: info })
    })
  }

  @autobind
  private async submit(values: any) {
    const res = await fetch('./twitter/post', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(values),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    res.json().then(response => {
      if(response.success == 'true') {
        toastr.success('Success', 'You have posted status id = ' + response.status.id)
      }
      else {
        toastr.success('Failure', 'Something went wrong...')
      }
    })
  }

}

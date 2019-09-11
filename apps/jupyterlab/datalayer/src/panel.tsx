import * as React from 'react'
import { ServerConnection } from '@jupyterlab/services'
import { URLExt } from '@jupyterlab/coreutils'
import { NotebookPanel } from '@jupyterlab/notebook'
import { Form, FormConditionalSubmitButton, FormTextInput, Validators } from '@uifabric/experiments/lib/Form'
import { LayoutGroup } from '@uifabric/experiments/lib/LayoutGroup'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot'
import { autobind } from 'office-ui-fabric-react/lib/Utilities'
import { toastr } from 'react-redux-toastr'
import { Timeline } from 'react-twitter-widgets'
import { Twitter } from './twitter'
import { Content } from './content'
import Spinner from './spinner'
import ScreenCapture from './screencapture'
// import { CodeCell } from '@jupyterlab/cells'
// import * as html2canvas from 'html2canvas'
import '../style/index.css'
import '../style/screencapture.css'

export default class Panel extends React.Component<any, any> {
  
  state = {
    twitterInfo: {
      name: '',
      screen_name: '',
      username: ''
    },
    formDisabled: false,
    notebookPanel: null,
    capturing: false,
    captures: [],
    capture: '',
    captureWidth: 0.0,
    captureHeight: 0.0
}

  public constructor(props) {
    super(props)
    this.props.notebookTracker.currentChanged.connect((sender, e) => { 
      let nbp = e as NotebookPanel
      console.log('Notebook has changed.', nbp);
      this.state.notebookPanel = nbp
    })
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    eventer(messageEvent, e  => {
      console.log("messageEvent", messageEvent)
      console.log("e", e)
      if (e.data.twitterAuth) {
        this.twitterInfo()
      }
    }, false)
  }

  public render() {
    const { twitterInfo, formDisabled, capturing, captures, capture, captureWidth, captureHeight } = this.state
    if (twitterInfo.name.length == 0) return (
      <div className="jp-TwitterLoginScreen">
        <div className="jp-TwitterDrive-logo"></div>
        <div className="jp-TwitterDrive-text">
          Twitter
        </div>
        <button
          className="jp-Dialog-button jp-mod-styled jp-mod-accept" title="Log into your Twitter account"
          onClick={ (e) => {
            e.preventDefault();
            let setting = ServerConnection.makeSettings();
            let url = URLExt.join(setting.baseUrl, "/twitter/auth/popup");          
            window.open(url, "Twitter Auth", "width=550,height=650");
          } }
        >
          SIGN IN
        </button>
      </div>
    )
    return (
      <Pivot>
        <PivotItem linkText="Post">
          <Form 
            onSubmit={ this.postTweet } 
            showErrorsWhenPristine={ true }
          >
            <LayoutGroup layoutGap={ 20 } direction='vertical' justify='fill'>
              <FormTextInput 
                textFieldProps={{
                  placeholder: 'Type a cool Tweet',
                  ariaLabel: 'Type a cool Tweet',
                  multiline: true,
                  rows: 4,
                  disabled: formDisabled
                }}
                validators={[
                  Validators.minLength(2, (length: number) => 'Tweet is too short...'),
                  Validators.maxLength(130, (length: number) => 'Tweet is too long...')
                ]}
                inputKey='status'
              />
              <div className="ms-Grid">
              {
                !formDisabled && 
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-textAlignLeft">
                      <FormConditionalSubmitButton>Tweet</FormConditionalSubmitButton>
                    </div>
                  <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-textAlignRight">
                    <ScreenCapture onEndCapture={this.handleScreenCapture}>
                      {({ onStartCapture }) => (
                        <React.Fragment>
{/*
                          <DefaultButton
                            text='Capture'
                            onClick={ (e) => { 
                              e.preventDefault();
                              this.setState({
                                capturing: true,
                                capture: '',
                                captureWidth: 0,
                                captureHeight: 0
                              });
                              onStartCapture;
                            } }
                          />
*/}
                          <button onClick={ onStartCapture }>Capture</button>
                        </React.Fragment>
                      )}
                    </ScreenCapture>
                  </div>
                  <div>
                    <button onClick={ e => { e.preventDefault(); this.getContent() }}>Get Content</button>
                  </div>
                </div>
                }
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <div>
                      { (capturing || formDisabled) && 
                        <div className="ms-Grid">
                          <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                              <div style={{ display: "flex", justifyContent: "center" }}>
                                <Spinner size={50} className='ms-textAlignCenter' />
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    { (capture != '') && 
                      <div>
                        <div>
                          <img src={ capture } width={ captureWidth } height={ captureHeight } />
                        </div>
                        <div>
                          <button onClick={ e => { e.preventDefault(); this.removeCapture(); }}>Remove</button>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </LayoutGroup>
          </Form>
          <div>
            {
              captures.map((c, i) => {
                return (
                  <div>
                    <img key={i} src={c.toDataURL('image/png')} style={{ width: '100%' }} />
                    <br/>
                    <a href='' onClick={ e => { e.preventDefault(); this.removeCaptures(i); } }>Remove</a>
                  </div>
                )
              })
            }
          </div>
        </PivotItem>
        <PivotItem linkText="Timeline">
          <div>
            <div style={{ maxWidth: "500px" }}>
              <Timeline
                dataSource={{
                  sourceType: 'profile',
                  screenName: twitterInfo.screen_name
                }}
                options={{
                  username: twitterInfo.username,
                  height: '100vh'
                }}
                onLoad={() => console.log(`Timeline for @${twitterInfo.screen_name} is loaded!`)}
              />
            </div>
          </div>
        </PivotItem>
        <PivotItem linkText="Profile">
          <div className="jp-TwitterLoginScreen">
            <div className="jp-TwitterDrive-logo"></div>
            <div className="jp-TwitterDrive-text">
              Twitter
            </div>
            <button className="jp-Dialog-button jp-mod-styled jp-mod-accept" title="Log into your Twitter account"
              onClick={ (e) => { e.preventDefault(); this.signout(); } }
            >
              SIGN OUT
            </button>
          </div>
        </PivotItem>
      </Pivot>
    )
  }

  public componentDidMount() {
    this.twitterInfo()
  }

  @autobind
  private signout() {
    new Twitter().signout().then(e => this.twitterInfo())
  }

  @autobind
  private handleScreenCapture(capture, width, height) {
    this.setState({
      capturing: false,
      capture: capture,
      captureWidth: width, 
      captureHeight: height
    })
  }
/*
  // Deprecated
  private async captureParagraph() {
    this.setState({
      captures: [],
      capturing: true
    })
    if (this.state.notebookPanel) {
      let captures = []
      new Promise<string>((resolve, reject) => {
        let it = (this.state.notebookPanel as NotebookPanel).content.children().iter()
        let cell = it.next()
        console.log('cell', cell)
        let id = (cell as CodeCell).outputArea.id
        console.log('cell id', id)
        html2canvas(document.getElementById(id)).then((canvas) => {
          if (canvas.height != 0) {
            captures.push(canvas)
            this.setState({
              captures: captures,
              capturing: false
            })
          }
        })
      })
    }
  }
*/
  @autobind
  private async getContent() {
    new Content().getContent(this.state.notebookPanel.context._path).then(res=> {
      console.log('---', res)
    })
  }

  @autobind
  private async twitterInfo() {
    new Twitter().twitterInfo().then(info => {
      this.setState({ twitterInfo: info })
    })
  }

  @autobind
  private removeCapture() {    
    this.setState({
      capture: '',
      captureWidth: 0,
      captureHeight: 0
    })
  }

  @autobind
  private removeCaptures(id: number) {    
    let c = this.state.captures
    c.splice(id, 1)
    this.setState({
      captures: c
    })
  }

  @autobind
  private async postTweet(tweet: any) {
    tweet.capture = this.state.capture
    tweet.captureHeight = this.state.captureHeight
    tweet.captureWidth = this.state.captureWidth
    this.setState({
      formDisabled: true
    })
/*
    const res = await fetch('./twitter/post', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(tweet),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
*/
  new Twitter().post(tweet).then(res => {
      this.setState({
        formDisabled: false
      })
      if (res.success) {
        toastr.success('Success', 'Your Tweet has been posted')
      }
      else {
        toastr.error('Failure', 'Something went wrong...')
      }
    })
  }

}

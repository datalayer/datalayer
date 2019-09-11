import * as React from 'react'
import { ServerConnection } from '@jupyterlab/services';
import { URLExt } from '@jupyterlab/coreutils';
import { Timeline } from 'react-twitter-widgets'
import { CodeCell } from '@jupyterlab/cells'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { LayoutGroup } from '@uifabric/experiments/lib/LayoutGroup'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot'
import { Twitter } from './connection'
import Spinner from './spinner'
import { Form, FormConditionalSubmitButton, FormTextInput, Validators } from '@uifabric/experiments/lib/Form'
import { autobind } from 'office-ui-fabric-react/lib/Utilities'
import { NotebookPanel } from '@jupyterlab/notebook';
import { toastr } from 'react-redux-toastr'
import * as html2canvas from 'html2canvas'

export default class TwitterAuth extends React.Component<any, any> {
  
  state = {
    twitterInfo: {
      name: '',
      screen_name: '',
      username: ''
    },
    notebookPanel: null,
    canvases: [],
    shooting: false
  }

  public constructor(props) {
    super(props)

    this.twitterInfo = this.twitterInfo.bind(this)
    this.signout = this.signout.bind(this)

    this.props.notebookTracker.currentChanged.connect((sender, e) => { 
      let nbp = e as NotebookPanel
      console.log('>>> Notebook changed', nbp);
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
    const { twitterInfo, canvases } = this.state
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
            onSubmit={ this.post } 
            showErrorsWhenPristine={ true }
          >
            <LayoutGroup layoutGap={ 20 } direction='vertical' justify='fill'>
              <FormTextInput 
                textFieldProps={{
                  placeholder: 'Type a cool Tweet',
                  ariaLabel: 'Type a cool Tweet',
                  multiline: true,
                  rows: 4
                }}
                validators={[
                  Validators.minLength(2, (length: number) => 'A tweet must be longer than 2 characters.'),
                  Validators.maxLength(140, (length: number) => 'A tweet must be shorter than 140 characters.')
                ]}
                inputKey='status'
              />
              <div className="ms-Grid">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-textAlignLeft">
                    <FormConditionalSubmitButton>Tweet</FormConditionalSubmitButton>
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-textAlignRight">
                    <DefaultButton
                      text='Shots'
                      onClick={ (e) => { e.preventDefault(); this.shoot(); } }
                    />
                  </div>
                </div>
              </div>
            </LayoutGroup>
          </Form>
          <div>
              { this.state.shooting && (
                <div className="ms-Grid">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-textAlignCenter">
                      <Spinner size={50} className='ms-textAlignCenter' />
                    </div>
                  </div>
                </div>
              )
              }
          </div>
          <div>
          {
            canvases.map((c, i) => {
              return (
                <div>
                  <img key={i} src={c.toDataURL('image/png')} style={{ width: '100%' }} />
                  <br/>
                  <a href='' onClick={ e => { e.preventDefault(); this.removeShot(i); } }>Remove</a>
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

  private signout() {
    new Twitter().signout().then(e => this.twitterInfo())
  }

  /*
$("#submitGraphic").click( function(){
    var canvas = document.getElementsByTagName("canvas");
    // canvas context
    var context = canvas[0].getContext("2d");
    // get the current ImageData for the canvas
    var data = context.getImageData(0, 0, canvas[0].width, canvas[0].height);
    // store the current globalCompositeOperation
    var compositeOperation = context.globalCompositeOperation;
    // set to draw behind current content
    context.globalCompositeOperation = "destination-over";
    //set background color
    context.fillStyle = "#FFFFFF";
    // draw background/rectangle on entire canvas
    context.fillRect(0,0,canvas[0].width,canvas[0].height);
    var tempCanvas = document.createElement("canvas"),
        tCtx = tempCanvas.getContext("2d");
    tempCanvas.width = 640;
    tempCanvas.height = 480;    
    tCtx.drawImage(canvas[0],0,0);
    // write on screen
    var img = tempCanvas.toDataURL("image/png");
    document.write('<a href="'+img+'"><img src="'+img+'"/></a>');
})
  */
  private async shoot() {
    this.setState({
      canvases: [],
      shooting: true
    })
    if (this.state.notebookPanel) {
      let canvases = []
      new Promise<string>((resolve, reject) => {
        let it = (this.state.notebookPanel as NotebookPanel).content.children().iter()
        let cell = it.next()
        console.log('cell', cell)
//        while (cell != undefined) {
          let id = (cell as CodeCell).outputArea.id
          html2canvas(document.getElementById(id)).then((canvas) => {
            if (canvas.height != 0) {
              canvases.push(canvas)
              this.setState({
                canvases: canvases,
                shooting: false
              })
            }
          })
//        }
      })
    }
  }

  private async twitterInfo() {
    new Twitter().twitterInfo().then(info => {
      this.setState({ twitterInfo: info })
    })
  }

  @autobind
  private removeShot(id: number) {    
    let c = this.state.canvases
    c.splice(id, 1)
    this.setState({
      canvases: c
    })
  }

  @autobind
  private async post(values: any) {
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
        toastr.success('Success', 'Your message has been posted')
        console.log('Success', 'You have posted status id = ' + response.status.id)
      }
      else {
        toastr.error('Failure', 'Something went wrong...')
        console.error('Failure', 'Something went wrong...')
      }
    })
  }

}

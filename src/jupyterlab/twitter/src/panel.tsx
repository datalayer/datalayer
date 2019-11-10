import * as React from 'react'
// import { ServerConnection } from '@jupyterlab/services'
// import { URLExt } from '@jupyterlab/coreutils'
// import { NotebookPanel } from '@jupyterlab/notebook'
// import { toastr } from 'react-redux-toastr'
// import { Timeline } from 'react-twitter-widgets'
// import { Twitter } from './twitter'
// import { Content } from './content'
// import Spinner from './spinner'
// import ScreenCapture from './screencapture'
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import { CodeCell } from '@jupyterlab/cells'
// import * as html2canvas from 'html2canvas'
import '../style/index.css'
import '../style/screencapture.css'

  interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }
  
  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  export default function SimpleTabs() {
    const classes = useStyles({});
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="twitter-tabs">
            <Tab label="Item Oneeee" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div>Item One</div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>
    );
{/*
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
    this.signout = this.signout.bind(this)
    this.handleScreenCapture = this.handleScreenCapture.bind(this)
    this.getContent = this.getContent.bind(this)
    this.twitterInfo = this.twitterInfo.bind(this)
    this.removeCapture = this.removeCapture.bind(this)
    this.removeCaptures = this.removeCaptures.bind(this)
    this.postTweet = this.postTweet.bind(this)
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
  private signout() {
    new Twitter().signout().then(e => this.twitterInfo())
  }
  private handleScreenCapture(capture, width, height) {
    this.setState({
      capturing: false,
      capture: capture,
      captureWidth: width, 
      captureHeight: height
    })
  }
  private async getContent() {
    new Content().getContent(this.state.notebookPanel.context._path).then(res=> {
      console.log('---', res)
    })
  }
  private async twitterInfo() {
    new Twitter().twitterInfo().then(info => {
      this.setState({ twitterInfo: info })
    })
  }
  private removeCapture() {    
    this.setState({
      capture: '',
      captureWidth: 0,
      captureHeight: 0
    })
  }
  private removeCaptures(id: number) {    
    let c = this.state.captures
    c.splice(id, 1)
    this.setState({
      captures: c
    })
  }
  private async postTweet(tweet: any) {
    tweet.capture = this.state.capture
    tweet.captureHeight = this.state.captureHeight
    tweet.captureWidth = this.state.captureWidth
    this.setState({
      formDisabled: true
    })
    // DEPRECATED
    const res = await fetch('./twitter/post', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(tweet),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
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
  // DEPRECATED
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
*/}
}

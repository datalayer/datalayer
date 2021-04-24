import React, { useState, useEffect }  from 'react'
import { toastr } from 'react-redux-toastr'
import { Timeline } from 'react-twitter-widgets'

import { ServerConnection } from '@jupyterlab/services'
import { URLExt } from '@jupyterlab/coreutils'
import { NotebookPanel } from '@jupyterlab/notebook'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import TwitterIcon from '@material-ui/icons/Twitter';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TimelineIcon from '@material-ui/icons/Timeline';

import { Twitter } from './twitter'

import CircularProgress from '@material-ui/core/CircularProgress'
import ScreenCapture from './screencapture'

import '../style/index.css'
import '../style/screencapture.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tab: {
      minWidth: 50,
      maxWidth: 50,
      width: 50,
    },
    root: {
      flexGrow: 1,
      maxWidth: 500,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    }
  }
));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function SingleTabPanel(props: TabPanelProps) {
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

async function getTwitterInfo(setTwitterInfo) {
  new Twitter().twitterInfo().then(info => {
    setTwitterInfo(info)
  })
}

function signout(setTwitterInfo) {
  new Twitter().signout().then(e => getTwitterInfo(setTwitterInfo))
}

export default function TabPanel(props) {

  // styles.
  const classes = useStyles({});

  // Utils.
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // States.
  const [value, setValue] = useState(0);
  const [notebookPanel, setNotebookPanel] = useState()
  const [twitterInfo, setTwitterInfo] = useState({
      name: '',
      screen_name: '',
      username: ''
    });
  const [tweetText, setTweetText] = useState('');
  const [formDisabled, setFormDisabled] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [capture, setCapture] = useState('');
//  const [captures, setCaptures] = useState([]);
  const [captureWidth, setCaptureWidth] = useState(0.0);
  const [captureHeight, setCaptureHeight] = useState(0.0);
  
  // Effects.
  useEffect(() => {
    getTwitterInfo(setTwitterInfo)
    props.notebookTracker.currentChanged.connect((sender, e) => { 
      let nbp = e as NotebookPanel
      notebookPanel
      setNotebookPanel(nbp)
    })
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    eventer(messageEvent, e  => {
      if (e.data.twitterAuth) {
        getTwitterInfo(setTwitterInfo)
      }
    }, 
    false)
    },
    []); // The effect will only run once when the component mounts.

  const handleScreenCapture = (capture, width, height) => {
    setCapturing(false)
    setCapture(capture)
    setCaptureWidth(width)
    setCaptureHeight(height)
  }

  const removeCapture = () => {
    setCapture('')
    setCaptureWidth(0.0)
    setCaptureHeight(0.0)
  }
    
  const postTweet = () => {
    const tweet = {
      status: tweetText,
      capture: capture,
      captureHeight: captureHeight,
      captureWidth: captureWidth,
    }
    console.log('Sending Tweet', tweet)
    setFormDisabled(true)
    new Twitter().post(tweet).then(res => {
      setFormDisabled(false)
      console.log('Tweet Post Result', res)
      if (res.success) {
        toastr.success('Success', 'Your Tweet has been posted')
      }
      else {
        toastr.error('Failure', 'Something went wrong...')
      }
    })
  }
/*
  const logContent = () => {
    new Content().getContent(notebookPanel.context._path).then(res => {
      console.log('---', res)
    })
  }  
// import { CodeCell } from '@jupyterlab/cells'
// import * as html2canvas from 'html2canvas'
  const removeCaptures= (id: number) => {
    let c = this.state.captures
    c.splice(id, 1)
    this.setState({
      captures: c
    })
  }
// import { Content } from './content'
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
  const onTweetTextChanged = (e) => {
    setTweetText(e.target.value)
  }

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

    <Paper square className={classes.root}>

      <Tabs
        value={value}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
      >
        <Tab icon={<TwitterIcon />} aria-label="phone" className={classes.tab} />
        <Tab icon={<TimelineIcon />} aria-label="favorite" className={classes.tab} />
        <Tab icon={<AccountCircleIcon />} aria-label="person" className={classes.tab} />
      </Tabs>

      <SingleTabPanel value={value} index={0}>
        <form noValidate autoComplete="off">
          <TextField
            label="Tweet"
            placeholder="Type your tweet"
            margin="normal"
            multiline={true}
            rows={2}
            value={tweetText}
            className={classes.textField}
            disabled={formDisabled}
            onChange={onTweetTextChanged}
            />
        </form>
        {
          !formDisabled && 
          <div>
            <div>
              <Button onClick={ e => { e.preventDefault(); postTweet() }} variant="contained" color="primary" className={classes.button}>
                Tweet
              </Button>
            </div>
            {/*
            <div>
              <button onClick={ e => { e.preventDefault(); logContent() }}>Log Content</button>
            </div>
            */}
            <ScreenCapture onEndCapture={handleScreenCapture}>
              {({ onStartCapture }) => (
                <React.Fragment>
                  <Button onClick={ onStartCapture } variant="contained" className={classes.button}>
                    Capture
                  </Button>
                </React.Fragment>
              )}
            </ScreenCapture>
          </div>
        }
        <div>
          { (capturing || formDisabled) && 
            <div style={{ display: "flex", justifyContent: "center" }}>
{/*
    I           <Spinner size={50} className='ms-textAlignCenter' />
*/}
              <CircularProgress />
            </div>
          }
        </div>
        { (capture != '') && 
          <div>
            { (! formDisabled) && 
            <div>
              <Button onClick={ e => { e.preventDefault(); removeCapture(); } } color="secondary" variant="contained" className={classes.button}>
                REMOVE CAPTURE
              </Button>
            </div>
            }
            <div>
              <img src={ capture } width={ captureWidth } height={ captureHeight } />
            </div>
          </div>
        }
{/*
        {
          captures.map((c, i) => {
            return (
              <div>
                <img key={i} src={c.toDataURL('image/png')} style={{ width: '100%' }} />
                <br/>
                <a href='' onClick={ e => { e.preventDefault(); removeCaptures(i); } }>Remove</a>
              </div>
            )
          })
        }
*/}
      </SingleTabPanel>

      <SingleTabPanel value={value} index={1}>
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
      </SingleTabPanel>

      <SingleTabPanel value={value} index={2}>
        <div className="jp-TwitterLoginScreen">
          <div className="jp-TwitterDrive-logo"></div>
          <div className="jp-TwitterDrive-text">
            Twitter
          </div>
          <button className="jp-Dialog-button jp-mod-styled jp-mod-accept" title="Log into your Twitter account"
            onClick={ (e) => { e.preventDefault(); signout(setTwitterInfo); } }
          >
            SIGN OUT
          </button>
        </div>
      </SingleTabPanel>

    </Paper>

  )

}

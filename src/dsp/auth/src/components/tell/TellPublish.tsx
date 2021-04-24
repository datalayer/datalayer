import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { makeStyles } from "@material-ui/core/styles";
import { authContext } from "../../auth/AuthContext";
import TellPublishPreview from "./TellPublishPreview";
import TellOutputshot from './TellOutputshot';
import { tabsStyle } from 'dspWidgets/Widgets';
import { ATell } from "./../../model/TellModel";
import { selectTell, tellActions } from '../../state/tell';
import { getLibraryServer } from './../../config/AuthConfig';
import { Clearfix, Button } from 'dspWidgets/W1';

const useStyles = makeStyles(tabsStyle);

const MAX_OUTPUTSHOT_SIZE = 300000;

const TellPublish = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const auth = useContext(authContext);
  const tell = selectTell();
  const [descriptionState, setDescriptionState] = React.useState('');

  const onPublishClick = () => {
    if (tell.outputshotData.length > MAX_OUTPUTSHOT_SIZE) {
      enqueueSnackbar(`Output screenshot is too large (actual size is ${tell.outputshotData.length}, the maximum allowed is ${MAX_OUTPUTSHOT_SIZE})`, { variant: 'error' });
      return;
    }
    auth.apiRequest({
      url: `${getLibraryServer()}/api/library/tell/publish`,
      method: 'POST',
      body: {
        ulid: tell.ulid,
        title: tell.title,
        username: tell.username,
        description: tell.description,
        source: tell.source,
        outputshotUrl: tell.outputshotUrl,
        outputshotData: tell.outputshotData,
      }
    }).then(resp => {
      if (resp.success) {
        const publishedTell = new ATell(resp.tell, tell.kernelAvailable);
        dispatch(tellActions.update.started(publishedTell))
        enqueueSnackbar('Successfully published', { variant: 'success' });
      } else {
        enqueueSnackbar(resp.message, { variant: 'warning' });
        if (resp.errors) {
          resp.errors!.map(error => enqueueSnackbar(error, { variant: 'warning' }));
        }
      }
    })
    .catch(err => {
      console.error(err);
      enqueueSnackbar('Server Error', { variant: 'error' });
    });
  }

  return (
    <>
      <TellOutputshot outputshotRef={props.outputshotRef} />
      <TellPublishPreview/>
      <Button variant='contained' color='info' type='submit' className={classes.spaced} onClick={onPublishClick}>
        Publish
      </Button>
      <Clearfix/>
    </>
  )
}

export default TellPublish;

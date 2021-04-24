import React, { createRef, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { getLibraryServer } from './../../config/AuthConfig';
import { selectTell, tellActions } from '../../state/tell';
import { authContext } from "../../auth/AuthContext";
import { ATell } from "./../../model/TellModel";
import TellCell from './TellCell';
import TellTabs from './TellTabs';
import { GridContainer, GridItem } from 'dspWidgets/W1';

const Tell = () => {
  const dispatch = useDispatch();
  const { username, ulid } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const auth = useContext(authContext);
  const tell = selectTell();
  const [loaded, setLoaded] = React.useState(false);
  const ref = createRef<HTMLDivElement>();
  useEffect(() => {
    if ((tell.username === username) && (tell.ulid === ulid)) {
      setLoaded(true);
    }
    if (!loaded) {
      auth.apiRequest({
        url: `${getLibraryServer()}/api/library/tell/${username}/${ulid}`,
        method: 'GET',
      }).then(resp => {
        if (resp.success) {
          const updatedTell = new ATell(resp.tell, tell.kernelAvailable);
          dispatch(tellActions.update.started(updatedTell));
          setLoaded(true);
        }
        else {
          enqueueSnackbar(resp.message, { variant: 'error' })
        }
      })
      .catch(err => {
        console.error(err);
        enqueueSnackbar('Server Error', { variant: 'error' });
      });
    }
  }, []);
  return (
    loaded ?
      <GridContainer>
        <GridItem xs={6}>
          { loaded && <TellCell outputshotRef={ref}/> }
        </GridItem>
        <GridItem xs={6}>
          <TellTabs outputshotRef={ref}/>
        </GridItem>
      </GridContainer>
    :
      <div></div>
  );
}

export default Tell;

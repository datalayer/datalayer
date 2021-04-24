import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { authContext } from "../../auth/AuthContext";
import { getLibraryServer } from './../../config/AuthConfig';
import { ATell } from "./../../model/TellModel";
import { selectTell, tellActions } from '../../state/tell';
import { useTypographyStyles } from "./../helpers/Styles";
import { Button, GridContainer, GridItem, Card, CardHeader, CardBody, CardFooter, Success } from 'dspWidgets/W1';
import { sectionCardsStyle } from 'dspWidgets/Widgets';

const useStyles = makeStyles(sectionCardsStyle);

const TellView = () => {
  const classes = useStyles();
  const typographyClasses = useTypographyStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loaded, setLoaded] = React.useState(false);
  const auth = useContext(authContext);
  const { username, ulid } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const tell = selectTell();
  const outputshot = tell.outputshotUrl
    ? tell.outputshotUrl
    : tell.outputshotData;
  useEffect(() => {
    if ((tell.username === username) && (tell.ulid === ulid)) {
      setLoaded(true);
    }
    if (!loaded) {
      auth.apiRequest({
        url: `${getLibraryServer()}/api/library/tell/published/${username}/${ulid}`,
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
          <Card blog>
            <CardHeader image>
              <a href="" onClick={e => e.preventDefault()}>
                <img src={outputshot} />
              </a>
              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: `url(${outputshot})`,
                  opacity: 1
                }}
              />
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={6}>
          <h3 className={typographyClasses.title}>{tell.title}, by @{tell.username}</h3>
          {
            (auth.user?.username === tell.username) &&
            <Button variant='contained' color='info' type='submit' onClick={() => navigate(`/${tell.username}/tell/${tell.ulid}`)}>
              Edit
            </Button>
          }
          <h5 style={{ whiteSpace: 'pre-wrap'}}>{tell.description}</h5>
          <h3 className={typographyClasses.title}>Source Code.</h3>
          <pre style={{ whiteSpace: 'pre-wrap'}}>
            {tell.source}
          </pre>
        </GridItem>
      </GridContainer>
    :
      <div></div>
  );
}

export default TellView;

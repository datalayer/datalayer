import React, { useState, useContext, useEffect } from "react";
import lazy from "./../../utils/Lazy";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
// import Visibility from "@material-ui/icons/Visibility";
import Code from "@material-ui/icons/Code";
import Timeline from "@material-ui/icons/Timeline";
import { validateLength} from "../../utils/Validator";
import Slide from "@material-ui/core/Slide";
import Group from "@material-ui/icons/Group";
import Add from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import { useSnackbar } from 'notistack';
import { authContext } from "./../../auth/AuthContext";
import { tellActions } from '../../state/tell';
import { selectUser } from '../../state/auth';
import { ATell, TellModel } from "./../../model/TellModel";
import { getLibraryServer } from './../../config/AuthConfig';
import { useTooltipStyles } from "./../helpers/Styles";
import { Dialog, DialogTitle, DialogContent } from "dspWidgets/Mui";
import { Button, Card, CustomInput, InfoArea, Table, GridContainer, GridItem } from "dspWidgets/W1";
import { contentAreasStyle, javascriptStyles } from "dspWidgets/Widgets";

const useJavacriptStyles = makeStyles(javascriptStyles as any);
const useStyles = makeStyles(contentAreasStyle as any);

const Tell = lazy(() => import("./Tell"));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
Transition.displayName = "Transition";
/*
const simpleButtons = [
//    { color: "info", icon: Visibility },
    { color: "success", icon: Edit },
//    { color: "danger", icon: Close }
  ].map((prop, key) => {
    return (
      <Button simple justIcon size="sm" color={prop.color} key={key}>
        <prop.icon />
      </Button>
    );
  });
*/
const Tells = () => {
  const classes = useStyles();
  const javascriptClasses = useJavacriptStyles();
  const tooltipClasses = useTooltipStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useContext(authContext);
  const user = selectUser();
  const [tells, setTells] = useState(new Array<TellModel>());
  const [tellModal, setTellModal] = useState(false);
  const [title, setTitle] = React.useState('');
  const [titleState, setTitleState] = React.useState('');
  const [description, setdescription] = React.useState('');
  const [descriptionState, setDescriptionState] = React.useState('');
  const onClick = async () => {
    if (titleState === 'success' && descriptionState === 'success') {
      auth.apiRequest({
        url: `${getLibraryServer()}/api/library/tell`,
        method: 'POST',
        body: {
          title: title,
          username: user.username,
          description: description,
        }
        }).then(resp => {
        if (resp.success) {
          const tell = new ATell(resp.tell);
          dispatch(tellActions.create.started(tell))
          navigate(`/${user.username}/tell/${tell.ulid}`);
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
    if (titleState === '') {
      setTitleState('error');
    }
    if (descriptionState === '') {
      setDescriptionState('error');
    }
    return false;
  }
  useEffect(() => {
    auth.apiRequest({
      url: `${getLibraryServer()}/api/library/tells/${user.username}`,
      method: 'GET',
    }).then(resp => {
      if (resp.success) {
        const tells = resp.tells.map(t => new ATell(t));
        setTells(tells);
      }
      else {
        enqueueSnackbar(resp.message, { variant: 'error' })
      }
    })
    .catch(err => {
      console.error(err);
      enqueueSnackbar('Server Error', { variant: 'error' });
    });
    Tell.preload();
  }, []);
  return (
    <>
    <Tooltip 
        title="Tell something with code"
        classes={{ tooltip: tooltipClasses.tooltip }}
        onClick={() => setTellModal(true)}
        >
        <Button color="success" justIcon round>
          <Add />
        </Button>
      </Tooltip>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6} lg={6}>
          <Dialog
            classes={{
              root: javascriptClasses.modalRoot,
              paper: javascriptClasses.modal + " " + javascriptClasses.modalSignup
            }}
            open={tellModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setTellModal(false)}
            aria-labelledby="signup-modal-slide-title"
            aria-describedby="signup-modal-slide-description"
          >
            <Card plain className={javascriptClasses.modalSignupCard}>
              <DialogTitle
                id="signup-modal-slide-title"
                disableTypography
                className={javascriptClasses.modalHeader}
              >
                <Button
                  simple
                  className={javascriptClasses.modalCloseButton}
                  key="close"
                  aria-label="Close"
                  onClick={() => setTellModal(false)}
                >
                  {" "}
                  <Close className={javascriptClasses.modalClose} />
                </Button>
                <h3
                  className={javascriptClasses.cardTitle + " " + javascriptClasses.modalTitle}
                >
                  Tell something.
                </h3>
              </DialogTitle>
              <DialogContent
                id="signup-modal-slide-description"
                className={javascriptClasses.modalBody}
              >
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={5}
                    md={5}
                    className={javascriptClasses.mlAuto}
                  >
                    <InfoArea
                      className={javascriptClasses.infoArea}
                      title="Use your coding skills"
                      description={
                        <p>
                          We support Python.
                        </p>
                      }
                      icon={Code}
                      iconColor="primary"
                    />
                    <InfoArea
                      className={javascriptClasses.infoArea}
                      title="Built Audience"
                      description={
                        <p>
                          You can create cards to be published.
                        </p>
                      }
                      icon={Group}
                      iconColor="info"
                    />
                    <InfoArea
                      className={javascriptClasses.infoArea}
                      title="Follow"
                      description={
                        <p>
                          Be social and get traction.
                        </p>
                      }
                      icon={Timeline}
                      iconColor="rose"
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={5}
                    md={5}
                    className={javascriptClasses.mrAuto}
                  >
                    <form 
                      className={javascriptClasses.form}
                      >
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: javascriptClasses.customFormControlClasses
                        }}
                        success={titleState === "success"}
                        error={titleState === "error"}
                        labelText="Title"
                        inputProps={{
                          onChange: event => {
                            if (validateLength(event.target.value, 1)) {
                              setTitleState("success");
                            } else {
                              setTitleState("error");
                            }
                            setTitle(event.target.value);
                          },
                        }}
                      />
                      <CustomInput
                        success={descriptionState === "success"}
                        error={descriptionState === "error"}
                        formControlProps={{
                          fullWidth: true,
                          className: javascriptClasses.customFormControlClasses
                        }}
                        labelText="Description"
                        inputProps={{
                          multiline: true,
                          rows: 5,
                          onChange: event => {
                            if (validateLength(event.target.value, 1)) {
                              setDescriptionState("success");
                            } else {
                              setDescriptionState("error");
                            }
                            setdescription(event.target.value);
                          },
                        }}
                      />
                      <div className={javascriptClasses.textCenter}>
                        <Button 
                          round
                          onClick={onClick}
                          color="primary"                      
                        >
                          Get started
                        </Button>
                      </div>
                    </form>
                  </GridItem>
                </GridContainer>
              </DialogContent>
            </Card>
          </Dialog>
        </GridItem>
      </GridContainer>
      <Table
        tableHead={[
          "Title",
          "Description",
          "Created",
          "Last Published",
          ""
        ]}
        tableData={
          tells.map(tell => [
            tell.title, 
            tell.description,
            tell.creationDate, 
            tell.lastPublicationDate,
            [
              <Button 
                simple
                justIcon
                size='sm'
                color='success'
                key='success'
                onClick={() => navigate(`/${tell.username}/tell/${tell.ulid}`)}>
                <Edit />
              </Button>
            ]
          ])
        }
        customCellClasses={[
          classes.textCenter,
          classes.textRight,
          classes.textRight
        ]}
        customClassesForCells={[0, 4, 5]}
        customHeadCellClasses={[
          classes.textCenter,
          classes.textRight,
          classes.textRight
        ]}
        customHeadClassesForCells={[0, 4, 5]}
      />
    </>
  );
}

export default Tells;

import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { authContext } from "../../auth/AuthContext";
import { BoxPanelReact } from '@jupyter-react/lumino-adapter/lib';
import { ATell } from "../../model/TellModel";
import { validateLength } from "../../utils/Validator";
import Cell from '../cell/Cell';
import { selectTell, tellActions } from '../../state/tell';
import { getLibraryServer } from '../../config/AuthConfig';
import { Button, CustomInput, SnackbarContent } from 'dspWidgets/W1';

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: "0px !important",
    marginBottom: "0px !important",
    fontSize: 'larger',
//    fontWeight: 'bolder',
  }
}));

const TellCell = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const auth = useContext(authContext);
  const tell = selectTell();
  const [title, setTitle] = React.useState(tell.title);
  const [titleState, setTitleState] = React.useState('');
  const onSaveClick = () => {
    auth.apiRequest({
      url: `${getLibraryServer()}/api/library/tell`,
      method: 'POST',
      body: {
        ulid: tell.ulid,
        title: tell.title,
        username: tell.username,
        description: tell.description,
        source: tell.source,
        outputshotUrl: tell.outputshotUrl,
      }
    }).then(resp => {
      if (resp.success) {
        const updatedTell = new ATell(resp.tell, tell.kernelAvailable);
        dispatch(tellActions.update.started(updatedTell))
        enqueueSnackbar('Successfully saved', { variant: 'success' });
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
    <div ref={props.outputshotRef}>
      <CustomInput
        id="title"
        formControlProps={{
          fullWidth: true
        }}
        success={titleState === "success"}
        error={titleState === "error"}
        labelText="Title *"
        inputProps={{
          value: tell.title,
          onChange: event => {
            const title = event.target.value;
            if (validateLength(title, 1)) {
              setTitleState("success");
            } else {
              setTitleState("error");
            }
            setTitle(title);
            dispatch(tellActions.update.started({
              title: title,
            }))
          },
          inputProps: {
            className: classNames(classes.textField),
          },
        }}
      />
      <BoxPanelReact>
        <Cell source={tell.source} dispatch={dispatch}/>
        { 
          !tell.kernelAvailable &&
            <SnackbarContent
              message={
                <span>
                  <b>Your kernel is starting...</b>
                </span>
              }
              close
              color="warning"
              icon="warning_outline"
            />
        }
      </BoxPanelReact>
      <Box p={1} />
      <Button variant='contained' color='info' type='submit' onClick={onSaveClick}>
        Save
      </Button>
    </div>
  );
}

export default TellCell;

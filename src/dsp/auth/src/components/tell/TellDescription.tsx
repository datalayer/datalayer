import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { authContext } from "../../auth/AuthContext";
import { validateLength} from "../../utils/Validator";
import { ATell } from "../../model/TellModel";
import { selectTell, tellActions } from '../../state/tell';
import { getLibraryServer } from '../../config/AuthConfig';
import { Button, CustomInput } from 'dspWidgets/W1';
import { validationFormsStyle } from 'dspWidgets/Widgets';

const useStyles = makeStyles(validationFormsStyle);

const TellDescription = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const auth = useContext(authContext);
  const tell = selectTell();
  const [description, setdescription] = React.useState(tell.description);
  const [descriptionState, setDescriptionState] = React.useState('');
  const onSaveClick = () => {
    if (descriptionState === 'error') {
      return;
    }
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
    <>
      <CustomInput
        success={descriptionState === "success"}
        error={descriptionState === "error"}
        labelText="Description *"
        id="description"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          value: tell.description,
          multiline: true,
          rows: 5,
          onChange: event => {
            const description = event.target.value;
            if (validateLength(event.target.value, 1)) {
              setDescriptionState("success");
            } else {
              setDescriptionState("error");
            }
            setdescription(description);
            dispatch(tellActions.update.started({
              description: description,
            }));
          }
        }}
      />
      <div className={classes.formCategory}>
        <small>*</small> Required fields
      </div>
      <Box p={1} />
      <Button variant='contained' color='info' type='submit' className={classes.spaced} onClick={onSaveClick}>
        Save
      </Button>
    </>
  )
}

export default TellDescription;

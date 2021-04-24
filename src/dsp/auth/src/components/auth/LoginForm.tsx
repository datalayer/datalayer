import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Box, FormControl, FormGroup } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import useErrorHook from '../../hooks/ErrorHook';
import { authContext } from "./../../auth/AuthContext";
import { getAuthServer } from './../../config/AuthConfig';
import ErrorMessage from "./../../hooks/ErrorMessage";
import Box1 from '../helpers/Box1';
import VerticalSeparator1 from '../helpers/VerticalSeparator1';
import { Button } from "dspWidgets/W1";
import { useTypographyStyles, useFormStyles } from "./../helpers/Styles";

// import { validationFormsStyle } from 'dspWidgets/Widgets';
// const useStyles = makeStyles(validationFormsStyle);

const LoginForm = (props: any) => {
  const classes: any = useFormStyles();
  const typographyClasses: any = useTypographyStyles();
/*
  const [loginEmail, setloginEmail] = React.useState("");
  const [loginEmailState, setloginEmailState] = React.useState("");
  const [loginPassword, setloginPassword] = React.useState("");
  const [loginPasswordState, setloginPasswordState] = React.useState("");
  const loginClick = () => {
    if (loginEmailState === "") {
      setloginEmailState("error");
    }
    if (loginPasswordState === "") {
      setloginPasswordState("error");
    }
  };
*/
  const auth = useContext(authContext);
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { error, showError } = useErrorHook(null);
  const [loading, setLoading] = useState(false);
  const [formContents, setFormContents] = useState({  
    username: '',
    password: ''
  });
  const { handleSubmit, control, reset, errors, triggerValidation, formState, register, setError, clearError } = useForm({
    defaultValues: formContents
  });
//  const hasError = field => errors[field] !== undefined;
//  const getError = field => hasError(field) && errors[field].message;
  const onSubmit = async (data) => {
    setLoading(true);
    auth.apiRequest({
      url: `${getAuthServer()}/api/auth/login`,
      method: "POST",
      body: {
        username: data.username,
        password: data.password
      }
    }).then(resp => {
      setLoading(false);
      if (resp.success) {
        auth.setAuthStatus(resp.user, resp.token);
        navigate("/");
      } else {
        enqueueSnackbar(resp.message, { variant: 'warning' });
        if (resp.errors) {
          resp.errors!.map(error => enqueueSnackbar(error, { variant: 'warning' }));
        }
      }
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
      enqueueSnackbar('Server Error', { variant: 'error' });
    });
  };
  return (
    <Box1>
      <h2 className={typographyClasses.title}>Login on Datalayer.</h2>
      {error && <ErrorMessage message={error} />}
      <form 
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl
          fullWidth
          component='fieldset'
          margin='normal'
        >
        <FormGroup aria-label='Login' row={false}>
          <Controller
            as={TextField}
            id='username'
            name='username' 
            variant='outlined'
            label='Username'
            control={control}
            fullWidth
            className={classes.spaced}
            rules={{
              required: 'This field is required'
            }}
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : ''}
          />
          <Controller
            as={TextField}
            id='password'
            name='password' 
            variant='outlined'
            label='Password'
            control={control}
            type='password'
            fullWidth
            className={classes.spaced}
            rules={{
              required: 'This field is required',
            }}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
          </FormGroup>
        </FormControl>
        <Button variant='contained' color='success' type='submit' className={classes.spaced} disabled={loading}>
          {loading ? "Signing..." : "Login"}
        </Button>
        <VerticalSeparator1 />
        <Button variant='contained' color='secondary' onClick={e => reset()} disabled={loading}>
          {loading ? "Signing..." : "Reset Form"}
        </Button>
        <Box p={1} />
        <Link to="/join">Don't have an account?</Link>
        <Box p={1} />
        <Link to="/new/password">Forgot Password?</Link>
      </form>
{/*
      <form>
        <CustomInput
          success={loginEmailState === "success"}
          error={loginEmailState === "error"}
          labelText="Email Address *"
          id="loginemail"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            onChange: event => {  
              if (verifyEmail(event.target.value)) {
                setloginEmailState("success");
              } else {
                setloginEmailState("error");
              }
              setloginEmail(event.target.value);
            },
            type: "email"
          }}
        />
        <CustomInput
          success={loginPasswordState === "success"}
          error={loginPasswordState === "error"}
          labelText="Password *"
          id="loginpassword"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            onChange: event => {
              if (validateLength(event.target.value, 1)) {
                setloginPasswordState("success");
              } else {
                setloginPasswordState("error");
              }
              setloginPassword(event.target.value);
            },
            type: "password",
            autoComplete: "off"
          }}
        />
        <div className={classes.formCategory}>
          <small>*</small> Required fields
        </div>
        <div className={classes.center}>
          <Button color="rose" onClick={loginClick}>
            Login
          </Button>
        </div>
      </form>
*/}      
    </Box1>
  );
}

export default LoginForm;

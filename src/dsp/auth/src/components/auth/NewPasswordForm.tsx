import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, FormControl, FormGroup } from '@material-ui/core';
import { Button } from "dspWidgets/W1";
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { authContext } from "./../../auth/AuthContext";
import { getAuthServer } from './../../config/AuthConfig';
import Box1 from '../helpers/Box1';
import ErrorMessage from "./../../hooks/ErrorMessage";
import useErrorHook from '../../hooks/ErrorHook';
import { useTypographyStyles, useFormStyles } from "./../helpers/Styles";

const NewPasswordForm = (props: any) => {
  const classes = useFormStyles();
  const typographyClasses = useTypographyStyles();
  const auth = useContext(authContext);
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { error, showError } = useErrorHook(null);
  const [loading, setLoading] = useState(false);
  const [formContents, setFormContents] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    submission: null
  });
  const { handleSubmit, control, reset, errors, triggerValidation, formState, register, setError, clearError } = useForm({
    defaultValues: formContents
  });
  const hasError = field => errors[field] !== undefined;
//  const getError = field => hasError(field) && errors[field].message;
  const validateForm = (data) => {
    if (data.password !== data.passwordConfirm) {
//      showError('Make sure your passwords match.');
      enqueueSnackbar('Please make sure your passwords match.', { variant: 'warning' })
      return false;
    }
    return true;
  };
  const onSubmit = async (data) => {
    if (validateForm(data)) {
      setLoading(true);
      auth.apiRequest({
        url: `${getAuthServer()}/api/auth/new/password`,
        method: 'POST',
        body: {
          username: data.username,
          password: data.password,
          passwordConfirm: data.passwordConfirm
        }
      }).then(resp => {
          setLoading(false);
          if (resp.success) {
            enqueueSnackbar(resp.message, { variant: 'success' })
            navigate('/')
          } else {
//            showError(resp.errors);
            enqueueSnackbar(resp.message, { variant: 'error' })
            resp.errors!.map(error => enqueueSnackbar(error, { variant: 'error' }));
          }
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
//          setError("submission", "submission", 'Error');
          enqueueSnackbar('Server Error', { variant: 'error' })
        });
    }
  };
  return (
    <Box1>
      <h2 className={typographyClasses.title}>Ask a new password.</h2>
      {error && <ErrorMessage message={error} />}
{/*
      {errors.submission && <SnackbarContent message={errors.submission.message} color='warning' close />}
*/}
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
              label='New Password'
              variant='outlined'
              fullWidth
              type='password'
              control={control}
              className={classes.spaced}
              rules={{
                required: 'This field is required'
              }}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
            <Controller
              as={TextField}
              id='passwordConfirm'
              name='passwordConfirm'
              label='Confirm your new Password'
              variant='outlined'
              fullWidth
              type='password'
              control={control}
              className={classes.spaced}
              rules={{
                required: 'This field is required'
              }}
              error={!!errors.passwordConfirm}
              helperText={errors.passwordConfirm ? errors.passwordConfirm.message : ''}
            />
          </FormGroup>
        </FormControl>
        <Button variant='contained' color='success' type='submit' className={classes.spaced} disabled={loading}>
          {loading ? "Loading..." : "Request New Password"}
        </Button>
        <Button variant='contained' color='secondary' onClick={e => reset()} disabled={loading}>
          {loading ? "Loading..." : "Reset Form"}
        </Button>
      </form>
    </Box1>
  );
}

export default NewPasswordForm;

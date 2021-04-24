import React, { useState, useContext } from 'react';
import classNames from "classnames";
import { TextField, FormControl, FormHelperText, FormGroup, FormControlLabel } from '@material-ui/core';
import { Button } from "dspWidgets/W1";
import { Checkbox } from "dspWidgets/Mui";
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import useErrorHook from '../../hooks/ErrorHook';
import { authContext } from "./../../auth/AuthContext";
import { getAuthServer } from './../../config/AuthConfig';
import ErrorMessage from "./../../hooks/ErrorMessage";
import Box1 from '../helpers/Box1';
import VerticalSeparator1 from '../helpers/VerticalSeparator1';
import { useTypographyStyles, useFormStyles } from "./../helpers/Styles";

const JoinForm = (props: any) => {
  const formClasses = useFormStyles();
  const typographyClasses: any = useTypographyStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const auth = useContext(authContext);
  const navigate = useNavigate();
  const { error, showError } = useErrorHook(null);
  const [loading, setLoading] = useState(false);
  const [formContents, setFormContents] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: '',
    terms: false, 
    submission: null
  });
  const { handleSubmit, control, reset, errors, triggerValidation, formState, register, setError, clearError } = useForm({
    defaultValues: formContents
  });
  const hasError = field => errors[field] !== undefined;
  const getError = field => hasError(field) && errors[field].message;
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
        url: `${getAuthServer()}/api/auth/join`,
        method: 'POST',
        body: {
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
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
            enqueueSnackbar(resp.message, { variant: 'warning' })
            resp.errors!.map(error => enqueueSnackbar(error, { variant: 'error' }));
          }
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
//          setError("submission", "submission", 'Server Error');
          enqueueSnackbar('Server Error', { variant: 'error' })
        });
    }
  };
  return (
    <Box1>
      <h2 className={classNames(typographyClasses.title, formClasses.formTitle)}>Join Datalayer.</h2>
      {error && <ErrorMessage message={error} />}
{/*
      {errors.submission && <SnackbarContent message={errors.submission.message} color='warning' close />}
*/}
      <form 
        className={formClasses.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl
          fullWidth
          component='fieldset'
          margin='normal'
          error={hasError('terms')}
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
            className={formClasses.spaced}
            rules={{
              required: 'This field is required'
            }}
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : ''}
          />
          <Controller
            as={TextField}
            id='email'
            name='email' 
            variant='outlined'
            label='Mail'
            control={control}
            fullWidth
            className={formClasses.spaced}
            rules={{
              required: 'This field is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address'
              }
            }}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
          <Controller
            as={TextField}
            id='firstName'
            name='firstName'
            label='First Name'
            variant='outlined'
            fullWidth
            control={control}
            className={formClasses.spaced}
            rules={{
              required: 'This field is required'
            }}
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName.message : ''}
          />
          <Controller
            as={TextField}
            id='lastName'
            name='lastName'
            label='Last Name'
            variant='outlined'
            fullWidth
            control={control}
            className={formClasses.spaced}
            rules={{
              required: 'This field is required'
            }}
            error={!!errors.lastName}
            helperText={errors.lastName ? errors.lastName.message : ''}
          />
          <Controller
            as={TextField}
            id='password'
            name='password'
            label='Password'
            variant='outlined'
            fullWidth
            type='password'
            control={control}
            className={formClasses.spaced}
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
            label='Confirm your Password'
            variant='outlined'
            fullWidth
            type='password'
            control={control}
            className={formClasses.spaced}
            rules={{
              required: 'This field is required'
            }}
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm ? errors.passwordConfirm.message : ''}
          />
{/*
          <FormControlLabel
            control={
              <Controller
                as={Checkbox}
                id='terms'
                color="primary"
                name='terms'
                control={control}
                rules={{
                  required: 'Please accept the terms'
                }}
              />
              }
            label='Accept Terms'
          />
*/}
          </FormGroup>
          {hasError('terms') && (
            <FormHelperText error={hasError('terms')}>
              {getError('terms')}
            </FormHelperText>
          )}
        </FormControl>
        <Button variant='contained' color='success' type='submit' className={formClasses.spaced} disabled={loading}>
          {loading ? "Loading..." : "Request to join - Check you email for the invite"}
        </Button>
        <VerticalSeparator1/>
        <Button variant='contained' color='secondary' onClick={e => reset()} disabled={loading}>
          {loading ? "Loading..." : "Reset Form"}
        </Button>
      </form>
    </Box1>
  );
}

export default JoinForm;

import React from 'react';
import { useSnackbar } from 'notistack';
import Login from './LoginForm';

const NewPasswordWelcome = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  enqueueSnackbar("Welcome back to Datalayer - Login with your username and new password", { variant: 'success' });
  return <>
    <Login/>    
  </>
}

export default NewPasswordWelcome;

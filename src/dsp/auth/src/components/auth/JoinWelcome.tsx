import React from 'react';
import { useSnackbar } from 'notistack';
import Login from './LoginForm';

const JoinWelcome = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  enqueueSnackbar("Welcome to Datalayer - Login with your username and password", { variant: 'success' });
  return <>
    <Login/>    
  </>
}

export default JoinWelcome;

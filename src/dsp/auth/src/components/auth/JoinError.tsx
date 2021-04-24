import React from 'react';
import { useSnackbar } from 'notistack';
import Login from './LoginForm';

const JoinError = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  enqueueSnackbar("Something may be wrong...", { variant: 'error' });
  return <>
    <Login/>    
  </>
}

export default JoinError;

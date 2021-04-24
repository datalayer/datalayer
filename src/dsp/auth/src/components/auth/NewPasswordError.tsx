import React from 'react';
import { useSnackbar } from 'notistack';
import Login from './LoginForm';

const NewPasswordError = () => {
  const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar("Something may be wrong...", { variant: 'error' });
  return <Login/>    
}

export default NewPasswordError;

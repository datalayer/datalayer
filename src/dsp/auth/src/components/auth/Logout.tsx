import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from './../../auth/AuthContext';

const Logout = () => {
  const auth = useContext(authContext);
  const navigate = useNavigate();
  auth.setUnauthStatus();
  useEffect(() => {
    navigate("/");
  })
  return <></>
};

export default Logout;

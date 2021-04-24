import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { authContext } from "dspAuth/AuthContext";

const LandingHeader = (props: any) => {
  console.log('---', authContext)
  const { user } = useContext(authContext);
  console.log('---', user)
  return (
    <>
      {user ? (
        <>
          <Link to="/api/auth/profile">Profile</Link>
          {" | "}
          <Link to="/api/auth/logout">Logout</Link>
        </>
      ) : (
        <>
          <Link to="/api/auth/login">Login</Link>
          {" | "}
          <Link to="/api/auth/join">Join</Link>
        </>
      )}
    </>
  );
};

export default LandingHeader;

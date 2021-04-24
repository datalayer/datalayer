import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
// import { authContext } from "./../auth/AuthContext";
import { selectUser } from '../state/auth';
import Box1 from './helpers/Box1';
import Tells from './tell/Tells';
// import { DlaProduct1 } from "dspWidgets/Widgets";
import { useTypographyStyles } from "./helpers/Styles";

const Home = () => {
//   const { user } = useContext(authContext);
  const user = selectUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');      
    }
  });
  const classes = useTypographyStyles();
  return (
    <Box1>
      {!user ?
      /*
        <>
          <h2 className={classes.title}>Welcome to Datalayer.</h2>
          <h3 className={classes.title}>A micro-coding and social network for data</h3>
          <Link to='/login'>
            <Button color="success">
              Login
            </Button>
          </Link>
        </>
      <DlaProduct1/>
      navigate("/")
      */
        <div/>
      :
      <div>
        <h2 className={classes.title}>Hi {user.displayName}.</h2>
        <Tells/>
      </div>
      }
    </Box1>
  );
}

export default Home;

import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { authContext } from "../auth/AuthContext";
import { background } from "./AuthBackgrounds";
import { landingPageStyle, GridContainer, GridItem, Button, Parallax } from "dspWidgets/Landing";

const useStyles = makeStyles(landingPageStyle, {index: 999, classNamePrefix: 'AuthLayoutLanding'});

const AuthLayoutLanding = () => {
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles({});
  return (
    <>
      <div className={classes.minContent}>
        <Parallax image={background} filter="dark">
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <h1 className={classes.title}>Datalayer, microcoding platform for data.</h1>
                <h4>
                  Express yourself with python on datasets. Discover and learn from others while
                  getting noticed with your published data cards. We provide free access to data and code.
                  You create, share, socialize and have fun with code and data.
                </h4>
                <br />
                <Link to="/community">
                  <Button
                    color="danger"
                    size="lg"
                    href=""
                  >
                    <i className="fas fa-play" />
                    Cards
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    color="transparent"
                    size="lg"
                    href=""
                  >
                    <i className="" />
                    Login
                  </Button>
                </Link>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
{/*
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <DlaProduct1 />
            <DlaTeam1 />
            <DlaContact1 />
          </div>
        </div>
*/}
      </div>
{/*
      <DlaFooter1/>
*/}
      </>
  );
}

export default AuthLayoutLanding;

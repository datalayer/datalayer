import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Header } from "dspWidgets/W1";
import { Button } from "dspWidgets/W1";
import { Link } from "react-router-dom";

import { headersStyle as styles } from "dspWidgets/Widgets";

const useStyles = makeStyles(styles as any, {index: 1, classNamePrefix: 'DlaLandingHeader'});

export default function DlaHeader({ ...rest }) {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  };
  return (
    // we've set the className to cd-section so we can make smooth scroll to it
    <div className="cd-section" {...rest}>
      <div id="blanksection" />
{/*
      <div className={classes.sectionBlank} id="blanksection" />
*/}
      <div>
        <Header
          brand="Datalayer"
          color="transparent"
          fixed
          changeColorOnScroll={{
            height: 200,
            minHeight: '40px',
            color: "white",
          }}
          links={
            <div className={classes.collapse}>
              <List className={classes.list + " " + classes.mlAuto}>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#"
                    className={classes.navLink}
//                    onClick={e => e.preventDefault()}
                    color="transparent"
                    component={Link}
                    to='/api/auth/login'
                  >
                    Home
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#datalayer"
                    className={classes.navLink}
//                    onClick={e => e.preventDefault()}
                    color="transparent"
                    component={Link}
                    to='/api/auth/login'
                  >
                    About us
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#datalayer"
                    className={classes.navLink}
//                    onClick={e => e.preventDefault()}
                    color="transparent"
                    component={Link}
                    to='/api/auth/login'
                  >
                    Products
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#datalayer"
                    className={classes.navLink}
//                    onClick={e => e.preventDefault()}
                    color="transparent"
                    component={Link}
                    to='/api/auth/login'
                  >
                    Contact us
                  </Button>
                </ListItem>
              </List>
              <List className={classes.list + " " + classes.mlAuto}>
                <ListItem className={classes.listItem}>
                  <Button
                    color="transparent"
                    href="https://twitter.com/datalayerio"
                    target="_blank"
                    className={classes.navLink + " " + classes.navLinkJustIcon}
                  >
                    <i className={"fab fa-twitter"} />
                  </Button>
                </ListItem>
              </List>
              </div>
          }
          {...rest}
        />
      </div>
    </div>
  );
}

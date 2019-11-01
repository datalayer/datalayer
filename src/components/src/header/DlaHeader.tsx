import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Share from "@material-ui/icons/Share";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
// core components
import {Header} from "@datalayer/widgets";
import {Button} from "@datalayer/widgets";
import {GridContainer} from "@datalayer/widgets";
import {GridItem} from "@datalayer/widgets";
import {Card} from "@datalayer/widgets";
import {CardBody} from "@datalayer/widgets";
import {CustomInput} from "@datalayer/widgets";

import headersStyle from "./../assets/jss/material-kit-pro-react/views/sectionsSections/headersStyle.js";

const useStyles = makeStyles(headersStyle as any);

export default function DlaHeader({ ...rest }) {
  const classes = useStyles({});
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
            color: "white",
            minHeight: "40px",
          }}
          links={
            <div className={classes.collapse}>
              <List className={classes.list + " " + classes.mlAuto}>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#datalayer"
                    className={classes.navLink}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    Home
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#datalayer"
                    className={classes.navLink}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    About us
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#datalayer"
                    className={classes.navLink}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    Products
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#datalayer"
                    className={classes.navLink}
                    onClick={e => e.preventDefault()}
                    color="transparent"
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

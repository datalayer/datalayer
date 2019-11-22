/*eslint-disable*/ import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import {Header} from "@datalayer/widgets";
import {Footer} from "@datalayer/widgets";
import {GridContainer} from "@datalayer/widgets";
import {GridItem} from "@datalayer/widgets";
import {Button} from "@datalayer/widgets";
import {HeaderLinks} from "@datalayer/widgets";
import {Parallax} from "@datalayer/widgets";

import DlaHeader from "./../header/DlaHeader"

import landingPageStyle from "../assets/jss/material-kit-pro-react/views/landingPageStyle.js";

// Sections for this page
import DlaProduct from "./../product/DlaProduct";
import DlaTeam from "./../team/DlaTeam";
import DlaContact from "./../contact/DlaContact";

const useStyles = makeStyles(landingPageStyle as any);

export default function LandingPage({ ...rest }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles({});
  return (
    <div>
      <DlaHeader />
      <Parallax image={require("./../assets/img/bg8.jpg")} filter="dark">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <h1 className={classes.title}>Your Story Starts With Us.</h1>
              <h4>
                Every landing page needs a small description after the big bold
                title, that{"'"}s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
              >
                <i className="fas fa-play" />
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <DlaProduct />
          <DlaTeam />
          <DlaContact />
        </div>
      </div>
      <Footer
        content={
          <div>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://www.creative-tim.com/?ref=mkpr-landing"
                    target="_blank"
                    className={classes.block}
                  >
                    Datalayer
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://www.creative-tim.com/presentation?ref=mkpr-landing"
                    target="_blank"
                    className={classes.block}
                  >
                    About us
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a href="//blog.creative-tim.com/" className={classes.block}>
                    Blog
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://www.creative-tim.com/license?ref=mkpr-landing"
                    target="_blank"
                    className={classes.block}
                  >
                    Licenses
                  </a>
                </ListItem>
              </List>
            </div>
            <div className={classes.right}>
              &copy; {new Date().getFullYear()} , made with{" "}
              <Favorite className={classes.icon} /> by{" "}
              <a
                href="https://www.creative-tim.com/?ref=mkpr-landing"
                target="_blank"
              >
                Datalayer
              </a>{" "}
              for a better web.
            </div>
          </div>
        }
      />
    </div>
  );
}

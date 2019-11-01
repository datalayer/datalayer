/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Mail from "@material-ui/icons/Mail";
import Favorite from "@material-ui/icons/Favorite";
// core components
import {GridContainer} from "@datalayer/widgets";
import {GridItem} from "@datalayer/widgets";
import {Button} from "@datalayer/widgets";
import {CustomInput} from "@datalayer/widgets";
import {Footer} from "@datalayer/widgets";

import styles from "../assets/jss/material-kit-pro-react/views/componentsSections/footerStyle.js";

const useStyles = makeStyles(styles as any);

export default function DlaFooterBy() {
  const classes = useStyles({});
  return (
    <div className={classes.right}>
      &copy; {new Date().getFullYear()} , made with{" "}
      <Favorite className={classes.icon} /> by{" "}
      <a
        href="https://datalayer.io"
        target="_blank"
        className={classes.aClasses}
      >
        Datalayer
      </a>{" "}
      for better knowledge.
    </div>
  );
}

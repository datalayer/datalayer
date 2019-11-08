/*eslint-disable*/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Favorite from "@material-ui/icons/Favorite";

import styles from "./../assets/jss/material-kit-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles as any);

export default function DlaFooterBy() {
  const classes = useStyles({});
  return (
    <div className={classes.right}>
      &copy; {new Date().getFullYear()}
      {" "}
      <a
        href="https://datalayer.io"
        target="_blank"
      >
        Datalayer
      </a>
      {" "}-{" "}
      Learn to{" "}
      <Favorite className={classes.icon} />
      {" "}Data.
    </div>
  );
}

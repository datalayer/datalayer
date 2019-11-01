/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
// core components
import {Button} from "@datalayer/widgets";
import {Footer} from "@datalayer/widgets";

import styles from "../assets/jss/material-kit-pro-react/views/componentsSections/footerStyle.js";

const useStyles = makeStyles(styles as any);

export default function DlaFooterAlt() {
  const classes = useStyles({});
  return (
    <Footer
      theme="white"
      content={
        <div>
          <div className={classes.left}>
            <a
              href="https://datlayer.io"
              target="_blank"
              className={classes.footerBrand}
            >
              Datalayer
            </a>
          </div>
          <div className={classes.pullCenter}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <a
                  href="https://blog.datalayer.io"
                  className={classes.block}
                >
                  Blog
                </a>
              </ListItem>
            </List>
          </div>
          <div className={classes.rightLinks}>
            <ul>
              <li>
                <Button
                  href="https://twitter.com/datalayerio"
                  target="_blank"
                  color="twitter"
                  justIcon
                  simple
                >
                  <i className="fab fa-twitter" />
                </Button>
              </li>
            </ul>
          </div>
        </div>
      }
    />
  );
}

/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Favorite from "@material-ui/icons/Favorite";
import Face from "@material-ui/icons/Face";
// core components
import {Header} from "@datalayer/widgets";
import {HeaderLinks} from "@datalayer/widgets";
import {Footer} from "@datalayer/widgets";
import {GridContainer} from "@datalayer/widgets";
import {GridItem} from "@datalayer/widgets";
import {Button} from "@datalayer/widgets";
import {Card} from "@datalayer/widgets";
import {CardBody} from "@datalayer/widgets";
import {CardHeader} from "@datalayer/widgets";
import {CustomInput} from "@datalayer/widgets";

import DlaHeader from "./../header/DlaHeader"
import DlaFooter from "./../footer/DlaFooter"
import Lorem from "./../example/Lorem"

import fixedLayoutStyle from "./../assets/jss/material-kit-pro-react/layouts/fixed.js";

const useStyles = makeStyles(fixedLayoutStyle as any);

export default function DlaFooterList() {
  const classes = useStyles({});
  return (
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
  );
}

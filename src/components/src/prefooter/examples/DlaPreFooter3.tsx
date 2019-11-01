import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import {GridContainer} from "@datalayer/widgets";
import {GridItem} from "@datalayer/widgets";
import {Button} from "@datalayer/widgets";
import {Card} from "@datalayer/widgets";
import {CardBody} from "@datalayer/widgets";
import {CustomInput} from "@datalayer/widgets";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui icons
import Mail from "@material-ui/icons/Mail";

import bg7 from "./../../assets/img/bg7.jpg";

import styles from "./../../assets/jss/material-kit-pro-react/views/componentsSections/preFooter.js";

const useStyles = makeStyles(styles as any);

export default function DlaPreFooter() {
  const classes = useStyles({});
  return (
    <div>
      <div
        className={classNames(
          classes.socialLine,
          classes.textCenter,
          classes.dark,
          classes.bigIcons
        )}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="white"
                justIcon
                simple
                href="#datalayer"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-twitter" />
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="white"
                justIcon
                simple
                href="#datalayer"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-facebook" />
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="white"
                justIcon
                simple
                href="#datalayer"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-google-plus-g" />
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="white"
                justIcon
                simple
                href="#datalayer"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-dribbble" />
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="white"
                justIcon
                simple
                href="#datalayer"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-youtube" />
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2} className={classes.border}>
              <Button
                color="white"
                justIcon
                simple
                href="#datalayer"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-instagram" />
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

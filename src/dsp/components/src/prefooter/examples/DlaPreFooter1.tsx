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
          classes.white
        )}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem md={12}>
              <h4 className={classes.title}>Thank you for your support!</h4>
            </GridItem>
            <Button
              color="twitter"
              round
              href="#datalayer"
              onClick={e => e.preventDefault()}
            >
              <i className="fab fa-twitter" /> Twitter · 2.5K
            </Button>
            <Button
              color="facebook"
              round
              href="#datalayer"
              onClick={e => e.preventDefault()}
            >
              <i className="fab fa-facebook" /> Facebook · 3.2k
            </Button>
            <Button
              color="google"
              round
              href="#datalayer"
              onClick={e => e.preventDefault()}
            >
              <i className="fab fa-google-plus-g" /> Google · 1.2k
            </Button>
            <Button
              color="dribbble"
              round
              href="#datalayer"
              onClick={e => e.preventDefault()}
            >
              <i className="fab fa-dribbble" /> Dribbble · 1.8k
            </Button>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

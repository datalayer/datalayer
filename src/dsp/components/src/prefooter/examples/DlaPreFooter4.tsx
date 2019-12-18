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
          classes.subscribeLine,
          classes.subscribeLineImage
        )}
        style={{ backgroundImage: `url(${bg7})` }}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={6}
              md={6}
              className={classNames(classes.mlAuto, classes.mrAuto)}
            >
              <div className={classes.textCenter}>
                <h3 className={classes.title}>Subscribe to our Newsletter</h3>
                <p className={classes.description}>
                  Join our newsletter and get news in your inbox every week! We
                  hate spam too, so no worries about this.
                </p>
              </div>
              <Card raised className={classes.card}>
                <CardBody className={classes.cardBody}>
                  <form>
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6} lg={8}>
                        <CustomInput
                          id="emailDlaPreFooter"
                          formControlProps={{
                            fullWidth: true,
                            className: classes.cardForm
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Mail />
                              </InputAdornment>
                            ),
                            placeholder: "Your Email..."
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6} lg={4}>
                        <Button
                          color="primary"
                          block
                          className={classes.subscribeButton}
                        >
                          subscribe
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </form>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

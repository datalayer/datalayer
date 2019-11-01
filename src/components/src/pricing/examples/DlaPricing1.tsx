import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Weekend from "@material-ui/icons/Weekend";
import Home from "@material-ui/icons/Home";
import Business from "@material-ui/icons/Business";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
// core components
import {GridContainer} from "@datalayer/widgets";
import {GridItem} from "@datalayer/widgets";
import {Card} from "@datalayer/widgets";
import {CardBody} from "@datalayer/widgets";
import {CardFooter} from "@datalayer/widgets";
import {Button} from "@datalayer/widgets";
import {NavPills} from "@datalayer/widgets";
import {Success} from "@datalayer/widgets";
import {Danger} from "@datalayer/widgets";

import pricingStyle from "./../../assets/jss/material-kit-pro-react/views/sectionsSections/pricingStyle.js";

import bg11 from "./../../assets/img/bg11.jpg";
import city from "./../../assets/img/examples/city.jpg";
import cardBlog3 from "./../../assets/img/examples/card-blog3.jpg";

const useStyles = makeStyles(pricingStyle as any);

export default function DlaPricing({ ...rest }) {
  const classes = useStyles({});
  return (
    <div className="cd-section" {...rest}>
      {/* Pricing 1 START */}
      <div
        className={
          classes.pricing + " " + classes.pricing1 + " " + classes.section
        }
        style={{ backgroundImage: `url(${bg11})` }}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={6}
              md={6}
              className={
                classes.mlAuto + " " + classes.mrAuto + " " + classes.textCenter
              }
            >
              <h2 className={classes.title}>Pick the best plan for you</h2>
              <h5 className={classes.description}>
                You have Free Unlimited Updates and Premium Support on each
                package.
              </h5>
              <div className={classes.sectionSpace} />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card pricing plain>
                <CardBody pricing plain>
                  <h6
                    className={
                      classes.cardCategory + " " + classes.marginBottom20
                    }
                  >
                    Freelancer
                  </h6>
                  <div className={classes.icon}>
                    <Weekend className={classes.iconWhite} />
                  </div>
                  <h3
                    className={
                      classes.cardTitleWhite + " " + classes.marginTop30
                    }
                  >
                    FREE
                  </h3>
                  <p className={classes.cardCategory}>
                    This is good if your company size is between 2 and 10
                    Persons.
                  </p>
                  <Button round color="white">
                    Choose plan
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card pricing raised>
                <CardBody pricing>
                  <h6
                    className={
                      classes.cardDescription + " " + classes.marginBottom20
                    }
                  >
                    SMALL COMPANY
                  </h6>
                  <div className={classes.icon}>
                    <Home className={classes.iconRose} />
                  </div>
                  <h3 className={classes.cardTitle + " " + classes.marginTop30}>
                    $29
                  </h3>
                  <p className={classes.cardDescription}>
                    This is good if your company size is between 2 and 10
                    Persons.
                  </p>
                  <Button round color="rose">
                    Choose plan
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card pricing plain>
                <CardBody pricing plain>
                  <h6
                    className={
                      classes.cardCategory + " " + classes.marginBottom20
                    }
                  >
                    MEDIUM COMPANY
                  </h6>
                  <div className={classes.icon}>
                    <Business className={classes.iconWhite} />
                  </div>
                  <h3
                    className={
                      classes.cardTitleWhite + " " + classes.marginTop30
                    }
                  >
                    $69
                  </h3>
                  <p className={classes.cardCategory}>
                    This is good if your company size is between 11 and 99
                    Persons.
                  </p>
                  <Button round color="white">
                    Choose plan
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card pricing plain>
                <CardBody pricing plain>
                  <h6
                    className={
                      classes.cardCategory + " " + classes.marginBottom20
                    }
                  >
                    ENTERPRISE
                  </h6>
                  <div className={classes.icon}>
                    <AccountBalance className={classes.iconWhite} />
                  </div>
                  <h3
                    className={
                      classes.cardTitleWhite + " " + classes.marginTop30
                    }
                  >
                    $159
                  </h3>
                  <p className={classes.cardCategory}>
                    This is good if your company size is 99+ persons.
                  </p>
                  <Button round color="white">
                    Choose plan
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      {/* Pricing 1 END */}
    </div>
  );
}

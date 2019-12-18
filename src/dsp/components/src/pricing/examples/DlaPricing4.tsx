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
      {/* Pricing 4 START */}
      <div className={classes.pricing}>
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
                  <h6 className={classes.cardCategory}>STARTUP</h6>
                  <h1 className={classes.cardTitle}>
                    <small>$</small> 0
                  </h1>
                  <ul>
                    <li>
                      <Success>
                        <Check />
                      </Success>{" "}
                      Sharing Tools
                    </li>
                    <li>
                      <Danger>
                        <Close />
                      </Danger>{" "}
                      Design Tools
                    </li>
                    <li>
                      <Danger>
                        <Close />
                      </Danger>{" "}
                      Private Messages
                    </li>
                    <li>
                      <Danger>
                        <Close />
                      </Danger>{" "}
                      Personal Brand
                    </li>
                  </ul>
                </CardBody>
                <CardFooter pricing className={classes.justifyContentCenter}>
                  <Button color="danger" round>
                    Downgrade Plan
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card pricing color="success">
                <CardBody pricing>
                  <h6 className={classes.marginBottom30}>SMALL COMPANY</h6>
                  <h1 className={classes.cardTitleWhite}>
                    <small>$</small> 89
                  </h1>
                  <ul>
                    <li>
                      <Check /> Sharing Tools
                    </li>
                    <li>
                      <Check /> Design Tools
                    </li>
                    <li>
                      <Close /> Private Messages
                    </li>
                    <li>
                      <Close /> Personal Brand
                    </li>
                  </ul>
                </CardBody>
                <CardFooter pricing className={classes.justifyContentCenter}>
                  <Button color="white" round disabled>
                    Current Plan
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card pricing plain>
                <CardBody pricing>
                  <h6 className={classes.cardCategory}>LARGE COMPANY</h6>
                  <h1 className={classes.cardTitle}>
                    <small>$</small> 189
                  </h1>
                  <ul>
                    <li>
                      <Success>
                        <Check />
                      </Success>{" "}
                      Sharing Tools
                    </li>
                    <li>
                      <Success>
                        <Check />
                      </Success>{" "}
                      Design Tools
                    </li>
                    <li>
                      <Success>
                        <Check />
                      </Success>{" "}
                      Private Messages
                    </li>
                    <li>
                      <Danger>
                        <Close />
                      </Danger>{" "}
                      Personal Brand
                    </li>
                  </ul>
                </CardBody>
                <CardFooter pricing className={classes.justifyContentCenter}>
                  <Button color="success" round>
                    Upgrade Plan
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card pricing plain>
                <CardBody pricing>
                  <h6 className={classes.cardCategory}>LARGE COMPANY</h6>
                  <h1 className={classes.cardTitle}>
                    <small>$</small> 189
                  </h1>
                  <ul>
                    <li>
                      <Success>
                        <Check />
                      </Success>{" "}
                      Sharing Tools
                    </li>
                    <li>
                      <Success>
                        <Check />
                      </Success>{" "}
                      Design Tools
                    </li>
                    <li>
                      <Success>
                        <Check />
                      </Success>{" "}
                      Private Messages
                    </li>
                    <li>
                      <Success>
                        <Check />
                      </Success>{" "}
                      Personal Brand
                    </li>
                  </ul>
                </CardBody>
                <CardFooter pricing className={classes.justifyContentCenter}>
                  <Button color="success" round>
                    Upgrade Plan
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      {/* Pricing 4 END */}
    </div>
  );
}

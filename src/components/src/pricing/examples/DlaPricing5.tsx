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
      {/* Pricing 5 START */}
      <div className={classes.pricing + " " + classes.sectionGray}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={4}
              md={4}
              className={classes.mlAuto + " " + classes.mrAuto}
            >
              <h2 className={classes.title}>
                Choose a plan for your next project
              </h2>
              <p className={classes.description}>
                You have Free Unlimited Updates and Premium Support on each
                package. You also have 20 days to request a refund if You{"'"}re
                not happy with your purchase.
              </p>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem
              xs={12}
              sm={7}
              md={7}
              className={classes.mlAuto + " " + classes.mrAuto}
            >
              <NavPills
                alignCenter
                color="primary"
                tabs={[
                  {
                    tabButton: "Personal",
                    tabContent: (
                      <GridContainer>
                        <GridItem xs={12} sm={6} md={6}>
                          <Card pricing raised>
                            <CardBody pricing>
                              <h6 className={classes.cardDescription}>
                                HTML PACKAGE
                              </h6>
                              <h1 className={classes.cardTitle}>
                                <small>$</small> 0
                              </h1>
                              <ul>
                                <li>
                                  <b>1</b> Developer
                                </li>
                                <li>
                                  <b>99+</b> Components
                                </li>
                                <li>
                                  <b>HTML</b> Elements
                                </li>
                                <li>
                                  <b>14</b> Page Examples
                                </li>
                              </ul>
                            </CardBody>
                            <CardFooter
                              pricing
                              className={classes.justifyContentCenter}
                            >
                              <Button color="primary" round>
                                FREE DOWNLOAD
                              </Button>
                            </CardFooter>
                          </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <Card pricing plain>
                            <CardBody pricing plain>
                              <h6 className={classes.cardDescription}>
                                HTML & SKETCH PACKAGE
                              </h6>
                              <h1 className={classes.cardTitle}>
                                <small>$</small> 79
                              </h1>
                              <ul>
                                <li>
                                  <b>1</b> Developer
                                </li>
                                <li>
                                  <b>199+</b> Components
                                </li>
                                <li>
                                  <b>HTML & Sketch</b> Elements
                                </li>
                                <li>
                                  <b>22</b> Page Examples
                                </li>
                              </ul>
                            </CardBody>
                            <CardFooter
                              pricing
                              className={classes.justifyContentCenter}
                            >
                              <Button color="white" round>
                                BUY NOW
                              </Button>
                            </CardFooter>
                          </Card>
                        </GridItem>
                      </GridContainer>
                    )
                  },
                  {
                    tabButton: "Commercial",
                    tabContent: (
                      <GridContainer>
                        <GridItem xs={12} sm={6} md={6}>
                          <Card pricing raised>
                            <CardBody pricing>
                              <h6 className={classes.cardDescription}>
                                HTML PACKAGE
                              </h6>
                              <h1 className={classes.cardTitle}>
                                <small>$</small> 159
                              </h1>
                              <ul>
                                <li>
                                  <b>5+</b> Developers
                                </li>
                                <li>
                                  <b>199+</b> Components
                                </li>
                                <li>
                                  <b>HTML</b> Elements
                                </li>
                                <li>
                                  <b>24</b> Page Examples
                                </li>
                              </ul>
                            </CardBody>
                            <CardFooter
                              pricing
                              className={classes.justifyContentCenter}
                            >
                              <Button color="primary" round>
                                BUY NOW
                              </Button>
                            </CardFooter>
                          </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <Card pricing plain>
                            <CardBody pricing plain>
                              <h6 className={classes.cardDescription}>
                                HTML & SKETCH PACKAGE
                              </h6>
                              <h1 className={classes.cardTitle}>
                                <small>$</small> 299
                              </h1>
                              <ul>
                                <li>
                                  <b>10+</b> Developers
                                </li>
                                <li>
                                  <b>299+</b> Components
                                </li>
                                <li>
                                  <b>HTML & Sketch</b> Elements
                                </li>
                                <li>
                                  <b>45</b> Page Examples
                                </li>
                              </ul>
                            </CardBody>
                            <CardFooter
                              pricing
                              className={classes.justifyContentCenter}
                            >
                              <Button color="white" round>
                                BUY NOW
                              </Button>
                            </CardFooter>
                          </Card>
                        </GridItem>
                      </GridContainer>
                    )
                  }
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
      {/* Pricing 5 END */}
    </div>
  );
}

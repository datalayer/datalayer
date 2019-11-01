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
      {/* Pricing 2 START */}
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
              <NavPills
                alignCenter
                color="rose"
                tabs={[
                  {
                    tabButton: "Monthly",
                    tabContent: ""
                  },
                  {
                    tabButton: "Yearly",
                    tabContent: ""
                  }
                ]}
              />
              <div className={classes.sectionSpace} />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4}>
              <Card pricing plain>
                <CardBody pricing plain>
                  <h6 className={classes.cardCategory}>FREE</h6>
                  <h1 className={classes.cardTitle}>
                    <small>$</small> 0 <small>/mo</small>
                  </h1>
                  <ul>
                    <li>
                      <b>1</b> Project
                    </li>
                    <li>
                      <b>5</b> Team Members
                    </li>
                    <li>
                      <b>55</b> Personal Contacts
                    </li>
                    <li>
                      <b>5.000</b> Messages
                    </li>
                  </ul>
                </CardBody>
                <CardFooter pricing className={classes.justifyContentCenter}>
                  <Button color="rose" round>
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <Card
                pricing
                raised
                background
                style={{ backgroundImage: `url(${cardBlog3})` }}
              >
                <CardBody pricing background>
                  <h6 className={classes.cardCategoryWhite}>PREMIUM</h6>
                  <h1 className={classes.cardTitleWhite}>
                    <small>$</small> 89 <small>/mo</small>
                  </h1>
                  <ul>
                    <li>
                      <b>500</b> Projects
                    </li>
                    <li>
                      <b>50</b> Team Members
                    </li>
                    <li>
                      <b>125</b> Personal Contacts
                    </li>
                    <li>
                      <b>15.000</b> Messages
                    </li>
                  </ul>
                </CardBody>
                <CardFooter pricing className={classes.justifyContentCenter}>
                  <Button color="white" round>
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <Card pricing plain>
                <CardBody pricing plain>
                  <h6 className={classes.cardCategory}>PLATINUM</h6>
                  <h1 className={classes.cardTitle}>
                    <small>$</small> 199 <small>/mo</small>
                  </h1>
                  <ul>
                    <li>
                      <b>1000</b> Projects
                    </li>
                    <li>
                      <b>100</b> Team Members
                    </li>
                    <li>
                      <b>550</b> Personal Contacts
                    </li>
                    <li>
                      <b>50.000</b> Messages
                    </li>
                  </ul>
                </CardBody>
                <CardFooter pricing className={classes.justifyContentCenter}>
                  <Button color="rose" round>
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      {/* Pricing 2 END */}
    </div>
  );
}

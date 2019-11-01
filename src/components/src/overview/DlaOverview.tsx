import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import {GridContainer} from "@datalayer/widgets";
import {GridItem} from "@datalayer/widgets";
import {InfoArea} from "@datalayer/widgets";
import {Card} from "@datalayer/widgets";
import {CardHeader} from "@datalayer/widgets";
import {CardBody} from "@datalayer/widgets";
// @material-ui icons
import Grid from "@material-ui/icons/GridOn";
import PhoneLink from "@material-ui/icons/Phonelink";
import AccessTime from "@material-ui/icons/AccessTime";
import AttachMoney from "@material-ui/icons/AttachMoney";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// images
import Vodafone from "./../assets/img/assets-for-demo/ourClients/vodafone.jpg";
import Microsoft from "./../assets/img/assets-for-demo/ourClients/microsoft.jpg";
import Harvard from "./../assets/img/assets-for-demo/ourClients/harvard.jpg";
import Standford from "./../assets/img/assets-for-demo/ourClients/stanford.jpg";
import profilePic1 from "./../assets/img/assets-for-demo/test1.jpg";
import profilePic2 from "./../assets/img/assets-for-demo/test2.jpg";
import profilePic3 from "./../assets/img/assets-for-demo/test3.jpg";

import overviewStyle from "./../assets/jss/material-kit-pro-react/views/presentationSections/overviewStyle.js";

const useStyles = makeStyles(overviewStyle as any);

export default function DlaOverview() {
  const classes = useStyles({});
  return (
      <div
        className={classes.features5}
        style={{
          backgroundImage: `url(${require("./../assets/img/assets-for-demo/features-5.jpg")})`
        }}
      >
        <GridItem md={8} className={classNames(classes.mlAuto, classes.mrAuto)}>
          <h2 className={classes.title}>Your work will get much easier</h2>
        </GridItem>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem sm={3} className={classes.featuresShow}>
              <InfoArea
                title="Material UI Grid"
                description={
                  <p>
                    Enjoy the fluid grid system based on 12 columns. Material
                    Kit PRO is built over Bootstrap and has all the benefits
                    that the framework comes with.
                  </p>
                }
                icon={Grid}
                iconColor="gray"
                vertical={true}
              />
            </GridItem>
            <GridItem sm={3} className={classes.featuresShow}>
              <InfoArea
                title="Fully Responsive"
                description={
                  <p>
                    This Material UI kit is built mobile-first and looks amazing
                    on any device. Regardless of the screen size, the website
                    content will naturally fit the given resolution.
                  </p>
                }
                icon={PhoneLink}
                iconColor="gray"
                vertical={true}
              />
            </GridItem>
            <GridItem sm={3} className={classes.featuresShow}>
              <InfoArea
                title="Save Time"
                description={
                  <p>
                    Using the Material Kit PRO will save you large amount of
                    time. You don{"'"}t have to worry about customising the
                    basic Bootstrap design or generating new components.
                  </p>
                }
                icon={AccessTime}
                iconColor="gray"
                vertical={true}
              />
            </GridItem>
            <GridItem sm={3} className={classes.featuresShow}>
              <InfoArea
                title="Save Money"
                description={
                  <p>
                    Creating your design from scratch with dedicated designers
                    can be very expensive. Using a kit is the best option to
                    start your development while bootstrapping your budget.
                  </p>
                }
                icon={AttachMoney}
                iconColor="gray"
                vertical={true}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
  );
}

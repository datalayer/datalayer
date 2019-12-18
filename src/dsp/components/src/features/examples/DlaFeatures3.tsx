import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import GroupWork from "@material-ui/icons/GroupWork";
import Airplay from "@material-ui/icons/Airplay";
import LocationOn from "@material-ui/icons/LocationOn";
import Extension from "@material-ui/icons/Extension";
import ChildFriendly from "@material-ui/icons/ChildFriendly";
import WatchLater from "@material-ui/icons/WatchLater";
import Code from "@material-ui/icons/Code";
import FormatPaint from "@material-ui/icons/FormatPaint";
import Dashboard from "@material-ui/icons/Dashboard";
import ViewCarousel from "@material-ui/icons/ViewCarousel";
import AccessTime from "@material-ui/icons/AccessTime";
import AttachMoney from "@material-ui/icons/AttachMoney";
// core components
import {GridContainer} from "@datalayer/widgets";
import {GridItem} from "@datalayer/widgets";
import {InfoArea} from "@datalayer/widgets";

import featuresStyle from "./../../assets/jss/material-kit-pro-react/views/sectionsSections/featuresStyle.js";

import iphone from "./../../assets/img/sections/iphone.png";
import iphone2 from "./../../assets/img/sections/iphone2.png";
import bg9 from "./../../assets/img/bg9.jpg";

const useStyles = makeStyles(featuresStyle as any);

export default function DlaFeatures({ ...rest }) {
  const classes = useStyles({});
  return (
    <div className="cd-section" {...rest}>
        {/* Feature 4 START */}
        <div className={classes.features4}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={8}
              md={8}
              className={
                classes.mlAuto + " " + classes.mrAuto + " " + classes.textCenter
              }
            >
              <h2 className={classes.title}>Your life will be much easier</h2>
              <h5 className={classes.description}>
                This is the paragraph where you can write more details about
                your product. Keep you user engaged by providing meaningful
                information.
              </h5>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={3} className={classes.mlAuto}>
              <InfoArea
                icon={Code}
                title="For Developers"
                description="The moment you use Material Kit, you know you’ve never felt anything like it. With a single use, this powerfull UI Kit lets you do more than ever before."
                iconColor="info"
              />
              <InfoArea
                icon={FormatPaint}
                title="For Designers"
                description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                iconColor="danger"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={4}>
              <div className={classes.phoneContainer}>
                <img src={iphone2} alt="..." />
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={3} className={classes.mrAuto}>
              <InfoArea
                icon={Dashboard}
                title="Material-UI Grid"
                description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                iconColor="primary"
              />
              <InfoArea
                icon={ViewCarousel}
                title="Example Pages Included"
                description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                iconColor="success"
              />
            </GridItem>
          </GridContainer>
        </div>
        {/* Feature 4 END */}
    </div>
  );
}

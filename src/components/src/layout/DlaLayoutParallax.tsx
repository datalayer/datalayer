/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import People from "@material-ui/icons/People";
import Add from "@material-ui/icons/Add";
import Favorite from "@material-ui/icons/Favorite";
// core components
import {Header} from "@datalayer/widgets";
import {Footer} from "@datalayer/widgets";
import {GridContainer} from "@datalayer/widgets";
import {GridItem} from "@datalayer/widgets";
import {HeaderLinks} from "@datalayer/widgets";
import {NavPills} from "@datalayer/widgets";
import {Card} from "@datalayer/widgets";
import {CardBody} from "@datalayer/widgets";
import {CardHeader} from "@datalayer/widgets";
import {Badge} from "@datalayer/widgets";
import {Muted} from "@datalayer/widgets";
import {Parallax} from "@datalayer/widgets";
import {Clearfix} from "@datalayer/widgets";
import {Button} from "@datalayer/widgets";

import DlaHeader from "./../header/DlaHeader"
import DlaFooter from "./../footer/DlaFooter"
import Lorem from "./../example/Lorem"

import christian from "./../assets/img/faces/christian.jpg";
import oluEletu from "./../assets/img/examples/olu-eletu.jpg";
import clemOnojeghuo from "./../assets/img/examples/clem-onojeghuo.jpg";
import cynthiaDelRio from "./../assets/img/examples/cynthia-del-rio.jpg";
import mariyaGeorgieva from "./../assets/img/examples/mariya-georgieva.jpg";
import clemOnojegaw from "./../assets/img/examples/clem-onojegaw.jpg";
import darrenColeshill from "./../assets/img/examples/darren-coleshill.jpg";
import avatar from "./../assets/img/faces/avatar.jpg";
import marc from "./../assets/img/faces/marc.jpg";
import kendall from "./../assets/img/faces/kendall.jpg";
import cardProfile2Square from "./../assets/img/faces/card-profile2-square.jpg";

import defaultLayoutStyle from "./../assets/jss/material-kit-pro-react/layouts/default.js";

const useStyles = makeStyles(defaultLayoutStyle as any);

export default function DlaLayoutParallax() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles({});
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>
      <div className={classes.minContent}>
        <DlaHeader/>
        <Parallax
          image={require("./../assets/img/examples/city.jpg")}
          filter="dark"
          className={classes.parallax}
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <Clearfix />
            <div className={classNames(classes.description, classes.textCenter)}>
              <Lorem count={10}/>
            </div>
            <Clearfix />
          </div>
        </div>
      </div>
      <DlaFooter/>
    </div>
  );
}

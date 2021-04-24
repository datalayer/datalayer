/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Add from "@material-ui/icons/Add";
import Favorite from "@material-ui/icons/Favorite";
// core components
import { Footer } from "dspWidgets/W1";
import { GridContainer } from "dspWidgets/W1";
import { GridItem } from "dspWidgets/W1";
import { Parallax } from "dspWidgets/W1";
import { Clearfix } from "dspWidgets/W1";
import { Button } from "dspWidgets/W1";

import { profilePageStyle as styles } from "dspWidgets/Widgets";

import { img_christian as christian } from "dspWidgets/Widgets";
import { img_city as city } from "dspWidgets/Widgets";

export function LandingProfileExample(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const { classes } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>
      <div className={classes.minContent}>
        <Parallax
          image={city}
          filter="dark"
          className={classes.parallax }
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={christian} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>Christian Louboutin</h3>
                    <h6>DESIGNER</h6>
                    <Button
                      justIcon
                      simple
                      color="dribbble"
                      className={classes.margin5}
                    >
                      <i className={classes.socials + " fab fa-dribbble"} />
                    </Button>
                    <Button
                      justIcon
                      simple
                      color="twitter"
                      className={classes.margin5}
                    >
                      <i className={classes.socials + " fab fa-twitter"} />
                    </Button>
                    <Button
                      justIcon
                      simple
                      color="pinterest"
                      className={classes.margin5}
                    >
                      <i className={classes.socials + " fab fa-pinterest"} />
                    </Button>
                  </div>
                </div>
                <div className={classes.follow}>
                  <Tooltip
                    id="tooltip-top"
                    title="Follow this user"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button
                      justIcon
                      round
                      color="primary"
                      className={classes.followButton}
                    >
                      <Add className={classes.followIcon} />
                    </Button>
                  </Tooltip>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classNames(classes.description, classes.textCenter)}>
              <p>
                An artist of considerable range, Chet Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate feel
                with a solid groove structure.{" "}
              </p>
            </div>
            <Clearfix />
          </div>
        </div>
      </div>
      <Footer
        content={
          <div>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://datalayer.io/?ref=mkpr-profile"
                    target="_blank"
                    className={classes.block}
                  >
                    Datalayer
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://datalayer.io/presentation?ref=mkpr-profile"
                    target="_blank"
                    className={classes.block}
                  >
                    About us
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a href="//datalayer.io/" className={classes.block}>
                    Blog
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://datalayer.io/license?ref=mkpr-profile"
                    target="_blank"
                    className={classes.block}
                  >
                    Licenses
                  </a>
                </ListItem>
              </List>
            </div>
            <div className={classes.right}>
              &copy; {new Date().getFullYear()} , made with{" "}
              <Favorite className={classes.icon} /> by{" "}
              <a
                href="https://datalayer.io?ref=mkpr-profile"
                target="_blank"
              >
                Datalayer
              </a>{" "}
              .
            </div>
          </div>
        }
      />
  </div>
  );
}

export default withStyles(styles as any, {index: 999, classNamePrefix: 'DlaLandingProfileExample'})(LandingProfileExample);

/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Mail from "@material-ui/icons/Mail";
import Favorite from "@material-ui/icons/Favorite";
// core components
import {GridContainer} from "@datalayer/widgets";
import {GridItem} from "@datalayer/widgets";
import {Button} from "@datalayer/widgets";
import {CustomInput} from "@datalayer/widgets";
import {Footer} from "@datalayer/widgets";

import face1 from "./../../assets/img/faces/card-profile6-square.jpg";
import face2 from "./../../assets/img/faces/christian.jpg";
import face3 from "./../../assets/img/faces/card-profile4-square.jpg";
import face4 from "./../../assets/img/faces/card-profile1-square.jpg";
import face5 from "./../../assets/img/faces/marc.jpg";
import face6 from "./../../assets/img/faces/kendall.jpg";
import face7 from "./../../assets/img/faces/card-profile5-square.jpg";
import face8 from "./../../assets/img/faces/card-profile2-square.jpg";

import styles from "./../../assets/jss/material-kit-pro-react/views/componentsSections/footerStyle.js";

const useStyles = makeStyles(styles as any);

export default function DlaFooter() {
  const classes = useStyles({});
  return (
    <div>
        <Footer
          theme="white"
          content={
            <div>
              <ul className={classes.socialButtons}>
                <li>
                  <Button justIcon simple href="#datalayer" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                </li>
                <li>
                  <Button justIcon simple href="#datalayer" color="facebook">
                    <i className="fab fa-facebook-square" />
                  </Button>
                </li>
                <li>
                  <Button justIcon simple href="#datalayer" color="dribbble">
                    <i className="fab fa-dribbble" />
                  </Button>
                </li>
                <li>
                  <Button justIcon simple href="#datalayer" color="google">
                    <i className="fab fa-google-plus-g" />
                  </Button>
                </li>
                <li>
                  <Button justIcon simple href="#datalayer" color="youtube">
                    <i className="fab fa-youtube" />
                  </Button>
                </li>
              </ul>
              <div
                className={classNames(classes.pullCenter, classes.copyRight)}
              >
                Copyright &copy; {new Date().getFullYear()}{" "}
                <a
                  href="https://www.creative-tim.com?ref=mkpr-footer-components"
                  target="_blank"
                >
                  Creative Tim
                </a>{" "}
                All Rights Reserved.
              </div>
            </div>
          }
        >
          <div className={classes.footer}>
            <GridContainer>
              <GridItem xs={12} sm={3} md={3}>
                <a href="#datalayer">
                  <h5>Material Kit PRO</h5>
                </a>
                <p>
                  Probably the best UI Kit in the world! We know you{"'"}ve been
                  waiting for it, so don{"'"}t be shy!
                </p>
              </GridItem>
              <GridItem xs={12} sm={2} md={2}>
                <h5>About</h5>
                <ul className={classes.linksVertical}>
                  <li>
                    <a href="#datalayer">Blog</a>
                  </li>
                  <li>
                    <a href="#datalayer">About us</a>
                  </li>
                  <li>
                    <a href="#datalayer">Presentation</a>
                  </li>
                  <li>
                    <a href="#datalayer">Contact us</a>
                  </li>
                </ul>
              </GridItem>
              <GridItem xs={12} sm={2} md={2}>
                <h5>Market</h5>
                <ul className={classes.linksVertical}>
                  <li>
                    <a href="#datalayer">Sales FAQ</a>
                  </li>
                  <li>
                    <a href="#datalayer">How to register</a>
                  </li>
                  <li>
                    <a href="#datalayer">Sell Goods</a>
                  </li>
                  <li>
                    <a href="#datalayer">Receive Payment</a>
                  </li>
                  <li>
                    <a href="#datalayer">Transactions Issues</a>
                  </li>
                </ul>
              </GridItem>
              <GridItem xs={12} sm={2} md={2}>
                <h5>Legal</h5>
                <ul className={classes.linksVertical}>
                  <li>
                    <a href="#datalayer">Transactions FAQ</a>
                  </li>
                  <li>
                    <a href="#datalayer">Terms & conditions</a>
                  </li>
                  <li>
                    <a href="#datalayer">Licenses</a>
                  </li>
                </ul>
              </GridItem>
              <GridItem xs={12} sm={3} md={3}>
                <h5>Subscribe to Newsletter</h5>
                <p>
                  Join our newsletter and get news in your inbox every week! We
                  hate spam too, so no worries about this.
                </p>
                <form>
                  <CustomInput
                    id="footeremail"
                    formControlProps={{
                      fullWidth: false,
                      className: classes.customFormControl
                    }}
                    inputProps={{
                      placeholder: "Your Email..."
                    }}
                  />
                  <Button color="primary" justIcon>
                    <Mail />
                  </Button>
                </form>
              </GridItem>
            </GridContainer>
          </div>
        </Footer>
    </div>
  );
}

import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";

// core components
import {DashGridContainer} from "@datalayer/widgets";
import {DashGridItem} from "@datalayer/widgets";
import {DashTable} from "@datalayer/widgets";
import {DashButton} from "@datalayer/widgets";
import {DashDanger} from "@datalayer/widgets";
import {DashCard} from "@datalayer/widgets";
import {DashCardHeader} from "@datalayer/widgets";
import {DashCardIcon} from "@datalayer/widgets";
import {DashCardBody} from "@datalayer/widgets";
import {DashCardFooter} from "@datalayer/widgets";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../variables/charts";

import styles from "../assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

import priceImage1 from "./../assets/img/card-2.jpeg";
import priceImage2 from "./../assets/img/card-3.jpeg";
import priceImage3 from "./../assets/img/card-1.jpeg";

const us_flag = require("./../assets/img/flags/US.png");
const de_flag = require("./../assets/img/flags/DE.png");
const au_flag = require("./../assets/img/flags/AU.png");
const gb_flag = require("./../assets/img/flags/GB.png");
const ro_flag = require("./../assets/img/flags/RO.png");
const br_flag = require("./../assets/img/flags/BR.png");

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920
};

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <DashGridContainer>
        <DashGridItem xs={12} sm={6} md={6} lg={3}>
          <DashCard>
            <DashCardHeader color="warning" stats icon>
              <DashCardIcon color="warning">
                <Icon>content_copy</Icon>
              </DashCardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </DashCardHeader>
            <DashCardFooter stats>
              <div className={classes.stats}>
                <DashDanger>
                  <Warning />
                </DashDanger>
                <a href="#datalayer" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </DashCardFooter>
          </DashCard>
        </DashGridItem>
        <DashGridItem xs={12} sm={6} md={6} lg={3}>
          <DashCard>
            <DashCardHeader color="success" stats icon>
              <DashCardIcon color="success">
                <Store />
              </DashCardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </DashCardHeader>
            <DashCardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </DashCardFooter>
          </DashCard>
        </DashGridItem>
        <DashGridItem xs={12} sm={6} md={6} lg={3}>
          <DashCard>
            <DashCardHeader color="danger" stats icon>
              <DashCardIcon color="danger">
                <Icon>info_outline</Icon>
              </DashCardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </DashCardHeader>
            <DashCardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </DashCardFooter>
          </DashCard>
        </DashGridItem>
        <DashGridItem xs={12} sm={6} md={6} lg={3}>
          <DashCard>
            <DashCardHeader color="info" stats icon>
              <DashCardIcon color="info">
                <i className="fab fa-twitter" />
              </DashCardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </DashCardHeader>
            <DashCardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </DashCardFooter>
          </DashCard>
        </DashGridItem>
      </DashGridContainer>
      <DashGridContainer>
        <DashGridItem xs={12}>
          <DashCard>
            <DashCardHeader color="success" icon>
              <DashCardIcon color="success">
                <Language />
              </DashCardIcon>
              <h4 className={classes.cardIconTitle}>
                Global Sales by Top Locations
              </h4>
            </DashCardHeader>
            <DashCardBody>
              <DashGridContainer justify="space-between">
                <DashGridItem xs={12} sm={12} md={5}>
                  <DashTable
                    tableData={[
                      [
                        <img src={us_flag} alt="us_flag" key={"flag"} />,
                        "USA",
                        "2.920",
                        "53.23%"
                      ],
                      [
                        <img src={de_flag} alt="us_flag" key={"flag"} />,
                        "Germany",
                        "1.300",
                        "20.43%"
                      ],
                      [
                        <img src={au_flag} alt="us_flag" key={"flag"} />,
                        "Australia",
                        "760",
                        "10.35%"
                      ],
                      [
                        <img src={gb_flag} alt="us_flag" key={"flag"} />,
                        "United Kingdom",
                        "690",
                        "7.87%"
                      ],
                      [
                        <img src={ro_flag} alt="us_flag" key={"flag"} />,
                        "Romania",
                        "600",
                        "5.94%"
                      ],
                      [
                        <img src={br_flag} alt="us_flag" key={"flag"} />,
                        "Brasil",
                        "550",
                        "4.34%"
                      ]
                    ]}
                  />
                </DashGridItem>
                <DashGridItem xs={12} sm={12} md={6}>
                  <VectorMap
                    map={"world_mill"}
                    backgroundColor="transparent"
                    zoomOnScroll={false}
                    containerStyle={{
                      width: "100%",
                      height: "280px"
                    }}
                    containerClassName="map"
                    regionStyle={{
                      initial: {
                        fill: "#e4e4e4",
                        "fill-opacity": 0.9,
                        stroke: "none",
                        "stroke-width": 0,
                        "stroke-opacity": 0
                      }
                    }}
                    series={{
                      regions: [
                        {
                          values: mapData,
                          scale: ["#AAAAAA", "#444444"],
                          normalizeFunction: "polynomial"
                        }
                      ]
                    }}
                  />
                </DashGridItem>
              </DashGridContainer>
            </DashCardBody>
          </DashCard>
        </DashGridItem>
      </DashGridContainer>
      <DashGridContainer>
        <DashGridItem xs={12} sm={12} md={4}>
          <DashCard chart className={classes.cardHover}>
            <DashCardHeader color="info" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </DashCardHeader>
            <DashCardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <DashButton simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </DashButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <DashButton color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </DashButton>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowDashCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </DashCardBody>
            <DashCardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </DashCardFooter>
          </DashCard>
        </DashGridItem>
        <DashGridItem xs={12} sm={12} md={4}>
          <DashCard chart className={classes.cardHover}>
            <DashCardHeader color="warning" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </DashCardHeader>
            <DashCardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <DashButton simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </DashButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <DashButton color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </DashButton>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </DashCardBody>
            <DashCardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </DashCardFooter>
          </DashCard>
        </DashGridItem>
        <DashGridItem xs={12} sm={12} md={4}>
          <DashCard chart className={classes.cardHover}>
            <DashCardHeader color="danger" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </DashCardHeader>
            <DashCardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <DashButton simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </DashButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <DashButton color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </DashButton>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </DashCardBody>
            <DashCardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </DashCardFooter>
          </DashCard>
        </DashGridItem>
      </DashGridContainer>
      <h3>Manage Listings</h3>
      <br />
      <DashGridContainer>
        <DashGridItem xs={12} sm={12} md={4}>
          <DashCard product className={classes.cardHover}>
            <DashCardHeader image className={classes.cardHeaderHover}>
              <a href="#datalayer" onClick={e => e.preventDefault()}>
                <img src={priceImage1} alt="..." />
              </a>
            </DashCardHeader>
            <DashCardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="View"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <DashButton color="transparent" simple justIcon>
                    <ArtTrack className={classes.underChartIcons} />
                  </DashButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Edit"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <DashButton color="success" simple justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </DashButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Remove"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <DashButton color="danger" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </DashButton>
                </Tooltip>
              </div>
              <h4 className={classes.cardProductTitle}>
                <a href="#datalayer" onClick={e => e.preventDefault()}>
                  Cozy 5 Stars Apartment
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
                The place is close to Barceloneta Beach and bus stop just 2 min
                by walk and near to {'"'}Naviglio{'"'} where you can enjoy the
                main night life in Barcelona.
              </p>
            </DashCardBody>
            <DashCardFooter product>
              <div className={classes.price}>
                <h4>$899/night</h4>
              </div>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <Place /> Barcelona, Spain
              </div>
            </DashCardFooter>
          </DashCard>
        </DashGridItem>
        <DashGridItem xs={12} sm={12} md={4}>
          <DashCard product className={classes.cardHover}>
            <DashCardHeader image className={classes.cardHeaderHover}>
              <a href="#datalayer" onClick={e => e.preventDefault()}>
                <img src={priceImage2} alt="..." />
              </a>
            </DashCardHeader>
            <DashCardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="View"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <DashButton color="transparent" simple justIcon>
                    <ArtTrack className={classes.underChartIcons} />
                  </DashButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Edit"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <DashButton color="success" simple justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </DashButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Remove"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <DashButton color="danger" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </DashButton>
                </Tooltip>
              </div>
              <h4 className={classes.cardProductTitle}>
                <a href="#datalayer" onClick={e => e.preventDefault()}>
                  Office Studio
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
                The place is close to Metro Station and bus stop just 2 min by
                walk and near to {'"'}Naviglio{'"'} where you can enjoy the
                night life in London, UK.
              </p>
            </DashCardBody>
            <DashCardFooter product>
              <div className={classes.price}>
                <h4>$1.119/night</h4>
              </div>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <Place /> London, UK
              </div>
            </DashCardFooter>
          </DashCard>
        </DashGridItem>
        <DashGridItem xs={12} sm={12} md={4}>
          <DashCard product className={classes.cardHover}>
            <DashCardHeader image className={classes.cardHeaderHover}>
              <a href="#datalayer" onClick={e => e.preventDefault()}>
                <img src={priceImage3} alt="..." />
              </a>
            </DashCardHeader>
            <DashCardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="View"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <DashButton color="transparent" simple justIcon>
                    <ArtTrack className={classes.underChartIcons} />
                  </DashButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Edit"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <DashButton color="success" simple justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </DashButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Remove"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <DashButton color="danger" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </DashButton>
                </Tooltip>
              </div>
              <h4 className={classes.cardProductTitle}>
                <a href="#datalayer" onClick={e => e.preventDefault()}>
                  Beautiful Castle
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
                The place is close to Metro Station and bus stop just 2 min by
                walk and near to {'"'}Naviglio{'"'} where you can enjoy the main
                night life in Milan.
              </p>
            </DashCardBody>
            <DashCardFooter product>
              <div className={classes.price}>
                <h4>$459/night</h4>
              </div>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <Place /> Milan, Italy
              </div>
            </DashCardFooter>
          </DashCard>
        </DashGridItem>
      </DashGridContainer>
    </div>
  );
}

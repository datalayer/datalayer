import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TellPublish from './TellPublish';
import TellDescription from './TellDescription';
import { NavPills } from 'dspWidgets/W1';
import { tabsStyle } from 'dspWidgets/Widgets';

const useStyles = makeStyles(tabsStyle);

const TellTabs = (props: any) => {
  const classes = useStyles();
  return (
    <NavPills
      color="info"
      tabs={[
        {
          tabButton: "Description",
          tabContent: (
            <TellDescription/>
          )
        },
        {
          tabButton: "Card",
          tabContent: (
            <TellPublish outputshotRef={props.outputshotRef} />
          )
        },
/*
        {
          tabButton: "Datasets",
          tabContent: (
            <>
              <h4>Iris</h4>
              <h4>Titanic</h4>
            </>
          )
        },
        {
          tabButton: "Variables",
          tabContent: (
            <p className={classes.textCenter}>
            </p>
          )
        },
        {
          tabButton: "Datasets",
          tabContent: (
            <p className={classes.textCenter}>
            </p>
          )
        },
        {
          tabButton: "Snippets",
          tabContent: (
            <p className={classes.textCenter}>
            </p>
          )
        },
        {
          tabButton: "Collaborators",
          tabContent: (
            <p className={classes.textCenter}>
            </p>
          )
        }
*/
      ]}
    />
  );
}

export default TellTabs;

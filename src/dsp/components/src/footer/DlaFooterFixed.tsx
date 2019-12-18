/*eslint-disable*/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Footer} from "@datalayer/widgets";
import DlaFooterList from "./DlaFooterList"
import DlaFooterByFixed from "./DlaFooterByFixed"

import fixedLayoutStyle from "./../assets/jss/material-kit-pro-react/layouts/fixed.js";

import image from "./../assets/img/bg7.jpg";

const useStyles = makeStyles(fixedLayoutStyle as any);

export default function DlaFooterFixed() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles({});
  return (
    <div>
      <Footer
        className={classes.footer}
        content={
          <div>
            <div className={classes.left}>
              <DlaFooterList />
            </div>
            <DlaFooterByFixed/>
          </div>
        }
      />
    </div>
  );
}

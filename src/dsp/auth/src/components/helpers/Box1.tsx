import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({  
  spaces: {
    "& > *": {
      margin: theme.spacing(2),
//      width: "90%"
    }
  }
}));

const Box1 = (props) => {
  const classes: any = useStyles(); 
  return <div className={classes.spaces}>
    {props.children}
  </div>
}

export default Box1;

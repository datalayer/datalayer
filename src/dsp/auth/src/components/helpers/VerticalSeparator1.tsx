import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({  
  verticalSeparator1: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));

const VerticalSeparator1 = (props) => {
  const classes: any = useStyles(); 
  return <div className={classes.verticalSeparator1} />
}

export default VerticalSeparator1;


import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardBody, CardFooter, Success } from "dspWidgets/W1";
import { sectionCardsStyle } from 'dspWidgets/Widgets';

const useStyles = makeStyles(sectionCardsStyle);

const TellCard = (props: any) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const viewRoute = `/${props.username}/tell/${props.ulid}/view`
  const outputshot = props.outputshotUrl
    ? props.outputshotUrl
    : props.outputshotData;
  return <Card blog>
    <CardHeader image>
      <a href="" onClick={e => {e.preventDefault(); navigate(viewRoute)}}>
         <img src={outputshot} />
      </a>
      <div
        className={classes.coloredShadow}
        style={{
          backgroundImage: `url(${outputshot})`,
          opacity: 1
        }}
      />
    </CardHeader>
    <CardBody>
      <Success>
        <h6 className={classes.cardCategory}>Tell</h6>
      </Success>
      <h4 className={classes.cardTitle}>
        <a href="" onClick={e => navigate(viewRoute)}>
          {props.title}
        </a>
      </h4>
      <p className={classes.cardDescription} style={{ whiteSpace: 'pre-wrap'}}>
        {props.description}
      </p>
    </CardBody>
    <CardFooter>
      <div className={classes.author}>
        <a href="" onClick={e => {e.preventDefault(); navigate(viewRoute)}}>
          <span>@{props.username}</span>
        </a>
      </div>
    </CardFooter>
  </Card>
}

export default TellCard;

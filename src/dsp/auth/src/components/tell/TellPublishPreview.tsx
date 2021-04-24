import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { selectTell } from '../../state/tell';
import { Card, CardHeader, CardBody, CardFooter, Success } from 'dspWidgets/W1';
import { sectionCardsStyle } from 'dspWidgets/Widgets';

const useStyles = makeStyles(sectionCardsStyle);

const TellView = () => {
  const classes = useStyles();
  const tell = selectTell();
  const outputshot = tell.outputshotUrl
    ? tell.outputshotUrl
    : tell.outputshotData;
  return (
    <Card blog>
      <CardHeader image>
        <a href="" onClick={e => e.preventDefault()}>
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
          <a href="" onClick={e => e.preventDefault()}>
           {tell.title}
          </a>
        </h4>
        <p className={classes.cardDescription} style={{ whiteSpace: 'pre-wrap'}}>
          {tell.description}
        </p>
      </CardBody>
      <CardFooter>
        <div className={classes.author}>
          <a href="" onClick={e => e.preventDefault()}>
{/*
            <img
              src={img_marc}
              alt="..."
              className={classes.imgRaised + " " + classes.avatar}
            />
*/}
            <span>@{tell.username}</span>
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}

export default TellView;

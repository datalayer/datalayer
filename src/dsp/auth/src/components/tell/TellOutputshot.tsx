import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useScreenshot } from '../../hooks/OutputshotHook';
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Tooltip from '@material-ui/core/Tooltip';
import { useTooltipStyles } from '../helpers/Styles';
import { tellActions, selectTell } from '../../state/tell';
import { OUTPUTSHOT_PLACEHOLDER_SUN_SVG as OUTPUTSHOT_PLACEHOLDER, SVG_DATA_TYPE } from '../helpers/OutputshotPlaceholder';
import { Button } from 'dspWidgets/W1';

const TellOutputshot = (props: any) => {
  const tooltipClasses = useTooltipStyles();
  const [image, takeScreenshot] = useScreenshot();
  const tell = selectTell();
  const hasOutputshot = !tell.outputshotData.startsWith(SVG_DATA_TYPE)
  const dispatch = useDispatch();
  const ref = props.outputshotRef as React.RefObject<HTMLDivElement>;
  const getScreenshot = () => {
    takeScreenshot(ref.current) as AnimationPlayState;
  }
  const resetScreenshot = () => {
    dispatch(tellActions.update.started({
      outputshotUrl: '',
      outputshotData: OUTPUTSHOT_PLACEHOLDER,
    }));
  }
  return (
    <>
      {
        !hasOutputshot &&
        <Tooltip
          title="Take a screenshot of the output"
          classes={{ tooltip: tooltipClasses.tooltip }}
        >
          <Button color="success" justIcon round onClick={getScreenshot}>
            <PhotoCamera />
          </Button>
        </Tooltip>
      }
      {
        hasOutputshot &&
        <Tooltip
          title="Remove the output screenshot"
          classes={{ tooltip: tooltipClasses.tooltip }}
        >
          <Button color="danger" justIcon round onClick={resetScreenshot}>
            <PhotoCamera />
          </Button>
        </Tooltip>
      }
    </>
  );
}

export default TellOutputshot;

import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaTeam1 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaTeam2 } from '@datalayer/dsp-widgets/lib/Widgets';

const team1 = () => <DlaTeam1 />
storiesOf('Team', module)
  .add('team1', team1);

const team2 = () => <DlaTeam2 />
  storiesOf('Team', module)
      .add('team2', team2);
  
  
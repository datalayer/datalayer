import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaCard1 } from '@datalayer/dsp-widgets/lib/Widgets';

const card1 = () => <DlaCard1 />
storiesOf('Card', module)
  .add('card1', card1);

import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaLanding1 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaLanding2 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaLanding3 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaLanding4 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaLanding5 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaLanding6 } from '@datalayer/dsp-widgets/lib/Widgets';

const landing1 = () => <DlaLanding1 />
storiesOf('Landing', module)
  .add('landing1', landing1);

const landing2 = () => <DlaLanding2 />
storiesOf('Landing', module)
  .add('landing2', landing2);

const landing3 = () => <DlaLanding3 />
storiesOf('Landing', module)
  .add('landing3', landing3);

const landing4 = () => <DlaLanding4 />
storiesOf('Landing', module)
  .add('landing4', landing4);

const landing5 = () => <DlaLanding5 />
storiesOf('Landing', module)
  .add('landing5', landing5);

const landing6 = () => <DlaLanding6 />
storiesOf('Landing', module)
  .add('landing6', landing6);

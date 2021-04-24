import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaOverview1 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaOverview2 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaOverview3 } from '@datalayer/dsp-widgets/lib/Widgets';

const overview1 = () => <DlaOverview1 />
storiesOf('Overview', module)
  .add('overview1', overview1);

const overview2 = () => <DlaOverview2 />
storiesOf('Overview', module)
  .add('overview2', overview2);

const overview3 = () => <DlaOverview3 />
storiesOf('Overview', module)
  .add('overview3', overview3);

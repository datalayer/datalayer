import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaProfile1 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaProfile2 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaProfile3 } from '@datalayer/dsp-widgets/lib/Widgets';

const profile1 = () => <DlaProfile1 />
storiesOf('Profile', module)
  .add('profile1', profile1);

const profile2 = () => <DlaProfile2 />
storiesOf('Profile', module)
  .add('profile2', profile2);

const profile3 = () => <DlaProfile3 />
  storiesOf('Profile', module)
      .add('profile3', profile3);
  
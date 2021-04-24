import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaComponents1 } from '@datalayer/dsp-widgets/lib/Widgets';

const components1 = () => <DlaComponents1 />
storiesOf('Components', module)
  .add('components1', components1);

import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaContact1 } from '@datalayer/dsp-widgets/lib/Widgets';

const contact1 = () => <DlaContact1 />
storiesOf('Contact', module)
  .add('contact1', contact1);

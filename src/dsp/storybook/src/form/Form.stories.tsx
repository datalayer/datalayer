import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaForm1 } from '@datalayer/dsp-widgets/lib/Widgets';

const form1 = () => <DlaForm1 />
storiesOf('Form', module)
  .add('form1', form1);

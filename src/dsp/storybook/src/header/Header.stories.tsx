import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaHeader1 } from '@datalayer/dsp-widgets/lib/Widgets';

const header = () => <DlaHeader1 />
storiesOf('Header', module)
  .add('topHeader1', header);

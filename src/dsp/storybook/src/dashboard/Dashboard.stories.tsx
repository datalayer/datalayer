import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaDashboard1 } from '@datalayer/dsp-widgets/lib/Widgets';

const dashboard1 = () => <DlaDashboard1 />
storiesOf('Dashboard', module)
  .add('dashboard1', dashboard1);

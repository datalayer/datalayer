import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaProduct1 } from '@datalayer/dsp-widgets/lib/Widgets';

const product1 = () => <DlaProduct1/>
storiesOf('Product', module)
  .add('product1', product1);

import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaLayout1 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaLayoutParallax1 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaLayoutParallax2 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaLayoutFixed1 } from '@datalayer/dsp-widgets/lib/Widgets';

const layout1 = () => <DlaLayout1 />
storiesOf('Layout', module)
  .add('layout1', layout1);

const parallax1 = () => <DlaLayoutParallax1 />
storiesOf('Layout', module)
  .add('layoutParallax1', parallax1);

const parallax2 = () => <DlaLayoutParallax2 />
storiesOf('Layout', module)
  .add('layoutParallax2', parallax2);
  
const fixed1 = () => <DlaLayoutFixed1 />
storiesOf('Layout', module)
  .add('layoutFixed1', fixed1);

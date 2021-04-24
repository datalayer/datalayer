import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaFeatures1 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaFeatures2 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaFeatures3 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaFeatures4 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaFeatures5 } from '@datalayer/dsp-widgets/lib/Widgets';

const feature1 = () => <DlaFeatures1 />
storiesOf('Features', module)
  .add('features1', feature1);

const feature2 = () => <DlaFeatures2 />
storiesOf('Features', module)
  .add('features2', feature2);

const feature3 = () => <DlaFeatures3 />
storiesOf('Features', module)
  .add('features3', feature3);

const feature4 = () => <DlaFeatures4 />
storiesOf('Features', module)
  .add('features4', feature4);

const features5 = () => <DlaFeatures5 />
storiesOf('Features', module)
  .add('features5', features5);

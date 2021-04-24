import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaPreFooter1 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaPreFooter2 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaPreFooter3 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaPreFooter4 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaPreFooter5 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaPreFooter6 } from '@datalayer/dsp-widgets/lib/Widgets';

const preFooter1 = () => <DlaPreFooter1 />
storiesOf('PreFooter', module)
  .add('prefooter1', preFooter1);

const preFooter2 = () => <DlaPreFooter2 />
storiesOf('PreFooter', module)
  .add('prefooter2', preFooter2);

const preFooter3 = () => <DlaPreFooter3 />
storiesOf('PreFooter', module)
  .add('prefooter3', preFooter3);

const preFooter4 = () => <DlaPreFooter4 />
storiesOf('PreFooter', module)
  .add('prefooter4', preFooter4);

const preFooter5 = () => <DlaPreFooter5 />
storiesOf('PreFooter', module)
  .add('prefooter5', preFooter5);

const preFooter6 = () => <DlaPreFooter6 />
  storiesOf('PreFooter', module)
    .add('prefooter6', preFooter6);

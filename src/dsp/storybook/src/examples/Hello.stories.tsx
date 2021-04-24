import React from 'react';
import {storiesOf} from '@storybook/react';

import { Hello1 } from '@datalayer/dsp-widgets/lib/Examples';
import { Hello2 } from '@datalayer/dsp-widgets/lib/Examples';

const hello1 = () => <Hello1 />
storiesOf('Examples', module)
  .add('hello1', hello1);

const hello2 = () => <Hello2 name="Eric" />
storiesOf('Examples', module)
  .add('hello2', hello2);

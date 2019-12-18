import React from 'react';
import {storiesOf} from '@storybook/react';
import DlaOverview from './DlaOverview';
import DlaOverview1 from './examples/DlaOverview1';
import DlaOverview2 from './examples/DlaOverview2';

const overview = () => <DlaOverview />
storiesOf('DlaOverview', module)
  .add('default', overview);

const overview1 = () => <DlaOverview1 />
storiesOf('DlaOverview', module)
  .add('example1', overview1);

const overview2 = () => <DlaOverview2 />
storiesOf('DlaOverview', module)
  .add('example2', overview2);

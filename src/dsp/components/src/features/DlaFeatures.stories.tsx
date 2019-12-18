import React from 'react';
import {storiesOf} from '@storybook/react';
import DlaFeatures from './DlaFeatures';
import DlaFeatures1 from './examples/DlaFeatures1';
import DlaFeatures2 from './examples/DlaFeatures2';
import DlaFeatures3 from './examples/DlaFeatures3';
import DlaFeatures4 from './examples/DlaFeatures4';

const features = () => <DlaFeatures />
storiesOf('DlaFeatures', module)
  .add('default', features);

const example1 = () => <DlaFeatures1 />
storiesOf('DlaFeatures', module)
  .add('example1', example1);

const example2 = () => <DlaFeatures2 />
storiesOf('DlaFeatures', module)
  .add('example2', example2);

const example3 = () => <DlaFeatures3 />
storiesOf('DlaFeatures', module)
  .add('example3', example3);

const example4 = () => <DlaFeatures4 />
storiesOf('DlaFeatures', module)
  .add('example4', example4);

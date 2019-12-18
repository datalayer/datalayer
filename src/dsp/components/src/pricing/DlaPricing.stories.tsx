import React from 'react';
import {storiesOf} from '@storybook/react';
import DlaPricing from './DlaPricing';
import DlaPricing1 from './examples/DlaPricing1';
import DlaPricing2 from './examples/DlaPricing2';
import DlaPricing3 from './examples/DlaPricing3';
import DlaPricing4 from './examples/DlaPricing4';
import DlaPricing5 from './examples/DlaPricing5';

const pricing = () => <DlaPricing />
storiesOf('DlaPricing', module)
  .add('default', pricing);

const pricing1 = () => <DlaPricing1 />
storiesOf('DlaPricing', module)
  .add('example1', pricing1);

const pricing2 = () => <DlaPricing2 />
storiesOf('DlaPricing', module)
  .add('example2', pricing2);

const pricing3 = () => <DlaPricing3 />
storiesOf('DlaPricing', module)
  .add('example3', pricing3);

const pricing4 = () => <DlaPricing4 />
storiesOf('DlaPricing', module)
  .add('example4', pricing4);

const pricing5 = () => <DlaPricing5 />
storiesOf('DlaPricing', module)
  .add('example5', pricing5);

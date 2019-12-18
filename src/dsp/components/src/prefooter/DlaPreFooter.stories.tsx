import React from 'react';
import {storiesOf} from '@storybook/react';
import DlaPreFooter from './DlaPreFooter';
import DlaPreFooter1 from './examples/DlaPreFooter1';
import DlaPreFooter2 from './examples/DlaPreFooter2';
import DlaPreFooter3 from './examples/DlaPreFooter3';
import DlaPreFooter4 from './examples/DlaPreFooter4';
import DlaPreFooter5 from './examples/DlaPreFooter5';

const preFooter = () => <DlaPreFooter />
storiesOf('DlaPreFooter', module)
  .add('default', preFooter);

const preFooter1 = () => <DlaPreFooter1 />
storiesOf('DlaPreFooter', module)
  .add('example1', preFooter1);

const preFooter2 = () => <DlaPreFooter2 />
storiesOf('DlaPreFooter', module)
  .add('example2', preFooter2);

const preFooter3 = () => <DlaPreFooter3 />
storiesOf('DlaPreFooter', module)
  .add('example3', preFooter3);

const preFooter4 = () => <DlaPreFooter4 />
storiesOf('DlaPreFooter', module)
  .add('example4', preFooter4);

const preFooter5 = () => <DlaPreFooter5 />
storiesOf('DlaPreFooter', module)
  .add('example5', preFooter5);

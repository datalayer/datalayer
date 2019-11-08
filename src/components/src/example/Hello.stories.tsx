import React from 'react';
import {storiesOf} from '@storybook/react';
import HelloOne from './HelloOne';
import HelloTwo from './HelloTwo';

const hello1 = () => <HelloOne />
storiesOf('DlaExample', module)
  .add('hello1', hello1);

const hello2 = () => <HelloTwo />
storiesOf('DlaExample', module)
  .add('hello2', hello2);

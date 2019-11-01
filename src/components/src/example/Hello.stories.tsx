import React from 'react';
import {storiesOf} from '@storybook/react';
import HelloTwo from './HelloTwo';
import HelloOne from './HelloOne';

const hello1 = () => <HelloOne />
storiesOf('Example', module)
  .add('hello1', hello1);

const hello2 = () => <HelloTwo />
storiesOf('Example', module)
  .add('hello2', hello2);

import React from 'react';
import {storiesOf} from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import DlaForm1 from './examples/DlaForm1';

const form1 = () => <DlaForm1 />
storiesOf('DlaForm', module)
  .addDecorator(StoryRouter())
  .add('example1', form1);

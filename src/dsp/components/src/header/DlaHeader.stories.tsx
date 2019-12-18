import React from 'react';
import {storiesOf} from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import DlaHeader from './DlaHeader';

const header = () => <DlaHeader />
storiesOf('DlaHeader', module)
  .addDecorator(StoryRouter())
  .add('default', header);

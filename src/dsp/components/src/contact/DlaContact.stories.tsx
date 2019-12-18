import React from 'react';
import {storiesOf} from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import DlaContact from './DlaContact';

const work = () => <DlaContact />
storiesOf('DlaContact', module)
  .addDecorator(StoryRouter())
  .add('default', work);

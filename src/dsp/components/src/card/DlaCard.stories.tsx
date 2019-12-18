import React from 'react';
import {storiesOf} from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import DlaCard1 from './examples/DlaCard1';
import DlaCard2 from './examples/DlaCard2';

const card1 = () => <DlaCard1 />
storiesOf('DlaCard', module)
  .addDecorator(StoryRouter())
  .add('example1', card1);

const card2 = () => <DlaCard2 />
storiesOf('DlaCard', module)
  .addDecorator(StoryRouter())
  .add('example2', card2);

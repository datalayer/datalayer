import React from 'react';
import {storiesOf} from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import DlaTeam from './DlaTeam';
import DlaTeam1 from './examples/DlaTeam1';

const team = () => <DlaTeam />
storiesOf('DlaTeam', module)
  .addDecorator(StoryRouter())
  .add('default', team);

const team1 = () => <DlaTeam1 />
storiesOf('DlaTeam', module)
  .addDecorator(StoryRouter())
  .add('example1', team1);

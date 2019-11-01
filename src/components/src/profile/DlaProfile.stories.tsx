import React from 'react';
import {storiesOf} from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import DlaProfile from './DlaProfile';
import DlaProfile1 from './examples/DlaProfile1';
import DlaProfile2 from './examples/DlaProfile2';

const profile = () => <DlaProfile />
storiesOf('DlaProfile', module)
  .addDecorator(StoryRouter())
  .add('default', profile);

const profile1 = () => <DlaProfile1 />
storiesOf('DlaProfile', module)
  .addDecorator(StoryRouter())
  .add('example1', profile1);

const profile2 = () => <DlaProfile2 />
storiesOf('DlaProfile', module)
  .addDecorator(StoryRouter())
  .add('example2', profile2);

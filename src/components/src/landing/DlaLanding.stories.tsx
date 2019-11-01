import React from 'react';
import {storiesOf} from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import DlaLanding from './DlaLanding';
import DlaLanding1 from './examples/DlaLanding1';
import DlaLanding2 from './examples/DlaLanding2';
import DlaLanding3 from './examples/DlaLanding3';
import DlaLanding4 from './examples/DlaLanding4';
import DlaLanding5 from './examples/DlaLanding5';

const landing = () => <DlaLanding />
storiesOf('DlaLanding', module)
  .addDecorator(StoryRouter())
  .add('default', landing);

const landing1 = () => <DlaLanding1 />
storiesOf('DlaLanding', module)
  .addDecorator(StoryRouter())
  .add('example1', landing1);

const landing2 = () => <DlaLanding2 />
storiesOf('DlaLanding', module)
  .addDecorator(StoryRouter())
  .add('example2', landing2);

const landing3 = () => <DlaLanding3 />
storiesOf('DlaLanding', module)
  .addDecorator(StoryRouter())
  .add('example3', landing3);

const landing4 = () => <DlaLanding4 />
storiesOf('DlaLanding', module)
  .addDecorator(StoryRouter())
  .add('example4', landing4);

const landing5 = () => <DlaLanding5 />
storiesOf('DlaLanding', module)
  .addDecorator(StoryRouter())
  .add('example5', landing5);

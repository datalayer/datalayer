import React from 'react';
import {storiesOf} from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import DlaLayoutParallax from './DlaLayoutParallax';
import DlaLayoutFixed from './DlaLayoutFixed';
import DlaLayout1 from './examples/DlaLayout1';

const parallax = () => <DlaLayoutParallax />
storiesOf('DlaLayout', module)
  .addDecorator(StoryRouter())
  .add('parallax', parallax);

const fixed = () => <DlaLayoutFixed />
storiesOf('DlaLayout', module)
  .addDecorator(StoryRouter())
  .add('fixed', fixed);

const layout1 = () => <DlaLayout1 />
storiesOf('DlaLayout', module)
  .addDecorator(StoryRouter())
  .add('example1', layout1);

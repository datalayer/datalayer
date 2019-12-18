import React from 'react';
import {storiesOf} from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import DlaSignIn from './DlaSignIn';

const SignIn = () => <DlaSignIn />
storiesOf('DlaSignIn', module)
  .addDecorator(StoryRouter())
  .add('default', SignIn);

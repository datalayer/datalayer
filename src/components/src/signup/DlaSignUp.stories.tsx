import React from 'react';
import {storiesOf} from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import DlaSignUp from './DlaSignUp';

const SignUp = () => <DlaSignUp />
storiesOf('DlaSignUp', module)
  .addDecorator(StoryRouter())
  .add('default', SignUp);

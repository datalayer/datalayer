import React from 'react';
import {storiesOf} from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import DlaProduct from './DlaProduct';

const product = () => <DlaProduct />
storiesOf('DlaProduct', module)
  .addDecorator(StoryRouter())
  .add('default', product);

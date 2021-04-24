import React from 'react';
import {storiesOf} from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '@material-ui/core/Button';

const buttonWithText1 = () => <Button>Hello Button</Button>
storiesOf('Examples', module)
  .add('textButton1', buttonWithText1);

const buttonWithEmoji1 = () => <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
storiesOf('Examples', module)
  .add('emojiButton1', buttonWithEmoji1);

const buttonWithAction1 = () => <Button onClick={action('clicked')}>Click me and look in the Actions panel</Button>
storiesOf('Examples', module)
  .add('actionButton1', buttonWithAction1);

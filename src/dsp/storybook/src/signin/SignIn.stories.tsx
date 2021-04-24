import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaSignIn1 } from '@datalayer/dsp-widgets/lib/Widgets';

const SignIn1 = () => <DlaSignIn1 />
storiesOf('SignIn', module)
  .add('signin1', SignIn1);

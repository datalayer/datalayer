import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaSignUp1 } from '@datalayer/dsp-widgets/lib/Widgets';

const SignUp1 = () => <DlaSignUp1 />
storiesOf('SignUp', module)
  .add('signup1', SignUp1);

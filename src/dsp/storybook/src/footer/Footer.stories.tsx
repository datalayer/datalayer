import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaFooterAlt1 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaFooterFixed1 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaFooter1 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaFooter2 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaFooter3 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaFooter4 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaFooter5 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaFooter6 } from '@datalayer/dsp-widgets/lib/Widgets';

const footerFixed1 = () => <DlaFooterFixed1 />
storiesOf('Footer', module)
  .add('footerFixed1', footerFixed1);

const footerAlt1 = () => <DlaFooterAlt1 />
storiesOf('Footer', module)
  .add('footerAlt1', footerAlt1);
  
const footer = () => <DlaFooter1 />
storiesOf('Footer', module)
  .add('footer1', footer);
  
const footer2 = () => <DlaFooter2 />
storiesOf('Footer', module)
  .add('footer2', footer2);

const footer3 = () => <DlaFooter3 />
storiesOf('Footer', module)
  .add('footer3', footer3);

const footer4 = () => <DlaFooter4 />
storiesOf('Footer', module)
  .add('footer4', footer4);

const footer5 = () => <DlaFooter5 />
storiesOf('Footer', module)
  .add('footer5', footer5);

const footer6 = () => <DlaFooter6 />
  storiesOf('Footer', module)
    .add('footer6', footer6);

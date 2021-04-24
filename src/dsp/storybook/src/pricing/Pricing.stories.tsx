import React from 'react';
import {storiesOf} from '@storybook/react';

import { DlaPricing1 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaPricing2 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaPricing3 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaPricing4 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaPricing5 } from '@datalayer/dsp-widgets/lib/Widgets';
import { DlaPricing6 } from '@datalayer/dsp-widgets/lib/Widgets';

const pricing1 = () => <DlaPricing1 />
storiesOf('Pricing', module)
  .add('pricing1', pricing1);

const pricing2 = () => <DlaPricing2 />
storiesOf('Pricing', module)
  .add('pricing2', pricing2);

const pricing3 = () => <DlaPricing3 />
storiesOf('Pricing', module)
  .add('pricing3', pricing3);

const pricing4 = () => <DlaPricing4 />
storiesOf('Pricing', module)
  .add('pricing4', pricing4);

const pricing5 = () => <DlaPricing5 />
storiesOf('Pricing', module)
  .add('pricing5', pricing5);

const pricing = () => <DlaPricing6 />
storiesOf('Pricing', module)
  .add('pricing6', pricing);

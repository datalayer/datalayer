import React from 'react';
import {storiesOf} from '@storybook/react';
import DlaFooter from './DlaFooter';
import DlaFooterAlt from './DlaFooterAlt';
import DlaFooterFixed from './DlaFooterFixed';
import DlaFooter1 from './examples/DlaFooter1';
import DlaFooter2 from './examples/DlaFooter2';
import DlaFooter3 from './examples/DlaFooter3';
import DlaFooter4 from './examples/DlaFooter4';
import DlaFooter5 from './examples/DlaFooter5';

const footer = () => <DlaFooter />
storiesOf('DlaFooter', module)
  .add('default', footer);

const footerFixed = () => <DlaFooterFixed />
storiesOf('DlaFooter', module)
  .add('fixed', footerFixed);

const footerAlt = () => <DlaFooterAlt />
storiesOf('DlaFooter', module)
  .add('alt', footerAlt);
  
const footer2 = () => <DlaFooter2 />
storiesOf('DlaFooter', module)
  .add('example2', footer2);

const footer3 = () => <DlaFooter3 />
storiesOf('DlaFooter', module)
  .add('example3', footer3);

const footer4 = () => <DlaFooter4 />
storiesOf('DlaFooter', module)
  .add('example4', footer4);

const footer5 = () => <DlaFooter5 />
storiesOf('DlaFooter', module)
  .add('example5', footer5);


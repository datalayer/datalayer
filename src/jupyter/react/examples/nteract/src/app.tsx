import React from 'react';
import { render } from 'react-dom';

import NteractExample from './example';

const el = document.createElement('div');
document.body.appendChild(el)

render(
  <NteractExample/>
  ,
  el
);

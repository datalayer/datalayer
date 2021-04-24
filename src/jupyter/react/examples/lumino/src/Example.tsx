import React from 'react';
import { render } from 'react-dom';

import { BoxPanelReact } from '@jupyter-react/lumino-adapter/lib';

import SplitPanelExample from './lumino/SplitPanelExample';
import TabPanelExample from './lumino/TabPanelExample';
import MultipleDocksExample from './lumino/MultipleDocksExample';

const el = document.createElement('div');
document.body.appendChild(el);

render(
  <div>
    <SplitPanelExample/>
    <TabPanelExample/>
    <BoxPanelReact>
      <MultipleDocksExample />
    </BoxPanelReact>
  </div>
  ,
  el
);

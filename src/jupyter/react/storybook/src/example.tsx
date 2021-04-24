import React from 'react';
import { render } from 'react-dom';

import { CellsExample } from '@jupyter-react/jupyterlab-examples/lib';

import { HelloOne } from '@jupyter-react/react-examples/lib';

import { BoxPanelReact } from '@jupyter-react/lumino-adapter/lib';
import { SplitPanelExample } from '@jupyter-react/lumino-examples/lib';
import { TabPanelExample } from '@jupyter-react/lumino-examples/lib';
import { MultipleDocksExample } from '@jupyter-react/lumino-examples/lib';

render(
  <div>
    <BoxPanelReact>
      <MultipleDocksExample />
    </BoxPanelReact>
    <HelloOne/>
    <BoxPanelReact>
      <CellsExample />
    </BoxPanelReact>
    <SplitPanelExample/>
    <TabPanelExample/>
  </div>
  ,
  document.getElementById("root")
);

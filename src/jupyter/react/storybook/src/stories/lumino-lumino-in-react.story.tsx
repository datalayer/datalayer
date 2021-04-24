import React from 'react';

import { BoxPanelReact } from '@jupyter-react/lumino-adapter/lib'

import {
  SplitPanelExample,
  TabPanelExample,
  MultipleDocksExample
 } from '@jupyter-react/lumino-examples/lib';

 import { docs } from './../utils/storybook';

 export default {
  title: 'Lumino/Lumino in React',
  id: 'lumino-in-react-id',
  parameters: {
    docs: {
      inlineStories: true,
    },
  },
}

export const splitPanel = () => <SplitPanelExample />
docs(splitPanel,`
#### SplitPanel Example

Wrap a Lumino panel into React.
`);

export const tabPanel = () => <TabPanelExample />
docs(tabPanel,`
#### TabPanel Example

Wrap a Lumino panel into React.
`);

export const multipleDocks = () => <div style={{ height: 300 }}>
    <BoxPanelReact>
      <MultipleDocksExample />
    </BoxPanelReact>
  </div>
docs(multipleDocks,`
#### BoxPanel Example

Wrap a Lumino panel with multiple docks into React.
`);

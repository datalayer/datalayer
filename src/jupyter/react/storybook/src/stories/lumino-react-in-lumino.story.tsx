import React from 'react';
import { docs } from './../utils/storybook';

export default {
  title: 'Lumino/React in Lumino',
  id: 'react-in-lumino-id',
  parameters: {
    docs: {
      inlineStories: true,
    },
  },
};

function ToDo(props) {
  return <h1>This is a TODO: {props.todo}</h1>;
}
export const reactInLumino = () => {  
  return ToDo({todo: 'Implement React in Lumino'})
};
docs(reactInLumino,`
WidgetReact

React components are available today in the [UI Components](https://github.com/jupyterlab/jupyterlab/tree/master/packages/ui-components) package and embedded in Lumino widgets via the [WidgetReact](https://jupyterlab.readthedocs.io/en/latest/developer/virtualdom.html) helper class.

WidgetReact allows to embed a React component into a Lumino Widget.

The following details an example for the toolbar button:

- [ToolbarButtonComponent](https://github.com/jupyterlab/jupyterlab/blob/37c7a647a1344712c8cf80414db73809f486e766/packages/apputils/src/toolbar.tsx#L469) is a React component for a button. It knows nothing about Lumino widgets nor signals.
- [ToolbarButton](https://github.com/jupyterlab/jupyterlab/blob/37c7a647a1344712c8cf80414db73809f486e766/packages/apputils/src/toolbar.tsx#L531) is a Lumino widget that wraps the previous ToolbarButtonComponent with ReactWidget and takes the exact same props.

Another example is the [HDF Toolbar](https://github.com/telamonian/jupyterlab-hdf/blob/master/src/toolbar.tsx).

UseSignal

- [UseSignal](https://github.com/jupyterlab/jupyterlab/blob/37c7a647a1344712c8cf80414db73809f486e766/packages/apputils/src/toolbar.tsx#L569) component manages the transition between Lumino signals and React props.
`);

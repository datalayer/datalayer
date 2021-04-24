const el = document.createElement('div');
document.body.appendChild(el);
/*
import { Widget } from '@lumino/widgets';
import cellPanel from './cell/CellPanel';
// import cellsPanel from './cells/CellsPanel';
// import notebookPanel from './notebook/NotebookPanel';
Widget.attach(cellPanel, el);
window.addEventListener('resize', () => {
  cellPanel.update();
});
*/
import React from 'react';
import { render } from 'react-dom';
import { BoxPanelReact } from '@jupyter-react/lumino-adapter/lib'
import Example from './cell/CellExample';

render(
  <>
    <div>Hello JupyterLab Cell...</div>
    <div>Hello JupyterLab Cell...</div>
    <div>Hello JupyterLab Cell...</div>
    <BoxPanelReact>
      <Example />
    </BoxPanelReact>
    <div>Bye JupyterLab Cell...</div>
    <div>Bye JupyterLab Cell...</div>
    <div>Bye JupyterLab Cell...</div>
  </>
  ,
  el
);

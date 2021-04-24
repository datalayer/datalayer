import { BoxPanel } from '@lumino/widgets';

import { CodeCellModel, CodeCell } from '@jupyterlab/cells';
import {
  RenderMimeRegistry,
  standardRendererFactories
} from '@jupyterlab/rendermime';

import '@jupyterlab/cells/style/index.css';
import '@jupyterlab/theme-light-extension/style/index.css';

import './../../style/index.css';
import './../../style/cells.css';

const cellsPanel = new BoxPanel();
cellsPanel.id = 'cells-panel-id';
cellsPanel.direction = 'top-to-bottom';
cellsPanel.spacing = 0;

for (let i = 0; i < 5; i++) {
  const cell = new CodeCell({
    rendermime: new RenderMimeRegistry({
      initialFactories: standardRendererFactories
    }),
    model: new CodeCellModel({})
  }).initializeState();
  cell.activate();
  cellsPanel.addWidget(cell);
}

export default cellsPanel;

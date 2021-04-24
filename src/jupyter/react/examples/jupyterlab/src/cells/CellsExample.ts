import { LuminoAdapter } from '@jupyter-react/lumino-adapter/lib';

import cellsPanel from './CellsPanel';

export default class CellsExample extends LuminoAdapter<any> {

  constructor(props: any) {
    super(props);
    this.widget = cellsPanel;
  }

}

import { LuminoAdapter } from '@jupyter-react/lumino-adapter/lib';

import notebookPanel from './NotebookPanel';

class NotebookExample extends LuminoAdapter<any> {

  constructor(props: any) {
    super(props);
    this.widget = notebookPanel;
  }

}

export default NotebookExample;

import { BoxPanel } from '@lumino/widgets';
import { Dialog } from '@jupyterlab/apputils';
import { LuminoAdapter } from '@jupyter-react/lumino-adapter/lib';

import '@jupyterlab/cells/style/index.css';
import '@jupyterlab/theme-light-extension/style/index.css';

const dialogPanel = new BoxPanel();
dialogPanel.id = 'main';
dialogPanel.direction = 'top-to-bottom';
dialogPanel.spacing = 0;

const dialog = new Dialog({
  title: 'Dialog example',
  body: 'body',
  buttons: [Dialog.okButton()]
});
dialogPanel.addWidget(dialog);

export default class DialogExample extends LuminoAdapter {

  constructor(props: any) {
    super(props);
    this.widget = dialogPanel;
  }

  public componentDidMount(): void {
    super.componentDidMount();
    console.log('--- did mount')
    dialog.launch().then(success => console.log('---- launch success', success))
  }

}

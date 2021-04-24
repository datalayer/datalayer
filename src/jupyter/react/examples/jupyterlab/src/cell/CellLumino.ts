import { BoxPanel, Widget } from '@lumino/widgets';
import { PageConfig } from '@jupyterlab/coreutils';
import { SessionContext, Toolbar } from '@jupyterlab/apputils';
import { CodeCellModel, CodeCell } from '@jupyterlab/cells';
import { CodeMirrorMimeTypeService } from '@jupyterlab/codemirror';
import { CompleterModel, Completer, CompletionHandler, KernelConnector } from '@jupyterlab/completer';
import { RenderMimeRegistry, standardRendererFactories as initialFactories } from '@jupyterlab/rendermime';
import { SessionManager, KernelManager, KernelSpecManager } from '@jupyterlab/services';
import { ServerConnection } from '@jupyterlab/services';
import { CommandRegistry } from '@lumino/commands';

import '@jupyterlab/application/style/index.css';
import '@jupyterlab/cells/style/index.css';
import '@jupyterlab/outputarea/style/index.css';
import '@jupyterlab/codemirror/style/index.css';
import '@jupyterlab/completer/style/index.css';
import '@jupyterlab/theme-light-extension/style/index.css';

import './../../style/cell.css';

const CELL_PANEL_ID = 'cell-panel-id';

export class ResizableBoxPanel extends BoxPanel {
  constructor(options: BoxPanel.IOptions = {}) {
    super(options);
  }
   protected onResize(msg: Widget.ResizeMessage): void {
     super.onResize(msg);
   }
}

PageConfig.setOption('baseUrl', 'http://minikube.local/api/jupyterpool');
PageConfig.setOption('wsUrl', 'ws://minikube.local/api/jupyterpool');

const serverSettings = ServerConnection.makeSettings();
/*
const serverSettings: ServerConnection.ISettings = {
  baseUrl: 'http://localhost:8888/',
  appUrl: settings.appUrl,
  wsUrl: 'ws://localhost:8888/',
  init: settings.init,
  token: settings.token,
  appendToken: settings.appendToken,
  fetch: settings.fetch,
  Request: settings.Request,
  Headers: settings.Headers,
  WebSocket: settings.WebSocket
}
*/
const cellPanel = new ResizableBoxPanel();
cellPanel.id = CELL_PANEL_ID;
cellPanel.direction = 'top-to-bottom';
cellPanel.spacing = 0;

const kernelManager = new KernelManager({
  serverSettings
});
const specsManager = new KernelSpecManager({
  serverSettings
});
const sessionManager = new SessionManager({
  serverSettings,
  kernelManager 
});
const sessionContext = new SessionContext({
  sessionManager,
  specsManager,
  name: 'Example'
});
const mimeService = new CodeMirrorMimeTypeService();

// Initialize the command registry with the bindings.
const commands = new CommandRegistry();
const useCapture = true;

// Setup the keydown listener for the document.
document.addEventListener(
  'keydown',
  event => {
    commands.processKeydownEvent(event);
  },
  useCapture
);

// Create the cell widget with a default rendermime instance.
const rendermime = new RenderMimeRegistry({ initialFactories });
const codeCell = new CodeCell({
  rendermime,
  model: new CodeCellModel({
    cell: {
      cell_type: 'code',
      source: `print(1)
print(2)
print(3)
print(4)
print(5)
print(6)
print(7)
print(8)
print(9)
print(10)
`,
      metadata: {
      }
    }
  })
}).initializeState();

// Handle the mimeType for the current kernel asynchronously.
sessionContext.kernelChanged.connect(() => {
  void sessionContext.session?.kernel?.info.then(info => {
    const lang = info.language_info;
    const mimeType = mimeService.getMimeTypeByLanguage(lang);
    codeCell.model.mimeType = mimeType;
  });
});

// Use the default kernel.
sessionContext.kernelPreference = { autoStartDefault: true };

// Set up a completer.
const editor = codeCell.editor;
const model = new CompleterModel();
const completer = new Completer({ editor, model });
const connector = new KernelConnector({ session: sessionContext.session });
const handler = new CompletionHandler({ completer, connector });

// Set the handler's editor.
handler.editor = editor;

// Hide the widget when it first loads.
completer.hide();

// Create a toolbar for the cell.
const toolbar = new Toolbar();
toolbar.addItem('spacer', Toolbar.createSpacerItem());
toolbar.addItem('interrupt', Toolbar.createInterruptButton(sessionContext));
toolbar.addItem('restart', Toolbar.createRestartButton(sessionContext));
toolbar.addItem('name', Toolbar.createKernelNameItem(sessionContext));
toolbar.addItem('status', Toolbar.createKernelStatusItem(sessionContext));

cellPanel.addWidget(completer);
cellPanel.addWidget(toolbar);
cellPanel.addWidget(codeCell);

BoxPanel.setStretch(toolbar, 0);
BoxPanel.setStretch(codeCell, 1);

// Handle widget state.
window.addEventListener('resize', () => {
  cellPanel.update();
});

codeCell.outputsScrolled = false;

codeCell.activate();

// Add the commands.
commands.addCommand('invoke:completer', {
  execute: () => {
    handler.invoke();
  }
});
commands.addCommand('run:cell', {
  execute: () => CodeCell.execute(codeCell, sessionContext)
});

commands.addKeyBinding({
  selector: '.jp-InputArea-editor.jp-mod-completer-enabled',
  keys: ['Tab'],
  command: 'invoke:completer'
});
commands.addKeyBinding({
  selector: '.jp-InputArea-editor',
  keys: ['Shift Enter'],
  command: 'run:cell'
});

// Start up the kernel.
void sessionContext.initialize().then(() => {
  console.debug('Cell started!');
});

export default {
  CELL_PANEL_ID,
  codeCell, 
  cellPanel
};

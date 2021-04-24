import { BoxPanel, Widget } from '@lumino/widgets';
import { CommandRegistry } from '@lumino/commands';
import { PageConfig } from '@jupyterlab/coreutils';
import { SessionContext, Toolbar, ToolbarButton } from '@jupyterlab/apputils';
import { CodeCellModel, CodeCell } from '@jupyterlab/cells';
import { CodeMirrorMimeTypeService } from '@jupyterlab/codemirror';
import { CompleterModel, Completer, CompletionHandler, KernelConnector } from '@jupyterlab/completer';
import { RenderMimeRegistry, standardRendererFactories as initialFactories } from '@jupyterlab/rendermime';
import { SessionManager, KernelManager, KernelSpecManager } from '@jupyterlab/services';
import { ServerConnection, KernelMessage } from '@jupyterlab/services';
import { runIcon } from '@jupyterlab/ui-components';
import { getJupyterpoolBaseUrl, getJupyterpoolWsUrl } from '../../config/AuthConfig';
import { tellActions } from './../../state/tell';
import KernelModel from './KernelModel';

import '@jupyterlab/application/style/index.css';
import '@jupyterlab/cells/style/index.css';
import '@jupyterlab/outputarea/style/index.css';
import '@jupyterlab/codemirror/style/index.css';
import '@jupyterlab/completer/style/index.css';
import '@jupyterlab/theme-light-extension/style/index.css';

import './../../../style/cell.css';

export const CELL_PANEL_ID = 'cell-panel-id';

export class ResizableBoxPanel extends BoxPanel {
  /**
   * A message handler invoked on a `'resize'` message.
   */
   protected onResize(msg: Widget.ResizeMessage): void {
     super.onResize(msg);
   }
}

export class CellLumino {
  private codeCell: CodeCell;
  private cellPanel: ResizableBoxPanel;

  constructor(source: string, dispatch: any) {

    PageConfig.setOption('baseUrl', `${getJupyterpoolBaseUrl()}/api/jupyterpool`);
    PageConfig.setOption('wsUrl', `${getJupyterpoolWsUrl()}/api/jupyterpool`);

    this.cellPanel = new ResizableBoxPanel();
    this.cellPanel.id = CELL_PANEL_ID;
    this.cellPanel.direction = 'top-to-bottom';
    this.cellPanel.spacing = 0;

    const serverSettings = ServerConnection.makeSettings();
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
      name: 'Datalayer'
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
          source: source,
          metadata: {
          }
        }
      })
    });
    this.codeCell = codeCell.initializeState();

    // Handle the mimeType for the current kernel asynchronously.
    sessionContext.kernelChanged.connect(() => {
      void sessionContext.session?.kernel?.info.then(info => {
        const lang = info.language_info;
        const mimeType = mimeService.getMimeTypeByLanguage(lang);
        this.codeCell.model.mimeType = mimeType;
      });
    });

    // Use the default kernel.
    sessionContext.kernelPreference = { autoStartDefault: true };

    // Set up a completer.
    const editor = this.codeCell.editor;
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
    const runButton = new ToolbarButton({
      icon: runIcon,
      onClick: () => {
        CodeCell.execute(this.codeCell, sessionContext);
      },
      tooltip: 'Run'
    });
    toolbar.addItem('run', runButton);
    toolbar.addItem('interrupt', Toolbar.createInterruptButton(sessionContext));
    toolbar.addItem('restart', Toolbar.createRestartButton(sessionContext));
    // toolbar.addItem('name', Toolbar.createKernelNameItem(sessionContext));
    toolbar.addItem('status', Toolbar.createKernelStatusItem(sessionContext));

    this.cellPanel.addWidget(completer);
    this.cellPanel.addWidget(toolbar);
    BoxPanel.setStretch(toolbar, 0);

    this.cellPanel.addWidget(this.codeCell);
    BoxPanel.setStretch(this.codeCell, 1);

    // Handle widget state.
    window.addEventListener('resize', () => {
      this.cellPanel.update();
    });

    this.codeCell.outputsScrolled = false;

    this.codeCell.activate();

    // Add the commands.
    commands.addCommand('invoke:completer', {
      execute: () => {
        handler.invoke();
      }
    });
    commands.addCommand('run:cell', {
      execute: () => CodeCell.execute(this.codeCell, sessionContext)
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
    sessionContext.initialize().then(() => {
      const kernelModel = new KernelModel(sessionContext, dispatch);
      kernelModel.execute(source)
      void CodeCell.execute(this.codeCell, sessionContext)
      /*
      executePromise.then((msg: void | KernelMessage.IExecuteReplyMsg) => {
          console.log('Kernel messsage', msg);
          dispatch(tellActions.update.started({
            kernelAvailable: true,
          }));
      })
      */
    });

  }

  getCellPanel(): ResizableBoxPanel {
    return this.cellPanel;
  }

  getCodeCell(): CodeCell {
    return this.codeCell;
  }

}

export default CellLumino;

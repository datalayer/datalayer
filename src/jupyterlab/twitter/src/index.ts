
import { addCommands, CommandIDs } from './commands'
import { PathExt } from '@jupyterlab/coreutils'
import { INotebookTracker } from '@jupyterlab/notebook'
import { ILayoutRestorer, JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application'
// import { IMainMenu } from '@jupyterlab/mainmenu'
import {  Menu } from '@phosphor/widgets'
import { Token } from '@phosphor/coreutils'
import { DatalayerSessions } from './sessions'

/**
 * The default running sessions extension.
 */
const plugin: JupyterFrontEndPlugin<IDatalayerExtension> = {
  id: 'jupyter.extensions.datalayer',
//  requires: [IMainMenu, ILayoutRestorer, INotebookTracker],
  requires: [ILayoutRestorer, INotebookTracker],
  activate,
  autoStart: true
};

/**
 * Export the plugin as default.
 */
export default plugin

export const EXTENSION_ID = 'jupyter.extensions.datalayer_plugin'

export const IDatalayerExtension = new Token<IDatalayerExtension>(EXTENSION_ID);

export interface IDatalayerExtension {
  register_diff_provider(filetypes: string[], callback: IDiffCallback)
}

export type IDiffCallback = (filename: string, revisionA: string, revisionB: string) => void;

export class DatalayerExtension implements IDatalayerExtension {
  private datalayer_plugin
  private diffProviders: { [key: string]: IDiffCallback } = {}

  constructor(app: JupyterFrontEnd, restorer: ILayoutRestorer, notebookTracker: INotebookTracker){
    this.datalayer_plugin = new DatalayerSessions(
      app, 
      notebookTracker,
      { manager: app.serviceManager }, 
      this.performDiff.bind(this)
    )
    this.datalayer_plugin.id = 'datalayer'
    this.datalayer_plugin.title.iconClass = 'jp-Twitter-tablogo'
    // Let the application restorer track the running panel for restoration of application state
    // (e.g. setting the running panel as the current side bar widget).
    restorer.add(this.datalayer_plugin, 'datalayer')
    app.shell.add(this.datalayer_plugin, 'left', { rank: 200 })
  }

  register_diff_provider(filetypes: string[], callback: IDiffCallback) {
    for (let fileType of filetypes) {
      this.diffProviders[fileType] = callback;
    }
  }

  performDiff(app: JupyterFrontEnd, filename: string, revisionA: string, revisionB: string) {
    let extension = PathExt.extname(filename).toLocaleLowerCase();
    console.log(extension);
    console.log(this.diffProviders[extension]);
    if (this.diffProviders[extension]!== undefined) {
      this.diffProviders[extension](filename, revisionA, revisionB);
    } else {
      app.commands.execute('datalayer:terminal-cmd', {'cmd':'datalayer diff '+revisionA+' '+revisionB});
    }
  }

}

/**
 * Activate the plugin.
 */
function activate(app: JupyterFrontEnd, 
//  mainMenu: IMainMenu, 
  restorer: ILayoutRestorer,
  notebookTracker: INotebookTracker): IDatalayerExtension {
  const { commands} = app
  let datalayer_extension = new DatalayerExtension(app, restorer, notebookTracker)
  const category = 'datalayer'
  // Rank has been chosen somewhat arbitrarily to give priority to the running sessions widget in the sidebar.
  addCommands(app, app.serviceManager);
  let menu = new Menu({commands})
  menu.title.label = category
  console.log('CommandIDs', CommandIDs)
/*
  [CommandIDs.twitter_panel].forEach(command => {
    menu.addItem({command})
  })
*/
  //  mainMenu.addMenu(menu, {rank:60});
  return datalayer_extension
}

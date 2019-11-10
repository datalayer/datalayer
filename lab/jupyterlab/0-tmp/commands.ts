import { JupyterLab } from '@jupyterlab/application';
import { ServiceManager } from '@jupyterlab/services';

/**
 * The command IDs used by the twitter plugin.
 */
export namespace CommandIDs {
  export const twitter_panel = 'twitter:panel';
}

/**
 * Add the commands for the twitter-plugin.
 */
export function addCommands(app: JupyterLab, services: ServiceManager) {

  let { commands } = app;

  commands.addCommand(CommandIDs.twitter_panel, {
    label: 'Twitter Panel',
    caption: 'Go to Twitter Panel',
    execute: () => {
      try{
        app.shell.activateById('jp-twitter-sessions');
       } catch(err) {        
       }
    }    
  })

}

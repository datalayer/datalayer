import { JupyterFrontEnd } from '@jupyterlab/application'
import { ServiceManager } from '@jupyterlab/services'

/**
 * The command IDs used by the plugin.
 */
export namespace CommandIDs {
  export const twitter_panel = 'twitter:panel'
}

/**
 * Add the commands for the plugin.
 */
export function addCommands(app: JupyterFrontEnd, services: ServiceManager) {
  let { commands } = app
  commands.addCommand(CommandIDs.twitter_panel, {
    label: 'Twitter Panel',
    caption: 'Go to Twitter Panel',
    execute: () => {
      try {
        app.shell.activateById('twitter:panel')
       }
       catch(err) {
         console.log('Error while activating by id', err)
       }
    }    
  })

}

import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';

import { MainAreaWidget } from '@jupyterlab/apputils';

import { IMainMenu } from '@jupyterlab/mainmenu';

import { Menu } from '@lumino/widgets';

import LuminoQS from './LuminoQS';
import CounterWidget from './ReactQS';

/**
 * The command IDs used by the extension.
 */
namespace CommandIDs {
  export const lumino = 'quirkshop:open-lumino-tab';
  export const react = 'quirkshop:open-react-tab';
}


/**
 * Initialization data for the quirkshop-jlab-react extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'quirkshop-jlab-react',
  autoStart: true,
  requires: [ICommandPalette, IMainMenu],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    mainMenu: IMainMenu
    ) => {

      console.log(
        "%cJupyterLab extension quirkshop-jlab4-react is activated! yeah! quirkshop!",
        "font-size:30px"
      );

      const { commands, shell } = app;
      const quirkshopMenu = new Menu({ commands });  
      quirkshopMenu.title.label = 'Quirkshop';
      mainMenu.addMenu(quirkshopMenu, { rank: 80 });

      // Lumino.
      commands.addCommand(CommandIDs.lumino, {
        label: 'Open a Lumino Widget in a Tab',
        caption: 'Open a Lumino Widget in a Tab',
        execute: () => {
          const widget = new LuminoQS();
          shell.add(widget, 'main');
        }
      });
      palette.addItem({ command: CommandIDs.lumino, category: 'Quirkshop React' });
      quirkshopMenu.addItem({ command: CommandIDs.lumino });

      // React.
      commands.addCommand(CommandIDs.react, {
        label: 'Open a React Widget in a Tab',
        caption: 'Open a React Widget in a Tab',
        execute: () => {
          const content = new CounterWidget(true);
          const widget = new MainAreaWidget<CounterWidget>({ content });
          widget.title.label = 'Quirkshop React';
          app.shell.add(widget, 'main');
        }
      });
      palette.addItem({ command: CommandIDs.react , category: 'Quirkshop React' });
      quirkshopMenu.addItem({ command: CommandIDs.react });

    }

};

export default extension;

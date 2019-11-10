import * as React from '../../node_modules/@types/react'
import * as ReactDOM from '../../node_modules/@types/react-dom'
import { Init } from './init'
import { Cluster } from './cluster'
import { Connectors } from './connectors'
import { Datasets } from './datasets'
import { Kernels } from './kernels'
import { Library } from './library'
import { Social } from './social'
import { JupyterLab, JupyterLabPlugin, ILayoutRestorer } from '../../node_modules/@jupyterlab/application/lib'
import { IMainMenu } from '../../node_modules/@jupyterlab/mainmenu/lib'
import { ICommandPalette } from '../../node_modules/@jupyterlab/apputils/lib'
import { Message } from '../../node_modules/@phosphor/messaging/lib'
import { Widget, Menu } from '../../node_modules/@phosphor/widgets/lib'
import { loadDatalayerTheme } from './node_modules/@datalayer/datalayer/lib/theme/DatalayerThemes'

import './node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import './node_modules/react-redux-toastr/lib/css/react-redux-toastr.min.css'
import '../style/index.css'

/**
 * Datalayer Widget.
 */
class DatalayerWidget extends Widget {
  /**
   * Construct a new Datalayer widget.
   */
  public constructor(title: string, id: string) {
    super();
    this.id = id;
    this.title.label = title;
    this.title.closable = true;
    this.addClass('jp-datalayerWidget')
  }

  /**
   * Handle update requests for the widget.
   */
  public onUpdateRequest(msg: Message): void {
    //
  }

};

/**
 * The command IDs used by the plugin.
 */
export namespace CommandIDs {
  export const cluster: string = 'datalayer:cluster';
  export const connectors: string = 'datalayer:connectors';
  export const datasets: string = 'datalayer:datasets';
  export const kernels: string = 'datalayer:kernels';
  export const library: string = 'datalayer:library';
  export const social: string = 'datalayer:social';
};

function activate(app: JupyterLab, palette: ICommandPalette, restorer: ILayoutRestorer, mainMenu: IMainMenu) {

  console.clear()
  console.log('Activating jupyterlab.extensions.datalayer.');

  loadDatalayerTheme();

  let initWidget: DatalayerWidget;
  let clusterWidget: DatalayerWidget;
  let connectorsWidget: DatalayerWidget;
  let datasetsWidget: DatalayerWidget;
  let kernelsWidget: DatalayerWidget;
  let libraryWidget: DatalayerWidget;
  let socialWidget: DatalayerWidget;

  const category = 'Datalayer';

  const { commands } = app;

  initWidget = new DatalayerWidget('Init', 'datalayer-init');
  ReactDOM.render((
    <React.Fragment>
      <Init />
    </React.Fragment>
  ), initWidget.node);
  app.shell.addToMainArea(initWidget);

  app.commands.addCommand(CommandIDs.cluster, {
    label: 'Cluster',
    execute: () => {
      if (!clusterWidget) {
        clusterWidget = new DatalayerWidget('Cluster', 'datalayer-cluster');
        ReactDOM.render((
          <React.Fragment>
            <Cluster />
          </React.Fragment>
        ), clusterWidget.node);
        clusterWidget.update();
      }
      if (!clusterWidget.isAttached) {
        app.shell.addToMainArea(clusterWidget);
      } else {
        clusterWidget.update();
      }
      app.shell.activateById(clusterWidget.id);
    }
  });

  app.commands.addCommand(CommandIDs.connectors, {
    label: 'Connectors',
    execute: () => {
      if (!connectorsWidget) {
        connectorsWidget = new DatalayerWidget('Connectors', 'datalayer-connectors');
        ReactDOM.render((
          <React.Fragment>
            <Connectors data={{a: 1, b: 2, c: 3}} />
          </React.Fragment>
        ), connectorsWidget.node);
        connectorsWidget.update();
      }
      if (!connectorsWidget.isAttached) {
        app.shell.addToMainArea(connectorsWidget);
      } else {
        connectorsWidget.update();
      }
      app.shell.activateById(connectorsWidget.id);
    }
  });
  
  app.commands.addCommand(CommandIDs.datasets, {
    label: 'Datasets',
    execute: () => {
      if (!datasetsWidget) {
        datasetsWidget = new DatalayerWidget('Datasets', 'datalayer-datasets');
        ReactDOM.render((
          <React.Fragment>
            <Datasets />
          </React.Fragment>
        ), datasetsWidget.node);
        datasetsWidget.update();
      }
      if (!datasetsWidget.isAttached) {
        app.shell.addToMainArea(datasetsWidget);
      } else {
        datasetsWidget.update();
      }
      app.shell.activateById(datasetsWidget.id);
    }
  });

  app.commands.addCommand(CommandIDs.kernels, {
    label: 'Kernels',
    execute: () => {
      if (!kernelsWidget) {
        kernelsWidget = new DatalayerWidget('Kernels', 'datalayer-kernels');
        ReactDOM.render((
          <React.Fragment>
            <Kernels />
          </React.Fragment>
        ), kernelsWidget.node);
        kernelsWidget.update();
      }
      if (!kernelsWidget.isAttached) {
        app.shell.addToMainArea(kernelsWidget);
      } else {
        kernelsWidget.update();
      }
      app.shell.activateById(kernelsWidget.id);
    }
  });

  app.commands.addCommand(CommandIDs.library, {
    label: 'Library',
    execute: () => {
      if (!libraryWidget) {
        libraryWidget = new DatalayerWidget('Library', 'datalayer-library');
        ReactDOM.render((
          <React.Fragment>
            <Library />
          </React.Fragment>
        ), libraryWidget.node);
        libraryWidget.update();
      }
      if (!libraryWidget.isAttached) {
        app.shell.addToMainArea(libraryWidget);
      } else {
        libraryWidget.update();
      }
      app.shell.activateById(libraryWidget.id);
    }
  });

  app.commands.addCommand(CommandIDs.social, {
    label: 'Social',
    execute: () => {
      if (!socialWidget) {
        socialWidget = new DatalayerWidget('Social', 'datalayer-social');
        ReactDOM.render((
          <React.Fragment>
            <Social />
          </React.Fragment>
        ), socialWidget.node);
        socialWidget.update();
      }
      if (!socialWidget.isAttached) {
        app.shell.addToMainArea(socialWidget);
      } else {
        socialWidget.update();
      }
      app.shell.activateById(socialWidget.id);
    }
  });

  let menu = new Menu({ commands });
  menu.title.label = category;
  [
    CommandIDs.cluster,
    CommandIDs.connectors,
    CommandIDs.datasets,
    CommandIDs.kernels,
    CommandIDs.library,
    CommandIDs.social,
  ].forEach(command => {
    palette.addItem({ command, category });
    menu.addItem({ command });
  });
  mainMenu.addMenu(menu, {rank: 10});

};

/**
 * Initialization data for the jupyterlab.extensions.datalayer.cluster extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab.extensions.datalayer',
  autoStart: true,
  requires: [ICommandPalette, ILayoutRestorer, IMainMenu],
  activate: activate
};

export default extension;

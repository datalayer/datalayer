import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the quirkshop-jlab3-react extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'quirkshop-jlab3-react',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension quirkshop-jlab5-react is activated!');
  }
};

export default extension;

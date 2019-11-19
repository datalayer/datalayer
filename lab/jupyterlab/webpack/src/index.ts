import { Widget } from "@phosphor/widgets";
import { ICommandPalette } from "@jupyterlab/apputils";
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

class SampleWidget extends Widget {
  constructor() {
    super();
    this.node.textContent = "Hello";
  }
}

const extension: JupyterFrontEndPlugin<void> = {
  id: "webpack",
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log("Starting webpack build extension");
    app.commands.addCommand("webpack:sample", {
      label: "Sample widget",
      execute: () => {
        app.shell.add(new SampleWidget(), 'main');
      }
    });
    palette.addItem({ command: "webpack:sample", category: "Sample" });
  }
};

export default extension;

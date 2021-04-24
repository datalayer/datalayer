import { Message } from '@lumino/messaging';

import { 
  BoxPanel, 
  DockPanel, 
  Menu, 
  MenuBar, 
  Widget
} from '@lumino/widgets';

import { CommandRegistry} from '@lumino/commands';

import { LuminoAdapter } from '@jupyter-react/lumino-adapter/lib';

import './../../style/index.css';

const commands = new CommandRegistry();

export default class MultipleDocksExample extends LuminoAdapter {

  constructor(props: any) {

    super(props);

    let menu1 = this.createMenu();
    menu1.title.label = 'File';
    menu1.title.mnemonic = 0;

    let menu2 = this.createMenu();
    menu2.title.label = 'Edit';
    menu2.title.mnemonic = 0;

    let menu3 = this.createMenu();
    menu3.title.label = 'View';
    menu3.title.mnemonic = 0;

    let bar = new MenuBar();
    bar.addMenu(menu1);
    bar.addMenu(menu2);
    bar.addMenu(menu3);
    bar.id = 'menuBar';

    document.addEventListener('keydown', (event: KeyboardEvent) => {
      commands.processKeydownEvent(event);
    });

    let r1 = new DockContentWidget('Red');
    let b1 = new DockContentWidget('Blue');
    let g1 = new DockContentWidget('Green');
    let y1 = new DockContentWidget('Yellow');

    let r2 = new DockContentWidget('Red');
    let b2 = new DockContentWidget('Blue');

    let dock = new DockPanel();
    dock.addWidget(r1);
    dock.addWidget(b1, { mode: 'split-right', ref: r1 });
    dock.addWidget(y1, { mode: 'split-bottom', ref: b1 });
    dock.addWidget(g1, { mode: 'split-left', ref: y1 });
    dock.addWidget(r2, { ref: b1 });
    dock.addWidget(b2, { mode: 'split-right', ref: y1 });
    dock.id = 'dock';

    try {

      let savedLayouts: DockPanel.ILayoutConfig[] = [];
  
      commands.addCommand('save-dock-layout', {
        label: 'Save Layout',
        caption: 'Save the current dock layout',
        execute: () => {
          savedLayouts.push(dock.saveLayout());
        }
      });
      commands.addCommand('restore-dock-layout', {
        label: args => {
          return `Restore Layout ${args.index as number}`;
        },
        execute: args => {
          dock.restoreLayout(savedLayouts[args.index as number]);
        }
      });
    }
    catch (error) {
      console.warn(error);
    }

    BoxPanel.setStretch(dock, 1);
    const main = new BoxPanel({ direction: 'top-to-bottom', spacing: 0 });
    main.id = 'main';
//    main.addWidget(bar);
    main.addWidget(dock);

    this.widget = main;

    window.onresize = () => { this.widget.update(); }

  }

  createMenu(): Menu {

    let sub1 = new Menu({ commands });
    sub1.title.label = 'More...';
    sub1.title.mnemonic = 0;
    sub1.addItem({ command: 'example:one' });
    sub1.addItem({ command: 'example:two' });
    sub1.addItem({ command: 'example:three' });
    sub1.addItem({ command: 'example:four' });
  
    let sub2 = new Menu({ commands });
    sub2.title.label = 'More...';
    sub2.title.mnemonic = 0;
    sub2.addItem({ command: 'example:one' });
    sub2.addItem({ command: 'example:two' });
    sub2.addItem({ command: 'example:three' });
    sub2.addItem({ command: 'example:four' });
    sub2.addItem({ type: 'submenu', submenu: sub1 });
  
    let root = new Menu({ commands });
    root.addItem({ command: 'example:copy' });
    root.addItem({ command: 'example:cut' });
    root.addItem({ command: 'example:paste' });
    root.addItem({ type: 'separator' });
    root.addItem({ command: 'example:new-tab' });
    root.addItem({ command: 'example:close-tab' });
    root.addItem({ command: 'example:save-on-exit' });
    root.addItem({ type: 'separator' });
    root.addItem({ command: 'example:open-task-manager' });
    root.addItem({ type: 'separator' });
    root.addItem({ type: 'submenu', submenu: sub2 });
    root.addItem({ type: 'separator' });
    root.addItem({ command: 'example:close' });
  
    return root;
    
  }  

}

class DockContentWidget extends Widget {

  constructor(name: string) {
    super({ node: DockContentWidget.createNode() });
    this.setFlag(Widget.Flag.DisallowLayout);
    this.addClass('content');
    this.addClass(name.toLowerCase());
    this.title.label = name;
    this.title.closable = true;
    this.title.caption = `Long description for: ${name}`;
  }

  get inputNode(): HTMLInputElement {
    return this.node.getElementsByTagName('input')[0] as HTMLInputElement;
  }

  protected onActivateRequest(msg: Message): void {
    if (this.isAttached) {
      this.inputNode.focus();
    }
  }

  static createNode(): HTMLElement {
    let node = document.createElement('div');
    let content = document.createElement('div');
    let input = document.createElement('input');
    input.placeholder = 'Placeholder...';
    content.appendChild(input);
    node.appendChild(content);
    return node;
  }

}

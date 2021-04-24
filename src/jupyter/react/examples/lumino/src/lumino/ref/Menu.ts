import { 
  BoxPanel, 
  DockPanel, 
  Menu,
  MenuBar,
  Widget
} from '@lumino/widgets';

import { CommandRegistry } from '@lumino/commands';

import ContentWidget from './SimpleContent'

import './../../style/index.css';

const commands = new CommandRegistry();

function createMenu(): Menu {
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


const colors = ['Red', 'Yellow', 'Green', 'Blue'];

const panel = new BoxPanel();
panel.id = 'main';
panel.direction = 'top-to-bottom';
panel.spacing = 0;

// Menu
let menu1 = createMenu();
menu1.title.label = 'File';
menu1.title.mnemonic = 0;
let menu2 = createMenu();
menu2.title.label = 'Edit';
menu2.title.mnemonic = 0;
let menu3 = createMenu();
menu3.title.label = 'View';
menu3.title.mnemonic = 0;
let menuBar = new MenuBar();
menuBar.addMenu(menu1);
menuBar.addMenu(menu2);
menuBar.addMenu(menu3);
menuBar.id = 'menuBar';
panel.addWidget(menuBar);

// Dock Panel
const r1 = new ContentWidget('Red');
const b1 = new ContentWidget('Blue');
const g1 = new ContentWidget('Green');
const y1 = new ContentWidget('Yellow');
const r2 = new ContentWidget('Red');
const b2 = new ContentWidget('Blue');
const dock = new DockPanel();
dock.addWidget(r1);
dock.addWidget(b1, { mode: 'split-right', ref: r1 });
dock.addWidget(y1, { mode: 'split-bottom', ref: b1 });
dock.addWidget(g1, { mode: 'split-left', ref: y1 });
dock.addWidget(r2, { ref: b1 });
dock.addWidget(b2, { mode: 'split-right', ref: y1 });
dock.id = 'dock';
panel.addWidget(dock);

for (let i = 0; i < 100; i++) {
  const c = new ContentWidget(colors[Math.floor(Math.random() * 4)]);
  panel.addWidget(c);
//  BoxPanel.setStretch(c, 1);
}

const t = document.createElement('div');
document.body.appendChild(t);
Widget.attach(panel, t);
panel.update();

window.addEventListener('resize', () => {
  panel.update();
});

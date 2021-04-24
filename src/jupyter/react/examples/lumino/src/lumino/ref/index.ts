import { 
  BoxPanel, 
  DockPanel, 
  Widget
} from '@lumino/widgets';
import ContentWidget from './SimpleContent';

import './../../../style/index.css';

const colors = ['Red', 'Yellow', 'Green', 'Blue'];

const panel = new BoxPanel();
panel.id = 'main';
panel.direction = 'top-to-bottom';
panel.spacing = 0;

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
// panel.update();

window.addEventListener('resize', () => {
  panel.update();
});

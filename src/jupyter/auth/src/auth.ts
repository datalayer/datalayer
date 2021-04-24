import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { LabIcon } from '@jupyterlab/ui-components';

import peopleSvg from './../style/icons/people-24px.svg';
/*
import { requestAPI } from './handler'

import AuthWidget from './widget';

function request(path: string, widget: AuthWidget) {
  return requestAPI<any>(path)
    .then(data => {
      console.log('Got a response from the jupyter_auth server API', data);
      widget.setUsers(data);
      // @ts-ignore
      window.juser = data
    })
    .catch(reason => {
      console.error(
        `The jupyter_auth server API appears to be missing.\n${reason}`
      );
    });
}
*/
export const peopleIcon = new LabIcon({
  name: 'auth:users',
  svgstr: peopleSvg
});

const auth: JupyterFrontEndPlugin<void> = {
  id: 'jupyter-auth',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    /*
    const widget = new AuthWidget();
    widget.id = 'jupyter-auth'
    widget.title.icon = peopleIcon;
    app.shell.add(widget, 'left', { rank: 300 })
    request('users', widget)
    */
  }

};

export default auth;

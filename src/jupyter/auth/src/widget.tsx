import React from 'react';

import { ReactWidget } from '@jupyterlab/apputils';

/**
 * React Auth Component.
 *
 * @returns The React component
 */
const AuthComponent = (data: any) => {
  const users = data.users.users
  return (
    <div>
      {
        users.map((user: any) => 
          <div key={user.login}>
            <a href={`https://github.com/${user.login}`} target="_blank">
              <img src={user.avatar_url} style={{width: '100px'}}/>
              <div>{user.name}</div>
              <div className='jp-Auth-username'>@{user.login}</div>
              {user.bio && <div className='jp-Auth-bio'>Bio: {user.bio}</div>}
            </a>
            <hr/>
          </div> 
        )       
      }
    </div>
  );
};

/**
 * A Auth Lumino Widget that wraps a AuthComponent.
 */
class AuthWidget extends ReactWidget {

  private users: [] = [];

  /**
   * Constructs a new CounterWidget.
   */
  constructor() {
    super();
    this.addClass('jp-Auth-Widget');
  }

  render(): JSX.Element {
    return <AuthComponent users={this.users}/>;
  }

  setUsers(users: []) {
    this.users = users;
    this.update();
  }

}

export default AuthWidget;

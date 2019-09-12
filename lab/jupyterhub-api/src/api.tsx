import * as React from 'react'
import JsonView from './jsonview'
import './../style/style.css'

export default class Api extends React.Component<any, any> {

  state = {
    info: {},
    user: {},
    users: {},
  }

  usernameRef = React.createRef<HTMLInputElement>()

  public constructor(props) {
    super(props)
    this.info = this.info.bind(this)
    this.createUser = this.createUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.users = this.users.bind(this)
  }

  public render() {
    const { info, user, users } = this.state
    return <div>
      <h1>JupyterHub API Browser</h1>
      <a 
        href="http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyterhub/jupyterhub/master/docs/rest-api.yml#/default"
        target="_blank"
      >
        Swagger
      </a>
      &nbsp;|&nbsp;
      <a href="https://jupyterhub.readthedocs.io/en/latest/_static/rest-api/index.html" target="_blank">Readthedocs</a>
      &nbsp;|&nbsp;
      <a href="https://jupyterhub.readthedocs.io/en/stable/api/index.html" target="_blank">Readthedocs (text)</a>
      <hr/>
      <form>
        <div>
          <label>Username :</label>
          <input type="text" name="username" ref={this.usernameRef} />
        </div>
        <div>
          <input type="submit" value="Create User" onClick={(e) => this.createUser(e)}/>
          <input type="submit" value="Delete User" onClick={(e) => this.deleteUser(e)}/>
        </div>
      </form>
      <JsonView data={ user } />
      <hr/>
      <button onClick={ this.info }>Infos</button>
      <JsonView data={ info } />
      <hr/>
      <button onClick={ this.users }>Users</button>
      <JsonView data={ users } />
    </div>
  }

  private async info() {
    const res = await fetch('./info', {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({ 
        "Content-Type": "application/json"
      })
    })
    res.json().then(info => {
      this.setState({ info: info })
    })
  }

  private async createUser(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault()
    const username = this.usernameRef.current.value
    const res = await fetch(`./users/${username}`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({ 
        "Content-Type": "application/json"
      })
    })
    res.json().then(user => {
      this.setState({ user: user })
    })    
  }

  private async deleteUser(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault()
    const username = this.usernameRef.current.value
    const res = await fetch(`./users/${username}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: new Headers({ 
        "Content-Type": "application/json"
      })
    })
    res.json().then(user => {
      this.setState({ user: user })
    })    
  }

  private async users() {
    const res = await fetch('./users', {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({ 
        "Content-Type": "application/json"
      })
    })
    res.json().then(users => {
      this.setState({ users: users })
    })    
  }

}

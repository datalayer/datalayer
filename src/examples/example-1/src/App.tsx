import React from 'react';
import ReactLogo from './ReactLogo.svg';
import YarnCat from './YarnCat.svg';
import './App.css';
import {Counter} from './Counter';
import {HelloOne, HelloTwo} from '@datalayer/components';

export default class App extends React.Component<any, any> {
  public constructor(props: any) {
    super(props)
  }
  
  public render() {
    return (
		<div className="App">
			<header className="App-header">
				<div>
					<img
						src={ReactLogo}
						className="React-logo"
						alt="React Logo"
					/>
					<img
						src={YarnCat}
						className="Yarn-cat"
						alt="Yarn Workspaces Cat"
					/>
				</div>
				<h1>
					<a
						className="App-link"
						href="https://github.com/react-workspaces/cra-workspaces-playground"
						target="_blank"
						rel="noopener noreferrer"
					>
						<strong>React</strong> Workspaces
					</a>
				</h1>
				<h2>Hot Reload Your Workspaces</h2>
				<div className="components">
					<HelloOne />
					<HelloTwo />
				</div>
				<h2>Counter with Hooks</h2>
				<Counter/>
			</header>
		</div>
    );
  }
}

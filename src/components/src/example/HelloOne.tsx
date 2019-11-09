import React from 'react';
import './HelloOne.css';

export default class HelloOne extends React.Component<any, any> {
	public constructor(props: any) {
	  super(props)
	}
	
	public render() {
	  return (
		<div className="Comp">
		<h3>
			<span role="img" aria-label="React Logo">
				⚛️
			</span>
			  Hello One
			</h3>
		</div>
	  );
	}

}

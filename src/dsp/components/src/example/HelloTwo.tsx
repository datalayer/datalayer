import React from 'react';
import './HelloTwo.css';
import moment from 'moment';

const HelloTwo: React.FC = () => (
	<div className="Comp">
		<h3>
			<span role="img" aria-label="Yarn Logo">
				🐱
			</span>{' '}
			Hello, it is now {moment().toISOString()}
		</h3>
	</div>
);

export default HelloTwo;

import React from 'react';
import ReactDOM from 'react-dom';
import HelloTwo from './HelloTwo';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<HelloTwo />, div);
	ReactDOM.unmountComponentAtNode(div);
});

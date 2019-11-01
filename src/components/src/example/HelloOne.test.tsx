import React from 'react';
import ReactDOM from 'react-dom';
import HelloOne from './HelloOne';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<HelloOne />, div);
	ReactDOM.unmountComponentAtNode(div);
});

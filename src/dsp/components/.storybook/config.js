import {addParameters, configure} from '@storybook/react';
import {themes} from '@storybook/theming';

import "./../src/assets/scss/material-kit-pro-react.scss?v=1.8.0";
import "./../src/assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

addParameters({
	options: {
		theme: themes.normal
	}
});

const comps = require.context('./../src', true, /.stories.tsx$/);

configure(() => {
	comps.keys().forEach(filename => comps(filename));
}, module);

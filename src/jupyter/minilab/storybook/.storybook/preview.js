import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { addParameters } from '@storybook/react';
import { configure } from '@storybook/react';

addParameters({
	viewMode: 'docs',
	docs: {
	  container: DocsContainer,
	  page: DocsPage,
	},
	options: {
		storySort: {
		  order: [
			  'Welcome',
			  'JupyterLab',
			  'Lumino',
			  'Material UI',
			  'Nteract',
			  'VDOM',
			  'IpyWidgets',
			],
		},
	  },
});

const req = require.context('./../src', true, /.story.(tsx|mdx)$/);
configure(req, module);

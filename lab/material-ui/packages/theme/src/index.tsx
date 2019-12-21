import React from 'react';
import { render } from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import {Welcome} from '@datalayer/dlab-mui-widgets';
import {Example1} from '@datalayer/dlab-mui-widgets';
import theme from './Theme';

window.addEventListener('DOMContentLoaded', () => {
  render(
    <div>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Welcome />
        <Example1 />
      </ThemeProvider>
    </div>
    ,
    document.getElementById('root'));
})

import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

import Router from './Router';
import theme from './theme';
import GlobalStyle from './theme/global';

ReactDOM.render(
  <React.StrictMode>
    <Normalize />
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

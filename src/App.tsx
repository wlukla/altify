import React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

import Router from './Router';
import theme from './theme';
import GlobalStyle from './theme/global';

const App: React.FC = () => (
  <React.StrictMode>
    <RecoilRoot>
      <Normalize />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);

export default App;

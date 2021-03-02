import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

import Router from './Router';
import theme from './theme';
import GlobalStyle from './theme/global';
import useAuthorization from './hooks/useAuthorization';
import usePlayer from './hooks/usePlayer';

const App: React.FC = () => {
  useAuthorization();
  usePlayer();

  return (
    <>
      <Normalize />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;

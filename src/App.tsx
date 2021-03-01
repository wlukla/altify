import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

import Router from './Router';
import useLogin from './hooks/useLogin';
import theme from './theme';
import GlobalStyle from './theme/global';

const App: React.FC = () => {
  useLogin();

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

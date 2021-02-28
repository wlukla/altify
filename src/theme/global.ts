import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.palette.primary.main};
    font-family: ${({ theme }) => theme.font};
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;

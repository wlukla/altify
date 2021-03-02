import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  borderRadius: {
    default: '6px',
    full: '9999px',
  },
  palette: {
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    primary: {
      main: '#F1E8E6',
      text: '#F55951',
    },
    secondary: {
      main: '#EDD2CB',
      text: '#361D32',
    },
  },
  font: 'Roboto, Helvetica, sans-serif',
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
  },
};

export default theme;

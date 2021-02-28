import 'styled-components';

interface IPalette {
  main: string;
  text: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: {
      default: string;
      full: string;
    };
    palette: {
      common: {
        black: string;
        white: string;
      };
      primary: IPalette;
      secondary: IPalette;
    };
    font: styring;
  }
}

import { Theme as MuiTheme } from '@mui/material/styles/createTheme';
import { createTheme, Palette } from '@mui/material/styles';
import THEME_MODES from '../enums/themeModes';
import darkPalette from './darkPalette';
import lightPalette from './lightPalette';

const theme = (mode: typeof THEME_MODES.DARK | typeof THEME_MODES.LIGHT): MuiTheme =>
  createTheme({
    components: {
      MuiContainer: {
        defaultProps: {
          maxWidth: 'xl',
          fixed: true,
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: (mode === THEME_MODES.DARK ? darkPalette : lightPalette) as Palette,
    typography: {
      fontFamily: ['"Open Sans"', 'Poppins', 'Roboto', 'Commissioner', 'sans-serif'].join(','),
      h1: {
        fontSize: 48,
        fontFamily: 'Poppins',
        lineHeight: 1.125,
        '@media (max-width: 400px)': {
          fontSize: 38,
        },
      },
      h2: {
        fontSize: 40,
        fontFamily: 'Poppins',
        lineHeight: 1.125,
        '@media (max-width: 400px)': {
          fontSize: 34,
        },
      },
      h3: {
        fontSize: 32,
        fontFamily: 'Poppins',
        lineHeight: 1.125,
        '@media (max-width: 400px)': {
          fontSize: 28,
        },
      },
      h4: {
        fontSize: 28,
        fontFamily: 'Poppins',
        lineHeight: 1.125,
        '@media (max-width: 400px)': {
          fontSize: 20,
        },
      },
      h5: {
        fontSize: 25,
        fontFamily: 'Poppins',
        lineHeight: 1.125,
        '@media (max-width: 400px)': {
          fontSize: 18,
        },
      },
      h6: {
        fontSize: 20,
        fontFamily: 'Poppins',
        lineHeight: 1.125,
        '@media (max-width: 400px)': {
          fontSize: 16,
        },
      },
      subtitle1: {
        fontSize: 18,
        fontWeight: 400,
        fontFamily: 'Poppins',
        lineHeight: 1.5,
        '@media (max-width: 400px)': {
          fontSize: 16,
        },
      },
      subtitle2: {
        fontSize: 16,
        fontWeight: 400,
        fontFamily: 'Poppins',
        lineHeight: 1.5,
        '@media (max-width: 400px)': {
          fontSize: 14,
        },
      },
      body1: {
        fontSize: 14,
        fontWeight: 400,
        fontFamily: 'Poppins',
        lineHeight: 1.5,
        '@media (max-width: 400px)': {
          fontSize: 12,
        },
      },
      body2: {
        fontSize: 13,
        fontWeight: 400,
        fontFamily: 'Poppins',
        lineHeight: 1.5,
        '@media (max-width: 400px)': {
          fontSize: 11,
        },
      },
    },
  });

export default theme;

import { Theme as MuiTheme } from '@mui/material/styles/createTheme';
import { createTheme, Palette } from '@mui/material/styles';
import THEME_MODES from '../enums/themeModes';
import darkPalette from './darkPalette';
import lightPalette from './lightPalette';
import typography from './typography';

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
    typography,
  });

export default theme;

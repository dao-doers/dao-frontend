import { Gradients, CommonColors, CommonButtonsColors } from '@mui/material/styles';
import { Theme as MuiTheme } from '@mui/material/styles/createTheme';
import { linearGradient } from '../utils/gradients';

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

declare module '@mui/material/styles' {
  interface Gradients {
    grad1: string;
    grad2: string;
    grad3: string;
    grad4: string;
  }

  interface CommonColors {
    white: string;
    black: string;
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
    col6: string;
    col7: string;
  }

  interface Colors extends CommonColors {
    main1: string;
    main2: string;
    main3: string;
    main4: string;
    main5: string;
    main6: string;
    main7: string;
    main8: string;
    main9: string;
  }

  interface ButtonColors {
    basic: {
      background: string;
      text: string;
      border: string;
    };
    hover: {
      background: string;
      text: string;
      border: string;
    };
    disabled: {
      background: string;
      text: string;
      border: string;
    };
  }

  interface CommonButtonsColors {
    gradientLight: ButtonColors;
    agreeVariant: ButtonColors;
  }

  interface ButtonsColors extends CommonButtonsColors {
    default: ButtonColors;
    gradientOutline: ButtonColors;
    agreeVariant: ButtonColors;
    disagreeVariant: ButtonColors;
  }

  interface Palette {
    gradients: Gradients;
    colors: Colors;
    buttons: ButtonsColors;
  }
}

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export interface CommonPalette {
  gradients: Gradients;
  colors: CommonColors;
  buttons: CommonButtonsColors;
}

const colors: CommonColors = {
  white: '#FFFFFF',
  black: '#000000',
  col1: '#2EA5E8',
  col2: '#00D395',
  col3: '#F2C94C',
  col4: '#fdbb2d',
  col5: '#ED2391',
  col6: '#FE003E',
  col7: '#b21f1f',
};

const gradients: Gradients = {
  grad1: linearGradient('45deg', '#ED2391', '#2EA5E8'),
  grad2: linearGradient('45deg', '#2EA5E8', '#00D395'),
  grad3: linearGradient('45deg', '#FAFAFA', '#FFFFFF'),
  grad4: linearGradient('45deg', '#111117', '#040404'),
};

const buttons: CommonButtonsColors = {
  gradientLight: {
    basic: {
      background: gradients.grad1,
      text: colors.white,
      border: 'transparent',
    },
    hover: {
      background: gradients.grad1,
      text: colors.white,
      border: 'transparent',
    },
    disabled: {
      background: gradients.grad1,
      text: colors.white,
      border: 'transparent',
    },
  },
} as any;

const common: CommonPalette = {
  colors,
  gradients,
  buttons,
};

export default common;

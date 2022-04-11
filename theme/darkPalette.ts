import { Colors, Palette } from '@mui/material/styles';
import common, { RecursivePartial } from './common';

const colors: Colors = {
  ...common.colors,
  main1: '#000000',
  main2: '#121212',
  main3: '#0C0C0F',
  main4: '#111117',
  main5: '#14131C',
  main6: '#737373',
  main7: '#e8e8e8',
  main8: 'rgba(66, 68, 90, 0.3)',
  main9: 'rgba(240, 240, 240, 0.15)',
};

const palette: RecursivePartial<Palette> = {
  ...common,
  background: {
    default: colors.main2,
  },
  buttons: {
    ...common.buttons,
    default: {
      basic: {
        background: colors.main4,
        text: colors.main6,
        border: 'transparent',
      },
      hover: {
        background: colors.main4,
        text: colors.main7,
        border: 'transparent',
      },
      disabled: {
        background: colors.main2,
        text: colors.main6,
        border: 'transparent',
      },
    },
    gradientOutline: {
      basic: {
        background: colors.main1,
        text: colors.main7,
        border: common.gradients.grad2,
      },
      hover: {
        background: common.gradients.grad2,
        text: colors.main7,
        border: common.gradients.grad2,
      },
      disabled: {
        background: colors.main1,
        text: colors.main7,
        border: common.gradients.grad2,
      },
    },
    agreeVariant: {
      basic: {
        background: colors.main1,
        text: colors.col2,
        border: colors.col2,
      },
      hover: {
        background: colors.col2,
        text: colors.white,
        border: 'transparent',
      },
      disabled: {
        background: colors.main6,
        text: colors.main7,
        border: colors.main6,
      },
    },
    disagreeVariant: {
      basic: {
        background: colors.main1,
        text: colors.col1,
        border: colors.col1,
      },
      hover: {
        background: colors.col1,
        text: colors.white,
        border: colors.main2,
      },
      disabled: {
        background: colors.main6,
        text: colors.main7,
        border: colors.main6,
      },
    },
  },
  text: {
    primary: colors.main7,
    secondary: colors.main6,
    disabled: colors.main6,
  },
  error: {
    main: colors.col6,
  },
  success: {
    main: colors.col2,
  },
  colors,
};

export default palette;

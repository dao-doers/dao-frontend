import { Colors, Palette } from '@mui/material/styles';
import common, { RecursivePartial } from './common';

const colors: Colors = {
  ...common.colors,
  main1: '#FFFFFF',
  main2: '#F4F4F4',
  main3: '#F0F0F0',
  main4: '#E9E9E9',
  main5: '#CACACA',
  main6: '#5C5B63',
  main7: '#383838',
  main8: 'rgba(66, 68, 90, 0.3)',
  main9: '#000000',
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
        text: colors.main7,
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
        text: colors.main1,
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
        border: colors.main2,
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
        text: colors.col4,
        border: colors.col4,
      },
      hover: {
        background: colors.col4,
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
    main: colors.col4,
  },
  success: {
    main: colors.col2,
  },
  colors,
};

export default palette;

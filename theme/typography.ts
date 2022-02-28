import React from 'react';
import { TypographyOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    'h1-bold': React.CSSProperties;
    'h2-bold': React.CSSProperties;
    'h3-bold': React.CSSProperties;
    'h4-bold': React.CSSProperties;
    'h5-bold': React.CSSProperties;
    'h6-bold': React.CSSProperties;

    'body1-bold': React.CSSProperties;

    'subtitle1-bold': React.CSSProperties;

    'subtitle2-bold': React.CSSProperties;

    'body2-bold': React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    'h1-bold'?: React.CSSProperties;
    'h2-bold'?: React.CSSProperties;
    'h3-bold'?: React.CSSProperties;
    'h4-bold'?: React.CSSProperties;
    'h5-bold'?: React.CSSProperties;
    'h6-bold'?: React.CSSProperties;

    'subtitle1-bold'?: React.CSSProperties;

    'subtitle2-bold'?: React.CSSProperties;

    'body1-bold'?: React.CSSProperties;

    'body2-bold'?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'h1-bold': true;
    'h2-bold': true;
    'h3-bold': true;
    'h4-bold': true;
    'h5-bold': true;
    'h6-bold': true;

    'subtitle1-bold': true;

    'subtitle2-bold': true;

    'body1-bold': true;

    'body2-bold': true;
  }
}

const header = (desktop: number, mobile: number, font: string, weight: number) => ({
  fontSize: desktop,
  fontWeight: weight,
  lineHeight: 1.25,
  fontFamily: [font, 'Roboto', '"Open Sans"', 'sans-serif'].join(','),
  fontStyle: 'normal',

  '@media (max-width: 400px)': {
    fontSize: mobile,
  },
});

const body = (desktop: number, mobile: number, font: string, weight: number) => ({
  fontSize: desktop,
  fontWeight: weight,
  lineHeight: 1.5,
  fontFamily: [font, 'Roboto', '"Open Sans"', 'sans-serif'].join(','),
  fontStyle: 'normal',

  '@media (max-width: 400px)': {
    fontSize: mobile,
  },
});

const typography: TypographyOptions = {
  fontFamily: ['Poppins', 'Commissioner', 'Roboto', '"Open Sans"', 'sans-serif'].join(','),

  h1: header(48, 38, 'Poppins', 300),
  h2: header(40, 34, 'Poppins', 300),
  h3: header(32, 28, 'Poppins', 300),
  h4: header(28, 20, 'Poppins', 300),
  h5: header(25, 18, 'Poppins', 300),
  h6: header(20, 16, 'Poppins', 300),

  subtitle1: body(18, 16, 'Poppins', 400),
  subtitle2: body(16, 14, 'Poppins', 400),

  body1: body(14, 12, 'Poppins', 300),
  body2: body(12, 11, 'Poppins', 300),

  'h1-bold': header(48, 38, 'Poppins', 600),
  'h2-bold': header(40, 34, 'Poppins', 600),
  'h3-bold': header(32, 28, 'Poppins', 600),
  'h4-bold': header(28, 20, 'Poppins', 600),
  'h5-bold': header(25, 18, 'Poppins', 600),
  'h6-bold': header(20, 16, 'Poppins', 600),

  'subtitle1-bold': body(18, 16, 'Poppins', 600),
  'subtitle2-bold': body(16, 14, 'Poppins', 600),

  'body1-bold': body(14, 12, 'Poppins', 600),
  'body2-bold': body(12, 11, 'Poppins', 600),
};

export default typography;

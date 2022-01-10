import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';

import { selectTheme } from 'redux/slices/theme';

import theme from './theme';

const GlobalThemeProvider: React.FC = ({ children }) => {
  const themeMode = useSelector(selectTheme);

  return <ThemeProvider theme={theme(themeMode)}>{children}</ThemeProvider>;
};

export default GlobalThemeProvider;

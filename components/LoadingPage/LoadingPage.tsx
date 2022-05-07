import Image from 'next/image';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';

import THEME_MODES from 'enums/themeModes';

import { selectTheme } from 'redux/slices/theme';

const StyledImage = styled(Image)`
  transform: scale(1);
  animation: pulse 3s infinite;

  @keyframes pulse {
    0% {
      transform: scale(0.8);
    }

    50% {
      transform: scale(1);
    }

    100% {
      transform: scale(0.8);
    }
  }
`;

const LoadingPage: FC = () => {
  const themeMode = useSelector(selectTheme);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="60vh">
      {themeMode === THEME_MODES.DARK ? (
        <StyledImage src="/logos/logo_white.png" alt="header-logo" height="110" width="219" />
      ) : (
        <StyledImage src="/logos/logo_black.png" alt="header-logo" height="110" width="219" />
      )}
    </Box>
  );
};

export default LoadingPage;

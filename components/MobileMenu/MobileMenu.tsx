import React, { FC, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Close from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

import Link from 'components/Link';

import { APP_ROUTES } from 'utils/routes';

import { selectTheme } from 'redux/slices/theme';

import THEME_MODES from 'enums/themeModes';

const StyledMenuIcon = styled(Menu)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const StyledCloseIcon = styled(Close)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const StyledTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 14px !important;
`;

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    width: 100%;
  }
  & .MuiPaper-root {
    width: 100%;
    height: auto;
    margin-top: 60px;
    background-color: ${({ theme }) => theme.palette.colors.main5};
  }
`;

const MobileMenu: FC = () => {
  const themeMode = useSelector(selectTheme);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box width="100px" mt={1}>
          <Link internal href="/">
            {themeMode === THEME_MODES.DARK ? (
              <Image src="/logos/logo_white.png" alt="header-logo" height="110" width="219" />
            ) : (
              <Image src="/logos/logo_black.png" alt="header-logo" height="110" width="219" />
            )}
          </Link>
        </Box>
        {isDrawerOpen ? (
          <IconButton aria-label="close drawer" onClick={handleDrawerToggle}>
            <StyledCloseIcon />
          </IconButton>
        ) : (
          <IconButton aria-label="open drawer" onClick={handleDrawerToggle}>
            <StyledMenuIcon />
          </IconButton>
        )}
      </Box>

      <StyledDrawer variant="temporary" anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <Box px={2} py={4}>
          <Link href="/">
            <StyledTypography align="center" paragraph>
              All Proposals
            </StyledTypography>
          </Link>
          <Link href={APP_ROUTES.NEW}>
            <StyledTypography align="center">Make a proposal</StyledTypography>
          </Link>
        </Box>
      </StyledDrawer>
    </Box>
  );
};

export default MobileMenu;

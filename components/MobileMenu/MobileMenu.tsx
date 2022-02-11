import React, { FC, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Close from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';

import Link from 'components/Link';

import MenuContent from 'components/MenuContent/MenuContent';

import { selectTheme } from 'redux/slices/theme';

import THEME_MODES from 'enums/themeModes';

const StyledMenuIcon = styled(Menu)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const StyledCloseIcon = styled(Close)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    min-width: 250px;
  }
  & .MuiPaper-root {
    min-width: 250px;
    background-color: ${({ theme }) => theme.palette.background.default};
    box-shadow: 0px 0px 24px 0px ${({ theme }) => theme.palette.colors.main8};
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

      <StyledDrawer variant="temporary" anchor="right" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <MenuContent setDrawerOpen={setDrawerOpen} />
      </StyledDrawer>
    </Box>
  );
};

export default MobileMenu;

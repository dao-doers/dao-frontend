import Image from 'next/image';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Close from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/icons-material/Menu';

import Link from 'components/Link/Link';
import MenuContent from 'components/Menu/MenuContent/MenuContent';
import BlockchainStatusContent from 'components/BlockchainStatusContent/BlockchainStatusContent';
import DAOPlainButton from 'components/DAOPlainButton/DAOPlainButton';

import THEME_MODES from 'enums/themeModes';

import { selectTheme } from 'redux/slices/theme';

const StyledMenuIcon = styled(Menu)`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-left: 10px;
`;

const StyledCloseIcon = styled(Close)`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-left: 10px;
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

  const BlurryStyledDrawer = {
    backdropFilter: 'blur(1px)',
  };

  return (
    <Box sx={{ display: { xs: 'block', lg: 'none' }, mt: { xs: 2, lg: 0 } }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box width="100px">
          <Link internal href="/">
            {themeMode === THEME_MODES.DARK ? (
              <Image src="/logos/logo_white.png" alt="header-logo" height="110" width="219" />
            ) : (
              <Image src="/logos/logo_black.png" alt="header-logo" height="110" width="219" />
            )}
          </Link>
        </Box>

        <Box display="flex" alignItems="center">
          <BlockchainStatusContent />

          {isDrawerOpen ? (
            <DAOPlainButton aria-label="close drawer" onClick={handleDrawerToggle}>
              <StyledCloseIcon />
            </DAOPlainButton>
          ) : (
            <DAOPlainButton aria-label="open drawer" onClick={handleDrawerToggle}>
              <StyledMenuIcon />
            </DAOPlainButton>
          )}
        </Box>
      </Box>

      <StyledDrawer
        variant="temporary"
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        BackdropProps={{
          style: BlurryStyledDrawer,
        }}
      >
        <MenuContent setDrawerOpen={setDrawerOpen} />
      </StyledDrawer>
    </Box>
  );
};

export default MobileMenu;

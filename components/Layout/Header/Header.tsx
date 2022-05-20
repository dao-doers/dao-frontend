import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Close from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import Link from 'components/Link/Link';
import SideNav from 'components/Layout/SideNav/SideNav';
import BlockchainStatusContent from 'components/BlockchainStatusContent/BlockchainStatusContent';
import DAOPlainButton from 'components/DAOPlainButton/DAOPlainButton';
import WalletAbstraction from 'components/WalletAbstraction/WalletAbstraction';

import THEME_MODES from 'enums/themeModes';

import { selectTheme } from 'redux/slices/theme';
import { Typography } from '@mui/material';

const HeaderWrapper = styled(Box)`
  position: sticky;
  top: 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.colors.main4};
  background-color: ${({ theme }) => theme.palette.colors.main1};
  z-index: 100;
`;

const StyledBox = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  height: 80px;
`;

const StyledMenuIcon = styled(Menu)`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-left: 10px;
`;

const StyledCloseIcon = styled(Close)`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-left: 10px;
`;

const GradientTypography = styled(Typography)`
  font-weight: 500;
  background: ${({ theme }) => theme.palette.gradients.grad2};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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

const Header: FC = () => {
  const themeMode = useSelector(selectTheme);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const BlurryStyledDrawer = {
    backdropFilter: 'blur(1px)',
  };

  return (
    <HeaderWrapper>
      <Container>
        <StyledBox>
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Box width="200px">
              <Link href="/" internal>
                <GradientTypography variant="h3-bold">Digi Pnyx</GradientTypography>
              </Link>
            </Box>

            <Box display="flex" alignItems="center">
              <WalletAbstraction />
              <BlockchainStatusContent />

              <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
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
            <SideNav setDrawerOpen={setDrawerOpen} />
          </StyledDrawer>
        </StyledBox>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;

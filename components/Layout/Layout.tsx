import { FC, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import DesktopMenu from 'components/DesktopMenu/DesktopMenu';
import Footer from 'components/Footer/Footer';
import MobileMenu from 'components/MobileMenu/MobileMenu';
import BlockchainStatus from 'components/BlockchainStatus/BlockchainStatus';
import LoadingPage from 'components/LoadingPage/LoadingPage';

import { setTheme } from 'redux/slices/theme';

import useFetchProposals from 'hooks/useFetchProposals';
import useFetchVotes from 'hooks/useFetchVotes';
import useMaintainSession from 'hooks/useMaintainSession';

import THEME_MODES from 'enums/themeModes';

export type LayoutProps = {
  children: ReactNode;
};

const StyledContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledBox = styled(Box)`
  display: flex;
`;

const Layout: FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();

  const loadingProposals = useFetchProposals();
  const loadingVotes = useFetchVotes();

  useMaintainSession();

  useEffect(() => {
    const theme = sessionStorage.getItem('dao-theme');

    dispatch(setTheme(theme === THEME_MODES.DARK ? THEME_MODES.DARK : THEME_MODES.LIGHT));
  }, [dispatch]);

  return (
    <StyledContainer>
      <MobileMenu />

      <StyledBox>
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
          <DesktopMenu />
        </Box>

        <Box width="100%">
          <BlockchainStatus />
          {(loadingProposals.loading || loadingVotes.loading) && <LoadingPage />}

          {!loadingProposals.loading && !loadingVotes.loading && children}
        </Box>
      </StyledBox>

      <Footer />
    </StyledContainer>
  );
};

export default Layout;

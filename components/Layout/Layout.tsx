import { FC, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import BlockchainStatus from 'components/BlockchainStatus/BlockchainStatus';
import DesktopMenu from 'components/DesktopMenu/DesktopMenu';
import Footer from 'components/Footer/Footer';
import LoadingPage from 'components/LoadingPage/LoadingPage';
import MobileMenu from 'components/MobileMenu/MobileMenu';

import THEME_MODES from 'enums/themeModes';

import useFetchProposals from 'hooks/useFetchProposals';
import useFetchVotes from 'hooks/useFetchVotes';
import useMaintainSession from 'hooks/useMaintainSession';
import useFetchMembers from 'hooks/useFetchMembers';

import { setTheme } from 'redux/slices/theme';

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

  useFetchMembers();
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

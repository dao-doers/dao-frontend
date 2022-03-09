import { FC, ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import DesktopMenu from 'components/DesktopMenu/DesktopMenu';
import Footer from 'components/Footer/Footer';
import MobileMenu from 'components/MobileMenu/MobileMenu';
import BlockchainStatus from 'components/BlockchainStatus/BlockchainStatus';
import LoadingPage from 'components/LoadingPage/LoadingPage';

import { setTheme } from 'redux/slices/theme';
import { selectUserAddress, selectIsLoggedIn, setUserShares } from 'redux/slices/user';

import useFetchProposals from 'hooks/useFetchProposals';
import useFetchVotes from 'hooks/useFetchVotes';
import useMaintainSession from 'hooks/useMaintainSession';
import useFetchMembers from 'hooks/useFetchMembers';

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
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const fetchMembers = useFetchMembers();

  useMaintainSession();

  useEffect(() => {
    const theme = sessionStorage.getItem('dao-theme');

    dispatch(setTheme(theme === THEME_MODES.DARK ? THEME_MODES.DARK : THEME_MODES.LIGHT));
  }, [dispatch]);

  useEffect(() => {
    if (!fetchMembers.loading && fetchMembers && fetchMembers.data && isLoggedIn) {
      // TODO: uncomment after new godwoken
      // const user = fetchMembers.data.members.filter((a: any) => {
      //   return a.memberAddress === userAddress;
      // });
      // if (user[0]) {
      //   dispatch(setUserShares(user[0].shares));
      // }
      // TODO: remove after new godwoken
      const address = '0xD173313A51f8fc37BcF67569b463abd89d81844f';
      if (userAddress === address.toLocaleLowerCase()) {
        const user = fetchMembers.data.members.filter((a: any) => {
          return a.memberAddress === '0x8016dcd1af7c8cceda53e4d2d2cd4e2924e245b6';
        });
        if (user[0]) {
          dispatch(setUserShares(user[0].shares));
        }
      } else {
        dispatch(setUserShares(0));
      }
    }
  }, [fetchMembers.loading, fetchMembers.data, isLoggedIn]);

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
